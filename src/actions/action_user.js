import {base_axios} from "../api";
// axios.defaults.withCredentials = true;

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';


export const loginRegisterAction = (data, type) => {
  return (dispatch) => {
    return base_axios.post(`/v1/users/${type}`, data)
      .then(response => {
        dispatch(loginActionSuccess(response.data))
      })
      .catch(error => {
        dispatch(loginActionFailure(error));
      });
  };
};

const loginActionSuccess = (payload) => {
  return {
    type: LOGIN_SUCCESS,
    payload: payload
  }
};

const loginActionFailure = (error) => {
  return {
    type: LOGIN_FAILURE,
    payload: error
  }
};

export const logoutAction = (data) => {
  return {
    type: LOGOUT
  }
};
