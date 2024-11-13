import React, { useEffect, useState } from 'react'
import CatalogueCollSelector from '../../CatalogueCollSelector'
import { Row, Col, Card, Button } from 'react-bootstrap'
import FormGroupText from '../../customFormComponent/FormGroupText'
import FormGroupPlainText from '../../customFormComponent/FormGroupPlainText'
import FormGroupNavButton from '../../customFormComponent/FormGroupNavButton'
import { PencilFill, Trash } from 'react-bootstrap-icons'

// selector de item del catalogo de impresion
function SetsAddFormConcepts({financeData, conceptsData, typeConcept, catalogue, onChange}) {
    const [reference, setReference ] = useState({})
    const [catalogueId, setCatalogueId] = useState(catalogue)
    const [concepts, setConcepts] = useState(conceptsData? conceptsData: [])
    const [type, setType] = useState(typeConcept? typeConcept : "")
    const [estimateMin, setEstimateMin] = useState(0)
    const [estimateMax, setEstimateMax] = useState(0)
    const [estimateAvg, setEstimateAvg] = useState(0)
    const [months, setMonths] = useState(financeData? financeData.months : 1)
    const [selectedConcept, setSelectedConcepts] = useState(null)
    const [showForm, setShowForm] = useState(false)

    const clearForm = () => {
        setEstimateMax(0)
        setEstimateMin(0)
        setReference({})
        setShowForm(false)
        setSelectedConcepts(null)
    }

    const onChangeEstimated = e => {
        let id = e.currentTarget.id
        let value = e.currentTarget.value
        let efective_moths = months - 3
        if(efective_moths < 3) {
            efective_moths = 1
        }
        switch(id){
            case "estimate-min":
                setEstimateAvg(((parseInt(estimateMax) + parseInt(value)) / 2) * efective_moths)
                setEstimateMin(value)
            break;
            case "estimate-max":
                setEstimateAvg(((parseInt(estimateMin) + parseInt(value)) / 2) * efective_moths)
                setEstimateMax(value)
            break;
        }
    }

    const getSumEstimated = (arreglo) => {
        let sum = 0
        if(!arreglo){
            return 0
        }
        arreglo.forEach(concept => {
            sum += concept.estimate.avg
        })
        return sum
    }
    

    useEffect(()=>{
        if((catalogueId == undefined) && (catalogue != undefined) ){
            setCatalogueId(catalogue)
            //console.log(catalogue)
        }
    }, [catalogue])

    useEffect(()=>{
        if((financeData.months != undefined)){
            setMonths(financeData.months)
            //console.log(catalogue)
        }
    }, [financeData])
    return (
        <>
        <Row><Col><h5>Conceptos {"("+type+")"}</h5></Col></Row>
        {
            type != "" ?
            <Row style={{marginBottom:"1rem"}}>
                <Col>
                    <CatalogueCollSelector type={type} catalogue={catalogueId} onChange={ e =>{
                        let value = e.currentTarget.value
                        let object = {}
                        if(value != ""){
                            object = JSON.parse(value)
                        }
                        
                        setReference(object)
                        setShowForm(true)
                        e.currentTarget.value = ""
                        //onChange(object)
                    }} />
                </Col>
            </Row>
            : <></>
        }
        
        {
            showForm ? 
            <Row style={{marginBottom:"1rem"}}>
                <Col>
                    <Card>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <FormGroupPlainText
                                        id={"service"}
                                        label={"Servicio"}
                                        value={reference.descripcion}
                                    />
                                </Col>
                                <Col>
                                    <FormGroupPlainText
                                        id={"type"}
                                        label={"Tipo"}
                                        value={reference.caracteristica1}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroupPlainText
                                        id={"range"}
                                        label={"Rango"}
                                        value={reference.rango?.minimo + " - " + reference.rango?.maximo}
                                    />
                                </Col>
                                <Col>
                                    <FormGroupPlainText
                                        id={"price-reference"}
                                        label={"Precio referencia"}
                                        value={reference.precioReferencia}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroupText
                                        id={"estimate-min"}
                                        label={"Estimado minimo"}
                                        value={estimateMin}
                                        onChange={onChangeEstimated}
                                    />
                                </Col>
                                <Col>
                                <FormGroupText
                                        id={"estimate-max"}
                                        label={"Estimado maximo"}
                                        value={estimateMax}
                                        onChange={onChangeEstimated}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FormGroupNavButton 
                                        backLabel={"Cancelar"}
                                        nextLabel={"Guardar"}
                                        onBackClick={()=>{
                                            clearForm()
                                        }}
                                        onNextClick={()=>{
                                            let data = {
                                                _id: reference._id,
                                                service: reference.descripcion,
                                                type: reference.caracteristica1,
                                                range: {
                                                    min: reference.rango?.minimo,
                                                    max: reference.rango?.maximo
                                                },
                                                estimate: {
                                                    min: estimateMin,
                                                    max: estimateMax,
                                                    avg: estimateAvg
                                                },
                                                referencePrice: reference.precioReferencia,
                                            }
                                            if(!selectedConcept){
                                                concepts.push(data)
                                            }else{
                                                concepts[selectedConcept] = data
                                            }
                                            
                                            let estiamted = getSumEstimated(concepts)
                                            setConcepts(concepts)
                                            
                                            onChange({
                                                concepts: concepts,
                                                estimated: estiamted
                                            })
                                            clearForm()
                                        }}
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            :<></>
        }
        {
            concepts.length > 0 ? 
            <Row style={{marginBottom:"1rem"}}>
                <Col>
                    <Card>
                        <Card.Header>Conceptos</Card.Header>
                        <Card.Body style={{overflowX:"scroll"}}>
                            <table className='components-table'>
                                <thead>
                                    <tr>
                                        <th style={{minWidth: "300px"}} rowSpan="2">Servicio</th>
                                        <th rowSpan="2">Tipo</th>
                                        <th colSpan="2">Rango</th>
                                        <th colSpan="3">Estimado</th>
                                        <th rowSpan="2">Precio referencia</th>
                                        <th rowSpan="2" colSpan="2"></th>
                                    </tr>
                                    <tr>
                                        <th>Minimo</th>
                                        <th>Maximo</th>
                                        <th>Minimo</th>
                                        <th>Maximo</th>
                                        <th>Promedio</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    concepts.map((item, index) => {
                                        return <tr key={index} id={index}>
                                            <td>{item.service}</td>
                                            <td>{item.type}</td>
                                            <td>{item.range.min}</td>
                                            <td>{item.range.max}</td>
                                            <td>{item.estimate.min}</td>
                                            <td>{item.estimate.max}</td>
                                            <td>{item.estimate.avg}</td>
                                            <td>{item.referencePrice}</td>
                                            <td>
                                                <Button
                                                    variant='outline-dark'
                                                    onClick={e => {
                                                        let value = e.currentTarget.parentNode.parentNode.id
                                                        let concept = concepts[value]
                                                        let ref = {
                                                            _id: concept._id,
                                                            descripcion: concept.service,
                                                            caracteristica1: concept.type,
                                                            rango: {
                                                                minimo: concept.range.min,
                                                                maximo: concept.range.max
                                                            },
                                                            precioReferencia: concept.referencePrice
                                                        }
                                                        setSelectedConcepts(value)
                                                        setReference(ref)
                                                        setEstimateMin(concept.estimate.min)
                                                        setEstimateMax(concept.estimate.max)
                                                        setShowForm(true)
                                                        
                                                    }}
                                                >
                                                    <PencilFill/>
                                                </Button>
                                            </td>
                                            <td>
                                                <Button 
                                                    variant='outline-danger' 
                                                    onClick={e => {
                                                        let value = e.currentTarget.parentNode.parentNode.id
                                                        let newArr = concepts.filter((item, index) => index != value)
                                                        let estiamted = getSumEstimated(newArr)
                                                        setConcepts(newArr)
                                                        onChange({
                                                            concepts: newArr,
                                                            estimated: estiamted
                                                        })
                                                    }}
                                                >
                                                    <Trash/>
                                                </Button>
                                            </td>
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
        </>
    )
}

export default SetsAddFormConcepts