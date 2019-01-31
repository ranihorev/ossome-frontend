import {auth_axios} from "../api";
// axios.defaults.withCredentials = true;

export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';
export const ADD_NEW_POST = 'ADD_NEW_POST';


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

