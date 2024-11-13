import React, { useState } from 'react'
import { Modal, Row, Col, Tab, Tabs } from 'react-bootstrap'
import FormGroupText from '../../customFormComponent/FormGroupText'
import FormGroupNavButton from '../../customFormComponent/FormGroupNavButton'
import SetsAddFormConcepts from './sets-add-form-concepts'
import SetsAddFormProfile from './sets-add-form-profile'
import SetAddFormCosts from './set-add-form-costs'

//formulario para agregar partidas de proyectos de impresion (marco)
function SetsAddForm({financeData, type, catalogue, show, onCancel, onSubmit}) {
    const [activeKey, setActiveKey] = useState(1)
    const [nextButtonText, setNextButtonText] = useState("Siguiente")
    const [backButtonText, setBackButtonText] = useState("Cancelar")

    const [concepts, setConcepts ] = useState({})
    const [profiles, setProfiles ] = useState([])
    const [finance, setFinanace] = useState(financeData)
    const [costs, setCosts] = useState({})

    const onNextClick = () => {
        if(!validateTabs()){
            return;
        }

        if(activeKey < 3){
            setActiveKey(activeKey + 1)
            updateButtonText(activeKey + 1)
        }

        if(activeKey == 3) {
            const data = {
                concepts,
                profiles,
                costs,
                type
            }
            onSubmit(data)
            clearForm()
        }

    }

    const onBackClick = () => {
        if(activeKey > 1){
            setActiveKey(activeKey - 1)
            updateButtonText(activeKey - 1)
        }

        if(activeKey == 1) {
            cancelEvent()
        }
    }

    const updateButtonText = (position)=> {
        if(position < 3){
            setNextButtonText("Siguiente")
        }else{
            setNextButtonText("Guardar")
        }

        if(position > 1){
            setBackButtonText("Regresar")
        }else{
            setBackButtonText("Cancelar")
        }

    }

    const onChange = e => {
        let id = e.currentTarget.id
        let value = e.currentTarget.value
        
        
    }

    const cancelEvent = () => {
        onCancel()
        clearForm()
    }

    const clearForm = () => {
        setActiveKey(1)
        setNextButtonText("Siguiente")
        setBackButtonText("Cancelar")
        setConcepts({})
        setProfiles([])
        setFinanace(financeData)
        setCosts({})
    }

    const validateTabs = () => {
        let valid = true
        /*switch(activeKey){
            case 1: 
                if(!reference.partida){
                    alert("no se ha seleccionado una referencia")
                    valid &= false
                }
            break;
            case 2:
                if( !(components.components?.length > 0) ){
                    alert("no se ha seleccionado un componente")
                    valid &= false
                    break;
                }
                if((components.totalCost == undefined) || (components.totalCost == 0)){
                    alert("la suma de los precios es 0")
                    valid &= false
                    break;
                }
            break;
            case 5:
                if((quantitiesLocal + quantitiesNational) == 0){
                    alert("la suma de las cantidades es 0")
                    valid &= false
                    break;
                }
            break;
        }*/
        return valid
    }

    return (
        <>
        <Modal size={"lg"} show={show} onHide={cancelEvent}>
            <Modal.Header closeButton>
                <Modal.Title>Agregar partida</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs id="sets-tabs" defaultActiveKey={1} activeKey={activeKey}>
                    <Tab eventKey={1} title={"Conceptos"}>
                        <div style={{padding:"1rem"}}>
                            <SetsAddFormConcepts 
                            financeData={financeData}
                            typeConcept={type} 
                            catalogue={catalogue} 
                            onChange={ conceptsData => {
                                setConcepts(conceptsData)
                            }}/>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title={"Perfiles"}>
                        <div style={{padding:"1rem"}}>
                            <SetsAddFormProfile
                                type={type}
                                onChange={data => {
                                    setProfiles(data)
                                }}
                            />
                        </div>
                    </Tab>
                    <Tab eventKey={3} title={"Costos"}>
                        <div style={{padding:"1rem"}}>
                            <SetAddFormCosts 
                            typeConcept={type}
                            financeData={financeData}
                            conceptsData={concepts}
                            profilesData={profiles}
                            onUpdate={data => {
                                setCosts(data)
                            }}
                            /> 
                        </div>
                    </Tab>
                </Tabs>
            </Modal.Body>
            <Modal.Footer style={{justifyContent: "center"}}>
                <Row>
                    <Col className='customNavButtons'>
                        <FormGroupNavButton 
                            backLabel={backButtonText}
                            nextLabel={nextButtonText}
                            onBackClick={onBackClick}
                            onNextClick={onNextClick}
                        />
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
        </>
    )
}

export default SetsAddForm