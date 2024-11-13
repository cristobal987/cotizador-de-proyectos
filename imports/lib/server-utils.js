
function cargarArchivoFS(name, extension, clientName, projectName, projectId, data, callback){
    Fiber = Npm.require('fibers');
    if(!data){
        return;
    }
    if(!extension){
        return;
    }
    
    Fiber(function(){
        let path = process.env.FS_DIR
        if(!path){
            path = "C:\\Temp"
        }

        let finalDir = path+'/'+clientName+'/'+projectName + "_" + projectId
        let fs = Npm.require('fs')
        
        let fileName = name + '.' + extension;

        let base64Data = data.toString()

        switch(extension){
            case 'pdf':
                base64Data = base64Data.replace(/^data:application\/pdf;base64,/, "")
            break;
            case 'xlsx':
                base64Data = base64Data.replace(/^data:application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,/, "")
            break;
            case 'docx':
                base64Data = base64Data.replace(/^data:application\/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,/, "")
            break;
            case 'jpg':
                base64Data = base64Data.replace(/^data:image\/jpeg;base64,/, "")
            break;
            case 'wsq':
                base64Data = base64Data.replace(/^data:application\/octet-stream;base64,/, "")
            break;
            case 'tiff':
                base64Data = base64Data.replace(/^data:image\/tiff;base64,/, "")
            break;
        }

        fs.mkdir(finalDir, { recursive: true }, (err) => {
            if (err) {
                throw err;
            }else{
                let binary = new Buffer.from(base64Data, 'base64').toString('binary')
                fs.writeFile( finalDir + '/' + fileName, binary, 'binary', function(err){
                    if(err){
                        console.log('cargarArchivoFS: '+ err+', '+fileName)
                        callback(err, undefined)
                    }else {
                        callback(undefined, finalDir + '/' + fileName)
                    }
                })
            }
          });
        
        
    }).run();
}

function EliminarArchivoFS(fileRoute, callback){
    Fiber = Npm.require('fibers');
    
    Fiber(function(){
        const fs = require('fs');
        fs.unlink(fileRoute, (err) => {
        if (err) {
            callback(err, undefined)
        } else {
            callback(undefined, true)
        }
        });

    }).run();
}

function EliminarCarpetaFS(filePath, callback){
    Fiber = Npm.require('fibers');
    
    Fiber(function(){
        const fs = require('fs');
        //console.log(filePath, callback)
        fs.rmdir(filePath, { recursive: true, force: true }, err => {

            if (err) {
                callback(err, undefined)
                return;
            }
            callback(undefined, true)
        });

    }).run();
}

export {cargarArchivoFS, EliminarArchivoFS, EliminarCarpetaFS}