import React, { useEffect, useState } from 'react'
import { Card, Row, Col } from 'react-bootstrap'
import { formatPriceExtended } from '../../../../lib/utils'

function SetsGlobalVariablesCosts({sets, financeData}) {
    const [output, setOutput] = useState({})
    const getGlobalCosts = ()=>{
        let output = {
            outputByType: [],
            outputByService: [],
        }
        let global_estimated = 0
        sets.forEach(set => {
            global_estimated += set.concepts.estimated
        })

        let global_profiles_subtotal = 0
        sets.forEach(set => {
            global_profiles_subtotal += set.profiles.subtotal
        })

        let global_toner_cost = 0
        sets.forEach(set => {
            global_toner_cost += set.costs.tonerSubtotal
        })

        let several = (
            parseFloat(financeData.distribution) + 
            parseFloat(financeData.installation) + 
            parseFloat(financeData.personnel) + 
            parseFloat(financeData.insurance) + 
            parseFloat(financeData.spareParts)
        )

        let global_investment = global_profiles_subtotal + global_toner_cost + several

        let bailFull = (parseInt(financeData.months)/12) * parseFloat(financeData.fianza)
        
        let bailFinal = global_investment * (bailFull/100)
        let penalty = global_investment * (parseFloat(financeData.penalty)/100)
        let rate = global_investment * (parseFloat(financeData.rate)/100)
        let severalComplete = several + bailFinal + penalty + rate
        
        let severalPerPage = severalComplete / global_estimated
        sets.map(item => {
            let costs = item.costs
            let paper_cost = parseFloat(financeData.paperCost)
            let page_final_cost = costs.page_cost_total + paper_cost + severalPerPage
            page_final_cost = page_final_cost + (page_final_cost * (parseFloat(financeData.margin)/100))
            
            costs.page_cost_several = severalPerPage
            costs.paper_cost = paper_cost
            costs.page_final_cost = page_final_cost
            //console.log(page_final_cost)
            output.outputByType.push({type: item.type, output: costs.page_final_cost})
            

            //por calcular
            /*item.concepts.concepts.map( concept => {
                let output = 0
                let service_output = {
                    service: concept.service,
                    type: concept.type,
                    referencePrice: concept.referencePrice,
                    output
                }
            })*/
        })
        /*sets.output = output
        console.log(sets)*/
        setOutput(output)
    }

    useEffect(()=>{
        getGlobalCosts()
    }, [sets, financeData])
    
    /*useEffect(()=>{
        console.log(sets)
    }, [sets])*/

    return (
        <>
        <Card>
            <Card.Header>
                <h6>Salidas</h6>
            </Card.Header>
            <Card.Body>
                <Row>
                    <Col>
                        <h6>Salida por tipo</h6>
                        <table className='components-table'>
                            <thead>
                                <tr>
                                    <th>Tipo</th>
                                    <th>Salida</th>
                                </tr>
                            </thead>
                            <tbody>
                            {
                                output.outputByType?.map((salida, index) => {
                                    return <tr key={index}>
                                        <td>{salida.type}</td>
                                        <td>{formatPriceExtended(salida.output)}</td>
                                    </tr>
                                })
                            }
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
        </>
    )
}

export default SetsGlobalVariablesCosts