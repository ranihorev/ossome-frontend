import {
  NEW_POST, DELETE_POST,
  DELETE_POST_SUCCESS,
  FETCH_POSTS,
  FETCH_POSTS_FAILURE,
  FETCH_POSTS_SUCCESS,
  NEW_COMMENT,
} from "../actions/action_posts";

const initialState = {
  data: [],
  errors: {},
  lastAction: {}
};

export default function postsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return {...state, data: action.payload.posts, errors: {}, lastAction: {type: FETCH_POSTS}};
    case FETCH_POSTS_FAILURE:
      return {...state, data: [], errors: action.payload.response, lastAction: {type: FETCH_POSTS}};
    case NEW_POST:
      return {...state,
        data: [action.payload, ...state.data], errors: {},
        lastAction: {type: NEW_POST, post_id: action.payload._id}
      };
    case NEW_COMMENT:
      const newState = { ...state };
      const post = newState.data.find((p) => p._id === action.payload.post);
      post.comments.push(action.payload.comment);
      return {data: newState.data,
        lastAction: {type: NEW_COMMENT, comment_id: action.payload.comment.id, post_id: action.payload.post},
        errors: {}
      };

    case DELETE_POST_SUCCESS:
      return {...state,
        data: state.data.filter(post => post._id !== action.payload), errors: {},
        lastAction: {type: DELETE_POST, post_id: action.payload}
      };
    default:
      return state
  }
}