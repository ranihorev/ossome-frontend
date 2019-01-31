import React, { Component } from 'react';
import {Container, Row, Col} from "reactstrap";
import BaseNavbar from "../components/navbar/navbar";
import Post from "../components/post/Post";
import {isEmpty} from "lodash";
import NewPost from "../components/newPost/NewPost";
import {auth_axios} from "../api";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
      auth_axios.get('/v1/posts').then(res => {
        console.log(res.data.posts);
        this.setState({posts: res.data.posts});
      })
  }

  render() {
    let posts = <div></div>;
    console.log(this.state.posts);
    if (!isEmpty(this.state.posts)) {
      posts = <div>{this.state.posts.map((p) => <Post key={p._id} content={p}/>)}</div>
    }
    return (
      <div>
        <BaseNavbar/>
        <Container className="base-container">
          <Row className="justify-content-center">
            <Col xs="12" md="8" lg="7">
              <NewPost/>
              <div>
                {posts}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
