import axios from 'axios';
import * as types from './actionTypes';
import moment from 'moment';

function loadBusinessData(financialData, inventory) {
  return {
    type: types.LOAD_BUSINESS_DATA,
    financialData: financialData,
    inventory: inventory
  }
}

export function analyticsActionCreator() {
  return (dispatch) => {
    let url = `http://localhost:8080/api/bananas`;
    // If we wanted to implement any header logic, store in config and add to axios.post() as the second argument
    // let config = {headers: {Authorization: "Bearer: "+"auth token"}};

    axios.get(url)
      .then((resp) => {
        // enter request success logic here
        let unexpiredBananasInInventory = 0;
        let expiredBananasInInventory = 0;
        let soldBananas = 0;
        for (var i = 0; i < resp.data.length; i++) {
          resp.data[i]["key"] = i;
          if (resp.data[i]['sellDate'] === null) {
            if (moment(resp.data[i]['buyDate'], 'YYYY-MM-DD').isSameOrAfter(moment(new Date(), 'YYY-MM-DD').subtract(10, 'days'))) {
              unexpiredBananasInInventory += 1;
            } else {
              expiredBananasInInventory += 1;
            }
          } else {
            soldBananas += 1;
          }
        }
        let unexpiredBananasValue = ((unexpiredBananasInInventory * 0.35 * 100) / 100).toFixed(2);
        let expiredBananasValue = ((expiredBananasInInventory * 0.20 * 100) / 100).toFixed(2);
        let soldBananasValue = ((soldBananas * 0.35 * 100) / 100).toFixed(2);
        let financialData = [{
          key: 1,
          unexpiredBananasInInventory: unexpiredBananasInInventory,
          unexpiredBananasValue: "$"+unexpiredBananasValue,
          expiredBananasInInventory: expiredBananasInInventory,
          expiredBananasValue: "$"+expiredBananasValue,
          soldBananas: soldBananas,
          soldBananasValue: "$"+soldBananasValue,
          netProfit: "$"+(parseFloat(unexpiredBananasValue) + parseFloat(soldBananasValue) - parseFloat(expiredBananasValue)).toFixed(2)
        }];
        dispatch(loadBusinessData(financialData, resp.data));
      })
      .catch((error) => {
        // enter request fail logic here
        console.log(error);
      })
      .finally(() => {
        // enter any cleanup logic to run here
      })
  }
}
