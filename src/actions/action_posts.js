import {auth_axios} from "../api";
// axios.defaults.withCredentials = true;

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const ADD_NEW_POST = 'ADD_NEW_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';


export const fetchPostsAction = (data, type) => {
  return (dispatch) => {
    return auth_axios.get('/v1/posts/')
      .then(response => {
        dispatch(fetchPostsSuccess(response.data))
      })
      .catch(error => {
        dispatch(fetchPostsFailure(error));
      });
  };
};

const fetchPostsSuccess = (payload) => {
  return {
    type: FETCH_POSTS_SUCCESS,
    payload: payload
  }
};

const fetchPostsFailure = (error) => {
  return {
    type: FETCH_POSTS_FAILURE,
    payload: error
  }
};

export const addNewPost = (payload) => {
  return {
    type: ADD_NEW_POST,
    payload: payload
  }
};

export const deletePost = (post_id) => {
  return (dispatch) => {
    return auth_axios.delete(`/v1/posts/post/${post_id}`)
      .then(response => {
        console.log(response)
        dispatch(deletePostSuccess(post_id))
      })
      .catch(error => {
        dispatch(deletePostFailure(error));
      });
  };
};

const deletePostSuccess = (post_id) => {
  return {
    type: DELETE_POST_SUCCESS,
    payload: post_id
  }
};

const deletePostFailure = (error) => {
  return {
    type: DELETE_POST_FAILURE,
    payload: error
  }
};
