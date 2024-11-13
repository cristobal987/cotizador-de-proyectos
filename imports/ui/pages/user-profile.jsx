import React, { useContext } from 'react'
import { Button, Card, Row, Col } from 'react-bootstrap';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';

function UserProfile() {
    const userData = useLoaderData();
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const onClickEdit  = function(){
        navigate("/users/edit/"+userData._id)
    }
    const onClickClose = function(){
        auth.signout((error)=>{
            if(!error){
                navigate('/login')
            }else{
                console.log(error)
            }
        })
    }
    return (
    <div className='small-container'>
        <Card>
            <Card.Header>
                <h2>Perfil</h2>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <label>Nombres: </label>
                        <p>{userData?.profile?.name}</p>
                    </Col>
                    <Col>
                        <label>Apellidos: </label>
                        <p>{userData?.profile?.lastname}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Correo: </label>
                        <p>{userData?.emails[0].address}</p>
                    </Col>
                    <Col>
                    <label>Username: </label>
                        <p>{userData?.username}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <label>Roles: </label>
                        <p>{userData?.assignRoles.toString()}</p>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='d-flex justify-content-center'>
                            <Button variant='secondary' style={{margin: "1rem 2rem"}} onClick={onClickEdit}>Editar</Button>
                            <Button type='submit' variant='danger' style={{margin: "1rem 2rem"}} onClick={onClickClose}>Cerrar sesión</Button>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </div>
  )
}

export default UserProfile