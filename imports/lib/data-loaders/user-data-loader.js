function userDataPromise (userId){
    return new Promise((resolve, reject)=>{
        Meteor.call('getUserData', userId, (error, userData) => {
            if(error){
                reject(error)
                return;
            }
            resolve(userData)
            return;
        })
    })
}

export async function userDataLoader({params}){
    return await userDataPromise(params.userId)
    .then(userData => userData )
    .catch(error => {
        console.log(error)
        return {}
    })
}