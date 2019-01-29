import axios from 'axios';
// axios.defaults.withCredentials = true;

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const BASE_URL = process.env.REACT_APP_BASE_URL;


export const loginAction = (data) => {
  return (dispatch) => {
    return axios.post(`${BASE_URL}/v1/users/login`, data)
      .then(response => {
        dispatch(loginActionSuccess(response.data))
      })
      .catch(error => {
        dispatch(loginActionFailure(error));
      });
  };
};

export const logoutAction = (data) => {
  return {
    type: LOGOUT
  }
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

// export function signup(data) {
//     const request = axios.post(AUTH_BASE_URL + '/registration/', data);
//     return {
//         type: USER_LOGGED_IN,
//         payload: request
//     }
// }