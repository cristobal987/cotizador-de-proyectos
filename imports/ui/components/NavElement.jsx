import React from 'react'
import { useNavigate } from 'react-router-dom'
import TooltipOverlay from './TooltipOverlay';

function NavElement(props) {
  const navigate = useNavigate();
  const onClick = ()=> navigate(props.url)
  return (
    <div key={props.id} className={"sidebar-list-item" + props.className} onClick={onClick} style={{cursor: "pointer"}}>
        <div className='sidebar-anchor'>
            <span className='text-left'>{props.text}</span>
            <TooltipOverlay text={props.text} placement={"right"}>
              <i className='text-right'>{props.icon}</i>
            </TooltipOverlay>
        </div>
    </div>
  )
}

export default NavElement