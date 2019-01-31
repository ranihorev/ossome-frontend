import React, { Component } from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './postsList.scss';
import Post from "../post/Post";
import PropTypes from 'prop-types';


export default class PostsList extends Component {
  render() {
    const {posts} = this.props;
    const posts_dom = posts.map((p) =>
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
  posts: PropTypes.array
};