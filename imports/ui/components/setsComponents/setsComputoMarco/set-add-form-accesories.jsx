import React from 'react'
import { Row, Col } from 'react-bootstrap'
import AccesoriesAdd from '../../AccesoriesAdd'

function SetAddFormAccesories({accesories, onChange}) {
  return (
    <>
    <Row><Col><h5>Accesorios</h5></Col></Row>
    <Row>
        <Col>
            <AccesoriesAdd data={accesories} label={"Agregar accesorio"} btnText={"Agregar accesorio"} typeAccesory={"hardware"} onAcceptCallback={onChange}/>
        </Col>
    </Row>
    </>
  )
}

export default SetAddFormAccesories