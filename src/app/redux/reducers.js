import { combineReducers } from 'redux';

import buy from './buy/reducer';
import sell from './sell/reducer';
import analytics from './analytics/reducer';

export default combineReducers({
  buy,
  sell,
  analytics
});
