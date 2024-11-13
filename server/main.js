import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
//import { LinksCollection } from '/imports/api/links';
//import { userCollection } from '../imports/api/users/users';
import { ProjectsClassCollection, ContractTypesCollection } from '../imports/api/projects/projects';
import '../imports/api/users/usersPublications'
import '../imports/api/users/usersMethods'
import '../imports/api/catalogues/cataloguesPublications'
import '../imports/api/catalogues/cataloguesMethods'
import '../imports/api/projects/projectsPublication'
import '../imports/api/projects/projectsMethods'

function insertProjectCLass({name}){
  ProjectsClassCollection.insert({name, createdAt: new Date()})
}

function insertContractType({name}){
  ContractTypesCollection.insert({name, createdAt: new Date()})
}

Meteor.startup(() => {
  if(ProjectsClassCollection.find().count()=== 0){
    //insertProjectCLass({name:"venta"})
    //insertProjectCLass({name:"arrendamiento"})
    insertProjectCLass({name:"servicio administrado"})
    //insertProjectCLass({name:"servicios integrales"})
  }

  if(ContractTypesCollection.find().count() === 0){
    insertContractType({name:"marco"})
    //insertContractType({name:"abierto"})
  }

  //se crean los roles
  if(Meteor.roles.find().fetch().length === 0) {
    let roles = [
      'admin', 
      'user', 
      'manage-users', 
      'manage-catalogue', 
      'projects-user', 
      'manage-projects'
    ]

    roles.forEach(role => {
      Roles.createRole(role, {unlessExists: true});
    })
  }

  if (Meteor.users.find().fetch().length === 0) {

    console.log('Creating users: ');

    var users = [
      {
        username: "admin",
        email: "admin@ejemplo.com",
        profile: {
          name: "administrador",
          lastname: "vangent"
        },
        roles:['admin']
      },{
        username: "cristobal.risquez",
        email: "cristobal.risquez@vangentmexico.com.mx",
        profile: {
          name: "Cristobal Beltran",
          lastname: "Risquez Aponte"
        },
        roles:['user','projects-user', 'manage-users', 'manage-catalogue']
      },{
        username: "ivan.gonzalez",
        email: "ivan.gonzalez@vangentmexico.com.mx",
        profile: {
          name: "Ivan",
          lastname: "Gonzalez Montañez"
        },
        roles:['user','projects-user']
      }
      ];

      users.forEach(function (userData) {
        var id;
        let user = {
          username: userData.username,
          email: userData.email,
          password: "12345678",
          profile: { name: userData.profile.name, lastname: userData.profile.lastname }
        }
        console.log(user);

        id = Accounts.createUser(user);

        // email verification
        Meteor.users.update({_id: id}, {$set:{'emails.0.verified': true}});

        userData.roles.forEach(function (role) {
          //crea roles si no existen
          Roles.createRole(role, {unlessExists: true});
        });

        Roles.addUsersToRoles(id, userData.roles);

    });
  }

  Accounts.validateNewUser(function (user) {
    var loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, ['admin','manage-users'])) {
      return true;
    }

    throw new Meteor.Error('unauthorized', "Not authorized to create new users");
  });
});
