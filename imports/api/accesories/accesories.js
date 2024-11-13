import {CustomCollections} from '../customCollection';

const schemaAccesories = {
    description:String,
    type: String,
    price:Number,
    createdAt:{type:Date, optional: true},
    createdBy:{type:String, optional: true},
    updatedAt:{type:Date, optional: true},
    updatedBy:{type:String, optional: true},
}

export const AccesoriesCollection = new CustomCollections("accesories", schemaAccesories);