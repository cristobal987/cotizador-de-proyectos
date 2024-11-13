import { SetsCollection } from "../sets"

const insertSets = (projectId, type, setsData) => {
    setsData.map(item => {
        item.projectId = projectId
        item.type = type
        SetsCollection.insert(item, (e, r)=> {
            if(e){
                console.log(e)
            }
        })
    })
}

const updateSets = (projectId, type, setsData)=>{
    SetsCollection.remove({projectId: projectId}, (e, r)=>{
        if(e){
            console.log(e)
            return;
        }
        insertSets(projectId, type, setsData)
    })
}

const deleteSets = (projectId) => {
    SetsCollection.remove({projectId:projectId})
}

const getSets = (projectId) => {
    return SetsCollection.find({projectId: projectId}).fetch()
}

export {getSets, deleteSets, updateSets, insertSets}