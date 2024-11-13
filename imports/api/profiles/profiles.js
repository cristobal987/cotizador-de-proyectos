import {CustomCollections} from '../customCollection';

const schemaProfiles = {
    components: Array,
    "components.$":{
        type: String
    },
    referenceCatalogueItem: String,
    accesories: Array,
    "accesories.$":{
        type: String
    },
    aditionalSoftware: Array,
    "accesories.$":{
        type: String
    },
    quantities: Object,
    "quantities.local":Number,
    "quantities.national":Number,
    costs: Object,
    "costs.distribution": Number,
    "costs.installation": Number,
    "costs.fianza": Number,
    "costs.totalCostUnit": Number,
    "costs.investment": Number,
    "costs.margin": Number,
    "costs.outputprice": Number,
    "costs.unitPrice": Number,
    "costs.mothly": Number,
    createdAt:{type:Date, optional: true},
    createdBy:{type:String, optional: true},
    updatedAt:{type:Date, optional: true},
    updatedBy:{type:String, optional: true},
}

export const ProfileCollection = new CustomCollections("profile", schemaProfiles);