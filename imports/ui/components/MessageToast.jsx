import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';


//// no se usa
function MessageToast(props) {
    const [show, setShow] = useState(props.show);

    return (
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Body>{props.message}</Toast.Body>
        </Toast>
    )
}

export default MessageToast