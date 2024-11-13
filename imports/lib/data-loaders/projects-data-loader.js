function projectDataPromise (projectId){
    return new Promise((resolve, reject)=>{
        Meteor.call('getProjectData', projectId, (error, projectData) => {
            if(error){
                reject(error)
                return;
            }
            resolve(projectData)
            return;
        })
    })
}

export async function projectDataLoader({params}){
    return await projectDataPromise(params.projectId)
    .then(projectData => projectData )
    .catch(error => {
        console.log(error)
        return {}
    })
}