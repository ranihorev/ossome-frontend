import {ADD_NEW_POST, FETCH_POSTS_FAILURE, FETCH_POSTS_SUCCESS} from "../actions/action_posts";

const initialState = {
  data: [],
  errors: {}
};

export default function postsReducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_POSTS_SUCCESS:
      return {...state, data: action.payload.posts, error: {}};
    case FETCH_POSTS_FAILURE:
      return {...state, data: [], error: action.payload.response};
    case ADD_NEW_POST:
      return {...state, data: [action.payload, ...state.data]};
    default:
      return state
  }
}