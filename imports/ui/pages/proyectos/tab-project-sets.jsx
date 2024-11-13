import React, { useEffect, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import FormGroupNavButton from '../../components/customFormComponent/FormGroupNavButton';
import SetsTable from '../../components/setsComponents/setsComputoMarco/setsTable'
import SetsTableImpresionMarco from '../../components/setsComponents/setsImpresionMarco/setsTableImpresionMarco';


function ProjectSetsData({setsData, catalogue, type, financeData, dataCallback, BackClick}) {
    const [sets, setSets] = useState(setsData ? setsData : [])

    const onNextClick = ()=> {
        const data = {
            sets,
            valid: validate()
        }
        dataCallback(data)
    }

    const onBackClick = ()=> {
        if(BackClick){
            BackClick()
        }
    }
    
    const validate = ()=>{
        return sets.length > 0
    }

    const FormSelector = (type) => {
        if(type == "computo"){
            return <SetsTable 
                sets={sets} 
                financeData={financeData} 
                catalogue={catalogue} 
                canEdit={true} 
                onChange={data => {
                    setSets(data)
                }}
            />
        }

        if(type == "impresion"){
            return <SetsTableImpresionMarco 
                sets={sets} 
                financeData={financeData} 
                catalogue={catalogue} 
                canEdit={true} 
                onChange={data => {
                    setSets(data)
                }}
            />
        }
        
        return <></>
    }

    return (
        <>
        <Row>
            <Col>
                {FormSelector(type)}
            </Col>
        </Row>
        <Row>
            <Col className = "mt-2 d-flex justify-content-between">
                <FormGroupNavButton 
                backLabel = { "Regresar" } 
                nextLabel = { "Continuar" }
                onBackClick = { onBackClick }
                onNextClick = { onNextClick }
                />
            </Col>
        </Row>
        </>
    )
}

export default ProjectSetsData