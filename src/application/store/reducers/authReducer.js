import {
  SIGNUP,
  LOGIN,
  FAIL,
  SUCCESS,
  LOGOUT,
  VERIFY_OTP,
  RESEND_OTP,
  VALIDATE_USERNAME,
  RESET_PASSWORD,
  VALIDATE_FORGOTPASSWORD_OTP,
  GET_COUNTRY_DETAILS,
  FORGOT_USERNAME,
  RESEND_OTP_FORGOT_PASSWORD,
  DELETE_ACCOUNT,
  GET_BENEFICIARY_ACCOUNT_STATUS,
  UPDATE_BENEFICIARY_ACCOUNT_STATUS,
} from '../action-types';

const initialState = {
  isUserValid: false,
  isAuthenticating: false,
  authData: {},
  signUpData: {},
  error: {},
  loginUserInformation: {},
  verifyOtp: {},
  resendOtp: {},
  validateUserResp: {},
  resetPw: {},
  changePWotp: {},
  getCountryDetails: {},
  forgotUserID: {},
  resendOtpForForgotPW: {},
  deleteAccount: {},
  getBeneficiaryAccountStatus: {},
  updateBeneficiaryAccountStatus: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case LOGIN:
      return {...state, isAuthenticating: true};
    case `${LOGIN}_${SUCCESS}`:
      return {...state, isUserValid: true, loginUserInformation: {...payload}};
    case `${LOGIN}_${FAIL}`:
      return {
        ...state,
        isAuthenticating: false,
        isUserValid: false,
        error: {...payload},
      };

    case `${LOGOUT}_${SUCCESS}`:
      return {...state, isUserValid: false};

    case SIGNUP:
      return {...state, isAuthenticating: true};
    case `${SIGNUP}_${SUCCESS}`:
      return {...state, isAuthenticating: false, authData: {...payload}};
    case `${SIGNUP}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case VERIFY_OTP:
      return {...state, isAuthenticating: true};
    case `${VERIFY_OTP}_${SUCCESS}`:
      return {...state, isAuthenticating: false, verifyOtp: {...payload}};
    case `${VERIFY_OTP}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case RESEND_OTP:
      return {...state, isAuthenticating: true};
    case `${RESEND_OTP}_${SUCCESS}`:
      return {...state, isAuthenticating: false, resendOtp: {...payload}};
    case `${RESEND_OTP}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case VALIDATE_FORGOTPASSWORD_OTP:
      return {...state, isLoading: true};
    case `${VALIDATE_FORGOTPASSWORD_OTP}_${SUCCESS}`:
      return {...state, changePWotp: {...payload}};
    case `${VALIDATE_FORGOTPASSWORD_OTP}_${FAIL}`:
      return {...state, error: {...payload}};

    case RESEND_OTP_FORGOT_PASSWORD:
      return {...state, isAuthenticating: true};
    case `${RESEND_OTP_FORGOT_PASSWORD}_${SUCCESS}`:
      return {
        ...state,
        isAuthenticating: false,
        resendOtpForForgotPW: {...payload},
      };
    case `${RESEND_OTP_FORGOT_PASSWORD}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case VALIDATE_USERNAME:
      return {...state, isAuthenticating: true};
    case `${VALIDATE_USERNAME}_${SUCCESS}`:
      return {
        ...state,
        isAuthenticating: false,
        validateUserResp: {...payload},
      };
    case `${VALIDATE_USERNAME}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case RESET_PASSWORD:
      return {...state, isAuthenticating: true};
    case `${RESET_PASSWORD}_${SUCCESS}`:
      return {...state, isAuthenticating: false, resetPw: {...payload}};
    case `${RESET_PASSWORD}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case GET_COUNTRY_DETAILS:
      return {...state, isAuthenticating: true};
    case `${GET_COUNTRY_DETAILS}_${SUCCESS}`:
      return {
        ...state,
        isAuthenticating: false,
        getCountryDetails: {...payload},
      };
    case `${GET_COUNTRY_DETAILS}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case FORGOT_USERNAME:
      return {...state, isAuthenticating: true};
    case `${FORGOT_USERNAME}_${SUCCESS}`:
      return {...state, isAuthenticating: false, forgotUserID: {...payload}};
    case `${FORGOT_USERNAME}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case DELETE_ACCOUNT:
      return {...state, isAuthenticating: true};
    case `${DELETE_ACCOUNT}_${SUCCESS}`:
      return {...state, isAuthenticating: false, deleteAccount: {...payload}};
    case `${DELETE_ACCOUNT}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case GET_BENEFICIARY_ACCOUNT_STATUS:
      return {...state, isAuthenticating: true};
    case `${GET_BENEFICIARY_ACCOUNT_STATUS}_${SUCCESS}`:
      return {
        ...state,
        isAuthenticating: false,
        getBeneficiaryAccountStatus: {...payload},
      };
    case `${GET_BENEFICIARY_ACCOUNT_STATUS}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case UPDATE_BENEFICIARY_ACCOUNT_STATUS:
      return {...state, isAuthenticating: true};
    case `${UPDATE_BENEFICIARY_ACCOUNT_STATUS}_${SUCCESS}`:
      return {
        ...state,
        isAuthenticating: false,
        updateBeneficiaryAccountStatus: {...payload},
      };
    case `${UPDATE_BENEFICIARY_ACCOUNT_STATUS}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    default:
      return state;
  }
};
