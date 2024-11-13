import { Meteor } from 'meteor/meteor';
import { userCollection } from './users';
import { validateUserAccess } from '../../lib/utils';

Meteor.publish('users', function publishUsers() {
    if(validateUserAccess(this.userId,['admin'])){
        return userCollection.find();
    } else if(validateUserAccess(this.userId,[ "manage-users"])){
        const userList = Meteor.roleAssignment.find({ 'role._id': 'admin' }).fetch()
        const userArr = userList.map( item => item.user._id)

        return userCollection.find({ _id : { $nin : [...userArr] } })
    }
    return userCollection.find({_id: this.userId})
});

Meteor.publish(null, function () {
    if(!validateUserAccess(this.userId,["admin","manage-users"])){
        return []
    }

    return [Meteor.roles.find(), Meteor.roleAssignment.find()]
});