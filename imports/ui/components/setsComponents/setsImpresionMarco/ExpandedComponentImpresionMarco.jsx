import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { CheckCircleFill, ExclamationCircleFill } from 'react-bootstrap-icons'
import { formatNumberExtended, formatPrice, formatPriceExtended } from '../../../../lib/utils'
import FormGroupText from '../../customFormComponent/FormGroupText'

function ExpandedComponentImpresionMarco({data}) {
  const concepts = data.concepts.concepts
  const profiles = data.profiles.profiles
  const costs = data.costs
  const type = concepts[0].type
  return (<>
    <Row>
      <Col style={{paddingTop:"1rem"}}>
      <Card style={{marginBottom:"1rem"}}>
        <Card.Header><h5>Conceptos {type}</h5></Card.Header>
          <Card.Body>
            <h6>Conceptos</h6>
            <table className='components-table'>
              <thead>
                <tr>
                  <th style={{minWidth: "150px"}} rowSpan="2">Servicio</th>
                  <th rowSpan="2">Tipo</th>
                  <th colSpan="2">Rango</th>
                  <th rowSpan="2">Precio referencia</th>
                </tr>
                <tr>
                  <th>Minimo</th>
                  <th>Maximo</th>
                </tr>
              </thead>
              <tbody>
              {
                concepts.map((item, index) => {
                  return <tr key={index} id={index}>
                    <td>{item.service}</td>
                    <td>{item.type}</td>
                    <td>{item.range.min}</td>
                    <td>{item.range.max}</td>
                    <td>{item.referencePrice}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
          <br/>
          <h6>Estimados</h6>
          <table className='components-table'>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Minimo</th>
                  <th>Maximo</th>
                  <th>Promedio</th>
                </tr>
              </thead>
              <tbody>
              {
                concepts.map((item, index) => {
                  return <tr key={index} id={index}>
                    <td>{item.service}</td>
                    <td>{item.estimate.min}</td>
                    <td>{item.estimate.max}</td>
                    <td>{item.estimate.avg}</td>
                  </tr>
                })
              }
            </tbody>
          </table>
        </Card.Body>
      </Card>
      <Card style={{marginBottom:"1rem"}}>
        <Card.Header><h5>Perfiles {type}</h5></Card.Header>
        <Card.Body style={{overflowX:"auto"}}>
          <h6>Perfiles</h6>
            <table className='components-table'>
              <thead>
                  <tr>
                      <th rowSpan="2">Perfil</th>
                      <th rowSpan="2">Marca</th>
                      <th rowSpan="2">Modelo</th>
                      <th rowSpan="2">Cantidad</th>
                      <th colSpan="5">Precio</th>
                  </tr>
                  <tr>
                      <th>Precio</th>
                      <th>Moneda</th>
                      <th>Tasa</th>
                      <th>Precio final</th>
                      <th>Subtotal</th>
                  </tr>
              </thead>
              <tbody>
              {
                  profiles.map((item, index) => {
                      return <tr key={index} id={index}>
                          <td>{item.profileData.profile}</td>
                          <td>{item.profileData.brand}</td>
                          <td>{item.profileData.model}</td>
                          <td>{item.profileData.quantity}</td>
                          <td>{item.profileData.price?.price}</td>
                          <td>{item.profileData.price?.currency}</td>
                          <td>{item.profileData.price?.exchange}</td>
                          <td>{formatPrice(item.profileData.price?.outputPrice)}</td>
                          <td>{formatPrice(item.profileData.subtotal)}</td>
                      </tr>
                  })
              }
              </tbody>
            </table>
            {
              type != "DIGITALIZACIÓN" ?
              <>
              <br/>
              <h6>Toner</h6>
              <table className='components-table'>
                <thead>
                    <tr>
                        <th>Perfil</th>
                        <th>Rendimiento</th>
                        <th>Precio</th>
                        <th>Moneda</th>
                        <th>Tasa</th>
                        <th>Precio final</th>
                    </tr>
                </thead>
                <tbody>
                {
                    profiles.map((item, index) => {
                        return <tr key={index} id={index}>
                            <td>{item.profileData.profile}</td>
                            <td>{item.toner.efficiency}</td>
                            <td>{item.toner.price.price}</td>
                            <td>{item.toner.price.currency}</td>
                            <td>{item.toner.price.exchange}</td>
                            <td>{item.toner?.price?.outputPrice ? formatPrice(item.toner?.price?.outputPrice)  : ""}</td>
                        </tr>
                    })
                }
                </tbody>
              </table>
              </>
              :
              <></>
            }

          </Card.Body>
        </Card>
        <Card style={{marginBottom:"1rem"}}>
          <Card.Header>
              <h5>Costos {type}</h5>
          </Card.Header>
          <Card.Body>
              <Row style={{marginBottom:"1rem"}}>
                <Col><span><strong>Subtotal perfiles: </strong><br/>{formatPriceExtended(costs.subtotal_profiles)}</span></Col>
                <Col><span><strong>Estimado general: </strong><br/>{formatNumberExtended(costs.global_estimated)}</span></Col>
                <Col><span><strong>Costo general de toner: </strong><br/>{formatPriceExtended(costs.tonerSubtotal)}</span></Col>
              </Row>
              <Row>
                <Col><span><strong>Costo por hoja: </strong><br/>{formatPriceExtended(costs.page_cost)}</span></Col>
                <Col><span><strong>Toner por hoja: </strong><br/>{formatPriceExtended(costs.tonerPerPage)}</span></Col>
                <Col><span><strong>Salida: </strong><br/>{formatPriceExtended(costs.page_cost_total)}</span></Col>
              </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </>
  )
}

export default ExpandedComponentImpresionMarco