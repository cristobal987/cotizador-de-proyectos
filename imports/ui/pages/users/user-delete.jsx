import React, { useState } from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import { useLoaderData, useNavigate } from 'react-router-dom';
import AlertModal from '../../components/AlertModal';

function UserDelete() {
    const navigate = useNavigate()
    const userData = useLoaderData()
    const [user, setUser] = useState(userData?.username)
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [isError, setIsError] = useState(false)

    const onClickCancel = e => navigate("/users")


    function onSubmit(e){
        e.preventDefault()
        Meteor.call('DeleteUser', userData._id, error => {
            if(error){
                setIsError(true)
                showAlertModal(error)
                return;
            }
            setIsError(false)
            showAlertModal("Usuario eliminado")
        })
    }

    function showAlertModal(message){
        setMessage(message);
        setShowAlert(true);
    }

    function handleCloseAlert(){
        setShowAlert(false)
        if(!isError){
            navigate("/users")
        }
    }

    return (
    <div className='small-container'>
        <Card>
            <Card.Header>
                <h2>Eliminar usuario</h2>
            </Card.Header>
            <Card.Body>
                <Form>
                    <Row>
                        <Col style={{textAlign: "center"}}>
                        ¿Esta seguro que quiere eliminar el usuario '{user}'?
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='d-flex justify-content-center'>
                                <Button variant='secondary' style={{margin: "1rem 2rem"}} onClick={onClickCancel}>Cancelar</Button>
                                <Button type='submit' variant='danger' style={{margin: "1rem 2rem"}} onClick={onSubmit}>Eliminar</Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
                {
                    showAlert ? 
                    <AlertModal 
                    message={message} 
                    show={showAlert} 
                    handleClose={handleCloseAlert} 
                    />
                    : ""
                }
            </Card.Body>
        </Card>
    </div>
    )
}

export default UserDelete