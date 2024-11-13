import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, Col, Row, Button } from 'react-bootstrap'
import { Calculator, Journals, People } from 'react-bootstrap-icons'

const itemStyle = {
    display:"inline-block", 
    border:"1px solid lightgray",
    margin: "0.5rem",
    padding: "1rem 1rem",
    minHeight: "150px"
}

function ItemComponent ({text, url, onClick, children}) {
    return <>
    <div style={{display:"grid"}}>
        <div style={itemStyle}>
            <div className='d-flex justify-content-center align-items-center'>
                {children}
            </div><br/>
            <div className='d-flex justify-content-center align-items-center'>
                
                <Button variant='success' onClick={()=>{
                    onClick(url)
                }}>{text}</Button>
            </div>
        </div>
    </div>
    </>
}

function Home() {
    const navigate = useNavigate()
    const onClick = url=>{
        navigate(url)
    }
    return (
        <>
        <Row>
            <Col style={{marginBottom:"1rem"}}>
                <Card>
                    <Card.Header>
                        <h2>Proyectos</h2>
                    </Card.Header>
                    <Card.Body>
                        <ItemComponent
                            text={"Administrar proyectos"}
                            url={"/projects"}
                            onClick={onClick}
                        >
                            <Calculator style={{fontSize:"60px"}}/>
                        </ItemComponent>
                    </Card.Body>
                </Card>
            </Col>
            <Col style={{marginBottom:"1rem"}}>
                <Card>
                    <Card.Header>
                        <h2>Catalogos</h2>
                    </Card.Header>
                    <Card.Body>
                        <ItemComponent
                            text={"Administrar catalogos"}
                            url={"/catalogues"}
                            onClick={onClick}
                        >
                            <Journals style={{fontSize:"60px"}}/>
                        </ItemComponent>
                    </Card.Body>
                </Card>
            </Col>
            <Col style={{marginBottom:"1rem"}}>
                <Card>
                    <Card.Header>
                        <h2>Usuarios</h2>
                    </Card.Header>
                    <Card.Body>
                        <ItemComponent
                            text={"Administrar Usuarios"}
                            url={"/users"}
                            onClick={onClick}
                        >
                            <People style={{fontSize:"60px"}}/>
                        </ItemComponent>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
        </>
    )
}

export default Home