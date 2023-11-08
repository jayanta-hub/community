import {
  FAIL,
  SUCCESS,
  GET_BEN_FAMILY_INFO,
  GET_INDIVISUAL_FAMILY_INFO,
  GET_FAMILY_TYPE,
  GET_BEN_DOC,
} from '../action-types';

const initialState = {
  beneficiariesFamily: {},
  indivisualFamilyInfo: {},
  beneficiariesFamilyType: {},
  indivisualBenInfo: {},
  CountryList: {},
  StateList: {},
  getAllDocuments: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_BEN_FAMILY_INFO:
      return {...state};
    case `${GET_BEN_FAMILY_INFO}_${SUCCESS}`:
      return {...state, beneficiariesFamily: {...payload}};
    case `${GET_BEN_FAMILY_INFO}_${FAIL}`:
      return {...state, error: {...payload}};

    case GET_FAMILY_TYPE:
      return {...state};
    case `${GET_FAMILY_TYPE}_${SUCCESS}`:
      return {...state, beneficiariesFamilyType: {...payload}};
    case `${GET_FAMILY_TYPE}_${FAIL}`:
      return {...state, error: {...payload}};

    case GET_INDIVISUAL_FAMILY_INFO:
      return {...state, indivisualFamilyInfo: {...payload}};

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
