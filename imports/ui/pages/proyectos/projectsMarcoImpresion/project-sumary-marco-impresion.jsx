import React, { useEffect, useState } from 'react'
import { Card, Row, Col, Form } from 'react-bootstrap'
import CatalogueComponent from '../../../components/CatalogueComponent'
import FormGroupPlainText from '../../../components/customFormComponent/FormGroupPlainText'
import { formatNumberExtended, formatPriceExtended } from '../../../../lib/utils'
import SetsTableDisplay from '../../../components/setsComponents/setsImpresionMarco/setsTableDisplay'
import FormGroupNavButton from '../../../components/customFormComponent/FormGroupNavButton'
import { Download } from 'react-bootstrap-icons'

const getGlobalInvesment = (sets, financeData) => {

    let global_estimated = 0
    sets.forEach(set => {
        global_estimated += set.concepts.estimated
    })

    let global_profiles_subtotal = 0
    sets.forEach(set => {
        global_profiles_subtotal += set.profiles.subtotal
    })

    let global_toner_cost = 0
    sets.forEach(set => {
        global_toner_cost += set.costs.tonerSubtotal
    })

    let several = (
        parseFloat(financeData.distribution) + 
        parseFloat(financeData.installation) + 
        parseFloat(financeData.personnel) + 
        parseFloat(financeData.insurance) + 
        parseFloat(financeData.spareParts)
    )

    let global_investment = global_profiles_subtotal + global_toner_cost + several

    let bailFull = (parseInt(financeData.months)/12) * parseFloat(financeData.fianza)
        
    let bailFinal = global_investment * (bailFull/100)
    let penalty = global_investment * (parseFloat(financeData.penalty)/100)
    let rate = global_investment * (parseFloat(financeData.rate)/100)

    return (global_investment + several + bailFinal + penalty + rate)
}


function ProjectSumaryMarcoImpresion({projectData, financeData, setsData, filesData, BackClick, dataCallback, hideNav}) {
    const [globalInvesment, setGoblalInvesment] = useState("0")
    const [globalMonthlyPayment, setGlobalMonthlyPayment] = useState("0")
    const [projectCost, setProjectCost] = useState("0")
    const [globalBreakpoint, setGlobalBreakpoint] = useState(0)
    const [sets, setSets] = useState(setsData)
    const onNextClick = ()=> {
        const data = {
            globalInvesment: globalInvesment.toString(),
            globalMonthlyPayment,
            projectCost,
            globalBreakpoint,
        }
        dataCallback(data)
    }
    
    const onBackClick = ()=>{
        if(BackClick){
            BackClick()
        }
    }

    useEffect(()=>{
        if(setsData){
            setSets(setsData)
            
        }
        setGoblalInvesment(getGlobalInvesment(setsData, financeData))
    },[setsData, financeData])
    
    return (
    <>
    {
        projectData ? 
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
                            <FormGroupPlainText id={"typeProject"} label={"Tipo proyecto"} value={projectData.type}/>
                        </Col>
                        <Col>
                            <Form.Group controlId={ projectData.catalogue } className='mb-3'>
                                <Form.Label>{ "Catalogo" }</Form.Label>
                                <div style={{padding:"0.375rem 0.75rem", backgroundColor:"#e9ecef", border:"1px solid #dee2e6"}}>
                                    <CatalogueComponent catalogueId={projectData.catalogue} />
                                </div>
                            </Form.Group>
                        </Col>
                    </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        :<></>
    }
    {
        financeData ? 
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
                            <FormGroupPlainText id={"distribucion"} label={"Distribucion:"} value={formatNumberExtended(financeData.distribution)}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"instalacion"} label={"Instalacion:"} value={formatNumberExtended(financeData.installation)}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"fianza"} label={"Fianza (%):"} value={financeData.fianza}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroupPlainText id={"personnel"} label={"Personal:"} value={formatNumberExtended(financeData.personnel)}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"insurance"} label={"Seguro:"} value={formatNumberExtended(financeData.insurance)}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"penalty"} label={"Penalizacion (%):"} value={financeData.penalty}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <FormGroupPlainText id={"spareParts"} label={"Refacciones:"} value={formatNumberExtended(financeData.spareParts)}/>
                        </Col>
                        <Col>
                            <FormGroupPlainText id={"paperCost"} label={"costo papel:"} value={formatNumberExtended(financeData.paperCost)}/>
                        </Col>
                        <Col></Col>
                    </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        :<></>
    }
    {
        sets ? 
        <Row>
            <Col style={{paddingTop:"1rem"}}>
                <Card>
                    <Card.Header>
                        <h5>Partidas</h5>
                    </Card.Header>
                    <Card.Body>
                        <SetsTableDisplay setsData={sets}/>
                        <br/>
                        <h6>Salida por tipo</h6>
                        <table className='components-table'>
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Salida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    sets.map((set, index) => {
                                        return <tr key={index}>
                                            <td>{set.concepts.concepts[0].type}</td>
                                            <td>{formatPriceExtended(set.costs.page_final_cost)}</td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        : <></>
    }
    {
        filesData ?
        <Row>
            <Col style={{paddingTop:"1rem"}}>
                <Card>
                    <Card.Header>
                        <h5>Archivos</h5>
                    </Card.Header>
                    <Card.Body style={{padding:"1rem"}}>
                        {
                            filesData?.length > 0 ?
                            <table style={{overflowWrap: "anywhere", textAlign: "left", width:"100%"}} className='components-table'>
                            
                            <tbody>
                            {
                                filesData.map( (item, index) => {
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
        : <></>
    }
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

export default ProjectSumaryMarcoImpresion