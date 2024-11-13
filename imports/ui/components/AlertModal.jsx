import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AlertModal(props) {
    const [message, setMessage] = useState(props.message)
    const [show, setShow] = useState(props.show);

    let handleClose = () => setShow(false);

    if(props.handleClose){
        handleClose = props.handleClose
    }
  
    return (
      <>  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Alerta</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign:"center"}}>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default AlertModal