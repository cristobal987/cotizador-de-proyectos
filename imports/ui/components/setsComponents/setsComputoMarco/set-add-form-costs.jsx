import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import FormGroupText from '../../customFormComponent/FormGroupText'
import { formatPrice, parseFloatFixed } from '../../../../lib/utils'
import { CheckCircleFill, ExclamationCircleFill } from 'react-bootstrap-icons'

function SetAddFormCosts({financeData, reference, components, accesories, aditionalSoftware, quantitiesLocal, quantitiesNational, quantitiesStock, costsObject, onUpdate}) {
    const [distribution, setDistribution] = useState(financeData.distribution)
    const [installation, setInstallation] = useState(financeData.installation)
    const [fianza, setFianza] = useState(financeData.fianza.toString())
    const [months, setMonths] = useState(financeData.months)
    const [fianzaTotal, setFianzaTotal] = useState(parseFloatFixed((months/12) * fianza))
    const [rate, setRate] = useState(financeData.rate)
    const [margin, setMargin] = useState(financeData.margin)
    const [personnel, setPersonnel] = useState(financeData.personnel)
    const [insurance, setInsurance] = useState(financeData.insurance)
    const [penalty, setPenalty] = useState(financeData.penalty)

    const [costs, setCosts] = useState(costsObject)


    const onChange = e => {
        let id = e.currentTarget.id
        let value = e.currentTarget.value
        let data = {
            distribution: distribution, 
            installation: installation, 
            fianza: fianza, 
            margin: margin, 
            rate: rate, 
            months: months,
            personnel: personnel,
            insurance: insurance,
            penalty: penalty
        }
        switch (id){
            case "costs-distribution":
                setDistribution(value)
                data.distribution = value
                updateCosts(data)
            break;
            case "costs-installation":
                setInstallation(value)
                data.installation = value
                updateCosts(data)
            break;
            case "costs-fianza":
                setFianza(value)
                data.fianza = value
                updateCosts(data)
            break;
            case "costs-months":
                setMonths(value)
                data.months = value
                updateCosts(data)
            break;
            case "costs-rate":
                setRate(value)
                data.rate = value
                updateCosts(data)
            break;
            case "costs-margin":
                setMargin(value)
                data.margin = value
                updateCosts(data)
            break;
            case "costs-personnel":
                setPersonnel(value)
                data.personnel = value
                updateCosts(data)
            break;
            case "costs-insurance":
                setInsurance(value)
                data.insurance = value
                updateCosts(data)
            break;
            case "costs-penalty":
                setPenalty(value)
                data.penalty = value
                updateCosts(data)
            break;
        }
    }

    const updateCosts = ({distribution, installation, fianza, margin, rate, months, personnel, insurance, penalty}) => {
        const componentsTotal = parseFloatFixed(components.totalCost)
        let accesoriesTotal = 0
        if(accesories.accesory?.length > 0){
            accesoriesTotal = parseFloatFixed(accesories.totalCost)
        }
        let aditionalSoftwareTotal = 0
        if(aditionalSoftware.accesory?.length > 0){
            aditionalSoftwareTotal = parseFloatFixed(aditionalSoftware.totalCost)
        }

        const distribucionTotal = parseFloatFixed(distribution)
        const installationTotal = parseFloatFixed(installation)
        const fianza_porcent = parseFloatFixed((months/12) * fianza)

        const personnelFloat = parseFloatFixed(personnel? personnel: 0)
        const insuranceFloat = parseFloatFixed(insurance? insurance: 0)
        const penaltyFloat = parseFloatFixed(penalty? penalty: 0)

        let totalCostUnit = parseFloatFixed(
            componentsTotal + 
            accesoriesTotal + 
            aditionalSoftwareTotal + 
            distribucionTotal + 
            installationTotal + 
            //fianzaTotal + 
            personnelFloat + 
            insuranceFloat
            )
        const totalCostUnitPenalty = parseFloatFixed(totalCostUnit * (penaltyFloat/100))
        const totalCostUnitFianza = parseFloatFixed(totalCostUnit * (fianza_porcent/100))
        totalCostUnit += totalCostUnitPenalty
        totalCostUnit += totalCostUnitFianza

        const totalUnits = parseInt(quantitiesLocal) + parseInt(quantitiesNational) + parseInt(quantitiesStock) 
        const totalCostInvestment = parseFloatFixed(totalCostUnit * totalUnits)

        const monthly = parseFloatFixed(totalCostUnit / months)
        const financeCost = parseFloatFixed(monthly * parseFloatFixed(rate)/100)
        const monthlyMargin = parseFloatFixed(monthly * parseFloatFixed(margin)/100)
        
        const outputPrice = parseFloatFixed(monthly + financeCost + monthlyMargin)

        const daylyOutputPrice = parseFloatFixed(outputPrice / 30.43)
        const monthlyPayment = parseFloatFixed(outputPrice * totalUnits)

        let costs = {
            totalCostUnit,
            totalCostUnitPenalty,
            totalCostUnitFianza,
            totalCostInvestment,
            totalUnits,
            monthly,
            financeCost,
            monthlyMargin,
            outputPrice,
            daylyOutputPrice,
            monthlyPayment
        }

        setCosts(costs)
        setFianzaTotal(fianza_porcent)
        onUpdate({
            finanace:{
                distribution, 
                installation, 
                fianza, 
                margin, 
                rate, 
                months,
                personnel,
                insurance,
                penalty
            },
            costs
        })
    }

    const updateCostsDefault = ()=>{
        updateCosts(financeData)
    }

    useEffect(()=>{
        if(!costs){
            updateCostsDefault()
        }
    },[costs])

    useEffect(()=>{
        if(quantitiesLocal){
            updateCostsDefault()
        }
    },[quantitiesLocal])

    useEffect(()=>{
        if(quantitiesNational){
            updateCostsDefault()
        }
    },[quantitiesNational])

    useEffect(()=>{
        if(quantitiesStock){
            updateCostsDefault()
        }
    },[quantitiesStock])

    useEffect(()=>{
        if(components){
            updateCostsDefault()
        }
    },[components])

    useEffect(()=>{
        if(accesories){
            updateCostsDefault()
        }
    },[accesories])

    useEffect(()=>{
        if(aditionalSoftware){
            updateCostsDefault()
        }
    },[aditionalSoftware])

    return (
    <>
    <Row><h5>Costos</h5></Row>
    <Row>
        <Col>
            <label htmlFor='totalCostComponent'>Total componente:</label>
            <p id={"totalCostComponent"}>{formatPrice(components.totalCost)}</p>
        </Col>
        <Col>
            <label htmlFor='totalCostAccesories'>Total accesorios:</label>
            <p id={"totalCostAccesories"}>{formatPrice(accesories.totalCost ? accesories.totalCost : 0)}</p>
        </Col>
        <Col>
            <label htmlFor='totalAditionalSoftware'>Total software adicional:</label>
            <p id={"totalAditionalSoftware"}>{formatPrice(aditionalSoftware.totalCost ? aditionalSoftware.totalCost : 0)}</p>
        </Col>
    </Row>
    <Row>
        <Col><FormGroupText id={"costs-distribution"} value={distribution ? distribution : 0} label={"Distribucion:"} dataType={"number-float"} onChange={onChange}/></Col>
        <Col><FormGroupText id={"costs-installation"} value={installation ? installation : 0} label={"Instalacion:"} dataType={"number-float"} onChange={onChange}/></Col>
        <Col>
            <FormGroupText id={"costs-fianza"} value={fianza ? fianza : 0} label={"Fianza (%):"} dataType={"number-float"} onChange={onChange}/>
            <p>
                {fianzaTotal + "% " + (
                    costs ? 
                    " - (" + parseFloatFixed(costs.totalCostUnit * (fianzaTotal / 100)) + ")" 
                    : "") }
            </p>
        </Col>
    </Row>
    <Row>
        <Col><FormGroupText id={"costs-personnel"} value={personnel ? personnel : 0} label={"personal:"} dataType={"number-float"} onChange={onChange}/></Col>
        <Col><FormGroupText id={"costs-insurance"} value={insurance ? insurance : 0} label={"seguro:"} dataType={"number-float"} onChange={onChange}/></Col>
        <Col><FormGroupText id={"costs-penalty"} value={penalty ? penalty : 0} label={"Penalizacion (%):"} dataType={"number-float"} onChange={onChange}/></Col>
    </Row>
    {
        costs ?
        <>
        <Row>
            <Col>
                <label htmlFor='costs-totalCostUnit'>Costo total unidad:</label>
                <p id={"costs-totalCostUnit"}>{formatPrice(costs.totalCostUnit)}</p>
            </Col>
            <Col>
                <label htmlFor='costs-totalUnits'>Cantidad total de unidades:</label>
                <p id={"costs-totalUnits"}>{costs.totalUnits +" (Ref. "+reference.rango?.maximo+") "}
                {
                    costs.totalUnits < reference.rango?.maximo ?
                        <CheckCircleFill style={{color:"green"}}/>
                    :   <>
                        <ExclamationCircleFill style={{color:"orange"}}/>
                        <br/>
                        <span style={{color:"orange"}}>Se pasa!</span>
                    </>
                }
                <br/>
                <span>{"local: " + quantitiesLocal + ", nacional: " + quantitiesNational + ", stock: " + quantitiesStock}</span>
                </p>
            </Col>
            <Col>
                <label htmlFor='costs-investment'>Inversion:</label>
                <p id={"costs-investment"}>{formatPrice(costs.totalCostInvestment)}</p>
            </Col>
        </Row>
        <Row>
            <Col><FormGroupText id={"costs-months"} value={months ? months : 0} label={"Meses:"} dataType={"number-integer"} onChange={onChange}/></Col>
            <Col><FormGroupText id={"costs-rate"} value={rate ? rate : 0} label={"Fin (%):"} dataType={"number-float"} onChange={onChange}/></Col>
            <Col><FormGroupText id={"costs-margin"} value={margin ? margin : 0} label={"Margen (%):"} dataType={"number-float"} onChange={onChange}/></Col>
        </Row>
        <Row>
            <Col>
                <label htmlFor='costs-mothly'>Precio entre meses:</label>
                <p id={"costs-mothly"}>{formatPrice(costs.monthly)}</p>
            </Col>
            <Col>
                <label htmlFor='costs-finance'>Financiamiento:</label>
                <p id={"costs-finance"}>{formatPrice(costs.financeCost)}</p>
            </Col>
            <Col>
                <label htmlFor='costs-margin-price'>Margen:</label>
                <p id={"costs-margin-price"}>{formatPrice(costs.monthlyMargin)}</p>
            </Col>
        </Row>
        <Row>
            <Col>
                <label htmlFor='costs-output-price'>Salida:</label>
                <p id={"costs-output-price"}>{formatPrice(costs.outputPrice) +" (Ref: "+reference.precioReferencia+") "}
                {
                    costs.outputPrice < reference.precioReferencia ?
                        <CheckCircleFill style={{color:"green"}}/>
                    :   <>
                        <ExclamationCircleFill style={{color:"orange"}}/>
                        <br/>
                        <span style={{color:"orange"}}>Se pasa!</span>
                    </>
                }
                </p>
            </Col>
            <Col>
                <label htmlFor='costs-output-price-day'>Por dia:</label>
                <p id={"costs-output-price"}>{formatPrice(costs.daylyOutputPrice)}</p>
            </Col>
            <Col>
                <label htmlFor='costs-output-invoice'>Factura Mensual:</label>
                <p id={"costs-output-price"}>{formatPrice(costs.monthlyPayment)}</p>
            </Col>
        </Row>
        </>
        :<></>
    }
    </>
    )
}

export default SetAddFormCosts