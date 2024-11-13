import React from 'react'
import { Row, Col } from 'react-bootstrap'
import AccesoriesAdd from '../../AccesoriesAdd'

function SetAddFormAditionalSoftware({aditionalSoftwareData, onChange}) {
  return (
    <>
    <Row><Col><h5>Software adicional</h5></Col></Row>
    <Row>
        <Col>
            <AccesoriesAdd data={aditionalSoftwareData} label={"Agregar software adicional"} btnText={"Agregar software adicional"} typeAccesory={"software"} onAcceptCallback={onChange}/>
        </Col>
    </Row>
    </>
  )
}

export default SetAddFormAditionalSoftware