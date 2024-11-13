import React, { useContext, useEffect, useState } from 'react'
import $ from "jquery"
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { Col, Container, Spinner } from 'react-bootstrap';
import { AuthContext } from '../Auth/AuthContext';

function Login() {
    const navigate = useNavigate();
    let location = useLocation();
    const auth = useContext(AuthContext)
    const [user, setUser] = useState("");
    const [password, setpassword] = useState("");
    const [rememberme, setRememberme] = useState(true);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("inherit")
    const [spinner, setSpinner] = useState(false)


    const onUserChange = e => setUser(e.currentTarget.value)
    const onPasswordChange = e => setpassword(e.currentTarget.value)
    const onRemembermeChange = e => setRememberme(!rememberme)
    const showMessage = (msn, color) => {
        setMessage(msn)
        setMessageColor(color)
    }
    const showSpinner = value => {
        showMessage("","inherit")
        setSpinner(value)
    }

    function onSubmit(e){
        e.preventDefault()
        if(!user){
            $('#user').trigger('focus');
            showMessage('Campo usuario vacio', "red");
            return;
        }

        if(!password){
            $('#password').trigger('focus');
            showMessage('Campo contraseña vacia', "red");
            return;
        }

        showSpinner(true)
        
        auth.signin(user, password, rememberme, loginWithPasswordCallback)
    }
    
    function loginWithPasswordCallback(error){
        showSpinner(false)
        if(error){
            showMessage('Usuario y contraseña invalidos',"red");
        }else{
            showMessage('Usuario y contraseña correctos, Bienvenido!', "blue");
            navigate('/');
        }
    }

    if (auth.user) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return (
    <section className="vh-100 fondo-ted">
    <div className="container-fluid h-custom overley">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="/logo-ted.svg"
            className="img-fluid m-5" alt="logo TED"/>
        </div>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form>

            <div className="form-outline mb-4">
                <input type="email" id="user" className="form-control form-control-lg"
                placeholder="Coloque su correo electronico" value={user} onChange={onUserChange}/>
                <label className="form-label" htmlFor="user">{"Correo electronico"}</label>
            </div>


            <div className="form-outline mb-3">
                <input type="password" id="password" className="form-control form-control-lg"
                placeholder="Coloque su contraseña" value={password} onChange={onPasswordChange}/>
                <label className="form-label" htmlFor="password">{"Contraseña"}</label>
            </div>

            <div className="d-flex justify-content-between align-items-center">

                <div className="form-check mb-0">
                <input className="form-check-input me-2" type="checkbox" checked={rememberme} value={"fuck"} onChange={onRemembermeChange} id="rememberme" />
                <label className="form-check-label" htmlFor="rememberme">
                    {"Recuerdame"}
                </label>
                </div>
                <a href="#!" className="text-body">{"¿Olvido su contraseña?"}</a>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg"
                style={{paddingLeft: "2.5rem", paddingRight: "2.5rem"}}
                onClick={onSubmit}
                >{"Login"}</button>
                <div id="msn" className="login-message" style={{color: messageColor}}>
                    {message} 
                    {spinner ? 
                        <Spinner animation="border" role="status" variant="primary">
                            <span className="visually-hidden">...</span>
                        </Spinner> 
                        : ""}
                </div>
            </div>
            </form>
        </div>
        </div>
    </div>
    <div
        className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

        <div className="text-white mb-3 mb-md-0">
        {"Copyright © 2023. All rights reserved."}
        </div>
        
    </div>
    </section>
    )
}

export default Login