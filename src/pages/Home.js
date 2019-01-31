import React, { Component } from 'react';
import {Container, Row, Col} from "reactstrap";
import BaseNavbar from "../components/navbar/navbar";
import NewPost from "../components/newPost/NewPost";
import {connect} from "react-redux";
import {fetchPostsAction} from "../actions/action_posts";
import PostsList from "../components/postsList/PostsList";
import {isEmpty} from "lodash";


class Home extends Component {

  componentDidMount() {
    this.props.fetchPosts();
  }

  render() {
    const {posts} = this.props;
    return (
      <div>
        <BaseNavbar/>
        <Container className="base-container">
          <Row className="justify-content-center">
            <Col xs="12" md="8" lg="7">
              <NewPost/>
              {!isEmpty(posts) && !isEmpty(posts.data) ?
                <PostsList posts={posts}/> :
                ''
              }
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: () => {
      dispatch(fetchPostsAction());
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);

