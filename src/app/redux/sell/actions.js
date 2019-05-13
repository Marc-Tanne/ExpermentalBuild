import axios from 'axios';
import * as types from './actionTypes';
import moment from 'moment';

function successAction(bool) {
  return {
    type: types.SELL_SUCCESS,
    success: bool
  }
}

function errorAction(bool, message) {
  return {
    type: types.SELL_ERROR,
    error: bool,
    message: message
  }
}

export function sellActionCreator(values) {
  return (dispatch) => {
    let url = `http://localhost:8080/api/bananas`;
    axios.get(url)
      .then((resp) => {
        if (resp.data.length === 0) {
          dispatch(errorAction(true, "Not enough unexpired bananas to fulfill this order."));
        } else {
          let unexpiredBananasInInventory = 0;
          let sellDate = moment(values.sellDate, 'YYYY-MM-DD');
          for (var i = 0; i < resp.data.length; i++) {
            if (resp.data[i]['sellDate'] === null) {
              if (moment(resp.data[i]['buyDate'], 'YYYY-MM-DD').isSameOrAfter(sellDate.subtract(10, 'days'))) {
                unexpiredBananasInInventory += 1;
              }
            }
          }
          if (unexpiredBananasInInventory >= values.number) {
            let url = `http://localhost:8080/api/bananas`;
            axios.put(url, values)
              .then((resp) => {
                dispatch(successAction(true));
              })
              .catch((error) => {
                dispatch(errorAction(true, error.response.data));
              })
              .finally(() => {
                dispatch(successAction(false));
                dispatch(errorAction(false, null));
              })
          } else {
            dispatch(errorAction(true, "Not enough unexpired bananas to fulfill this order."));
          }
        }
      })
      .catch((error) => {
        dispatch(errorAction(true, error.response.data));
      })
      .finally(() => {
        dispatch(successAction(false));
        dispatch(errorAction(false, null));
      })
  }
}
