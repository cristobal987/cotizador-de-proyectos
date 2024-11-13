import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer>
        <Container>
            <Row>
                <Col>
                    <div className="text-right mt-2 nb-2">version: 0.7.0.0</div>
                </Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer