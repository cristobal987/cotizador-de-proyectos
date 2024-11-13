import { utils, writeFile } from 'xlsx';
import { CataloguesListCollection } from '../api/catalogues/cataloguesList';

const getWorkSheet = (data) => {
    if(!data){
        //console.log(data)
        return;
    }
    console.log(data)
    return utils.json_to_sheet(data);
}

const addWorkSheetToBook = (wb, ws, name) => {
    utils.book_append_sheet(wb, ws, name);
}

const ExportDocument = (dataset) => {
    const dataFormated = formatData(dataset)
    const wb = utils.book_new();
    Object.keys(dataFormated).forEach(key => {
        const ws = getWorkSheet(dataFormated[key].data)
        addWorkSheetToBook(wb, ws, dataFormated[key].name)
    });

    writeFile(wb, "Documento.xlsx");
}

const formatData = (data) => {
    const ouputObject = {}
    delete data._id
    delete data.projectData.valid
    //console.log(data.projectData.catalogue)
    const catalogue = CataloguesListCollection.findOne({_id:data.projectData.catalogue})
    data.projectData.catalogueAlias = catalogue?.alias

    ouputObject.projectData = {
        data: [data.projectData],
        name: "Datos del proyecto"
    }

    delete data.financeData.valid
    ouputObject.financeData = {
        data: [data.financeData],
        name: "Datos financieros"
    }

    if(data.projectData.type == "computo"){
        ouputObject.setsData = {
            data: formatSets(data.setsData),
            name: "Partidas"
        }
    }
    
    if(data.projectData.type == "impresion"){
        let setsDataImpresion = formatSetsImpresionMarco(data.setsData)

        setsDataImpresion.forEach(set => {
            ouputObject.concepts = {
                data: set.concepts,
                name: "Conceptos"
            }
    
            ouputObject.profiles = {
                data: set.profiles,
                name: "Perfiles"
            }

            ouputObject.tonerProfiles = {
                data: set.profiles,
                name: "Toner"
            }
    
            ouputObject.costs = {
                data: set.costs,
                name: "Salidas"
            }
        })
    }
    

    delete data.sumary.valid
    ouputObject.sumary = {
        data: [data.sumary],
        name: "Resumen"
    }
    
    return ouputObject
}

const formatSets = (sets) => {
    const formatedSets = []
    sets.forEach(set => {
        const formatedSet = {}
        formatedSet.partida = set.reference.partida
        formatedSet.perfil = set.reference.perfil
        formatedSet.descripcion = set.reference.descripcion
        formatedSet.caracteristica1 = set.reference.caracteristica1
        formatedSet.caracteristica2 = set.reference.caracteristica2
        formatedSet.rango = set.reference.rango.minimo +" - "+ set.reference.rango.maximo
        formatedSet.precioReferencia = set.reference.precioReferencia

        let components = ""
        set.components.components.forEach(component => {
            components += "Marca: " + component.brand 
            + ", Modelo: " + component.model 
            + ", Caracteristicas: " + component.properties 
            + ", Observaciones: " + component.observations 
            + ", Precio: " + priceToString(component.price) 
            
        })
        formatedSet.components = components
        formatedSet.componentsTotalCost = set.components.totalCost

        if(set.accesories.accesory){
            let accesories = ""
            set.accesories.accesory.forEach( accesory => {
                accesories += "Descripcion: " + accesory.description 
                + ", precio: " + priceToString(accesory.price) 
            })
            formatedSet.accesories = accesories
            formatedSet.accesoriesTotalCost = set.accesories.totalCost
        }

        if(set.aditionalSoftware.accesory){
            let aditionalSoftware = ""
            set.aditionalSoftware.accesory.forEach( accesory => {
                aditionalSoftware += "Descripcion: " + accesory.description 
                + ", precio: " + priceToString(accesory.price) 
            })
            formatedSet.aditionalSoftware = aditionalSoftware
            formatedSet.aditionalSoftwareTotalCost = set.aditionalSoftware.totalCost
        }

        formatedSet.quantitiesLocal = set.quantitiesLocal
        formatedSet.quantitiesNational = set.quantitiesNational
        formatedSet.quantitiesStock = set.quantitiesStock
        formatedSet.totalUnits = set.costs.totalUnits

        formatedSet.distribution = set.financeData.distribution
        formatedSet.installation = set.financeData.installation
        formatedSet.fianza = set.financeData.fianza
        formatedSet.fianzaTotal = (set.financeData.months/12) * set.financeData.fianza
        formatedSet.months = set.financeData.months
        formatedSet.rate = set.financeData.rate
        formatedSet.margin = set.financeData.margin
        formatedSet.personnel = set.financeData.personnel
        formatedSet.insurance = set.financeData.insurance
        formatedSet.penalty = set.financeData.penalty

        formatedSet.totalCostUnitPenalty = set.costs.totalCostUnitPenalty
        formatedSet.totalCostUnitFianza = set.costs.totalCostUnitFianza
        formatedSet.totalCostUnit = set.costs.totalCostUnit
        formatedSet.totalCostInvestment = set.costs.totalCostInvestment
        formatedSet.monthly = set.costs.monthly
        formatedSet.financeCost = set.costs.financeCost
        formatedSet.monthlyMargin = set.costs.monthlyMargin
        formatedSet.outputPrice = set.costs.outputPrice
        formatedSet.daylyOutputPrice = set.costs.daylyOutputPrice
        formatedSet.monthlyPayment = set.costs.monthlyPayment

        formatedSets.push(formatedSet)
    })
    return formatedSets
}

