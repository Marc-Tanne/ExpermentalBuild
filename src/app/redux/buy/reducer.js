import initialState from './initialState';
import * as types from './actionTypes';

const buy = (state = initialState, action) => {
  switch (action.type) {
    case types.BUY_SUCCESS:
      return {
        ...state,
        success: action.success
      }
    case types.BUY_ERROR:
      return {
        ...state,
        error: action.error,
        message: action.message
      }
    default:
      return state;
  }
}

export default buy;
