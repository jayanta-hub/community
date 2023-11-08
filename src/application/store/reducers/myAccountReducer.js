import {
  FAIL,
  SUCCESS,
  UPDATE_PERSONAL_DETAILS,
  FETCH_STATE_LIST,
  FETCH_VISA_LIST,
} from '../action-types';

const initialState = {
  isUserValid: false,
  isAuthenticating: false,
  updatePersonalDetails: {},
  StateList: {},
  VisaList: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case UPDATE_PERSONAL_DETAILS:
      return {...state, isAuthenticating: true};
    case `${UPDATE_PERSONAL_DETAILS}_${SUCCESS}`:
      return {
        ...state,
        isAuthenticating: false,
        updatePersonalDetails: {...payload},
      };
    case `${UPDATE_PERSONAL_DETAILS}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case FETCH_STATE_LIST:
      return {...state, isAuthenticating: true};
    case `${FETCH_STATE_LIST}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        StateList: {...payload},
      };
    case `${FETCH_STATE_LIST}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case FETCH_VISA_LIST:
      return {...state, isAuthenticating: true};
    case `${FETCH_VISA_LIST}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        VisaList: {...payload},
      };
    case `${FETCH_VISA_LIST}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    default:
      return state;
  }
};
