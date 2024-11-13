import React, { useEffect, useState } from 'react'
import { Form, Card, Col, Row, Button } from 'react-bootstrap'
import FormGroupNavButton from '../../components/customFormComponent/FormGroupNavButton'
import SetsTableDisplay from '../../components/setsComponents/setsComputoMarco/setsTableDisplay'
import FormGroupPlainText from '../../components/customFormComponent/FormGroupPlainText'
import { formatPrice } from '../../../lib/utils'
import CatalogueComponent from '../../components/CatalogueComponent'
import { Download } from 'react-bootstrap-icons'

const getGlobalInvesment = data =>{
    let res = 0
    data.forEach( set => {
        res += set.costs.totalCostInvestment
    })
    return res
}

const getGlobalMonthlyPayment = data =>{
    let res = 0
    data.forEach( set => {
        res += set.costs.monthlyPayment
    })
    return res
}

const getProjectCost = (data, months) =>{
    let payment = getGlobalMonthlyPayment(data)
    return payment * months
}

function ProjectSumary({projectData, financeData, setsData, files, BackClick, dataCallback, hideNav}) {
    const [globalInvesment, setGoblalInvesment] = useState(0)
    const [globalMonthlyPayment, setGlobalMonthlyPayment] = useState(0)
    const [projectCost, setProjectCost] = useState(0)
    const [globalBreakpoint, setGlobalBreakpoint] = useState(0)
    const [sets, setSets] =useState(setsData ? setsData : [])
    const [finanace, setFinanace] = useState(financeData)
    const updateGlobals = (array, fin)=>{
        let setsArray = array ? array : []
        let months = parseInt(fin?.months)
        let gi = getGlobalInvesment(setsArray)
        let gmp = getGlobalMonthlyPayment(setsArray)
        let pc = getProjectCost(setsArray, months)
        let pe = gi / gmp

        if(isNaN(pc)){
            pc = 0
        }

        if(isNaN(pe)){
            pe = 0
        }

        setGoblalInvesment(formatPrice(gi))
        setGlobalMonthlyPayment(formatPrice(gmp))
        setProjectCost(formatPrice(pc))
        setGlobalBreakpoint(parseInt(pe))
    }

    const onNextClick = ()=> {
        const data = {
            globalInvesment,
            globalMonthlyPayment,
            projectCost,
            globalBreakpoint
        }
        dataCallback(data)
    }
    
    const onBackClick = ()=>{
        if(BackClick){
            BackClick()
        }
    }

    const onChangePlainText = e => {
        console.log(e)
    }

    useEffect(()=>{
        if(setsData){
            setSets(setsData)
            updateGlobals(setsData, finanace)
        }
    },[setsData])

    useEffect(()=>{
        if(financeData){
            setFinanace(financeData)
            updateGlobals(setsData, financeData)
        }
    },[financeData])

    return (
        <>
        <Row>
            <Col style={{paddingTop:"1rem"}}>
                <Card>
                    <Card.Header>
                        <h5>Datos del Proyecto</h5>
                    </Card.Header>
                    <Card.Body>
                    <Row>
                        <Col>
                            <FormGroupPlainText id={"name"} label={"Nombre proyecto:"} value={projectData.name} />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroupPlainText id={"clientName"} label={"Cliente:"} value={projectData.clientName}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"number"} label={"Numero de Proyecto:"} value={projectData.number}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroupPlainText id={"typeContract"} label={"Tipo contrato:"} value={projectData.typeContract}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"projectClass"} label={"Clase de proyecto:"} value={projectData.projectClass}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId={ projectData.catalogue } className='mb-3'>
                                <Form.Label>{ "Catalogo" }</Form.Label>
                                <div style={{padding:"0.375rem 0.75rem", backgroundColor:"#e9ecef", border:"1px solid #dee2e6"}}>
                                    <CatalogueComponent catalogueId={projectData.catalogue} />
                                </div>
                            </Form.Group>
                        </Col>
                        <Col></Col>
                    </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col style={{paddingTop:"1rem"}}>
                <Card>
                    <Card.Header>
                        <h5>Datos financieros</h5>
                    </Card.Header>
                    <Card.Body>
                    <Row>
                        <Col>
                            <FormGroupPlainText id={"meses"} label={"Meses:"} value={financeData.months} />
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"taza"} label={"Taza de interes (%):"} value={financeData.rate}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"margen"} label={"Margen de ganancia (%):"} value={financeData.margin}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroupPlainText id={"distribucion"} label={"Distribucion:"} value={financeData.distribution}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"instalacion"} label={"Instalacion:"} value={financeData.installation}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"fianza"} label={"Fianza:"} value={financeData.fianza}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroupPlainText id={"personnel"} label={"Personal:"} value={financeData.personnel}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"insurance"} label={"Seguro:"} value={financeData.insurance}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"penalty"} label={"Penalizacion (%):"} value={financeData.penalty}/>
                        </Col>
                    </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col style={{paddingTop:"1rem"}}>
                <Card>
                    <Card.Header>
                        <h5>Partidas</h5>
                    </Card.Header>
                    <Card.Body>
                        <SetsTableDisplay setsData={sets}/>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col style={{paddingTop:"1rem"}}>
                <Card>
                    <Card.Header>
                        <h5>Archivos</h5>
                    </Card.Header>
                    <Card.Body style={{padding:"1rem"}}>
                        {
                            files?.length > 0 ?
                            <table style={{overflowWrap: "anywhere", textAlign: "left", width:"100%"}} className='components-table'>
                            
                            <tbody>
                            {
                                files.map( (item, index) => {
                                    return <tr key={index} id={index}>
                                        <td style={{padding:"0.5rem"}}>{item?.name + "." + item?.extension}</td>
                                        {
                                            item?.data ?
                                            <td>
                                                <a 
                                                className='btn btn-outline-primary btn-sm'
                                                download={item.name + "." + item.extension}
                                                href={item.data}
                                                >
                                                    <Download/>
                                                </a>
                                            </td>
                                            : <></>
                                        }
                                        
                                    </tr>
                                })
                            }
                            </tbody>
                            </table> : <></>
                        }
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col style={{paddingTop:"1rem"}}>
                <Card>
                    <Card.Header>
                        <h5>Costos globales</h5>
                    </Card.Header>
                    <Card.Body>
                    <Row>
                        <Col>
                            <FormGroupPlainText id={"global-invesment"} label={"Inversion total:"} value={globalInvesment} onChange={onChangePlainText}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"global-monthly-payment"} label={"Subtotal Factura:"} value={globalMonthlyPayment} onChange={onChangePlainText}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"project-cost"} label={"Subtotal proyecto:"} value={projectCost} onChange={onChangePlainText}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroupPlainText id={"global-breakpoint"} label={"Punto de equilibrio:"} value={globalBreakpoint} onChange={onChangePlainText}/>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                    </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        {
            !hideNav ?
            <Row>
                <Col className = "mt-2 d-flex justify-content-between">
                    <FormGroupNavButton 
                        backLabel = { "Regresar" } 
                        nextLabel = { "Guardar" }
                        onBackClick = { onBackClick }
                        onNextClick = { onNextClick }
                    />
                </Col>
            </Row>
            : <></>
        }
        </>
    )
}

export default ProjectSumary