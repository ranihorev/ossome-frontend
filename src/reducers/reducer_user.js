import {LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT} from "../actions/action_user";
import {auth_axios} from "../api";

const initialState = {
  data: {},
  error: {},

};

export default function dataReducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('user', JSON.stringify(action.payload));
      Object.assign(auth_axios.defaults, {headers: {Authorization: `Bearer ${action.payload.token}`}});
      return {...state, data: action.payload, error: {}};
    case LOGIN_FAILURE:
      return {...state, data: {}, error: action.payload.response};
    case LOGOUT:
      localStorage.removeItem('user');
      return {...state, data: {}, error: {}};

    default:
      return state
  }
}