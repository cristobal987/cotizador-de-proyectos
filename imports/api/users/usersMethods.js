import { Meteor } from 'meteor/meteor';
import { userCollection } from './users';
import { validateUserAccess } from '../../lib/utils';

const accessRoles = ['admin','manage-users']

Meteor.methods({
    'getUserData': function(id) {
        if(!this.userId){
            return {};
        }

        let userData = userCollection.findOne({_id:id})
        if(userData){
            let rolesArr = Meteor.roleAssignment.find({"user._id": id}).fetch();
            userData.assignRoles = rolesArr.map( item => item.role._id)
        }

        return userData
    },
    'UpdateUser': function(userData) {
        if(!validateUserAccess(this.userId, accessRoles)){
            throw new Meteor.Error('unauthorized', "No estas autorizado para actualizar usuarios");
        }

        userCollection.update(
            {_id: userData._id},
            {
                $set: {
                    "profile.name": userData.name,
                    "profile.lastname": userData.lastname,
                    'emails.0.address': userData.email,
                }
            }
        )

        if(userData.password){
            let options = {logout: true}
            if(userData._id == this.userId){
                options = {logout: false}
            }
            Accounts.setPassword(userData._id, userData.password, options)
        }

        const rolesColl = Meteor.roles.find().fetch();
        if(userData.roles){
            rolesColl.forEach(row => {
                if(!userData.roles.includes(row._id)){
                    Roles.removeUsersFromRoles( userData._id, row._id, undefined)
                }else{
                    Roles.addUsersToRoles(userData._id, row._id, undefined);
                }
            });
        }
    },
    'CreateUser': function(userData){
        if(!validateUserAccess(this.userId, accessRoles)){
            throw new Meteor.Error('unauthorized', "No estas autorizado para crear usuarios");
        }
        let userId = Accounts.createUser(userData)
        let role = ['user','projects-user']
        Roles.removeUsersFromRoles( userId, role, undefined)

        return userId
    }
    ,
    'DeleteUser': function(id){
        if(!validateUserAccess(this.userId, accessRoles)){
            throw new Meteor.Error('unauthorized', "No estas autorizado para eliminar usuarios");
        }
        Meteor.users.remove({_id:id}, error => {
            if(error){
                throw new Meteor.Error('error', "no se pudo eliminar usuario", error);
            }
            Meteor.roleAssignment.remove({"user._id": id});
        })
    }

})