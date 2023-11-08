import {
  HOME,
  FAIL,
  SUCCESS,
  GET_OTH_SUPT_APP_DATA,
  GET_USER_INFORMATION,
  GET_COUNTRY_LIST,
  GET_INTER_OVERVIEW,
  STORE_INTER_OVER_DATA,
  GET_READ_MORE_INFO,
  GET_DECISION,
  GET_VISA,
  GET_SERVICECENTER,
  GET_RULE,
  CREATE_POST,
  GET_REASON,
} from '../action-types';
import Toast from 'react-native-simple-toast';
import {baseURLwithPORT} from '../../config';
export const getOtherSupportingAppData = authToken => dispatch =>
  dispatch({
    type: GET_OTH_SUPT_APP_DATA,
    payload: {
      request: {
        url: `${baseURLwithPORT}api/v1/get/mobileAppDetails`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          console.log('oter sssresponse', response);
          if (data.status !== 200) {
            // Toast.show(data.message ? data.message : 'Something went wrong');
          }
          if (data.status === 200) {
            dispatch({
              type: `${GET_OTH_SUPT_APP_DATA}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_OTH_SUPT_APP_DATA}_${FAIL}`,
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
              type: `${GET_OTH_SUPT_APP_DATA}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_OTH_SUPT_APP_DATA}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const getDecisionData = authToken => dispatch =>
  dispatch({
    type: GET_DECISION,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/DECISION`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${GET_DECISION}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_DECISION}_${FAIL}`,
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
              type: `${GET_DECISION}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_DECISION}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const getVisaData = authToken => dispatch =>
  dispatch({
    type: GET_VISA,
    payload: {
      request: {
        url: `api/v1/visas`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${GET_VISA}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_VISA}_${FAIL}`,
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
              type: `${GET_VISA}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_VISA}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const getServiceCenterData = authToken => dispatch =>
  dispatch({
    type: GET_SERVICECENTER,
    payload: {
      request: {
        url: `api/v1/serviceCenter`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${GET_SERVICECENTER}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_SERVICECENTER}_${FAIL}`,
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
              type: `${GET_SERVICECENTER}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_SERVICECENTER}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const getRuleData = authToken => dispatch =>
  dispatch({
    type: GET_RULE,
    payload: {
      request: {
        url: `api/v1/rule`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${GET_RULE}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_RULE}_${FAIL}`,
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
              type: `${GET_RULE}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_RULE}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });

export const getUserInformation = authToken => dispatch =>
  dispatch({
    type: GET_USER_INFORMATION,
    payload: {
      request: {
        url: `api/v1/community/viewProfile`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${GET_USER_INFORMATION}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_USER_INFORMATION}_${FAIL}`,
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
              type: `${GET_USER_INFORMATION}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_USER_INFORMATION}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const fetchCountryList = authToken => dispatch =>
  dispatch({
    type: GET_COUNTRY_LIST,
    payload: {
      request: {
        url: `api/v1/countries`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 200) {
            // Toast.show(data.message ? data.message : 'Something went wrong');
          }
          if (data.status === 200) {
            dispatch({
              type: `${GET_COUNTRY_LIST}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_COUNTRY_LIST}_${FAIL}`,
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
              type: `${GET_COUNTRY_LIST}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_COUNTRY_LIST}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const fetchInterviewOverviewDetails = (authToken, payload) => dispatch =>
  dispatch({
    type: GET_INTER_OVERVIEW,
    payload: {
      request: {
        url: `api/v1/interviews/list`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        data: payload,
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 200) {
            // Toast.show(data.message ? data.message : 'Something went wrong');
          }
          if (data.status === 200) {
            dispatch({
              type: `${GET_INTER_OVERVIEW}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_INTER_OVERVIEW}_${FAIL}`,
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
              type: `${GET_INTER_OVERVIEW}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_INTER_OVERVIEW}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const fetchReadMoreDetails = (authToken, interviewId) => dispatch =>
  dispatch({
    type: GET_READ_MORE_INFO,
    payload: {
      request: {
        url: `api/v1/interview/${interviewId}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 200) {
            // Toast.show(data.message ? data.message : 'Something went wrong');
          }
          if (data.status === 200) {
            dispatch({
              type: `${GET_READ_MORE_INFO}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_READ_MORE_INFO}_${FAIL}`,
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
              type: `${GET_READ_MORE_INFO}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_READ_MORE_INFO}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const InterviewOverViewData = Data => dispatch =>
  dispatch({
    type: STORE_INTER_OVER_DATA,
    payload: Data,
  });

export const PostCreatePost = (authToken, payload) => dispatch =>
  dispatch({
    type: CREATE_POST,
    payload: {
      request: {
        url: `api/v1/post`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        data: payload,
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 200) {
            // Toast.show(data.message ? data.message : 'Something went wrong');
          }
          if (data.status === 200) {
            dispatch({
              type: `${CREATE_POST}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${CREATE_POST}_${FAIL}`,
            payload: {...error},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${CREATE_POST}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${CREATE_POST}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
