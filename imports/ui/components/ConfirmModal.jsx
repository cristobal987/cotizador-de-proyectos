import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ConfirmModal(props) {
    const [message, setMessage] = useState(props.message)
    const [show, setShow] = useState(props.show);

    let handleClose = () => setShow(false);
    if(props.handleClose){
        handleClose = props.handleClose;
    }

    let onAccept = () =>  setShow(false);
    if(props.onAccept){
        onAccept = props.onAccept;
    }

    return (
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmación</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{textAlign:"center"}}>{message}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
            <Button variant="primary" onClick={onAccept}>
              Aceptar
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default ConfirmModal