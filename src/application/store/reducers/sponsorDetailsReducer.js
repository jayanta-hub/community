import {
  LOGIN,
  FAIL,
  SUCCESS,
  GET_INDIVISUAL_BENEFICIARY_INFO,
  FETCH_STATE_LIST,
  FETCH_COUNTRY_LIST,
  EMPTYPE,
  CURR,
  GETEXPERIENCE_DETAILS,
  POST_PERSONAL_DETAILS,
  FETCH_DEGREE,
  SEND_EDUCATION_INFO,
  GET_EDUCATIONAL_INFO,
  GET_TRAINING_INFO,
  GET_CERTIFICATIONS_INFO,
  GET_EDUCDOC_INFO,
  GET_TRGCDOC_INFO,
  GET_LICCDOC_INFO,
  GET_IMMG_INFO,
  IMMIGRATION_TRAVEL_HISTORY,
  GET_IMMIGRATION_TRAVEL_HISTORY,
  VISA_TYPE,
  PET_TYPE,
  VSAOUT_TYPE,
  GET_SELF,
  POST_SELF,
  DELETE_SELF,
  GET_IMMIGRATION_STATUS,
  IMMI_DOC_TYPE,
  PROFILE_DOC,
  DELETE_US_TRAVEL_HISTORY,
  GET_PROFILE_STATUS,
  GET_BEN_DOC,
} from '../action-types';

