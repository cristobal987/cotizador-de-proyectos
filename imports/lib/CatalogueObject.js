import readXlsxFile from 'read-excel-file'

class CatalogueObject {
    catalogueId = ""
    partida = ""
    perfil = ""
    descripcion = ""
    caracteristica1 = ""
    caracteristica2 = ""
    rango = {
        minimo: 0,
        maximo: 0
    }
    precioReferencia = 0

    constructor(array){
        this.partida = array[0]
        this.perfil = array[1]
        this.descripcion = array[2]
        this.caracteristica1 = array[3]
        this.caracteristica2 = array[4]
        this.rango = this.getRangoFormString(array[5])
        this.precioReferencia = array[6]
    }

    getRangoFormString(stringRango) {
        if(!stringRango){
            return {
                minimo : 0,
                maximo : 0,
            }
        }

        const array = stringRango.split(' a ')
        
        let minimo = parseInt(array[0])
        let maximo = parseInt(array[1]?.replace(",", ""))
        if(isNaN(minimo)){
            minimo = 0
        }
        if(isNaN(maximo)){
            maximo = 0
        }

        return {
            minimo : minimo,
            maximo : maximo,
        }
    }

    toJSONObject(){
        return{
            catalogueId : "",
            partida : this.partida,
            perfil : this.perfil,
            descripcion : this.descripcion,
            caracteristica1 : this.caracteristica1,
            caracteristica2 : this.caracteristica2,
            rango : {
                minimo: this.rango.minimo,
                maximo: this.rango.maximo
            },
            precioReferencia : this.precioReferencia
        }
    }
}

const ReadCatalogueFile = (file, callback) => {
        
    readXlsxFile(file).then((rows) => {
        if(rows.length < 2){
            callback("Documento vacio", undefined)
            return;
        }
        const columnsString = rows[0].toString()
        if(
            columnsString.search(/partida/) == -1 ||
            columnsString.search(/perfil/)  == -1 ||
            columnsString.search(/descripcion/)  == -1 ||
            columnsString.search(/caracteristica1/)  == -1 ||
            columnsString.search(/caracteristica2/)  == -1 ||
            columnsString.search(/rango/)  == -1 ||
            columnsString.search(/precioReferencia/)  == -1
        ){
            callback("No cumple con el formato correcto", undefined)
            return;
        }

        const dataArray = rows.filter( (item, index) => index != 0 )
        const outputArray = dataArray.map(item => new CatalogueObject(item).toJSONObject())
        callback(undefined, outputArray)
    })
}

export {CatalogueObject, ReadCatalogueFile}