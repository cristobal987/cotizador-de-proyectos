import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

function TooltipOverlay({text, placement, children}) {
    function tooltip (str){
        return <Tooltip placement={placement} className="in">{str}</Tooltip>
    }
    return (
        <OverlayTrigger placement={placement} overlay={tooltip(text)}>
            {children}
        </OverlayTrigger>
    )
}

export default TooltipOverlay