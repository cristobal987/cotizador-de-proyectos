import { Mongo } from 'meteor/mongo';
import SimpleSchema from "simpl-schema";


class CustomCollections extends Mongo.Collection {
    constructor(collectionName, schemaObject){
        super(collectionName, {})
        this.schema = new SimpleSchema(schemaObject, {})
    }

    insert(doc, callback){
        this.schema.validate(doc)
        return super.insert(doc, callback);
    }

    update(selector, modifier, options, callback){
        this.schema.validate(modifier, {modifier: true})
        super.update(selector, modifier, options, callback)
    }
}

export {CustomCollections};