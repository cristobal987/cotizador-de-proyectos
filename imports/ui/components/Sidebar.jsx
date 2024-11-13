import React, { useState } from 'react'
import NavElement from './NavElement'
import { Calculator, ChevronRight, FileText, Gear, Grid, House, Journals, People, Tools } from 'react-bootstrap-icons'

function Sidebar() {
    const links = [
        {
            url : "/",
            text : "Inicio",
            className : "",
            icon: <House/>
        },
        {
            url : "/projects",
            text : "Proyectos",
            className : "",
            icon:<Calculator/>
        },
        {
            url : "/catalogues",
            text : "Catalogos",
            className : "",
            icon:<Journals/>
        },
        {
            url : "/users",
            text : "Usuarios",
            className : "",
            icon:<People/>
        }/*,
        {
            url : "#home",
            text : "Brand text",
            className : "",
            icon:<Tools/>
        },
        {
            url : "#home",
            text : "Brand text",
            className : "",
            icon:<Gear/>
        }*/
    ]

    const [isCollapsed, setIsCollapsed] = useState(true);
    const [rotate, setRotate] = useState(true);

    return (
    <div className={"sidebar " + (isCollapsed ? "sidebar-open" : "sidebar-close")}>
        {links.map( (link, index) => {
            return <NavElement 
                key={index}
                id={index}
                text={link.text}
                url={link.url}
                className = {link.className}
                icon = {link.icon}
            ></NavElement>
        })}

        <div className='collapse-button' onClick={()=>{
            setIsCollapsed(!isCollapsed)
            setRotate(!rotate)
        }}>
            <ChevronRight className={"rotate " + (rotate ? "rotate-collapse-button-left" : "")}></ChevronRight>
        </div>
    </div>
  )
}

export default Sidebar