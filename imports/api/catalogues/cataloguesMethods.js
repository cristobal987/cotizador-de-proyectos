import { CataloguesListCollection } from "./cataloguesList";
import { CataloguesCollection } from "./catalogues";
import { validateUserAccess } from "../../lib/utils";

const InsertCollectionItems = function(catalogueId, dataArray){
    dataArray.map(item => {
        item.catalogueId = catalogueId
        delete item._id
        CataloguesCollection.insert(item)
    });
}

const RemoveCollectionItems = function(catalogueId){
    CataloguesCollection.remove({ catalogueId: catalogueId });
}

const managerRoles = ['admin','manage-catalogue']
const accessRoles = ['user','projects-user', ...managerRoles]

Meteor.methods({
    'GetCatalogueList':function(catalogueId){
        if(!validateUserAccess(this.userId, accessRoles)){
            throw new Meteor.Error('unauthorized', "No estas autorizado");
        }
        return CataloguesListCollection.findOne({_id: catalogueId})
    },
    'GetCatalogue':function(catalogueId){
        if(!validateUserAccess(this.userId, accessRoles)){
            throw new Meteor.Error('unauthorized', "No estas autorizado");
        }
        return CataloguesCollection.find({catalogueId: catalogueId}).fetch()
    },
    'InsertCatalogue': function(catalogue) {
        if(!validateUserAccess(this.userId, managerRoles)){
            throw new Meteor.Error('unauthorized', "No estas autorizado para insertar catalogos");
        }
        //const now = Date.now()
        const data = {
            alias: catalogue.alias,
            type: catalogue.type,
            createdAt: new Date(),
            createdBy: this.userId,
            updatedAt: new Date(),
            updatedBy: this.userId,
        }
        return CataloguesListCollection.insert(data, function(error, result) {
            if(error){
                console.log(error)
                return error;
            }
            InsertCollectionItems(result, catalogue.list)
        })
    },
    'UpdateCatalogue': function(catalogue){
        if(!validateUserAccess(this.userId, managerRoles)){
            throw new Meteor.Error('unauthorized', "No estas autorizado para editar catalogos");
        }
        const catalogueId = catalogue.catalogueId
        const currentCatalogue = CataloguesListCollection.findOne({_id: catalogueId})
        const data = {
            alias: catalogue.alias,
            type: catalogue.type,
            createdAt: currentCatalogue.createdAt,
            createdBy: currentCatalogue.createdBy,
            updatedAt: new Date(),
            updatedBy: this.userId
        }
        return CataloguesListCollection.update({_id: catalogueId}, {$set: data}, {},(error)=>{
            if(error){
                console.log(error)
                throw new Meteor.Error('Error', "no se pudo modificar el catalogo");
            }
            if(catalogue.list.length == 0){
                return;
            }
            CataloguesCollection.remove({catalogueId: catalogueId},(error)=> {
                if(error){
                    console.log(error)
                    throw new Meteor.Error('Error', "no se pudo modificar los item del catalogo");
                }
                InsertCollectionItems(catalogueId, catalogue.list)
            })
            
        })
    },
    'DeleteCatalogue': function(catalogueId){
        if(!validateUserAccess(this.userId, managerRoles)){
            throw new Meteor.Error('unauthorized', "No estas autorizado para eliminar catalogos");
        }
        return CataloguesListCollection.remove({_id: catalogueId}, function(error, result){
            if(error){
                console.log(error)
                return;
            }
            RemoveCollectionItems(catalogueId)
        })
    }
})