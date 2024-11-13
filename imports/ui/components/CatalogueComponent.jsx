import React from 'react'
import { useTracker } from 'meteor/react-meteor-data'
import { CataloguesListCollection } from '../../api/catalogues/cataloguesList'

function CatalogueComponent({catalogueId}) {
    const catalogue = useTracker(()=>{
        const handler = Meteor.subscribe('catalogues');
  
        if (!handler.ready()) {
            return [];
        }
        return CataloguesListCollection.find({_id:catalogueId}).fetch()
    })

    return (
        <div>{catalogue[0]?.alias}</div>
    )
}

export default CatalogueComponent