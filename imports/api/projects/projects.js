import {CustomCollections} from '../customCollection';

// esto es demasiado, tengo que dividirlo.. pero es mas trabajo
const schemaProjects = {
    projectData:Object,
    "projectData.name":String,
    "projectData.clientName":String,
    "projectData.number":String,
    "projectData.type":String,
    "projectData.typeContract":String,
    "projectData.projectClass":String,
    "projectData.catalogue":String,
    "projectData.valid":Boolean,
    financeData:Object,
    "financeData.rate":String,
    "financeData.months":String,
    "financeData.margin":String,
    "financeData.distribution":String,
    "financeData.installation":String,
    "financeData.fianza":String,
    "financeData.valid":Boolean,
    "financeData.personnel":String,
    "financeData.insurance":String,
    "financeData.penalty":String,
    "financeData.spareParts":{
        type: String,
        optional: true
    },
    "financeData.paperCost":{
        type: Number,
        optional: true
    },
    /*"setsData.$":Object,
    "setsData.$.accesories":{
        type: Object,
        optional: true
    },
    "setsData.$.accesories.accesory":{
        type: Array,
        optional: true
    },
    "setsData.$.accesories.accesory.$":Object,
    "setsData.$.accesories.accesory.$.description":String,
    "setsData.$.accesories.accesory.$.type":String,
    "setsData.$.accesories.accesory.$.price":Object,
    "setsData.$.accesories.accesory.$.price.currency":String,
    "setsData.$.accesories.accesory.$.price.exchange":String,
    "setsData.$.accesories.accesory.$.price.outputPrice":Number,
    "setsData.$.accesories.accesory.$.price.price":String,
    "setsData.$.accesories.totalCost":{
        type: Number,
        optional: true
    },
    "setsData.$.aditionalSoftware":{
        type: Object,
        optional: true
    },
    "setsData.$.aditionalSoftware.accesory":{
        type: Array,
        optional: true
    },
    "setsData.$.aditionalSoftware.accesory.$":Object,
    "setsData.$.aditionalSoftware.accesory.$.description":String,
    "setsData.$.aditionalSoftware.accesory.$.type":String,
    "setsData.$.aditionalSoftware.accesory.$.price":Object,
    "setsData.$.aditionalSoftware.accesory.$.price.currency":String,
    "setsData.$.aditionalSoftware.accesory.$.price.exchange":String,
    "setsData.$.aditionalSoftware.accesory.$.price.outputPrice":Number,
    "setsData.$.aditionalSoftware.accesory.$.price.price":String,
    "setsData.$.aditionalSoftware.totalCost":{
        type: Number,
        optional: true
    },
    "setsData.$.catalogue":String,
    "setsData.$.components":{
        type: Object
    },
    "setsData.$.components.components":Array,
    "setsData.$.components.components.$":Object,
    "setsData.$.components.components.$.brand":String,
    "setsData.$.components.components.$.model":String,
    "setsData.$.components.components.$.properties":String,
    "setsData.$.components.components.$.observations":String,
    "setsData.$.components.components.$.price":Object,
    "setsData.$.components.components.$.price.currency":String,
    "setsData.$.components.components.$.price.exchange":String,
    "setsData.$.components.components.$.price.outputPrice":Number,
    "setsData.$.components.components.$.price.price":String,
    "setsData.$.components.totalCost":Number,
    "setsData.$.costs":Object,
    "setsData.$.costs.daylyOutputPrice":Number,
    "setsData.$.costs.financeCost":Number,
    "setsData.$.costs.monthly":Number,
    "setsData.$.costs.monthlyMargin":Number,
    "setsData.$.costs.monthlyPayment":Number,
    "setsData.$.costs.outputPrice":Number,
    "setsData.$.costs.totalCostInvestment":Number,
    "setsData.$.costs.totalCostUnit":Number,
    "setsData.$.costs.totalCostUnitPenalty":Number,
    "setsData.$.costs.totalCostUnitFianza":Number,
    "setsData.$.costs.totalUnits":Number,
    "setsData.$.financeData":Object,
    "setsData.$.financeData.distribution":String,
    "setsData.$.financeData.fianza":String,
    "setsData.$.financeData.installation":String,
    "setsData.$.financeData.margin":String,
    "setsData.$.financeData.months":String,
    "setsData.$.financeData.rate":String,
    "setsData.$.financeData.personnel":String,
    "setsData.$.financeData.insurance":String,
    "setsData.$.financeData.penalty":String,
    "setsData.$.quantitiesLocal":String,
    "setsData.$.quantitiesNational":String,
    "setsData.$.quantitiesStock":String,
    "setsData.$.reference":Object,
    "setsData.$.reference.caracteristica1":String,
    "setsData.$.reference.caracteristica2":String,
    "setsData.$.reference.catalogueId":String,
    "setsData.$.reference.descripcion":String,
    "setsData.$.reference.perfil":String,
    "setsData.$.reference.partida":Number,
    "setsData.$.reference.precioReferencia":Number,
    "setsData.$.reference.rango":Object,
    "setsData.$.reference.rango.maximo":Number,
    "setsData.$.reference.rango.minimo":Number,
    "setsData.$.reference._id":String,*/
    files:{
        type: Array,
        optional: true
    },
    "files.$":Object,
    "files.$.name": String,
    "files.$.route": String,
    sumary:Object,
    "sumary.globalInvesment": String,
    "sumary.globalMonthlyPayment": String,
    "sumary.projectCost": String,
    "sumary.globalBreakpoint": Number,
    createdAt:{type:Date, optional: true},
    createdBy:{type:String, optional: true},
    updatedAt:{type:Date, optional: true},
    updatedBy:{type:String, optional: true},
}

const ContractTypeSchema = {
    name: String,
    createdAt: Date
}

const ProjectClassSchema = {
    name: String,
    createdAt: Date
}

const ContractTypesCollection = new CustomCollections('contractTypes', ContractTypeSchema);
const ProjectsClassCollection = new CustomCollections("projectsClass", ProjectClassSchema);
const ProjectsCollection = new CustomCollections("projects", schemaProjects);

export {ProjectsCollection, ProjectsClassCollection, ContractTypesCollection}