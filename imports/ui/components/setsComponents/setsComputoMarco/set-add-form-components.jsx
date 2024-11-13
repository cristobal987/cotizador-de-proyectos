import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ComponentsAdd from '../../ComponentsAdd'

function SetAddFormComponents({componentsData, onChange}) {
  return (
    <>
    <Row><Col><h5>Componentes</h5></Col></Row>
    <Row>
        <Col>
            <ComponentsAdd componentsData={componentsData} onAcceptCallback={onChange}/>
        </Col>
    </Row>
    </>
  )
}

export default SetAddFormComponents