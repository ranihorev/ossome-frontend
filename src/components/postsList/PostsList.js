import React, { Component } from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './postsList.scss';
import Post from "../post/Post";

export default class PostsList extends Component {
  render() {
    console.log(this.props.posts);
    const {data} = this.props.posts;
    const posts = data.map((p) =>
      <CSSTransition key={p._id} in={this.props.in} timeout={400} classNames="fade" appear={false}>
        <Post content={p}/>
      </CSSTransition>
    );
    return (
      <TransitionGroup className="posts-list">
        {posts}
      </TransitionGroup>
    );
  }
}

