import React, { useState, useRef, useEffect } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import FormGroupNavButton from '../../components/customFormComponent/FormGroupNavButton'
import { FileMinus } from 'react-bootstrap-icons'
import FormGroupButton from '../../components/customFormComponent/FormGroupButton'

function ProjectFilesTab({filesData, BackClick, dataCallback}) {
    const [files, setFiles] = useState(filesData? filesData : [])
    const [showFiles, setShowFiles] = useState(filesData?.length > 0? true : false)
    const fileRef = useRef(null)
    
    const onNextClick = ()=> {
        dataCallback(files)
    }
    
    const onBackClick = ()=>{
        if(BackClick){
            BackClick()
        }
    }

    const onChangeAddButton = e => {
        if(!fileRef.current){
            alert("No hay un archivo seleccionado")
            return;
        }
        
        const file = fileRef.current.files[0];
        if(!file){
            alert("No hay un archivo seleccionado")
            return;
        }

        if(existFile(file?.name)){
            alert("El archivo ya existe en la lista")
            return;
        }

        const fileStrArr = file.name.split('.')
        const name = fileStrArr[0]
        const extension = fileStrArr[1]
        const reader = new FileReader();
        reader.onloadend = () => {
            let filesArr = files
            let data = {
                name: name,
                extension: extension,
                data: reader.result
            }
            filesArr.push(data)
            setFiles([...filesArr])
            setShowFiles(true)
            fileRef.current.value = null
        };
        reader.readAsDataURL(file);
    }

    const deleteFile = e => {
        let id = e.currentTarget.id
        let filesArr = files.filter((item,index)=> index != id)
        setFiles(filesArr)
        if(filesArr.length == 0){
            setShowFiles(false)
        }
    }

    const existFile = name => {
        let file = files.filter(item => (item.name + "." + item.extension) == name)
        return file.length > 0
    }

    const tableStyle = {
        overflowWrap: "anywhere",
        width:"100%"
    }
    
    return (
        <>
        <Row>
            <Col style={{paddingTop:"1rem"}}>
                <Row style={{padding:"0.5rem"}}>
                    <Col>
                        <Form.Group controlId='project-files' className='mb-3'>
                            <Form.Label>Agregar archivos</Form.Label>
                            <Form.Control type='file' accept='.pdf, .xlsx, .docx' ref={fileRef}/>
                        </Form.Group>
                        <FormGroupButton
                            buttonText={"Agregar archivo"}
                            onClick={onChangeAddButton}
                        />
                    </Col>
                </Row>
                <Row style={{padding:"0.5rem"}}>
                    <Col>
                    {
                        showFiles ?
                        <Card style={{padding:"0.5rem"}}>
                            <table style={tableStyle} className='components-table'>
                                <thead>
                                    <tr>
                                        <th>Archivos</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        files.map( (item, index) => {
                                            return <tr key={index} id={index}>
                                                <td style={{padding:"0.5rem"}}>{item.name + "." + item.extension}</td>
                                                <td style={{padding:"0.5rem"}}>
                                                    <Button 
                                                    id={index}
                                                    size='sm' 
                                                    variant='outline-danger'
                                                    onClick={deleteFile}
                                                    >
                                                        <FileMinus/>
                                                    </Button>
                                                </td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </Card>
                        : <></>
                    }
                    </Col>
                </Row>
            </Col>
        </Row>
        <Row>
            <Col className = "mt-2 d-flex justify-content-between">
                <FormGroupNavButton 
                    backLabel = { "Regresar" } 
                    nextLabel = { "Siguiente" }
                    onBackClick = { onBackClick }
                    onNextClick = { onNextClick }
                />
            </Col>
        </Row>
        </>
    )
}

export default ProjectFilesTab