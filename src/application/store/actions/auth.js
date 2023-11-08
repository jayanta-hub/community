import {
  HOME,
  FAIL,
  SUCCESS,
  SIGNUP,
  LOGIN,
  LOGOUT,
  VERIFY_OTP,
  RESEND_OTP,
  VALIDATE_USERNAME,
  RESET_PASSWORD,
  VALIDATE_FORGOTPASSWORD_OTP,
  FORGOT_USERNAME,
  CHANGE_PASSWORD,
  USERNAME,
  GET_COUNTRY_DETAILS,
  RESEND_OTP_FORGOT_PASSWORD,
  DELETE_ACCOUNT,
  GET_BENEFICIARY_ACCOUNT_STATUS,
  UPDATE_BENEFICIARY_ACCOUNT_STATUS,
} from '../action-types';
import Toast from 'react-native-simple-toast';

export const logIn = payloadData => dispatch =>
  dispatch({
    type: LOGIN,
    payload: {
      request: {
        url: 'api/v1/authenticate',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: payloadData,
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${LOGIN}_${SUCCESS}`,
              payload: {...data, ...payloadData},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${LOGIN}_${FAIL}`,
            payload: {...data},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({type: `${LOGIN}_${FAIL}`, payload: {dataError}});
            return Promise.reject(dataError);
          }
          dispatch({type: `${LOGIN}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });

export const Logout = () => dispatch => {
  dispatch({
    type: `${LOGOUT}_${SUCCESS}`,
  });
};

export const signUp = payloadData => dispatch =>
  dispatch({
    type: SIGNUP,
    payload: {
      request: {
        url: 'api/v1/register',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: payloadData,
      },
      options: {
        onSuccess({response}) {
          console.log('response', response);
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${SIGNUP}_${SUCCESS}`,
              payload: {...data, ...payloadData},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${SIGNUP}_${FAIL}`,
            payload: {...data},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({type: `${SIGNUP}_${FAIL}`, payload: {dataError}});
            return Promise.reject(dataError);
          }
          dispatch({type: `${SIGNUP}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });

export const verifyOtpAction = (id, userotp) => dispatch =>
  dispatch({
    type: VERIFY_OTP,
    payload: {
      request: {
        url: `api/v1/confirmRegistration?id=${id}&userotp=${userotp}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${VERIFY_OTP}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${VERIFY_OTP}_${FAIL}`,
            payload: {...data},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          console.log('exception', exception);
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({type: `${VERIFY_OTP}_${FAIL}`, payload: {dataError}});
            return Promise.reject(dataError);
          }
          dispatch({type: `${VERIFY_OTP}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });

export const resendOtpAction = id => dispatch =>
  dispatch({
    type: RESEND_OTP,
    payload: {
      request: {
        url: `api/v1/resendOTP?id=${id}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${RESEND_OTP}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${RESEND_OTP}_${FAIL}`,
            payload: {...data},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({type: `${RESEND_OTP}_${FAIL}`, payload: {dataError}});
            return Promise.reject(dataError);
          }
          dispatch({type: `${RESEND_OTP}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });

export const validateUserAction = payload => dispatch =>
  dispatch({
    type: VALIDATE_USERNAME,
    payload: {
      request: {
        url: `api/v1/validateUser`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        params: payload,
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${VALIDATE_USERNAME}_${SUCCESS}`,
              payload: {...data, ...payload},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${VALIDATE_USERNAME}_${FAIL}`,
            payload: {...error},
          });
          return Promise.reject(error);
        },
        onError(exception) {
          console.log('exception', exception);
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${VALIDATE_USERNAME}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${VALIDATE_USERNAME}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });

export const resetPassword = payloadData => dispatch =>
  dispatch({
    type: RESET_PASSWORD,
    payload: {
      request: {
        url: 'api/v1/forgotPassword',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: payloadData,
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 200) {
            Toast.show(data.message, Toast.LONG);
          }
          if (data.status === 200) {
            dispatch({
              type: `${RESET_PASSWORD}_${SUCCESS}`,
              payload: {...data, ...payloadData},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${RESET_PASSWORD}_${FAIL}`,
            payload: {...error},
          });
          return Promise.reject(error);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${RESET_PASSWORD}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${RESET_PASSWORD}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });

export const getOTPforForgotPW = (Id, OTP) => dispatch =>
  dispatch({
    type: VALIDATE_FORGOTPASSWORD_OTP,
    payload: {
      request: {
        url: `api/v1/confirmRegistration?id=${Id}&userotp=${OTP}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${VALIDATE_FORGOTPASSWORD_OTP}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${VALIDATE_FORGOTPASSWORD_OTP}_${FAIL}`,
            payload: {...data},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${VALIDATE_FORGOTPASSWORD_OTP}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${VALIDATE_FORGOTPASSWORD_OTP}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });

export const resendOtpForForgotPW = UserID => dispatch =>
  dispatch({
    type: RESEND_OTP_FORGOT_PASSWORD,
    payload: {
      request: {
        url: `api/v1/validateUser?userName=${UserID}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${RESEND_OTP_FORGOT_PASSWORD}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${RESEND_OTP_FORGOT_PASSWORD}_${FAIL}`,
            payload: {...data},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${RESEND_OTP_FORGOT_PASSWORD}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${RESEND_OTP_FORGOT_PASSWORD}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });

export const forgotPasswordOTP = userName => dispatch =>
  dispatch({
    type: VALIDATE_USERNAME,
    payload: {
      request: {
        url: `api/v1/validateUser?userName=${userName}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${VALIDATE_USERNAME}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${VALIDATE_USERNAME}_${FAIL}`,
            payload: {...data},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${VALIDATE_USERNAME}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${VALIDATE_USERNAME}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });

export const forgotUsername = email => dispatch =>
  dispatch({
    type: FORGOT_USERNAME,
    payload: {
      request: {
        url: `api/v1/forgotUserId`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        data: email,
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${FORGOT_USERNAME}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${FORGOT_USERNAME}_${FAIL}`,
            payload: {...data},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${FORGOT_USERNAME}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${FORGOT_USERNAME}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });

export const changePassword = (token, payload) => dispatch =>
  dispatch({
    type: CHANGE_PASSWORD,
    payload: {
      request: {
        url: `api/v1/changePassword`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: payload,
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${CHANGE_PASSWORD}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${CHANGE_PASSWORD}_${FAIL}`,
            payload: {...error},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          console.log('e');
          if (exception.error) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${CHANGE_PASSWORD}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${CHANGE_PASSWORD}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });

export const userInfo = token => dispatch =>
  dispatch({
    type: USERNAME,
    payload: {
      request: {
        url: `api/v1/user`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 500) {
            Toast.show(data.message, Toast.LONG);
          }
          if (data.status !== 500) {
            dispatch({
              type: `${USERNAME}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${USERNAME}_${FAIL}`,
            payload: {...error},
          });
          return Promise.reject(error);
        },
        onError(exception) {
          if (exception.error) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${USERNAME}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${USERNAME}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });

export const getCountryDetails = () => dispatch =>
  dispatch({
    type: GET_COUNTRY_DETAILS,
    payload: {
      request: {
        url: `api/v1/countries`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 500) {
            Toast.show(data.message, Toast.LONG);
          }
          if (data.status !== 500) {
            dispatch({
              type: `${GET_COUNTRY_DETAILS}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_COUNTRY_DETAILS}_${FAIL}`,
            payload: {...error},
          });
          return Promise.reject(error);
        },
        onError(exception) {
          if (exception.error) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${GET_COUNTRY_DETAILS}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_COUNTRY_DETAILS}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });

export const deleteBeneficiaryAccount = (token, beneficiaryId) => dispatch =>
  dispatch({
    type: DELETE_ACCOUNT,
    payload: {
      request: {
        url: `api/v1/deleteAccount/beneficiary/${beneficiaryId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${DELETE_ACCOUNT}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${DELETE_ACCOUNT}_${FAIL}`,
            payload: {...error},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${DELETE_ACCOUNT}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${DELETE_ACCOUNT}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });

export const getAccountStatus = userName => dispatch =>
  dispatch({
    type: GET_BENEFICIARY_ACCOUNT_STATUS,
    payload: {
      request: {
        url: `/api/v1/identify/beneficiaryDeactiveAccount/${userName}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${GET_BENEFICIARY_ACCOUNT_STATUS}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_BENEFICIARY_ACCOUNT_STATUS}_${FAIL}`,
            payload: {...error},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${GET_BENEFICIARY_ACCOUNT_STATUS}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_BENEFICIARY_ACCOUNT_STATUS}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });

export const updateAccountStatus = userName => dispatch =>
  dispatch({
    type: UPDATE_BENEFICIARY_ACCOUNT_STATUS,
    payload: {
      request: {
        url: `/api/v1/reActive/beneficiaryAccount/${userName}?isActivateAccount=true`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${UPDATE_BENEFICIARY_ACCOUNT_STATUS}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${UPDATE_BENEFICIARY_ACCOUNT_STATUS}_${FAIL}`,
            payload: {...error},
          });
          return Promise.reject(error);
        },
        onError(exception) {
          if (exception.error) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${UPDATE_BENEFICIARY_ACCOUNT_STATUS}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${UPDATE_BENEFICIARY_ACCOUNT_STATUS}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
