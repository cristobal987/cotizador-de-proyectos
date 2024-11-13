import React from 'react'
import { useTracker } from 'meteor/react-meteor-data';
import { CataloguesCollection } from '../../api/catalogues/catalogues';
import FormGroupSelect from './customFormComponent/FormGroupSelect';

const formatCatalogueItemToString = (item) => {
    let str = ""
    if(item.partida == null){
        str = item.descripcion 
        +" - "+ item.caracteristica1
        +" - ["+ item.rango.minimo 
        +", "+ item.rango.maximo 
        +"] - "+ item.precioReferencia
    }else {
        str = item.partida 
        +" - "+ item.perfil 
        +" - "+ item.descripcion 
        +" - "+ item.caracteristica1
        +" - "+ item.caracteristica2 
        +" - ["+ item.rango.minimo 
        +", "+ item.rango.maximo 
        +"] - "+ item.precioReferencia
    }
    return str
}

function CatalogueCollSelector({type, catalogue, onChange}) {
    const catalogueData = useTracker(()=>{
        const handler = Meteor.subscribe('catalogues');
    
        if (!handler.ready()) {
            return [];
        }
        if(type){
            return CataloguesCollection.find({catalogueId: catalogue, caracteristica1: type}).fetch()
        }else{
            return CataloguesCollection.find({catalogueId: catalogue}).fetch()
        }
    })

    const iterator = (item, index) => {
        return <option key={index} value={JSON.stringify(item)}>
            {formatCatalogueItemToString(item)}
        </option>
    }

    return (
        <FormGroupSelect 
            id = { "catalogue-data" }
            label = { "Catalogo" }
            data = { catalogueData }
            onChange = { onChange }
            iteratorFunc = {iterator} 
        />
    )
}

export default CatalogueCollSelector