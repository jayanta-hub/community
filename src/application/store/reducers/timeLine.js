import {
  FAIL,
  SUCCESS,
  GET_OTH_SUPT_APP_DATA,
  GET_USER_INFORMATION,
  GET_COUNTRY_LIST,
  GET_INTER_OVERVIEW,
  STORE_INTER_OVER_DATA,
  GET_DECISION,
  GET_VISA,
  GET_SERVICECENTER,
  GET_RULE,
  CREATE_POST,
  GET_REASON,
} from '../action-types';

const initialState = {
  isLoading: false,
  getOtherSupportingAppData: {},
  userInformation: {},
  CountryList: {},
  getInterviewOverviewList: {},
  indivisualinterviewInfo: {},
  DecisionData: {},
  VisaData: {},
  ServiceCenterData: {},
  RuleData: {},
  CreatePostData: {},
  ReasonData: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_OTH_SUPT_APP_DATA:
      return {...state, isLoading: true};
    case `${GET_OTH_SUPT_APP_DATA}_${SUCCESS}`:
      return {
        ...state,
        getOtherSupportingAppData: {...payload},
        isLoading: false,
      };
    case `${GET_OTH_SUPT_APP_DATA}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};

    case GET_USER_INFORMATION:
      return {...state, isLoading: true};
    case `${GET_USER_INFORMATION}_${SUCCESS}`:
      return {
        ...state,
        userInformation: {...payload},
        isLoading: false,
      };
    case `${GET_USER_INFORMATION}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};

    case GET_COUNTRY_LIST:
      return {...state, isLoading: true};
    case `${GET_COUNTRY_LIST}_${SUCCESS}`:
      return {
        ...state,
        CountryList: {...payload},
        isLoading: false,
      };
    case `${GET_COUNTRY_LIST}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};

    case GET_INTER_OVERVIEW:
      return {...state, isLoading: true};
    case `${GET_INTER_OVERVIEW}_${SUCCESS}`:
      return {
        ...state,
        getInterviewOverviewList: {...payload},
        isLoading: false,
      };
    case `${GET_INTER_OVERVIEW}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};

    case GET_DECISION:
      return {...state, isLoading: true};
    case `${GET_DECISION}_${SUCCESS}`:
      return {
        ...state,
        DecisionData: {...payload},
        isLoading: false,
      };
    case `${GET_DECISION}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};

    case GET_VISA:
      return {...state, isLoading: true};
    case `${GET_VISA}_${SUCCESS}`:
      return {
        ...state,
        VisaData: {...payload},
        isLoading: false,
      };
    case `${GET_VISA}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};

    case GET_SERVICECENTER:
      return {...state, isLoading: true};
    case `${GET_SERVICECENTER}_${SUCCESS}`:
      return {
        ...state,
        ServiceCenterData: {...payload},
        isLoading: false,
      };
    case `${GET_SERVICECENTER}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};

    case GET_RULE:
      return {...state, isLoading: true};
    case `${GET_RULE}_${SUCCESS}`:
      return {
        ...state,
        RuleData: {...payload},
        isLoading: false,
      };
    case `${GET_RULE}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};

    case CREATE_POST:
      return {...state, isLoading: true};
    case `${CREATE_POST}_${SUCCESS}`:
      return {
        ...state,
        CreatePostData: {...payload},
        isLoading: false,
      };
    case `${CREATE_POST}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};

    case GET_REASON:
      return {...state, isLoading: true};
    case `${GET_REASON}_${SUCCESS}`:
      return {
        ...state,
        ReasonData: {...payload},
        isLoading: false,
      };
    case `${GET_REASON}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};

    case STORE_INTER_OVER_DATA:
      return {...state, indivisualinterviewInfo: {...payload}};

    default:
      return state;
  }
};
