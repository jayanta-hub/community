import {combineReducers} from 'redux';
import {SUCCESS, LOGOUT} from '../action-types';
import authReducer from './authReducer';
import notificationReducer from './notificationReducer';
import timeLine from './timeLine';
import myAccountReducer from './myAccountReducer';
import beneficiaryFamilyReducer from './beneficiaryFamilyReducer';
import sponsorDetailsReducer from './sponsorDetailsReducer';
import petitionDecisionsReducer from './petitionDecisionsReducer';
const rootReducer = combineReducers({
  authReducer,
  notificationReducer,
  timeLine,
  myAccountReducer,
  beneficiaryFamilyReducer,
  sponsorDetailsReducer,
  petitionDecisionsReducer,
});

const appReducer = (state, action) => {
  if (action.type === `${LOGOUT}_${SUCCESS}`) {
    return rootReducer(undefined);
  }
  return rootReducer(state, action);
};
export default appReducer;
