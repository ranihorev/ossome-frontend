import React, { Component } from 'react';
import {Container, Row, Col} from "reactstrap";
import BaseNavbar from "../components/navbar/navbar";

class Home extends Component {
  render() {
    return (
      <div>
        <BaseNavbar/>
        <Container className="base-container">
          <Row>
            <Col>
              Hello
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
