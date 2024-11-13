import React, { useState } from 'react'
import { Button, Card, Row, Col, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import $ from "jquery"
import AlertModal from '../../components/AlertModal';
import ConfirmModal from '../../components/ConfirmModal';
import { ReadCatalogueFile } from '../../../lib/CatalogueObject';
import FormGroupText from '../../components/customFormComponent/FormGroupText';
import FormGroupSelect from '../../components/customFormComponent/FormGroupSelect';

function CataloguesAdd() {
    const navigate = useNavigate()
    const [message, setMessage] = useState("")
    const [showAlert, setShowAlert] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [alias, setAlias] = useState("")
    const [type, setType] = useState("")
    const [cataloguesList, setCataloguesList] = useState([])

    const onAliasChange = e => setAlias(e.currentTarget.value)
    const onTypeChange = e => setType(e.currentTarget.value)
    const onCatalogues = e => {
        if(!e.currentTarget.files[0]){
            return;
        }
        ReadCatalogueFile(e.currentTarget.files[0], (error, result) => {
            if(error){
                showAlertModal(error)
                return;
            }
            setCataloguesList(result)
        })
    }

    const onClickCancel = e => navigate("/catalogues")

    const onSubmit = e => {
        e.preventDefault()
        if(!alias.trim()){
            showAlertModal("El campo 'alias' es requerido")
            $("#alias").trigger("focus")
            return;
        }
        if(!type.trim()){
            showAlertModal("El campo 'tipo' es requerido")
            $("#type").trigger("focus")
            return;
        }
        if(cataloguesList.length == 0){
            showAlertModal("Inserte un calatogo valido")
            $("#catalogues").trigger("focus")
            return;
        }

        showConfirmModal("¿Desea guardar los cambios?")
    }

    const acceptSaveCatalogue = ()=>{
        const catalogue = {
            alias: alias,
            type: type,
            list: cataloguesList
        }
        Meteor.call('InsertCatalogue', catalogue, function(error){
            if(error){
                console.log(error)
                return;
            }
            navigate('/catalogues')
        })
    }

    function showAlertModal(message){
        setMessage(message);
        setShowAlert(true);
    }

    function showConfirmModal(message){
        setMessage(message);
        setShowConfirm(true);
    }

    function iterator(item, index){
        return <option key={index} value={item}>{item.charAt(0).toUpperCase()+item.slice(1)}</option>
    }

    return (
    <Card>
        <Card.Header>
            <h2>Agregar catalogo</h2>
        </Card.Header>
        <Card.Body>
            <Form>
                <Row>
                    <Col>
                        <FormGroupText 
                            id={'alias'}
                            label={'Alias: '}
                            type={'text'}
                            onChange={onAliasChange}
                            value={alias}
                        />
                    </Col>
                    <Col>
                        <FormGroupSelect
                            id={'type'}
                            label={'Tipo: '}
                            onChange={onTypeChange}
                            value={type}
                            data={["computo", "impresion"]}
                            iteratorFunc={iterator}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col>
                    <Form.Group controlId='catalogues' className='mb-3'>
                        <Form.Label>Archivo EXCEL:</Form.Label>
                        <Form.Control type='file' accept='.xls,.xlsx' onChange={onCatalogues}/>
                    </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <span>Descargar formato <a download={"formato-catalogo.xlsx"} href={"/formato-catalogo.xlsx"}>aqui</a></span>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-center'>
                            <Button variant='secondary' style={{margin: "1rem 2rem"}} onClick={onClickCancel}>Cancelar</Button>
                            <Button type='submit' variant='primary' style={{margin: "1rem 2rem"}} onClick={onSubmit}>Guardar</Button>
                        </div>
                    </Col>
                </Row>
            </Form>
            {
                showAlert ? 
                <AlertModal 
                message={message} 
                show={showAlert} 
                handleClose={()=> setShowAlert(false)} 
                />
                : ""
            }
            {
                showConfirm ?
                <ConfirmModal 
                message={message} 
                show={showConfirm} 
                handleClose={()=> setShowConfirm(false)} 
                onAccept={()=> acceptSaveCatalogue()}
                />
                : ""
            }
        </Card.Body>
    </Card>
    )
}

export default CataloguesAdd