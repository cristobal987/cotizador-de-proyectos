import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import FormGroupText from '../../customFormComponent/FormGroupText'
import { formatNumberExtended, formatPrice, formatPriceExtended, parseFloatFixed } from '../../../../lib/utils'
import { CheckCircleFill, ExclamationCircleFill } from 'react-bootstrap-icons'
import FormGroupPlainText from '../../customFormComponent/FormGroupPlainText'

function SetAddFormCosts({typeConcept, conceptsData, profilesData, costsObject, onUpdate}) {
    const [type, setType] = useState(typeConcept? typeConcept : "")
    const [concepts, setConcepts] = useState(conceptsData? conceptsData : {})
    const [profiles, setProfiles] = useState(profilesData? profilesData : {})

    const [costs, setCosts] = useState(null)

    const updateCosts = (data) => {
        
        let global_estimated = data?.estimated
        if(!global_estimated){
            global_estimated = conceptsData?.estimated
            if(!global_estimated) return;
        }
       
        let subtotal_profiles = data?.subtotal
        if(!subtotal_profiles){
            subtotal_profiles = profilesData?.subtotal
            if(!subtotal_profiles) return;
        }
        
        let profilesQuantities = data?.totalquantity
        if(!profilesQuantities){
            profilesQuantities = profilesData?.totalquantity
            if(!profilesQuantities) return;
        }
        
        let profilesArr = profiles?.profiles
        if(!profilesArr){
            profilesArr = profilesData?.profiles
            if(!profilesArr) return;
        }
        console.log("hey", subtotal_profiles)
        let page_cost = subtotal_profiles / global_estimated
        let subtotal_toner = 0
        if(profilesData){
            profilesArr = profilesArr.map((profile, index) => {
                profile.estimated = (profile.profileData.quantity / profilesQuantities) * global_estimated
                if(type != "DIGITALIZACIÓN"){
                    if(type == "COLOR"){
                        profile.toner.quantity = (profile.estimated / profile.toner.efficiency) * 4
                    }else{
                        profile.toner.quantity = profile.estimated / profile.toner.efficiency
                    }
                    
                    profile.toner.subtotal = profile.toner.quantity * profile.toner.price.outputPrice
                    subtotal_toner += profile.toner.subtotal
                }else {
                    profile.toner.quantity = 0
                    profile.toner.subtotal = 0
                }
                
                return profile
            })
            profiles.tonerSubtotal = subtotal_toner
            profiles.tonerPerPage = profiles.tonerSubtotal / global_estimated
        }

        let page_cost_total = page_cost + profiles.tonerPerPage 
        let costs = {
            subtotal_profiles,
            global_estimated,
            page_cost,
            tonerSubtotal: profiles.tonerSubtotal,
            tonerPerPage: profiles.tonerPerPage,
            page_cost_total
        }

        onUpdate(costs)
        return costs
    }

    useEffect(()=>{
        if(!costs){
            setCosts(updateCosts())
        }
    })

    useEffect(()=>{
        console.log("cambio concepto")
        if(!concepts.estimated){
            setConcepts(conceptsData)
        }

        if(conceptsData.estimated != concepts.estimated){
            setConcepts(conceptsData)
        }

        setCosts(updateCosts({estimated: conceptsData.estimated}))
    }, [conceptsData])

    useEffect(()=>{
        console.log("cambio perfil")
        if(!profiles.subtotal){
            setProfiles(profilesData)
        }

        if(profilesData.subtotal != profiles.subtotal){
            setProfiles(profilesData)
        }
        if(profilesData.totalquantity != profiles.totalquantity){
            setProfiles(profilesData)
        }

        setCosts(updateCosts({subtotal: profilesData.subtotal, totalquantity: profilesData.totalquantity}))
    },[profilesData])

    return (
    <>
    <Row><h5>Costos</h5></Row>
    <Row>
        <Col>
            <FormGroupPlainText id={"profiles-cost"} label={"Costo perfiles: "} value={costs? formatPriceExtended(costs.subtotal_profiles) : 0}/>
        </Col>
        <Col>
            <FormGroupPlainText id={"concept-estimated"} label={"Estimado total: "} value={costs? formatNumberExtended(costs.global_estimated) : 0}/>
        </Col>
        <Col>
            <FormGroupPlainText id={"page-cost"} label={"Costo por hoja (base): "} value={costs? formatPriceExtended(costs.page_cost) : 0} />
        </Col>
    </Row>
    <Row>
        {
            type != "DIGITALIZACIÓN" ?
           <>
            <Col>
                <FormGroupPlainText id={"toner-subtotal"} label={"Subtotal toner: "} value={costs? formatPriceExtended(costs.tonerSubtotal) : 0}/>
            </Col>
            <Col>
                <FormGroupPlainText id={"toner-per-page"} label={"Toner por hoja: "} value={costs? formatPriceExtended(costs.tonerPerPage) : 0}/>
            </Col>
            <Col></Col>
           </>
            :
            <></>
        }
    </Row>
    
    </>
    )
}

export default SetAddFormCosts