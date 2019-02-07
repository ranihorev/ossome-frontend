import React, { Component } from 'react';
import {Container, Row, Col} from "reactstrap";
import BaseNavbar from "../components/navbar/navbar";
import NewPost from "../components/newPost/NewPost";
import PostsList from "../components/postsList/PostsList";
import FilterPosts from "../components/postsList/FilterPosts";


class Home extends Component {
  
  componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextProps.match.params);
    console.log(this.props.match.params);
  }

  render() {
    return (
      <div>
        <BaseNavbar/>
        <Container className="base-container">
          <Row className="justify-content-center">
            <Col xs="12" md="8" lg="7">
              <NewPost/>
              <FilterPosts/>
              <PostsList {...this.props}/>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;

