import {CustomCollections} from '../customCollection';

const cataloguesListSchema = {
    alias:{type:String},
    type:{type:String},
    createdAt:{type:Date, optional: true},
    createdBy:{type:String, optional: true},
    updatedAt:{type:Date, optional: true},
    updatedBy:{type:String, optional: true},
}

export const CataloguesListCollection = new CustomCollections('catalogues-list', cataloguesListSchema);