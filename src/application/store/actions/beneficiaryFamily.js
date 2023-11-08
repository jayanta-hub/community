import {
  FAIL,
  SUCCESS,
  GET_BEN_FAMILY_INFO,
  GET_INDIVISUAL_FAMILY_INFO,
  GET_FAMILY_TYPE,
  GET_BEN_DOC,
} from '../action-types';
import Toast from 'react-native-simple-toast';
export const indivisualFamilyInfo = indivisualfamiliInfo => dispatch =>
  dispatch({
    type: GET_INDIVISUAL_FAMILY_INFO,
    payload: indivisualfamiliInfo,
  });
export const getFamilyDetailsInfo = (token, beneficiaryID) => dispatch =>
  dispatch({
    type: GET_BEN_FAMILY_INFO,
    payload: {
      request: {
        url: `api/v1/beneficiary/${beneficiaryID}/profile/family`,
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
              type: `${GET_BEN_FAMILY_INFO}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_BEN_FAMILY_INFO}_${FAIL}`,
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
              type: `${GET_BEN_FAMILY_INFO}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_BEN_FAMILY_INFO}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const getFamilyType = token => dispatch =>
  dispatch({
    type: GET_FAMILY_TYPE,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/FAMRELTYP`,
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
              type: `${GET_FAMILY_TYPE}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_FAMILY_TYPE}_${FAIL}`,
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
              type: `${GET_FAMILY_TYPE}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_FAMILY_TYPE}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const getProfileDocInfo =
  (authToken, beneficiaryId, familyId) => dispatch =>
    dispatch({
      type: GET_BEN_DOC,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/documents${
            familyId !== null ? `?familyId=${familyId}` : ''
          }`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        },
        options: {
          onSuccess({response}) {
            const {data, error} = response;
            if (data.status === 500) {
              console.log('sendEducationaData-error', data);
              Toast.show(data.message, Toast.LONG);
            }
            if (data.status !== 500) {
              dispatch({
                type: `${GET_BEN_DOC}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${GET_BEN_DOC}_${FAIL}`,
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
                type: `${GET_BEN_DOC}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${GET_BEN_DOC}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
