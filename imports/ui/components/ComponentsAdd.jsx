import React, { useState } from 'react'
import { Col, Row, Card, Button } from 'react-bootstrap'
import FormGroupButton from './customFormComponent/FormGroupButton'
import FormGroupText from './customFormComponent/FormGroupText'
import FormGroupNavButton from './customFormComponent/FormGroupNavButton'
import { Trash3, PencilFill } from 'react-bootstrap-icons'
import FormGroupPrice from './customFormComponent/FormGroupPrice'
import { formatPrice, parseFloatFixed } from '../../lib/utils'

function ComponentsAdd({componentsData, onAcceptCallback}) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [componentList, setComponentList] = useState(componentsData? componentsData.components : []);
    const [brand, setBrand] = useState("");
    const [model, setModel] = useState("");
    const [observations, setObservations] = useState("");
    const [price, setPrice] = useState("");
    const [properties, setProperties] = useState("");
    const [totalCost, setTotalCost] = useState(componentsData? componentsData.totalCost : 0);
    const [idSelected, setIdSelected] = useState();

    const onChange = e => {
        let id = e.currentTarget.id
        let value = e.currentTarget.value
        switch(id){
            case "brand": setBrand(value);break;
            case "model": setModel(value);break;
            //case "price": setPrice(value);break;
            case "properties": setProperties(value);break;
            case "observations": setObservations(value);break;
        }
    }

    const onChangePrice = data => {
        setPrice(data)
    }

    const onCancel = ()=> {
        setShowAddForm(false)
        clearFormData()
    }

    const onAccept = ()=>{
        const component = {
            brand,
            model,
            price,
            properties,
            observations
        }
        if(idSelected){
            componentList[idSelected] = component
        }else{
            componentList.push(component)
        }
        setShowAddForm(false)
        clearFormData()
        changeEvent(componentList)
    }

    const getTotalCost = (components)=>{
        let sum = 0;
        components.forEach(component => {
            let price = parseFloatFixed(component.price?.outputPrice)
            if(!price){
                price = 0
            }
            sum += price; 
        })
        return sum
    }

    const changeEvent = (newArray) => {
        const total_cost = getTotalCost(newArray)
        const data = {
            components: newArray,
            totalCost: total_cost
        }

        setComponentList([...newArray])
        setTotalCost(total_cost)

        onAcceptCallback(data)
    }

    const clearFormData = () => {
        setBrand("");
        setModel("");
        setPrice("");
        setProperties("");
        setObservations("")
        setIdSelected()
    }

    return (
    <div style={{padding: "1rem"}}>
    <Row style={{marginBottom:"0.5rem"}}>
        <Col>
            <FormGroupButton 
                id="component-add" 
                buttonText={"Agregar componente"}
                onClick={e => {
                    setShowAddForm(true)
                }}
            />
        </Col>
    </Row>
    {
        showAddForm ? 
        <Row style={{marginBottom:"0.5rem"}}>
            <Card>
                <Row style={{marginTop:"0.5rem"}}><Col><h6>Datos Componente</h6></Col></Row>
                <Row>
                    <Col>
                        <FormGroupText id={"brand"} type={"text"} value={brand} label={"Marca"} onChange={onChange}/>
                    </Col>
                    <Col>
                        <FormGroupText id={"model"} type={"text"} value={model} label={"Modelo"} onChange={onChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroupText id={"properties"} type={"text"} value={properties} label={"Caracteristicas"} onChange={onChange}/>
                    </Col>
                    <Col>
                        <FormGroupText id={"observations"} type={"text"} value={observations} label={"Observaciones"} onChange={onChange}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <FormGroupPrice id={"price"} label={"Precio"} value={price} onChange={onChangePrice}/>
                    </Col>
                    <Col></Col>
                </Row>
                <Row style={{marginBottom:"0.5rem"}}>
                    <Col style={{display:"flex", justifyContent:"space-evenly"}}>
                        <FormGroupNavButton
                            backLabel={"Cancelar"}
                            nextLabel={"Agregar"}
                            onBackClick={onCancel}
                            onNextClick={onAccept}
                        />
                    </Col>
                </Row>
            </Card>
        </Row>
        : <></>
    }
    {
        componentList.length > 0 ?
        <Row style={{marginBottom:"0.5rem"}}>
            <Col>
                <Card style={{padding:"0.5rem"}}>
                    <table className='components-table'>
                        <thead>
                            <tr>
                                <th rowSpan="2">Marca</th>
                                <th rowSpan="2">Modelo</th>
                                <th rowSpan="2">Caracteristicas</th>
                                <th rowSpan="2">Observaciones</th>
                                <th colSpan="4">Precio</th>
                                <th rowSpan="2"></th>
                            </tr>
                            <tr>
                                <th>Precio</th>
                                <th>Moneda</th>
                                <th>Tasa</th>
                                <th>Precio final</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            componentList.map( (component, index) => {
                                return <tr id={index} key={index}>
                                    <td>{component.brand}</td>
                                    <td>{component.model}</td>
                                    <td>{component.properties}</td>
                                    <td>{component.observations}</td>
                                    <td>{component.price.price}</td>
                                    <td>{component.price.currency}</td>
                                    <td>{component.price.exchange}</td>
                                    <td>{formatPrice(component.price?.outputPrice)}</td>
                                    <td>
                                        <Button variant='outline-dark'size="sm" onClick={e => {
                                            let id = e.currentTarget.parentElement.parentElement.id
                                            let data = componentList[id]
                                            setPrice(data.price)
                                            setBrand(data.brand);
                                            setModel(data.model);
                                            setProperties(data.properties);
                                            setIdSelected(id)
                                            setShowAddForm(true)
                                        }}>
                                            <PencilFill/>
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={e => {
                                            let id = e.currentTarget.parentElement.parentElement.id
                                            let newArray = componentList.filter((item, index)=>(index != id))
                                            changeEvent(newArray)
                                        }}>
                                            <Trash3/>
                                        </Button>
                                    </td>
                                </tr>
                            })
                        }
                        
                        </tbody>
                    </table>
                    <br/>
                    <span>Precio: {formatPrice(totalCost)}</span>
                </Card>
            </Col>
        </Row>
        : <></>
    }
    </div>
    )
}

export default ComponentsAdd