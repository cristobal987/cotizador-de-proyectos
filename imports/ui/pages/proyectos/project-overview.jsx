import React, { useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useLoaderData, useNavigate } from 'react-router-dom';
import ProjectSumary from './tab-project-sumary';
import { CloudArrowDown } from 'react-bootstrap-icons';
import ExportDocument from '../../../lib/ExcelExporter';
import ProjectSumaryMarcoImpresion from './projectsMarcoImpresion/project-sumary-marco-impresion';

function ProjectOverview() {
    const project = useLoaderData()
    const navigate = useNavigate()

    const onClickCancel = ()=>{
        navigate("/projects/")
    }
    return (
        <>
        <Card>
            <Card.Header>
                <h2>Cotización</h2>
            </Card.Header>
            <Card.Body>
                {
                    project.projectData.type == "computo" ?
                        <ProjectSumary
                        projectData={project.projectData}
                        financeData={project.financeData}
                        setsData={project.setsData}
                        files={project.files}
                        hideNav={true}
                        />
                    :
                        <ProjectSumaryMarcoImpresion
                        projectData={project.projectData}
                        financeData={project.financeData}
                        setsData={project.setsData}
                        files={project.files}
                        hideNav={true}
                        />
                }
            <Row>
                <Col>
                    <div className='d-flex justify-content-start'>
                        <Button variant='secondary' style={{margin: "1rem 2rem"}} onClick={onClickCancel}>Regresar</Button>
                    </div>
                </Col>
                <Col style={{paddingTop:"1rem"}}>
                    <div className='d-flex justify-content-end'>
                        <Button variant='success' onClick={() => {
                            //console.log(project)
                            ExportDocument(project)
                        }}>Descargar Excel <CloudArrowDown/></Button>
                    </div>
                </Col>
            </Row>
            </Card.Body>
        </Card>
        </>
    )
}

export default ProjectOverview