const initialState = {
  isUserValid: false,
  isAuthenticating: false,
  indivisualBenInfo: {},
  CountryList: {},
  StateList: {},
  EmptypeList: {},
  CurrList: {},
  ExperienceList: {},
  UpdatedStudentInformation: {},
  Degree: {},
  educationalInfo: {},
  trainingInfo: {},
  certificationsInfo: {},
  educdoctyp: {},
  isLoading: false,
  trgcdoctyp: {},
  liccdoctyp: {},
  immigrationinfo: {},
  visatypeList: {},
  petitionList: {},
  vsaoutList: {},
  immigratationList: {},
  immigratationUpdate: {},
  immigratationDelete: {},
  immigratationStatus: {},
  immigrationTravelHistory: {},
  getImmigrationTravelHistory: {},
  getImmiDocType: {},
  getProfileDoc: {},
  deleteUsTravelHistory: {},
  getProfileStatus: {},
  getAllDocuments: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_INDIVISUAL_BENEFICIARY_INFO:
      return {...state, isLoading: true};
    case `${GET_INDIVISUAL_BENEFICIARY_INFO}_${SUCCESS}`:
      return {...state, indivisualBenInfo: {...payload}, isLoading: false};
    case `${GET_INDIVISUAL_BENEFICIARY_INFO}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};
    case GET_EDUCATIONAL_INFO:
      return {...state, isAuthenticating: true};
    case `${GET_EDUCATIONAL_INFO}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        educationalInfo: {...payload},
      };
    case `${GET_EDUCATIONAL_INFO}_${FAIL}`:

    case GET_EDUCDOC_INFO:
      return {...state, isAuthenticating: true};
    case `${GET_EDUCDOC_INFO}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        educdoctyp: {...payload},
      };
    case `${GET_EDUCDOC_INFO}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };
    case GET_TRGCDOC_INFO:
      return {...state, isAuthenticating: true};
    case `${GET_TRGCDOC_INFO}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        trgcdoctyp: {...payload},
      };
    case `${GET_TRGCDOC_INFO}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };
    case GET_LICCDOC_INFO:
      return {...state, isAuthenticating: true};
    case `${GET_LICCDOC_INFO}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        liccdoctyp: {...payload},
      };
    case `${GET_LICCDOC_INFO}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };
    case GET_TRAINING_INFO:
      return {...state, isAuthenticating: true};
    case `${GET_TRAINING_INFO}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        trainingInfo: {...payload},
      };
    case `${GET_TRAINING_INFO}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };
    case GET_IMMG_INFO:
      return {...state, isAuthenticating: true};
    case `${GET_IMMG_INFO}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        immigrationinfo: {...payload},
      };
    case `${GET_IMMG_INFO}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case GET_CERTIFICATIONS_INFO:
      return {...state, isAuthenticating: true};
    case `${GET_CERTIFICATIONS_INFO}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        certificationsInfo: {...payload},
      };
    case `${GET_CERTIFICATIONS_INFO}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };
    case FETCH_DEGREE:
      return {...state, isAuthenticating: true};
    case `${FETCH_DEGREE}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        Degree: {...payload},
      };
    case `${FETCH_DEGREE}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case FETCH_COUNTRY_LIST:
      return {...state, isAuthenticating: true};
    case `${FETCH_COUNTRY_LIST}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        CountryList: {...payload},
      };
    case `${FETCH_COUNTRY_LIST}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

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

    case EMPTYPE:
      return {...state, isAuthenticating: true};
    case `${EMPTYPE}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        EmptypeList: {...payload},
      };
    case `${EMPTYPE}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case CURR:
      return {...state, isAuthenticating: true};
    case `${CURR}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        CurrList: {...payload},
      };
    case `${CURR}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case GETEXPERIENCE_DETAILS:
      return {...state, isAuthenticating: true};
    case `${GETEXPERIENCE_DETAILS}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        ExperienceList: {...payload},
      };
    case `${GETEXPERIENCE_DETAILS}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case SEND_EDUCATION_INFO:
      return {...state, isAuthenticating: true};
    case `${SEND_EDUCATION_INFO}_${SUCCESS}`:
      return {
        ...state,
      };
    case `${SEND_EDUCATION_INFO}_${FAIL}`:
      return {
        ...state,
        error: {...payload},
      };
    case POST_PERSONAL_DETAILS:
      return {...state, isAuthenticating: true, isLoading: true};
    case `${POST_PERSONAL_DETAILS}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        isLoading: false,
        UpdatedStudentInformation: {...payload},
      };
    case `${POST_PERSONAL_DETAILS}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isLoading: false,
        isUserValid: false,
        error: {...payload},
      };

    case VISA_TYPE:
      return {...state, isAuthenticating: true};
    case `${VISA_TYPE}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        visatypeList: {...payload},
      };
    case `${VISA_TYPE}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case PET_TYPE:
      return {...state, isAuthenticating: true};
    case `${PET_TYPE}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        petitionList: {...payload},
      };
    case `${PET_TYPE}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case VSAOUT_TYPE:
      return {...state, isAuthenticating: true};
    case `${VSAOUT_TYPE}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        vsaoutList: {...payload},
      };
    case `${VSAOUT_TYPE}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case GET_SELF:
      return {...state, isAuthenticating: true};
    case `${GET_SELF}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        immigratationList: {...payload},
      };
    case `${GET_SELF}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case POST_SELF:
      return {...state, isAuthenticating: true};
    case `${POST_SELF}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        immigratationUpdate: {...payload},
      };
    case `${POST_SELF}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case DELETE_SELF:
      return {...state, isAuthenticating: true};
    case `${DELETE_SELF}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        immigratationDelete: {...payload},
      };
    case `${DELETE_SELF}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case GET_IMMIGRATION_STATUS:
      return {...state, isAuthenticating: true};
    case `${GET_IMMIGRATION_STATUS}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        immigratationStatus: {...payload},
      };
    case `${GET_IMMIGRATION_STATUS}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case IMMIGRATION_TRAVEL_HISTORY:
      return {...state, isAuthenticating: true, isLoading: true};
    case `${IMMIGRATION_TRAVEL_HISTORY}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        isLoading: false,
        immigrationTravelHistory: {...payload},
      };
    case `${IMMIGRATION_TRAVEL_HISTORY}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isLoading: false,
        isUserValid: false,
        error: {...payload},
      };

    case GET_IMMIGRATION_TRAVEL_HISTORY:
      return {...state, isAuthenticating: true, isLoading: true};
    case `${GET_IMMIGRATION_TRAVEL_HISTORY}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        isLoading: false,
        getImmigrationTravelHistory: {...payload},
      };
    case `${GET_IMMIGRATION_TRAVEL_HISTORY}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isLoading: false,
        isUserValid: false,
        error: {...payload},
      };

    case IMMI_DOC_TYPE:
      return {...state, isAuthenticating: true, isLoading: true};
    case `${IMMI_DOC_TYPE}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        isLoading: false,
        getImmiDocType: {...payload},
      };
    case `${IMMI_DOC_TYPE}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isLoading: false,
        isUserValid: false,
        error: {...payload},
      };
    case PROFILE_DOC:
      return {...state, isAuthenticating: true, isLoading: true};
    case `${PROFILE_DOC}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        isLoading: false,
        getProfileDoc: {...payload},
      };
    case `${PROFILE_DOC}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isLoading: false,
        isUserValid: false,
        error: {...payload},
      };

    case DELETE_US_TRAVEL_HISTORY:
      return {...state, isAuthenticating: true, isLoading: true};
    case `${DELETE_US_TRAVEL_HISTORY}_${SUCCESS}`:
      return {
        ...state,
        isUserValid: true,
        isLoading: false,
        deleteUsTravelHistory: {...payload},
      };
    case `${DELETE_US_TRAVEL_HISTORY}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isLoading: false,
        isUserValid: false,
        error: {...payload},
      };

    case GET_PROFILE_STATUS:
      return {...state, isLoading: true};
    case `${GET_PROFILE_STATUS}_${SUCCESS}`:
      return {...state, getProfileStatus: {...payload}, isLoading: false};
    case `${GET_PROFILE_STATUS}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};

    case GET_BEN_DOC:
      return {...state, isLoading: true};
    case `${GET_BEN_DOC}_${SUCCESS}`:
      return {...state, getAllDocuments: {...payload}, isLoading: false};
    case `${GET_BEN_DOC}_${FAIL}`:
      return {...state, error: {...payload}, isLoading: false};

    default:
      return state;
  }
};
