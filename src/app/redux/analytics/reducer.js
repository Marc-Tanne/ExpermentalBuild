import initialState from './initialState';
import * as types from './actionTypes';

const analytics = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_BUSINESS_DATA:
      return {
        ...state,
        financialData: action.financialData,
        inventory: action.inventory
      }
    default:
      return state;
  }
}

export default analytics;
