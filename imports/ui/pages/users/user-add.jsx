import React, { useState } from 'react'
import { Button, Card, Row, Col, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import $ from "jquery"
import AlertModal from '../../components/AlertModal';
import ConfirmModal from '../../components/ConfirmModal';
import { ValidateEmail, ValidatePassword } from '../../../lib/utils';
import FormGroupText from '../../components/customFormComponent/FormGroupText';

function UserAdd() {
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [message, setMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false); 
    const [showConfirm, setShowConfirm] = useState(false);

    const onNameChange = e => setName(e.currentTarget.value);
    const onLastNameChange = e => setLastName(e.currentTarget.value);
    const onUserChange = e => setUser(e.currentTarget.value);
    const onEmailChange = e => setEmail(e.currentTarget.value);
    const onPasswordChange = e => setPassword(e.currentTarget.value);
    const onPasswordConfirm = e => setPasswordConfirm(e.currentTarget.value);

    const onClickCancel = e => navigate("/users")

    const onSubmit = e => {
        e.preventDefault()

        // validar user
        if(!name){
            showAlertModal("Campo 'Nombres' es requerido")
            $("#name").trigger('focus')
            return;
        }

        if(name.search(/[A-Za-z]/)){
            showAlertModal("Campo 'Nombres' solo puede contener letras")
            $("#name").trigger('focus')
            return;
        }

        //validar apellidos
        if(!lastName){
            showAlertModal("Campo 'Apellidos' es requerido")
            $("#lastname").trigger('focus')
            return;
        }

        if(lastName.search(/[A-Za-z]/)){
            showAlertModal("Campo 'Apellidos' solo puede contener letras")
            $("#lastname").trigger('focus')
            return;
        }

        //validar usuario
        if(!user){
            showAlertModal("Campo 'Nombre de usuario' es requerido")
            $("#user").trigger('focus')
            return;
        }

        //validar correo
        if(!email){
            showAlertModal("Campo 'Correo electrónico' es requerido")
            $("#email").trigger('focus')
            return;
        }

        
        if(ValidateEmail(email)){
            showAlertModal("Campo 'correo electronico' no es un correo electronico valido")
            $("#email").trigger('focus')
            return;
        }

        //validar contraseña
        if(!password){
            showAlertModal("Campo 'Contraseña' es requerido")
            $("#password").trigger('focus')
            return;
        }

        let passwordValidation = ValidatePassword(password)
        if(!passwordValidation.valid){
            showAlertModal(passwordValidation.msn)
            $("#password").trigger('focus')
            return;
        }

        if(!passwordConfirm){
            showAlertModal("Campo 'Repetir contraseña' es requerido")
            $("#password-confirm").trigger('focus')
            return;
        }

        if(password != passwordConfirm){
            showAlertModal("Las contraseñas no son iguales")
            $("#password").trigger('focus')
            return;
        }

        showConfirmModal("Desea guardar los cambios")
    }

    function onCreatedUser (error, res) {
        if(error){
            console.log(error, res)
            showAlertModal(error.reason)
            return;
        }
        
        navigate("/users")
        return;
    }

    function showAlertModal(message){
        setMessage(message);
        setShowAlert(true);
    }

    function showConfirmModal(message){
        setMessage(message);
        setShowConfirm(true);
    }

    function acceptSaveUser(){
        setShowConfirm(false);
        const userData = {
            username: user,
            email: email,
            password: password,
            profile: {
              name: name,
              lastname: lastName
            }
        }
        
        Meteor.call('CreateUser', userData, onCreatedUser)
    }

    return (
    <Card>
        <Card.Header>
            <h2>Agregar usuario</h2>
        </Card.Header>
        <Card.Body>
            <Form>
                <Row>
                    <Col>
                        <FormGroupText id={'name'} label={"Nombres: "} type={'text'} onChange={onNameChange}/>
                    </Col>
                    <Col>
                        <FormGroupText id={'lastname'} label={"Apellidos: "} type={'text'} onChange={onLastNameChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroupText id={'user'} label={"Nombre de usuario: "} type={'text'} onChange={onUserChange}/>
                    </Col>
                    <Col>
                        <FormGroupText id={'email'} label={"Correo electrónico: "} dataType={"email"} type={'email'} onChange={onEmailChange}/>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <FormGroupText id={'password'} label={"Contraseña: "} type={'password'} onChange={onPasswordChange}/>
                    </Col>
                    <Col>
                        <FormGroupText id={'password-confirm'} label={"Repetir contraseña: "} type={'password'} onChange={onPasswordConfirm}/>
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
                onAccept={()=> acceptSaveUser()}
                />
                : ""
            }
        </Card.Body>
    </Card>
  )
}

export default UserAdd