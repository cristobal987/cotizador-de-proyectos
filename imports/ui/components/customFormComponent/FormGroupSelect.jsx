import React from 'react'
import { Form, ButtonGroup } from 'react-bootstrap'

function FormGroupSelect({id, label, onChange, selectedValue, data, iteratorFunc}) {
    let iterator = (item, index)=><option key={index} value={item}>{item}</option>
    if(iteratorFunc){
        iterator = iteratorFunc
    }

    return (
        <Form.Group controlId={id} className='mb-3'>
            <Form.Label>{label}</Form.Label>
            <ButtonGroup className='form-control' style={{border:"0px", padding: "0.375rem 0rem"}}>
                
                <Form.Select value={selectedValue} onChange={onChange}>
                    <option value={""}>Seleccione una opcion</option>
                    {data ?
                        data.map(iterator)
                    : "" }
                </Form.Select>
            </ButtonGroup>
        </Form.Group>
    )
}

export default FormGroupSelect