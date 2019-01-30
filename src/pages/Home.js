import React, { Component } from 'react';
import {Container, Row, Col} from "reactstrap";
import BaseNavbar from "../components/navbar/navbar";
import Post from "../components/post/Post";
import {isEmpty} from "lodash";
import NewPost from "../components/post/NewPost";
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
        this.setState({posts: res.data.posts});
      })
  }

  render() {
    let posts = <div></div>;
    if (!isEmpty(this.state.posts)) {
      console.log(this.state.posts)
      posts = <div>{this.state.posts.map((p) => <Post key={p._id} content={p.content}/>)}</div>
    }
    return (
      <div>
        <BaseNavbar/>
        <Container className="base-container">
          <Row>
            <Col>
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
