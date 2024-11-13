import React, { useEffect, useState } from 'react'
import { Modal, Row, Col, Tab, Tabs } from 'react-bootstrap'
import FormGroupText from '../../customFormComponent/FormGroupText'
import FormGroupNavButton from '../../customFormComponent/FormGroupNavButton'
import SetsAddFormReference from './sets-add-form-reference'
import SetAddFormComponents from './set-add-form-components'
import SetAddFormAccesories from './set-add-form-accesories'
import SetAddFormAditionalSoftware from './set-add-form-aditional-software'
import SetAddFormCosts from './set-add-form-costs'

function SetsEditForm({data, catalogue, show, onCancel, onSubmit}) {
    const [activeKey, setActiveKey] = useState(1)
    const [nextButtonText, setNextButtonText] = useState("Siguiente")
    const [backButtonText, setBackButtonText] = useState("Cancelar")

    const [components, setComponents] = useState(data?.components)
    const [accesories, setAccesories] = useState(data.accesories)
    const [aditionalSoftware, setAditionalSoftware] = useState(data.aditionalSoftware)
    const [reference, setReference ] = useState(data.reference)
    const [quantitiesLocal, setQuantitesLocal] = useState(data.quantitiesLocal)
    const [quantitiesNational, setQuantitesNational] = useState(data.quantitiesNational)
    const [quantitiesStock, setQuantitesStock] = useState(data.quantitiesStock)
    const [finance, setFinanace] = useState(data.financeData)
    const [costs, setCosts] = useState(data.costs)

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
            setNextButtonText("Editar")
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
        /*setReference({})
        setComponents({})
        setAccesories({})
        setAditionalSoftware({})
        setQuantitesLocal(0)
        setQuantitesNational(0)*/
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

    useEffect(()=>{
        if(data.reference){
            setReference(data.reference)
        }
        if(data.accesories){
            setAccesories(data.accesories)
        }
        if(data.aditionalSoftware){
            setAditionalSoftware(data.aditionalSoftware)
        }
        if(data.quantitiesLocal){
            //solucion a un bug muy raro
            setQuantitesLocal(data.quantitiesLocal)
            setQuantitesNational(data.quantitiesNational)
            setQuantitesStock(data.quantitiesStock)
        }
        if(data.quantitiesNational){
            //solucion a un bug muy raro
            setQuantitesLocal(data.quantitiesLocal)
            setQuantitesNational(data.quantitiesNational)
            setQuantitesStock(data.quantitiesStock)
        }

        if(data.finanace){
            setFinanace(data.finanace)
        }
        if(data.costs){
            setCosts(data.costs)
        }
    },[data])

    return (
        <>
        <Modal size={"lg"} show={show} onHide={cancelEvent}>
            <Modal.Header closeButton>
                <Modal.Title>Editar partida</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Tabs id="sets-tabs" defaultActiveKey={1} activeKey={activeKey}>
                    <Tab eventKey={1} title={"Referencia"}>
                        <div style={{padding:"1rem"}}>
                            <SetsAddFormReference referenceData={data.reference} catalogue={catalogue} onChange={ ref => setReference(ref)}/>
                        </div>
                    </Tab>
                    <Tab eventKey={2} title={"Componentes"}>
                        <div style={{padding:"1rem"}}>
                            <SetAddFormComponents componentsData={data.components} onChange={data => setComponents(data)} />
                        </div>
                    </Tab>
                    <Tab eventKey={3} title={"Accesorios"}>
                        <div style={{padding:"1rem"}}>
                            <SetAddFormAccesories accesories={data.accesories} onChange={data => setAccesories(data)}/>
                        </div>
                    </Tab>
                    <Tab eventKey={4} title={"Software adicional"}>
                        <div style={{padding:"1rem"}}>
                            <SetAddFormAditionalSoftware aditionalSoftwareData={data.aditionalSoftware} onChange={data => setAditionalSoftware(data)} />
                        </div>
                    </Tab>
                    <Tab eventKey={5} title={"Cantidades"}>
                        <div style={{padding:"1rem"}}>
                            <Row><h5>Cantidades</h5></Row>
                            <Row>
                                <Col><FormGroupText value={data.quantitiesLocal} id={"quantities-local"} dataType={"number-integer"} label={"Local:"} onChange={onChange}/></Col>
                                <Col><FormGroupText value={data.quantitiesNational} id={"quantities-national"} dataType={"number-integer"} label={"Nacional:"} onChange={onChange}/></Col>
                            </Row>
                            <Row>
                                <Col><FormGroupText value={data.quantitiesLocal} id={"quantities-stock"} dataType={"number-integer"} label={"Stock:"} onChange={onChange}/></Col>
                                <Col></Col>
                            </Row>
                        </div>
                    </Tab>
                    <Tab eventKey={6} title={"Costos"}>
                        <div style={{padding:"1rem"}}>
                            <SetAddFormCosts 
                            financeData={finance} 
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

export default SetsEditForm