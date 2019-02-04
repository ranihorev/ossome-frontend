import React, { Component } from 'react';
import {Container, Row, Col} from "reactstrap";
import BaseNavbar from "../components/navbar/navbar";
import NewPost from "../components/newPost/NewPost";
import PostsList from "../components/postsList/PostsList";


class Home extends Component {

  render() {
    return (
      <div>
        <BaseNavbar/>
        <Container className="base-container">
          <Row className="justify-content-center">
            <Col xs="12" md="8" lg="7">
              <NewPost/>
              <PostsList/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;

