import {CustomCollections} from '../customCollection';

const schemaCatalogues = {
    catalogueId:{
        type: String,
        optional: true
    },
    partida: {
        type: Number,
        optional: true
    },
    perfil:{
        type: String,
        optional: true
    },
    descripcion:{type: String},
    caracteristica1:{
        type: String,
        optional: true
    },
    caracteristica2:{
        type: String,
        optional: true
    },
    rango:{type: Object},
    "rango.minimo": {type: Number},
    "rango.maximo": {type: Number},
    precioReferencia: {type: Number}
}

export const CataloguesCollection = new CustomCollections("catalogues", schemaCatalogues);