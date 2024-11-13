import React, { useEffect, useState } from 'react'
import CatalogueCollSelector from '../../CatalogueCollSelector'
import { Row, Col, Card } from 'react-bootstrap'
function SetsAddFormReference({referenceData, catalogue, onChange}) {
    const [reference, setReference ] = useState(!referenceData ? {} : referenceData)
    const [catalogueId, setCatalogueId] = useState(catalogue)

    useEffect(()=>{
        if((catalogueId == undefined) && (catalogue != undefined) ){
            setCatalogueId(catalogue)
            console.log(catalogue)
        }
    }, [catalogue])
    return (
        <>
        <Row><Col><h5>Referencia</h5></Col></Row>
        <Row>
            <Col>
                <CatalogueCollSelector catalogue={catalogueId} onChange={ e =>{
                    let value = e.currentTarget.value
                    let object = {}
                    if(value != ""){
                        object = JSON.parse(value)
                    }
                    setReference(object)
                    onChange(object)
                }} />
            </Col>
        </Row>
        {
            reference.perfil? 
            <Row>
                <Col>
                    <Card>
                        <Card.Header>Seleccionado:</Card.Header>
                        <Card.Body>
                            <ul>
                                <li>Partida: {reference.partida}</li>
                                <li>Perfil: {reference.perfil}</li>
                                <li>Descripcion: {reference.descripcion}</li>
                                <li>Caracteristica: {reference.caracteristica1 + ", " + reference.caracteristica2}</li>
                                <li>Rango: {reference.rango.minimo + " - " + reference.rango.maximo}</li>
                                <li>Precio referencia: {reference.precioReferencia}</li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            :<></>
            }
        </>
    )
}

export default SetsAddFormReference