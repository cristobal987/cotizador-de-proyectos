import React, { useEffect, useState } from 'react'
import RoleListItem from './RoleListItem';

function AssignedRoleControl({assignRoles, onRoleListItemDeleteClick}) {
    const [roles, setRoles] = useState(assignRoles)
    const onClick = onRoleListItemDeleteClick;
    useEffect(()=>{
        if(JSON.stringify(roles) != JSON.stringify(assignRoles)){
            setRoles(assignRoles)
        }
    })

    return (
        <div>
            {roles?.map( (role, index) => {
            return <RoleListItem 
                key={index} 
                id={role} 
                label={role} 
                onClick={()=>{
                    onClick(role)
                }} />
            })}
            
        </div>
    )
}

export default AssignedRoleControl