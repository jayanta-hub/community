import {
  HOME,
  FAIL,
  SUCCESS,
  UPDATE_PERSONAL_DETAILS,
  FETCH_STATE_LIST,
  FETCH_VISA_LIST,
} from '../action-types';
import Toast from 'react-native-simple-toast';

export const updatePersonalDetails = (authToken, payLoad) => dispatch =>
  dispatch({
    type: UPDATE_PERSONAL_DETAILS,
    payload: {
      request: {
        url: `api/v1/community/benificiaryProfileUpdate`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        data: payLoad,
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status === 200) {
            dispatch({
              type: `${UPDATE_PERSONAL_DETAILS}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${UPDATE_PERSONAL_DETAILS}_${FAIL}`,
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
              type: `${UPDATE_PERSONAL_DETAILS}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${UPDATE_PERSONAL_DETAILS}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const fetchStateList = code => dispatch =>
  dispatch({
    type: FETCH_STATE_LIST,
    payload: {
      request: {
        url: `api/v1/countries/states?countryCode=${code}`,
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
              type: `${FETCH_STATE_LIST}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${FETCH_STATE_LIST}_${FAIL}`,
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
              type: `${FETCH_STATE_LIST}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${FETCH_STATE_LIST}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const fetchVisaList = code => dispatch =>
  dispatch({
    type: FETCH_VISA_LIST,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/IMMSTAT`,
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
              type: `${FETCH_VISA_LIST}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${FETCH_VISA_LIST}_${FAIL}`,
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
              type: `${FETCH_VISA_LIST}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${FETCH_VISA_LIST}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
