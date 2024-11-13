import { Mongo } from 'meteor/mongo'
/*import {CustomCollections} from '../customCollection';

const schemaSets = {
   projectId: String,
   catalogId: String,
   profiles: Object,
   "profiles.low": String,
   "profiles.high": String,
}

export const SetsCollection = new CustomCollections("sets", schemaSets);*/

export const SetsCollection = new Mongo.Collection("sets")