import React, { useState } from 'react'
import { Modal, Row, Col, Tab, Tabs } from 'react-bootstrap'
import FormGroupText from '../../customFormComponent/FormGroupText'
import FormGroupNavButton from '../../customFormComponent/FormGroupNavButton'
import SetsAddFormReference from './sets-add-form-reference'
import SetAddFormComponents from './set-add-form-components'
import SetAddFormAccesories from './set-add-form-accesories'
import SetAddFormAditionalSoftware from './set-add-form-aditional-software'
import SetAddFormCosts from './set-add-form-costs'

function SetsAddForm({financeData, catalogue, show, onCancel, onSubmit}) {
    const [activeKey, setActiveKey] = useState(1)
    const [nextButtonText, setNextButtonText] = useState("Siguiente")
    const [backButtonText, setBackButtonText] = useState("Cancelar")

    const [components, setComponents] = useState({})
    const [accesories, setAccesories] = useState({})
    const [aditionalSoftware, setAditionalSoftware] = useState({})
    const [reference, setReference ] = useState({})
    const [quantitiesLocal, setQuantitesLocal] = useState(0)
    const [quantitiesNational, setQuantitesNational] = useState(0)
    const [quantitiesStock, setQuantitesStock] = useState(0)
    const [finance, setFinanace] = useState(financeData)
    const [costs, setCosts] = useState(undefined)

    const onNextClick = () => {
        if(!validateTabs()){
            return;
        }

        if(activeKey < 6){
            setActiveKey(activeKey + 1)
            updateButtonText(activeKey + 1)
        }

        if(activeKey == 6) {
            const data = {
                components,
                accesories,
                aditionalSoftware,
                reference,
                quantitiesLocal:quantitiesLocal.toString(),
                quantitiesNational:quantitiesNational.toString(),
                quantitiesStock:quantitiesStock.toString(),
                costs,
                financeData: finance,
                catalogue
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
        if(position < 6){
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
        
        switch(id){
            case "quantities-local": 
                if(value == ""){
                    value = 0
                }
                setQuantitesLocal(value)
            break;
            case "quantities-national": 
                if(value == ""){
                    value = 0
                }
                setQuantitesNational(value)
            break;
            case "quantities-stock": 
                if(value == ""){
                    value = 0
                }
                setQuantitesStock(value)
            break;
            case "catalogue-data":
                if(value == ""){
                    seTreference({})
                    break;
                }
                setReference(JSON.parse(value))
            break;
        }
    }

    const cancelEvent = () => {
        onCancel()
        clearForm()
    }

    const clearForm = () => {
        setActiveKey(1)
        setNextButtonText("Siguiente")
        setBackButtonText("Cancelar")
        setReference({})
        setComponents({})
        setAccesories({})
        setAditionalSoftware({})
        setQuantitesLocal(0)
        setQuantitesNational(0)
    }

    const validateTabs = () => {
        let valid = true
        switch(activeKey){
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
        }
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
                    <Tab eventKey={1} title={"Referencia"}>
                        <div style={{padding:"1rem"}}>
                            <SetsAddFormReference catalogue={catalogue} onChange={ ref => setReference(ref)}/>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title={"Componentes"}>
                        <div style={{padding:"1rem"}}>
                            <SetAddFormComponents onChange={data => setComponents(data)} />
                        </div>
                    </Tab>
                    <Tab eventKey={3} title={"Accesorios"}>
                        <div style={{padding:"1rem"}}>
                            <SetAddFormAccesories onChange={data => setAccesories(data)}/>
                        </div>
                    </Tab>
                    <Tab eventKey={4} title={"Software adicional"}>
                        <div style={{padding:"1rem"}}>
                            <SetAddFormAditionalSoftware onChange={data => setAditionalSoftware(data)} />
                        </div>
                    </Tab>
                    <Tab eventKey={5} title={"Cantidades"}>
                        <div style={{padding:"1rem"}}>
                            <Row><h5>Cantidades</h5></Row>
                            <Row>
                                <Col><FormGroupText id={"quantities-local"} label={"Local:"} dataType={"number-integer"} value={quantitiesLocal} onChange={onChange}/></Col>
                                <Col><FormGroupText id={"quantities-national"} label={"Nacional:"} dataType={"number-integer"} value={quantitiesNational} onChange={onChange}/></Col>
                            </Row>
                            <Row>
                                <Col><FormGroupText id={"quantities-stock"} dataType={"number-integer"} label={"Stock:"} value={quantitiesStock} onChange={onChange}/></Col>
                                <Col></Col>
                            </Row>
                        </div>
                    </Tab>
                    <Tab eventKey={6} title={"Costos"}>
                        <div style={{padding:"1rem"}}>
                            <SetAddFormCosts 
                            financeData={financeData} 
                            reference={reference} 
                            components={components} 
                            accesories={accesories} 
                            aditionalSoftware={aditionalSoftware} 
                            quantitiesLocal={quantitiesLocal}
                            quantitiesNational={quantitiesNational}
                            quantitiesStock={quantitiesStock}
                            costsObject={costs} 
                            onUpdate={data => {
                                setFinanace(data.finanace)
                                setCosts(data.costs)
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