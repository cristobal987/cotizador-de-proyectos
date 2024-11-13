import { CataloguesListCollection } from "./cataloguesList";
import { validateUserAccess } from "../../lib/utils";
import { CataloguesCollection } from "./catalogues";

const managerRoles = ['admin','manage-catalogue']
const accessRoles = ['user','projects-user', ...managerRoles]

Meteor.publish('catalogues', function(){
    if(!validateUserAccess(this.userId, accessRoles)){
        return [];
    }
    return [
        CataloguesListCollection.find({}),
        CataloguesCollection.find({})
    ]
})