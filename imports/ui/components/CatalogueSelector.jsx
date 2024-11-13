import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import FormGroupSelect from './customFormComponent/FormGroupSelect'
import { CataloguesListCollection } from '../../api/catalogues/cataloguesList'

function CatalogueSelector({type, selectedValue, onChange}){
    const catalogueList = useTracker(()=>{
        const handler = Meteor.subscribe('catalogues');
  
        if (!handler.ready()) {
            return [];
        }
        return CataloguesListCollection.find({type:type}).fetch()
    })

    const catalogueIterator = (item, index) => {
        return <option key={index} id={item._id} value={item._id}>{item.alias}</option>
    }

    return (
        <FormGroupSelect
            id = { "catalogue" }
            label = { "Catalogo" }
            data = { catalogueList }
            selectedValue={selectedValue}
            onChange = { onChange }
            iteratorFunc = { catalogueIterator }
        />
    )
}

export default CatalogueSelector