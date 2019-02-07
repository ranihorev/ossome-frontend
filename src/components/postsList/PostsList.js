import React, { Component } from 'react';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import './postsList.scss';
import Post from "../post/Post";
import PropTypes from 'prop-types';
import {fetchPostsAction} from "../../actions/action_posts";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import {isEmpty} from "lodash";
import queryString from 'query-string';

class PostsList extends Component {

  componentDidMount() {
    const {match, location} = this.props;
    const newParams = {...match.params, ...queryString.parse(location.search)};
    this.props.fetchPosts(newParams);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const newParams = nextProps.match.params;
    const newSearch = nextProps.location.search;
    if (nextProps.location.pathname !== this.props.location.pathname || nextProps.location.search !== this.props.location.search) {
      const allParams = {...newParams, ...queryString.parse(newSearch)};
      this.props.fetchPosts(allParams);
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