import initialState from './initialState';
import * as types from './actionTypes';

const sell = (state = initialState, action) => {
  switch (action.type) {
    case types.SELL_SUCCESS:
      return {
        ...state,
        success: action.success
      }
    case types.SELL_ERROR:
      return{
        ...state,
        error: action.error,
        message: action.message
      }
    default:
      return state;
  }
}

export default sell;
