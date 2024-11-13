import React, { useState } from 'react'
import { Button, Card, Row, Col, Form } from 'react-bootstrap'
import { useLoaderData, useNavigate } from 'react-router-dom';
import CataloguesItems from './catalogues-items';
import FormGroupPlainText from '../../components/customFormComponent/FormGroupPlainText';

function CataloguesOverview() {
    const navigate = useNavigate()
    
    const catalogueData = useLoaderData()

    const [alias, setAlias] = useState(catalogueData.alias)
    const [type, setType] = useState(catalogueData.type)
    const [cataloguesList, setCataloguesList] = useState(catalogueData.list)

    const onClickCancel = e => navigate("/catalogues")

    return (
    <Card>
        <Card.Header>
            <h2>Catalogo</h2>
        </Card.Header>
        <Card.Body>
            <Form>
                <Row>
                    <Col>
                        <FormGroupPlainText id={'alias'} label={"Tipo: "} value={alias}/>
                    </Col>
                    <Col>
                        <FormGroupPlainText id={'type'} label={"Alias: "} value={type}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <CataloguesItems items={cataloguesList} type={type}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-center'>
                            <Button variant='secondary' style={{margin: "1rem 2rem"}} onClick={onClickCancel}>Regresar</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
        </Card.Body>
    </Card>
    )
}

export default CataloguesOverview