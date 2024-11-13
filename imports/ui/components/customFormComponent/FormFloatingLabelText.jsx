import React, { useEffect, useState } from 'react'
import { FloatingLabel, Form } from 'react-bootstrap'
import { validateDataType } from '../../../lib/utils'

function FormFloatingLabelText({id, label, dataType, value, onChange, disabled}) {
    const [data, setData] = useState(value)
    const onChangeEvent = e => {
        e.preventDefault()
        const value = e.currentTarget.value 
        if(validateDataType(dataType, value)){
            if(data == "0" && dataType.search("number") != -1){
                setData(trimZerosAtLeftSide(value))
            }else{
                setData(value)
            }
            
            if(onChange){
                onChange(e)
            }
        }
        if(value == "" && dataType.search("number") != -1){
            setData(0)
        }
    }

    const trimZerosAtLeftSide = value => {
        while(value[0] == '0'){
            value = value.substring(1, value.length)
        }
        return value
    }

    return (
        <FloatingLabel
            label={label}
        >
            <Form.Control type='text' id={id} onChange={onChangeEvent} value={data} disabled={disabled}/>
        </FloatingLabel>
    )
}

export default FormFloatingLabelText