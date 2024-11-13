import { Meteor } from 'meteor/meteor';
import { ProjectsCollection } from './projects';
import { validateUserAccess } from '../../lib/utils';

const managerRoles = ['admin','manage-projects','projects-user']
const accessRoles = ['user', ...managerRoles]

Meteor.publish('projects', function publishUsers() {
    if(!validateUserAccess(this.userId, accessRoles)){
        return [];
    }
    if(validateUserAccess(this.userId, ['admin','manage-projects'])){
        return ProjectsCollection.find({})
    }
    return ProjectsCollection.find({createdBy: this.userId})
});