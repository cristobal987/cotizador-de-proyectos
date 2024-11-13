import {CustomCollections} from '../customCollection';

const schemaComponents = {
    properties: String,
    model: String,
    brand: String,
    price: Number,
    createdAt:{type:Date, optional: true},
    createdBy:{type:String, optional: true},
    updatedAt:{type:Date, optional: true},
    updatedBy:{type:String, optional: true},
}

export const ComponentsCollection = new CustomCollections("components", schemaComponents);