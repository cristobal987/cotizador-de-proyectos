import React from 'react'
import { Button } from 'react-bootstrap';

function FormGroupNavButton({backLabel, nextLabel, onBackClick, onNextClick}) {
  return (
    <>
        <Button id="back" variant="outline-secondary" onClick={onBackClick}>{backLabel}</Button>
        <Button id="next" variant='outline-primary' onClick={onNextClick}>{nextLabel}</Button>
    </>
  )
}

export default FormGroupNavButton