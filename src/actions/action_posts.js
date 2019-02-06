import {auth_axios} from "../api";
import {reset, SubmissionError} from "redux-form";
import {FORM_NAME} from "../components/newPost/NewPost";
import {cloneDeep, isEmpty} from "lodash";

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_FAILURE = 'FETCH_POSTS_FAILURE';

export const NEW_POST = 'NEW_POST';

export const DELETE_POST = 'DELETE_POST';
export const DELETE_POST_SUCCESS = 'DELETE_POST_SUCCESS';
export const DELETE_POST_FAILURE = 'DELETE_POST_FAILURE';

export const NEW_COMMENT = 'NEW_COMMENT';


export const fetchPostsAction = (params={}) => {
  return (dispatch) => {
    return auth_axios.get('/v1/posts/', {params: params})
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
    let content_data = cloneDeep(content);
    let formData = new FormData();
    if (!isEmpty(content_data.images))
      content_data.images.forEach((im) => formData.append('images', im));
    formData.append('post_type', 'post');
    delete content_data.images;
    formData.append('content', JSON.stringify(content_data));

    const config = {headers: {'content-type': 'multipart/form-data'}};
    return auth_axios.post(`/v1/posts/post/`, formData, config)
      .then(response => {
        dispatch(addNewPostSuccess(response.data.post));
        dispatch(reset(FORM_NAME));
      })
      .catch((error) => {
        if (!isEmpty(error.response))
          throw new SubmissionError(error.response.data);
        else
          throw new SubmissionError({message: 'Failed to reach server'});
      });
  }
};

export const addNewComment = (comment) => {
  return (dispatch) => {
    return auth_axios.post(`/v1/posts/new_comment/`, comment)
      .then(res => {
        dispatch(addNewCommentSuccess(res.data))
      })
      .catch(err => {
        console.log(err);
        Promise.resolve();
      });
  };
}

const addNewCommentSuccess = (comment) => {
  return {
    type: NEW_COMMENT,
    payload: comment
  }
}

const addNewPostSuccess = (post) => {
  return {
    type: NEW_POST,
    payload: post
  }
};

export const deletePost = (post_id) => {
  return (dispatch) => {
    return auth_axios.delete(`/v1/posts/post/${post_id}`)
      .then(response => {
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

