import { Meteor } from 'meteor/meteor';
import { ProjectsCollection } from './projects';
import { insertFilesToProject, 
    deleteFilesInProject, 
    deleteFolderFilesInProject, 
    getProjectFiles, 
    getfilesToDelete, 
    formatFilesData, 
    formatFilesDataReverse } from './lib/projectLibs';
import { deleteSets, getSets, insertSets, updateSets } from '../sets/lib/setsLibs';
import { validateUserAccess } from '../../lib/utils';

const managerRoles = ['admin','projects-user']
const accessRoles = ['user', ...managerRoles]

Meteor.methods({
    'insertProject': function(project) {
        if(!this.userId){
            return {};
        }

        if(!validateUserAccess(this.userId, managerRoles)){
            throw new Meteor.Error('unauthorized', "No estas autorizado");
        }
        
        project.financeData.fianza = project.financeData.fianza.toString();
        
        let data ={
            projectData: project.projectData,
            financeData: project.financeData,
            sumary: project.sumary,
            createdBy: this.userId,
            createdAt: new Date(),
            updatedBy: this.userId,
            updatedAt: new Date()
        }

        let res = ProjectsCollection.insert(data,(error, id) => {
            if(error){
                throw Error(error)
            }

            let files = formatFilesData(
                project.files, 
                id, 
                project.projectData.clientName, 
                project.projectData.name
            )

            ProjectsCollection.update(
                { _id: id},
                { $set: {files: files}},
                {},
                (error, result) => {
                    if(error){
                        throw Error(error)
                    }
                    insertFilesToProject(
                        id, 
                        project.files, 
                        project.projectData.clientName, 
                        project.projectData.name
                    )
                }
            )
            //insert sets
            insertSets(id, project.projectData.type, project.setsData)
            return id
        })
        return res;
    },
    'updateProject': function(project) {
        if(!this.userId){
            return {};
        }

        if(!validateUserAccess(this.userId, managerRoles)){
            throw new Meteor.Error('unauthorized', "No estas autorizado");
        }

        project.financeData.fianza = project.financeData.fianza.toString();
        let files = formatFilesData(
            project.files, 
            project._id, 
            project.projectData.clientName, 
            project.projectData.name
        )

        let oldFiles = getProjectFiles(project._id)
        let filestodelete = getfilesToDelete(files, oldFiles)
        
        let data ={
            projectData: project.projectData,
            financeData: project.financeData,
            files: files,
            sumary: project.sumary,
            updatedBy: this.userId,
            updatedAt: new Date()
        }

        ProjectsCollection.update(
            { _id: project._id},
            { $set: data},
            {},
            Meteor.bindEnvironment(function (error, result) {
                if(error){
                    console.log(error)
                    return;
                }
                insertFilesToProject(
                    project._id, 
                    project.files, 
                    project.projectData.clientName, 
                    project.projectData.name
                )
                if(filestodelete.length > 0){
                    deleteFilesInProject(filestodelete, (err, res)=> {
                        if(err){
                            console.log(err)
                        }
                    })
                }

                updateSets(project._id, project.projectData.type, project.setsData)                
            })
        )   
    },
    'deleteProject': function(projectId) {
        if(!this.userId){
            return {};
        }

        if(!validateUserAccess(this.userId, managerRoles)){
            throw new Meteor.Error('unauthorized', "No estas autorizado");
        }

        let files = getProjectFiles(projectId)
        ProjectsCollection.remove({_id:projectId},(error,result) => {
            if(error){
                throw Error(error)
            }
            deleteFolderFilesInProject(files)
            deleteSets(projectId)
            return result
        })
    },
    'getProjectData': function(projectId) {
        if(!this.userId){
            return {};
        }

        if(!validateUserAccess(this.userId, accessRoles)){
            throw new Meteor.Error('unauthorized', "No estas autorizado");
        }

        let project = ProjectsCollection.findOne({_id:projectId})
        let sets = getSets(projectId)
        let files = formatFilesDataReverse(project.files)
        project.files = files
        project.setsData = sets ? sets : []
        return project
    }
})