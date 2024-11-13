import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import FormGroupText from '../../components/customFormComponent/FormGroupText'
import FormGroupSelect from '../../components/customFormComponent/FormGroupSelect'
import FormGroupNavButton from '../../components/customFormComponent/FormGroupNavButton'
import CatalogueSelector from '../../components/CatalogueSelector'
import { useNavigate } from 'react-router-dom'

function ProjectDataTab({projectData, dataCallback, BackClick}) {
    const navigate = useNavigate()
    const [name, setName] = useState(projectData ? projectData.name : "")
    const [clientName, setClientName] = useState(projectData ? projectData.clientName : "")
    const [number, setNumber] = useState(projectData ? projectData.number : "")
    const [type, setType] = useState(projectData ? projectData.type : "")
    const [typeContract, setTypeContract] = useState(projectData ? projectData.typeContract : "")
    const [projectClass, setProjectClass] = useState(projectData ? projectData.projectClass : "")
    const [catalogue, setCatalogue] = useState(projectData ? projectData.catalogue : "")
    const onChange = e =>{
        let id = e.currentTarget.id
        let value = e.currentTarget.value
        switch (id){
            case 'name': setName(value); break;
            case 'clientName': setClientName(value); break;
            case 'number': setNumber(value); break;
            case 'type': setType(value); break;
            case 'typeContract': setTypeContract(value); break;
            case 'projectClass': setProjectClass(value); break;
            case 'catalogue': setCatalogue(value); break;
        }
    }

    let onBackClick= ()=> {
        navigate(-1)
    }
    
    if(BackClick){
        onBackClick = BackClick
    }

    const onNextClick= ()=> {
        const data = {
            name,
            clientName,
            number,
            type,
            typeContract,
            projectClass,
            catalogue,
            valid: validate()
        }
        dataCallback(data)
    }

    const validate = () => {

        if(!name.trim()){
            return false;
        }
        if(!clientName.trim()){
            return false;
        }
        if(!number){
            return false;
        }
        if(number < 1){
            return false;
        }
        if(!type){
            return false;
        }
        if(!typeContract){
            return false;
        }
        if(!projectClass){
            return false;
        }
        if(!catalogue){
            return false;
        }
        return true
    }

    return (
    <>
    <Row>
        <Col>
            <FormGroupText id={"name"} label={"Nombre proyecto:"} value={name} onChange={onChange}></FormGroupText>
        </Col>
    </Row>
    <Row>
        <Col>
            <FormGroupText id={"clientName"} label={"Cliente:"} value={clientName} onChange={onChange}></FormGroupText>
        </Col>
        <Col>
            <FormGroupText id={"number"} label={"Numero de Proyecto:"} value={number} dataType={"number-integer"} onChange={onChange}></FormGroupText>
        </Col>
    </Row>
    <Row>
        <Col>
            <FormGroupSelect id={"typeContract"} label={"Tipo contrato:"} selectedValue={typeContract} onChange={onChange} data={["marco", "abierto"]}></FormGroupSelect>
        </Col>
        <Col>
            <FormGroupSelect id={"projectClass"} label={"Clase de proyecto:"} selectedValue={projectClass} data={["venta ", "arrendamiento", "servicio administrado", "servicio integrales"]} onChange={onChange}></FormGroupSelect>
        </Col>
    </Row>
    <Row>
        <Col>
            <FormGroupSelect id={"type"} label={"Tipo de proyecto:"} selectedValue={type} data={["computo", "impresion"]} onChange={onChange}></FormGroupSelect>
        </Col>
        <Col>
            <CatalogueSelector selectedValue={catalogue} type={type} onChange={onChange}/>
        </Col>
    </Row>
    <Row>
        <Col className="mt-2 d-flex justify-content-between">
            <FormGroupNavButton 
            backLabel={"Cancelar"} 
            nextLabel={"Continuar"}
            onBackClick={onBackClick}
            onNextClick={onNextClick}
            />
        </Col>
    </Row>
    </>
  )
}

export default ProjectDataTab