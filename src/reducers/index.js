import { combineReducers } from 'redux'

import userReducer from './reducer_user';
import { reducer as formReducer } from 'redux-form'
import postsReducer from "./reducer_posts";

const rootReducer = combineReducers({
  user: userReducer,
  posts: postsReducer,
  form: formReducer,
})

export default rootReducer


