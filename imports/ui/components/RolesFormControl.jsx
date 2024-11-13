import React, { useState } from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { Button, ButtonGroup, Col, Form } from 'react-bootstrap';
import { Plus } from 'react-bootstrap-icons';
import AssignedRoleControl from './AssignedRoleControl';


function RolesFormControl({ id, label, assignRoles, onAssignRolesChange }) {
    const [roles, setRoles] = useState(assignRoles)
    const [selectedRole, setSelectedRole] = useState()
    const RolesCollection = useTracker(() => {
        if(roles.includes('admin')){
            return Meteor.roles.find().fetch();
        }
        return Meteor.roles.find({_id:{$nin:['admin']}}).fetch();
    });

    const onChange = e => setSelectedRole(e.currentTarget.value)
    

    return (
    <>
    <Form.Group controlId={id} className='mb-3'>
        <Form.Label>{label}</Form.Label>
        <ButtonGroup className='form-control' style={{border:"0px", padding: "0.375rem 0rem"}}>
            <Form.Select value={selectedRole} onChange={onChange}>
                <option value={""}>Seleccione una opcion</option>
                {
                    RolesCollection.map( (role, index) => {
                        return <option 
                            key={index} 
                            id={role._id + "-" + index}
                            value={role._id}
                            >{role._id}</option>
                    })
                }
            </Form.Select>
            <Button 
                onClick={ e => {
                    if(!selectedRole){
                        return;
                    }
                    const name = selectedRole

                    if(roles.includes(name) == false ){
                        roles.push(name)
                        onAssignRolesChange(roles)
                        setRoles(roles)
                        setSelectedRole("")
                    }
                }}
            ><Plus></Plus></Button>
        </ButtonGroup>
    </Form.Group>
    <Form.Group>
        <Col>
            <AssignedRoleControl 
            assignRoles={roles}
            onRoleListItemDeleteClick = {role =>{
                let newRoles = roles.filter( item => item != role) 
                setRoles(newRoles)
               
                onAssignRolesChange(newRoles)
            }}
            />
        </Col>
    </Form.Group>
    </>
    )
}

export default RolesFormControl