const formatSetsImpresionMarco = (sets) => {
    const formatedSets = []
    const concepts = []
    const profiles = []
    const tonerProfiles = []
    const costs = []
    sets.forEach(set => {
        let type = ""
        set.concepts.concepts.forEach(concept => {
            const conceptObject = {}
            conceptObject.service = concept.service
            conceptObject.type = concept.type
            conceptObject.rangeMin = concept.range.min
            conceptObject.rangeMax = concept.range.max
            conceptObject.estimatedMin = concept.estimate.min 
            conceptObject.estimatedMax = concept.estimate.max
            conceptObject.estimatedAvg = concept.estimate.avg
            conceptObject.referencePrice = concept.referencePrice
            concepts.push(conceptObject)
            type = concept.type
        })

        set.profiles.profiles.forEach(profile => {
            const profileObject = {}
            profileObject.type = type
            profileObject.profile = profile.profileData.profile
            profileObject.brand = profile.profileData.brand
            profileObject.model = profile.profileData.model
            profileObject.quantity = profile.profileData.quantity
            profileObject.price = profile.profileData.price.price
            profileObject.currency = profile.profileData.price.currency
            profileObject.exchange = profile.profileData.price.exchange
            profileObject.outputPrice = profile.profileData.price.outputPrice
            profileObject.subtotal = profile.profileData.subtotal
            profiles.push(profileObject)

            const tonerObject = {}
            tonerObject.type = type
            tonerObject.profile = profile.profileData.profile
            tonerObject.efficiency = profile.toner.efficiency
            tonerObject.price = profile.toner.price.price
            tonerObject.currency = profile.toner.price.currency
            tonerObject.exchange = profile.toner.price.exchange
            tonerObject.outputPrice = profile.toner.price.outputPrice

            tonerObject.efficiencyBalck = profile.tonerColors.black.efficiency
            tonerObject.priceBalck = profile.tonerColors.black.price.price
            tonerObject.currencyBalck = profile.tonerColors.black.price.currency
            tonerObject.exchangeBalck = profile.tonerColors.black.price.exchange
            tonerObject.outputPriceBalck = profile.tonerColors.black.price.outputPrice

            tonerObject.efficiencyCyan = profile.tonerColors.cyan.efficiency
            tonerObject.priceCyan = profile.tonerColors.cyan.price.price
            tonerObject.currencyCyan = profile.tonerColors.cyan.price.currency
            tonerObject.exchangeCyan = profile.tonerColors.cyan.price.exchange
            tonerObject.outputPriceCyan = profile.tonerColors.cyan.price.outputPrice
            
            tonerObject.efficiencyMagenta = profile.tonerColors.magenta.efficiency
            tonerObject.priceMagenta = profile.tonerColors.magenta.price.price
            tonerObject.currencyMagenta = profile.tonerColors.magenta.price.currency
            tonerObject.exchangeMagenta = profile.tonerColors.magenta.price.exchange
            tonerObject.outputPriceMagenta = profile.tonerColors.magenta.price.outputPrice
            
            tonerObject.efficiencyYellow = profile.tonerColors.yellow.efficiency
            tonerObject.priceYellow = profile.tonerColors.yellow.price.price
            tonerObject.currencyYellow = profile.tonerColors.yellow.price.currency
            tonerObject.exchangeYellow = profile.tonerColors.yellow.price.exchange
            tonerObject.outputPriceYellow = profile.tonerColors.yellow.price.outputPrice

            tonerProfiles.push(tonerObject)
        })

        
        set.costs.type = type
        costs.push(set.costs)

        let formatedSet = {
            concepts,
            profiles,
            tonerProfiles,
            costs : costs
        }
        formatedSets.push(formatedSet)
    })
    return formatedSets
}

const priceToString = price => {
    return price.outputPrice + " " + (price.currency != "MXN" ? 
        "("+price.price + "  "+ price.currency+", Ex. "+price.exchange+");" 
        :  price.currency + "; ")
}

export default ExportDocument;