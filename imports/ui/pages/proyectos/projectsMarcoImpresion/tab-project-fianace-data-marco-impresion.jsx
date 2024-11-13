import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import FormGroupNavButton from '../../../components/customFormComponent/FormGroupNavButton'
import FormGroupText from '../../../components/customFormComponent/FormGroupText'

function ProjectFinanaceDataMarcoImpresion({financeData, dataCallback, BackClick}) {
    const [rate, setRate] = useState(financeData? financeData.rate : 0)
    const [months, setMonths] = useState(financeData? financeData.months :0)
    const [margin, setMargin] = useState(financeData? financeData.margin :0)

    const [distribution, setDistribution] = useState(financeData? financeData.distribution :0)
    const [installation, setInstallation] = useState(financeData? financeData.installation :0)
    const [fianza, setFianza] = useState(financeData? financeData.fianza : "1.0")

    const [personnel, setPersonnel] = useState(financeData? financeData.personnel :0)
    const [insurance, setInsurance] = useState(financeData? financeData.insurance :0.0)
    const [penalty, setPenalty] = useState(financeData? financeData.penalty :0.0)

    const [spareParts, setSpareParts] = useState(financeData? financeData.spareParts :0)
    const [paperCost, setPaperCost] = useState(financeData? financeData.paperCost : 0.20)

    const onChange = e =>{
        let id = e.currentTarget.id
        let value = e.currentTarget.value
        switch (id){
            case 'taza': setRate(value); break;
            case 'meses': setMonths(value); break;
            case 'margen': setMargin(value); break;
            case 'distribucion': setDistribution(value); break;
            case 'instalacion': setInstallation(value); break;
            case 'fianza': setFianza(value); break;
            case 'personnel': setPersonnel(value); break;
            case 'insurance': setInsurance(value); break;
            case 'penalty': setPenalty(value); break;
            case 'spareParts': setSpareParts(value); break;
            case 'paperCost': setPaperCost(value); break;
        }
    }

    const onNextClick = ()=> {
        const data = {
            rate,
            months,
            margin,
            distribution,
            installation,
            fianza,
            personnel,
            insurance,
            penalty,
            spareParts,
            paperCost,
            valid: validate()
        }
        dataCallback(data)
    }

    const validate = () => {
        if(!rate){
            return false;
        }

        if(!months){
            return false;
        }

        if(!margin){
            return false;
        }

        if(!distribution){
            return false;
        }

        if(!installation){
            return false;
        }

        if(!fianza){
            return false;
        }

        if(!personnel){
            return false;
        }

        if(!insurance){
            return false;
        }

        if(!penalty){
            return false;
        }

        return true;
    }

    let onBackClick = ()=> {
        console.log("Regresar?")
    }
    if(BackClick){
        onBackClick = BackClick
    }

    return (
        <>
        <Row>
            <Col>
                <FormGroupText id={"meses"} label={"Meses:"} dataType={"number-integer"} value={months} onChange={onChange}/>
            </Col>
            <Col>
                <FormGroupText id={"taza"} label={"Taza de interes (%):"} dataType={"number-float"} value={rate} onChange={onChange}/>
            </Col>
            <Col>
                <FormGroupText id={"margen"} label={"Margen de ganancia (%):"} dataType={"number-float"} value={margin} onChange={onChange}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroupText id={"distribucion"} label={"Distribucion:"} dataType={"number-float"} value={distribution} onChange={onChange}/>
            </Col>
            <Col>
                <FormGroupText id={"instalacion"} label={"Instalacion:"} dataType={"number-float"} value={installation} onChange={onChange}/>
            </Col>
            <Col>
                <FormGroupText id={"fianza"} label={"Fianza (%):"} dataType={"number-float"} value={fianza} onChange={onChange}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroupText id={"personnel"} label={"Personal:"} dataType={"number-float"} value={personnel} onChange={onChange}/>
            </Col>
            <Col>
                <FormGroupText id={"insurance"} label={"Seguro:"} dataType={"number-float"} value={insurance} onChange={onChange}/>
            </Col>
            <Col>
                <FormGroupText id={"penalty"} label={"Penalizacion (%):"} dataType={"number-float"} value={penalty} onChange={onChange}/>
            </Col>
        </Row>
        <Row>
            <Col>
                <FormGroupText id={"spareParts"} label={"Refacciones:"} dataType={"number-float"} value={spareParts} onChange={onChange}/>
            </Col>
            <Col>
                <FormGroupText id={"paperCost"} label={"Costo papel:"} dataType={"number-float"} value={paperCost} onChange={onChange}/>
            </Col>
            <Col></Col>
        </Row>
        <Row>
            <Col className="mt-2 d-flex justify-content-between">
                <FormGroupNavButton 
                backLabel={"Regresar"} 
                nextLabel={"Continuar"}
                onBackClick={onBackClick}
                onNextClick={onNextClick}
                />
            </Col>
        </Row>
        </>
    )
}

export default ProjectFinanaceDataMarcoImpresion