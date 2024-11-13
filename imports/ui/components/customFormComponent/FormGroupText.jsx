import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { validateDataType } from '../../../lib/utils'

function FormGroupText({id, value, className, type, dataType, label, onChange, disabled}) {
  const [data, setData] = useState(value? value: "")
  const onChangeEvent = e => {
    e.preventDefault()
    const value = e.currentTarget.value 
    
    if(validateDataType(dataType, value)){
      setData(value)
      onChange(e)
    }
  }
  
  return (
    <Form.Group controlId={ id } className='mb-3'>
        <Form.Label>{ label }</Form.Label>
        <Form.Control type={ type ? type : "text" } className={className} value={data} onChange={onChangeEvent} disabled={disabled}/>
    </Form.Group>
  )
}

export default FormGroupText