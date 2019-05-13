import axios from 'axios';
import * as types from './actionTypes';

function successAction(bool) {
  return {
    type: types.BUY_SUCCESS,
    success: bool
  }
}

function errorAction(bool, message) {
  return {
    type: types.BUY_ERROR,
    error: bool,
    message: message
  }
}

export function buyActionCreator(values) {
  return (dispatch) => {
    let url = `http://localhost:8080/api/bananas`;

    axios.post(url, values)
      .then((resp) => {
        dispatch(successAction(true));
      })
      .catch((error) => {
        dispatch(successAction(false));
        dispatch(errorAction(true, error.response.data));
      })
      .finally(() => {
        dispatch(successAction(false));
        dispatch(errorAction(false, null));
      })
  }
}
