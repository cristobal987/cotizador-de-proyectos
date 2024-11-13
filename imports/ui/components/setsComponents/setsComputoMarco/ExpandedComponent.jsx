import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import { CheckCircleFill, ExclamationCircleFill } from 'react-bootstrap-icons'
import { formatPrice } from '../../../../lib/utils'

const itemStyle = {
    display:"inline-block", 
    border:"1px solid lightgray",
    margin: "0.5rem",
    padding: "0.5rem 1rem"
  }

function ExpandedComponent({data}) {
  return (<>
    <Row>
      <Col style={{paddingTop:"1rem"}}>
        <Card>
          <Card.Header>
            <h5>Referencia</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                <ul>
                  <li>Partida: {data.reference.partida}</li>
                  <li>Perfil: {data.reference.perfil}</li>
                  <li>Descripcion: {data.reference.descripcion}</li>
                  <li>Caracteristica1: {data.reference.caracteristica1}</li>
                  <li>Caracteristica2: {data.reference.caracteristica2}</li>
                  <li>Precio Referencia: {data.reference.precioReferencia}</li>
                  <li>Rango: {data.reference.rango.minimo + " - " + data.reference.rango.maximo}</li>
                </ul>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col style={{paddingTop:"1rem"}}>
        <Card>
          <Card.Header>
            <h5>Componentes</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col>
                  {
                    data.components.components.map((item, index) => {
                      return <div style={itemStyle}  key={index}>
                        <span>{index + 1}</span>
                        <ul>
                          <li>Marca: {item.brand}</li>
                          <li>Modelo: {item.model}</li>
                          <li>Propiedades: {item.properties}</li>
                          <li>Precio: {
                              item.price.currency == "MXN" 
                              ? formatPrice(item.price.outputPrice) + " " + item.price.currency
                              : formatPrice(item.price.outputPrice) + " ("+item.price.price +" "+item.price.currency +", Tasa: "+ item.price.exchange +")"
                              }
                          </li>
                        </ul>
                      </div>
                    })
                  }
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    {
      data.accesories.accesory?.length > 0 ?
      <Row>
        <Col style={{paddingTop:"1rem"}}>
          <Card>
            <Card.Header>
              <h5>Accesorios</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                    {
                      data.accesories.accesory.map((item, index) => {
                        return <div style={itemStyle} key={index}>
                          <span>{index + 1}</span>
                          <ul>
                            <li>Descripcion: {item.description}</li>
                            <li>Precio: {
                              item.price.currency == "MXN" 
                              ? formatPrice(item.price.outputPrice) + " " + item.price.currency
                              : formatPrice(item.price.outputPrice) + " ("+item.price.price +" "+item.price.currency +", Tasa: "+ item.price.exchange +")"
                              }</li>
                          </ul>
                        </div>
                      })
                    }
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      :<></>
    }
    {
      data.aditionalSoftware.accesory?.length > 0 ?
      <Row>
        <Col style={{paddingTop:"1rem"}}>
          <Card>
            <Card.Header>
              <h5>Software adicional</h5>
            </Card.Header>
            <Card.Body>
              <Row>
                <Col>
                    {
                      data.aditionalSoftware.accesory.map((item, index) => {
                        return <div style={itemStyle} key={index}>
                          <span>{index + 1}</span>
                          <ul>
                            <li>Descripcion: {item.description}</li>
                            <li>Precio: {
                              item.price.currency == "MXN" 
                              ? formatPrice(item.price.outputPrice) + " " + item.price.currency
                              : formatPrice(item.price.outputPrice) + " ("+item.price.price +" "+item.price.currency +", Tasa: "+ item.price.exchange +")"
                              }</li>
                          </ul>
                        </div>
                      })
                    }
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      :<></>
    }
    <Row>
      <Col style={{paddingTop:"1rem"}}>
        <Card>
          <Card.Header>
            <h5>Datos Financieros</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col><span>Meses: {data.financeData.months}</span></Col>
              <Col><span>Distribucion: {formatPrice(data.financeData.distribution)}</span></Col>
              <Col><span>Instalacion: {formatPrice(data.financeData.installation)}</span></Col>
            </Row>
            <Row>
              <Col><span>Personal: {formatPrice(data.financeData.personnel)}</span></Col>
              <Col><span>Seguro: {formatPrice(data.financeData.insurance)}</span></Col>
              <Col><span>Fianza: {formatPrice(data.financeData.fianza)}</span></Col>
            </Row>
            <Row>
              <Col><span>Penalizacion: {data.financeData.penalty +"%"}</span></Col>
              <Col><span>Margen: {data.financeData.margin +"%"}</span></Col>
              <Col><span>Financiamiento: {data.financeData.rate +"%"}</span></Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <Row>
      <Col style={{paddingTop:"1rem", paddingBottom:"1rem"}}>
        <Card>
          <Card.Header>
            <h5>Costos</h5>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col><span>Costo total unidad: {formatPrice(data.costs.totalCostUnit)}</span></Col>
              <Col>
                <span>
                Cantidad total de unidades: {data.costs.totalUnits +" (Ref. "+ data.reference.rango?.maximo+") "}
                {
                  data.costs.totalUnits < data.reference.rango?.maximo ?
                    <CheckCircleFill style={{color:"green"}}/>
                  : <>
                    <ExclamationCircleFill style={{color:"orange"}}/>
                    <br/>
                    <span style={{color:"orange"}}>Se pasa!</span>
                  </>
                }
                <br/>
                <span>{"local: " + data.quantitiesLocal + ", nacional: " + data.quantitiesNational + ", stock: " + data.quantitiesStock}</span>
                </span>
              </Col>
              <Col><span>Inversion: {formatPrice(data.costs.totalCostInvestment)}</span></Col>
            </Row>
            <Row>
              <Col><span>Precio entre meses: {formatPrice(data.costs.monthly)}</span></Col>
              <Col><span>Financiamiento: {formatPrice(data.costs.financeCost)}</span></Col>
              <Col><span>Margen: {formatPrice(data.costs.monthlyMargin)}</span></Col>
            </Row>
            <Row>
              <Col><span>Salida: {formatPrice(data.costs.outputPrice) +" (Ref: "+data.reference.precioReferencia+") "}
              {
                data.costs.outputPrice < data.reference.precioReferencia ?
                  <CheckCircleFill style={{color:"green"}}/>
                :<>
                  <ExclamationCircleFill style={{color:"orange"}}/>
                  <br/>
                  <span style={{color:"orange"}}>Se pasa!</span>
                </>
                }</span></Col>
                <Col><span>Por dia: {formatPrice(data.costs.daylyOutputPrice)}</span></Col>
                <Col><span>Factura Mensual: {formatPrice(data.costs.monthlyPayment)}</span></Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </>
  )
}

export default ExpandedComponent