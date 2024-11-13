function catalogueListDataPromise (catalogueId){
    return new Promise((resolve, reject)=>{
        Meteor.call('GetCatalogueList', catalogueId, (error, catalogueData) => {
            if(error){
                reject(error)
                return;
            }
            resolve(catalogueData)
            return;
        })
    })
}

function catalogueDataPromise (catalogueId){
    return new Promise((resolve, reject)=>{
        Meteor.call('GetCatalogue', catalogueId, (error, catalogueData) => {
            if(error){
                reject(error)
                return;
            }
            resolve(catalogueData)
            return;
        })
    })
}

const catalogueListDataPromiseCallback = async function(catalogueData){
    const catalogueItems = await catalogueDataPromise(catalogueData._id)
    .then(items => items )
    .catch(error => {
        console.log(error)
        return []
    })
    catalogueData.list = catalogueItems
    return catalogueData
}

export async function catalogueDataLoader({params}){
    const catalogueId = params.catalogueId
    let catalogueData = await catalogueListDataPromise(catalogueId)
    .then(catalogueListDataPromiseCallback)
    .catch(error => {
        console.log(error)
        return {}
    })
    catalogueData.catalogueId = catalogueId
    return catalogueData
}