import React from 'react'
import { Button } from 'react-bootstrap'
import { X } from 'react-bootstrap-icons'

function RoleListItem({id, label, onClick, onChange }) {
  return (
    <div id={id} onClick={onClick} onChange={onChange} className='role-list-item'>
        <div className='role-list-item-text'>{label}</div><div className='role-list-item-close'><X/></div>
    </div>
  )
}

export default RoleListItem