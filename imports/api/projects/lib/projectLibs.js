import { Meteor } from 'meteor/meteor';
import { ProjectsCollection } from '../projects';
import {cargarArchivoFS, EliminarArchivoFS, EliminarCarpetaFS} from '../../../lib/server-utils';

const insertFilesToProject = (id, files, clientName, projectName)=>{
    if(!files){
        return;
    }
    if(!Array.isArray(files)){
        return;
    }

    files.map( (file, index) => {
        //console.log("insertFilesToProject", file.name, file.extension)
        let name = file.name
        let extension = file.extension
        let data = file.data
        let projectId = id
        let cargaCallback = Meteor.bindEnvironment(function (error, fileRoute){
            if(error){
                throw Error(error)
            }else{
                return fileRoute
            }
        });

        cargarArchivoFS(
            name, 
            extension, 
            clientName, 
            projectName, 
            projectId, 
            data, 
            cargaCallback
        )
    })
}

const deleteFilesInProject = (files, callback) => {
    if(!files){
        return;
    }
    if(files.length == 0){
        return;
    }
    files.forEach(file => {
        EliminarArchivoFS(file.route, callback)
    })
}

const deleteFolderFilesInProject = (files)=>{
    if(!files){
        return;
    }
    if(files.length == 0){
        return;
    }
    let folderRoute = ""
    let firstFileRoute = files[0].route?.split('/')
    firstFileRoute.pop()
    firstFileRoute.forEach(item => {
        folderRoute += item + "/"
    })
    EliminarCarpetaFS(folderRoute, (error, res)=>{
        if(error){
            console.log(error)
        }
    })
}

const getProjectFiles = (id)=>{
    const project = ProjectsCollection.findOne({_id : id})
    if(!project){
        return [];
    }
    return project.files
}

const getfilesToDelete = (newfiles, oldfiles)=>{
    let filestodelete = []
    if(newfiles.length == 0){
        return oldfiles
    }

    if(!oldfiles){
        return []
    }
    
    if(oldfiles.length == 0){
        return []
    }

    for(let i = 0; i < newfiles; i++){
        for(let j = 0; i < oldfiles; j++){
            if(oldfiles[j].name != newfiles[i].name){
                filestodelete.push(oldfiles[j])
            }
        }
    }
    return filestodelete
}

const formatFilesData = (files, id, clientName, projectName) => {
    if(!files) {
        return []
    }

    if(!Array.isArray(files)){
        return []
    }
    
    if(files.length == 0){
        return []
    }

    let newfiles = []
    let finalDir = ""
    let path = process.env.FS_DIR
    if(!path){
        path = "C:\\Temp"
    }
    finalDir = path+'/' + clientName + '/' + projectName + "_" + id
    files.forEach(item => {
        newfiles.push({
            name: item.name + "." + item.extension,
            route: finalDir + "/" + item.name + "." + item.extension
        })
    })
    return newfiles
}

const formatFilesDataReverse = (files) => {
    if(!files) {
        return []
    }

    if(!Array.isArray(files)){
        return []
    }
    
    if(files.length == 0){
        return []
    }

    let newFiles = []
    for(let i = 0; i < files.length; i++){
        let splitedname = files[i].name.split('.')
        let name = splitedname[0]
        let extension = splitedname[1]
        let data = ReadFileToBase64(files[i].route)
        let mimeType = ""

        switch(extension){
            case 'pdf':
                mimeType = "data:application/pdf;base64,"
            break;
            case 'xlsx':
                mimeType = "data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,"
            break;
            case 'docx':
                mimeType = "data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,"
            break;
            case 'jpg':
                mimeType = "data:image/jpeg;base64,"
            break;
            case 'wsq':
                mimeType = "data:application/octet-stream;base64,"
            break;
            case 'tiff':
                mimeType = "data:image/tiff;base64,"
            break;
        }

        newFiles.push({
            name,
            extension,
            data: mimeType + data
        })
    }
    return newFiles
}

const ReadFileToBase64 = (route) => {
    var fs   = require('fs'),
    data = fs.readFileSync(route);
    return data.toString('base64')
}

export {
    insertFilesToProject, 
    deleteFilesInProject, 
    deleteFolderFilesInProject, 
    getProjectFiles, 
    getfilesToDelete, 
    formatFilesData, 
    formatFilesDataReverse
}