import React, { useState } from 'react'
import { InputGroup, Form, Dropdown, DropdownButton, FloatingLabel } from 'react-bootstrap'
import { parseFloatFixed } from '../../../lib/utils'
import FormFloatingLabelText from './FormFloatingLabelText'

function FormGroupPrice({id, value, label, onChange}) {
    let defaultData = {
        currency: "MXN",
        exchange: 1.00,
        exchangeEnable: false,
        price: 0.00,
        outputPrice: 0.00
    }
    //console.log(value)
    if(value){
        defaultData.currency = value.currency ? value.currency : defaultData.currency
        defaultData.exchange = value.exchange ? value.exchange : defaultData.exchange
        defaultData.exchangeEnable = defaultData.currency == "MXN" ? false : true
        defaultData.price = value.price ? value.price : defaultData.price
        if(!value.outputPrice){
            defaultData.outputPrice = parseFloatFixed(parseFloatFixed(defaultData.price) * parseFloatFixed(defaultData.exchange))
        }else {
            defaultData.outputPrice = value.outputPrice
        }
    }
    const [currency, setCurrency] = useState(defaultData.currency)
    const [exchange, setExchange] = useState(defaultData.exchange)
    const [exchangeEnable, setExchangeEnable] = useState(defaultData.exchangeEnable)
    const [price, setPrice] = useState(defaultData.price)
    const [outputPrice, setOuputPrice] = useState(defaultData.outputPrice)
    const currencies = ["MXN", "USD", "EUR","GBP"]

    const onClickDropDown = e => {
        const currency = e.currentTarget.id;
        setCurrency(currency);
        if(currency != "MXN"){
            setExchangeEnable(true)
        }else {
            setExchangeEnable(false)
            setExchange(1.00)
            updateOuputPrice(price, 1.00)
        }
    }

    const onChangeExchange = e => {
        const ex = e.currentTarget.value
        updateOuputPrice(price, ex)
        setExchange(ex)

    }

    const onChangePrice = e => {
        const p = e.currentTarget.value
        updateOuputPrice(p, exchange)
        setPrice(p)
    }

    const updateOuputPrice = (p, e)=>{
        const out = (p * e)
        const exchangeStirng= new String(e)
        const data = {
            currency,
            exchange:e.toString(),
            price: p,
            outputPrice: out 
        }
        setOuputPrice(data.outputPrice)
        if(onChange){
            onChange(data)
        }
    }

    return (
        <>
        <label htmlFor={"input-group-" + id}>{label}</label>
        <InputGroup id={"input-group-" + id} className="mb-3">
            <DropdownButton
                variant="outline-secondary"
                title={currency}
                id={"input-group-dropdown-" + id}
            >
                {
                    currencies.map((item, index) => {
                        return <Dropdown.Item key={index} id={item} onClick={onClickDropDown}>{item}</Dropdown.Item>
                    })
                }
            </DropdownButton>
            <FormFloatingLabelText label={"tasa"} id={'input-text-ex-' + id} dataType={"number-float"} onChange={onChangeExchange} value={exchange} disabled={!exchangeEnable} />
            <FormFloatingLabelText label={"precio"} id={'input-text-pr-' + id} dataType={"number-float"} onChange={onChangePrice} value={price} />
            <FloatingLabel
                label={"conversion"}
            >
                <Form.Control type='text' id={id} disabled={true} value={outputPrice}/>
            </FloatingLabel>
        </InputGroup>
        </>
    )
}

export default FormGroupPrice