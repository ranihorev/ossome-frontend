import React, { Component } from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './postsList.scss';
import Post from "../post/Post";
import PropTypes from 'prop-types';
import {fetchPostsAction} from "../../actions/action_posts";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {isEmpty, isEqual} from "lodash";


class PostsList extends Component {

  componentDidMount() {
    console.log('mount')
    this.props.fetchPosts(this.props.match.params);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    console.log(nextProps.match.params);
    console.log(this.props.match.params);
    if (!isEqual(nextProps.match.params, this.props.match.params)) {
      console.log('test');
      this.props.fetchPosts(nextProps.match.params);
    }
  }

  render() {
    const {data} = this.props.posts;
    if (isEmpty(data)) return <div></div>

    const posts_dom = data.map((p) =>
      <CSSTransition key={p._id} in={this.props.in} timeout={400} classNames="fade" appear={false}>
        <Post content={p}/>
      </CSSTransition>
    );
    return (
      <TransitionGroup className="posts-list">
        {posts_dom}
      </TransitionGroup>
    );
  }
}

PostsList.propTypes = {
  posts: PropTypes.object
}

const mapStateToProps = (state, ownProps) => {
  return {
    posts: state.posts
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchPosts: (params) => {
      dispatch(fetchPostsAction(params));
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(PostsList));