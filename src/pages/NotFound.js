import React, { Component } from 'react';
import {Col, Container, Row} from "reactstrap";

class NotFound extends Component {
  render() {
    return (
      <Container className="base-container">
        <Row className="justify-content-center">
          <Col xs="12" md="8" lg="7" className="text-center">
            <h3>Page Not Found</h3>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default NotFound;
