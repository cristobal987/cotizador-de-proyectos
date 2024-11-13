import React from 'react'
import { Form, Button } from 'react-bootstrap'

function FormGroupButton({label, id, buttonText, onClick}) {
  return (
    <Form.Group controlId={id}>
        <Form.Label>{ label }</Form.Label>
        <Button onClick={ onClick }>{buttonText}</Button>
    </Form.Group>
  )
}

export default FormGroupButton