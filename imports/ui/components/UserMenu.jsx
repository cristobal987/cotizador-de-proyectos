import React, { useContext, useEffect, useState } from 'react'
import { Dropdown } from 'react-bootstrap'
import { DoorOpen, Person } from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Auth/AuthContext'

function UserMenu() {
    const navigate = useNavigate()
    const auth = useContext(AuthContext)
    const userId = auth.user
    const [name, setName] = useState("")

    useEffect(()=>{
        //debe cambiar
        if(name === ""){
            Meteor.call('getUserData',userId, (error, userData) => {
                if(error){
                    console.log(error)
                    return;
                }
                setName(userData?.profile?.name)
            })
        }
    })

    function closeSession(){
        auth.signout((error)=>{
            if(!error){
                navigate('/login')
            }else{
                console.log(error)
            }
        })
    }

    function onClickProfile(e){
        navigate("/userprofile/"+ userId)
    }
    
    return (
    <div className='exit-button'>
        <Dropdown>
            <Dropdown.Toggle variant='outline-light'>
                { name + " "}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={onClickProfile}><Person/>{" Perfil"}</Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={closeSession}><DoorOpen/><span className='exit-button-text'>{" Cerrar sesión"}</span></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    </div>
  )
}

export default UserMenu