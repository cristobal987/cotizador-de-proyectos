import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import ProjectDataTab from './tab-project-data';
import ProjectSetsData from './tab-project-sets';
import ProjectFinanaceData from './tab-project-fianace-data';
import ProjectSumary from './tab-project-sumary';
import ConfirmModal from '../../components/ConfirmModal';
import ProjectFilesTab from './tab-project-files';
import ProjectSumaryMarcoImpresion from './projectsMarcoImpresion/project-sumary-marco-impresion';
import ProjectFinanaceDataMarcoImpresion from './projectsMarcoImpresion/tab-project-fianace-data-marco-impresion';

function ProjectsAdd() {
    const navigate = useNavigate()
    const [activeKey, setActiveKey] = useState(1)
    const [projectData, setProjectData] = useState({})
    const [financeData, setFinanaceData] = useState({})
    const [setsData, setSetsData] = useState([])
    const [files, setFiles] = useState([])
    const [sumary, setSumary] = useState({})
    const [showConfirmModal, setShowConfirmModal] = useState()

    const nextTab = ()=>{
        if(activeKey < 5){
            setActiveKey(activeKey + 1)
        }
    }

    const backTab = ()=>{
        if(activeKey > 1){
            setActiveKey(activeKey - 1)
        }
    }

    return (
    <Card>
        <Card.Header>
            <h2>Nueva cotización</h2>
        </Card.Header>
        <Card.Body>
            <Form className="tabs-form">
                <Tab.Container id="left-tabs" defaultActiveKey={1} activeKey={activeKey}>
                    <Row className='d-md-none'>
                        <Col style={{overflowX:"auto"}}>
                            <Nav variant="pills" className="tabs">
                                <Nav.Item>
                                    <Nav.Link eventKey={1}>Datos del Proyecto</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={2}>Datos de Financiamiento</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={3}>Agregar partidas</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={4}>Agregar archivos</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={5}>Resumen</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={3} lg={2} className='d-none d-md-block' >
                            <Nav variant="pills" className="tab-flex" >
                                <Nav.Item>
                                    <Nav.Link eventKey={1}>Datos del Proyecto</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={2}>Datos de Financiamiento</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={3}>Agregar partidas</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={4}>Agregar archivos</Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey={5}>Resumen</Nav.Link>
                                </Nav.Item>
                            </Nav>
                        </Col>
                        <Col sm={12} md={9} lg={10} className="tabs-content">
                            <Row>
                                <Col className='pe-4'>
                                <Tab.Content>
                                    <Tab.Pane eventKey={1}>
                                        <ProjectDataTab 
                                            dataCallback={ data => {
                                                if(data.valid){
                                                    setProjectData(data)
                                                    nextTab()
                                                }
                                            }}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={2}>
                                        {
                                            projectData.type == "computo" ?
                                            <ProjectFinanaceData 
                                            dataCallback={ data => {
                                                if(data.valid){
                                                    setFinanaceData(data)
                                                    nextTab()
                                                }
                                            }}
                                            BackClick={()=>{
                                                backTab()
                                            }}
                                            />
                                            :
                                            <ProjectFinanaceDataMarcoImpresion 
                                            dataCallback={ data => {
                                                if(data.valid){
                                                    setFinanaceData(data)
                                                    nextTab()
                                                }
                                            }}
                                            BackClick={()=>{
                                                backTab()
                                            }}
                                            />
                                        }
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={3}>
                                        <ProjectSetsData 
                                            type={projectData.type}
                                            catalogue={projectData.catalogue}
                                            financeData={financeData}
                                            dataCallback={ data => {
                                                if(data.valid){
                                                    setSetsData(data.sets)
                                                    nextTab()
                                                }
                                            }}
                                            BackClick={()=>{
                                                backTab()
                                            }}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={4}>
                                        <ProjectFilesTab 
                                            dataCallback={ data => {
                                                setFiles(data)
                                                nextTab()
                                            }}
                                            BackClick={()=>{
                                                backTab()
                                            }}
                                        />
                                    </Tab.Pane>
                                    <Tab.Pane eventKey={5}>
                                        {
                                            projectData.type == "computo"?
                                                <ProjectSumary
                                                projectData={projectData}
                                                financeData={financeData}
                                                setsData={setsData}
                                                files={files}
                                                dataCallback={ data => {
                                                    setSumary(data)
                                                    setShowConfirmModal(true)
                                                }}
                                                BackClick={()=>{
                                                    backTab()
                                                }}
                                            />:
                                            <ProjectSumaryMarcoImpresion 
                                                projectData={projectData}
                                                financeData={financeData}
                                                setsData={setsData}
                                                filesData={files}
                                                dataCallback={ data => {
                                                    setSumary(data)
                                                    setShowConfirmModal(true)
                                                }}
                                                BackClick={()=>{
                                                    backTab()
                                                }}
                                            />
                                        }
                                    </Tab.Pane>
                                </Tab.Content>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Tab.Container>
            </Form>
            {
                showConfirmModal ? 
                <ConfirmModal
                    message={"¿Esta seguro de guardar los datos?"}
                    show={showConfirmModal}
                    handleClose={()=>{
                        setShowConfirmModal(false)
                    }}
                    onAccept={()=>{
                        setShowConfirmModal(false)
                        let data = {
                            projectData,
                            financeData,
                            setsData,
                            files,
                            sumary,
                        }
                        Meteor.call('insertProject', data, (error, result) => {
                            if(error){
                                console.log(error)
                                return;
                            }
                            navigate("/projects")
                            return;
                        })
                    }}
                />
                : <></>
            }
        </Card.Body>
    </Card>
    )
}

export default ProjectsAdd