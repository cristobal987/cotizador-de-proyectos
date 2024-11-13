import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'

function FormGroupPlainText({id, value, label, onChange }) {
  const [val, setVal] = useState(value? value : "")
  let onChangeFunc = e => {
    setVal(e.currentTarget.value)
  }
  if(onChange){
    onChangeFunc = onChange
  }
  useEffect(()=> {
    if(value){
      setVal(value)
    }else{
      setVal("")
    }
  }, [value])
  return (
    <Form.Group controlId={ id } className='mb-3'>
        <Form.Label>{ label }</Form.Label>
        <Form.Control type={ "text" } value={val} disabled={true} onChange={onChangeFunc}/>
    </Form.Group>
  )
}

export default FormGroupPlainText