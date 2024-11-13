import React, { useState } from 'react'
import { Col, Row, Card, FormGroup, FormSelect, Button } from 'react-bootstrap'
import FormGroupButton from './customFormComponent/FormGroupButton'
import FormGroupText from './customFormComponent/FormGroupText'
import FormGroupNavButton from './customFormComponent/FormGroupNavButton'
import { PencilFill, Trash3 } from 'react-bootstrap-icons'
import FormGroupPrice from './customFormComponent/FormGroupPrice'
import { formatPrice, parseFloatFixed } from '../../lib/utils'

function AccesoriesAdd({data, label, btnText, typeAccesory, onAcceptCallback}) {
    const [showAddForm, setShowAddForm] = useState(false);
    const [accesoriesList, setAccesoriesList] = useState(data?.accesory ? data.accesory : []);
    const [description, setDescription] = useState("");
    const [type, setType] = useState(typeAccesory);
    const [price, setPrice] = useState(0);
    const [totalCost, setTotalCost] = useState(data?.totalCost ? data.totalCost : 0)
    const [idSelected, setIdSelected] = useState()
    

    const onChange = e => {
        let id = e.currentTarget.id
        let value = e.currentTarget.value
        switch(id){
            case "description": setDescription(value);break;
            case "type": setType(value);break;
            //case "price": setPrice(value);break;
        }
    }
    const onChangePrice = (data)=>{
        setPrice(data)
    }

    const onCancel = ()=> {
        setShowAddForm(false)
        clearFormData()
    }
    const onAccept = ()=>{
        const accesory = {
            description,
            type,
            price
        }
        if(idSelected){
            accesoriesList[idSelected] = accesory
        }else{
            accesoriesList.push(accesory)
        }
        setShowAddForm(false)
        clearFormData()
        changeEvent(accesoriesList)
    }

    const getTotalCost = (array)=>{
        let sum = 0;
        array.forEach(accesory => {
            let price = parseFloatFixed(accesory.price?.outputPrice)
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
            accesory: newArray,
            totalCost: total_cost
        }

        setAccesoriesList([...newArray])
        setTotalCost(total_cost)

        onAcceptCallback(data)
    }

    const clearFormData = () => {
        setPrice(0)
        setDescription("")
        setIdSelected()
    }

    return (
    <div style={{padding: "1rem"}}>
    <Row style={{marginBottom:"0.5rem"}}>
        <Col>
            <FormGroupButton 
                id="component-add" 
                buttonText={btnText}
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
                <Row style={{marginTop:"0.5rem"}}><Col><h6>{label}</h6></Col></Row>
                <Row>
                    <Col md={12} lg={6}>
                        <FormGroupText id={"description"} value={description} type={"text"} label={"Descripcion"} onChange={onChange}/>
                    </Col>
                    <Col md={12} lg={6}>
                        <FormGroupPrice id={"price"} 
                        value={price} 
                        label={"Precio"} 
                        onChange={onChangePrice}/>
                    </Col>
                </Row>
                { !typeAccesory?
                    <Row>
                        <Col>
                            <FormGroup>
                                <label htmlFor="type">Tipo</label>
                                <FormSelect id="type">
                                    <option value={"hardware"}>hardware</option>
                                    <option value={"software"}>software</option>
                                </FormSelect>
                            </FormGroup>
                        </Col>
                        
                    </Row>
                    :<></>
                }
                
                <Row style={{marginBottom:"0.5rem"}}>
                    <Col>
                        <div style={{display:"flex", justifyContent:"space-evenly"}}>
                            <FormGroupNavButton
                                backLabel={"Cancelar"}
                                nextLabel={"Agregar"}
                                onBackClick={onCancel}
                                onNextClick={onAccept}
                            />
                        </div>
                    </Col>
                </Row>
            </Card>
        </Row>
        : <></>
    }
    {
        accesoriesList.length > 0 ?
        <Row style={{marginBottom:"0.5rem"}}>
            <Col>
                <Card style={{padding:"0.5rem"}}>
                    <table className='components-table'>
                        <thead>
                            <tr>
                                <th rowSpan={2}>Descripcion</th>
                                <th rowSpan={2}>Tipo</th>
                                <th colSpan={4}>Precio</th>
                                <th rowSpan={2}></th>
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
                            accesoriesList.map( (accesory, index) => {
                                return <tr id={index} key={index}>
                                    <td>{accesory.description}</td>
                                    <td>{accesory.type}</td>
                                    <td>{accesory.price.price}</td>
                                    <td>{accesory.price.currency}</td>
                                    <td>{accesory.price.exchange}</td>
                                    <td>{formatPrice(accesory.price?.outputPrice)}</td>
                                    <td>
                                        <Button variant='outline-dark'size="sm" onClick={e => {
                                            let id = e.currentTarget.parentElement.parentElement.id
                                            let data = accesoriesList[id]
                                            //console.log(data.price)
                                            setPrice(data.price)
                                            setDescription(data.description)
                                            setType(data.type)
                                            setIdSelected(id)
                                            setShowAddForm(true)
                                        }}>
                                            <PencilFill/>
                                        </Button>
                                        <Button variant="danger" size="sm" onClick={e => {
                                            let id = e.currentTarget.parentElement.parentElement.id
                                            let newArray = accesoriesList.filter((item, index)=>(index != id))
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

export default AccesoriesAdd