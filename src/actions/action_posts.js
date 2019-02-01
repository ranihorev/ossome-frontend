import {auth_axios} from "../api";
import {reset} from "redux-form";
import {FORM_NAME} from "../components/newPost/NewPost";

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

export const addNewPost = (content) => {
  return (dispatch) => {
    let formData = new FormData();
    formData.append('images', content['images']);
    formData.append('post_type', 'post');
    delete content.images;
    formData.append('content', JSON.stringify(content));

    const config = {headers: {'content-type': 'multipart/form-data'}}
    return auth_axios.post(`/v1/posts/post/`, formData, config)
      .then(response => {
        dispatch(reset(FORM_NAME));
        dispatch(addNewPostSuccess(response.data.post))
      })
      .catch(error => {
        console.log(error)
      });
  }
};

const addNewPostSuccess = (post) => {
  return {
    type: ADD_NEW_POST,
    payload: post
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
