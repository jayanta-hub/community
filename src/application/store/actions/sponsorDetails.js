import {
  FAIL,
  SUCCESS,
  HOME,
  GET_INDIVISUAL_BENEFICIARY_INFO,
  FETCH_STATE_LIST,
  FETCH_COUNTRY_LIST,
  EMPTYPE,
  CURR,
  GETEXPERIENCE_DETAILS,
  UPDATE_EXPERIENCE_DETAILS,
  DELETE_EXPERIENCE_DETAILS,
  POST_PERSONAL_DETAILS,
  FETCH_DEGREE,
  SEND_EDUCATION_INFO,
  GET_EDUCATIONAL_INFO,
  GET_TRAINING_INFO,
  SEND_TRAINING_INFO,
  SEND_CERTIFICATIONS_INFO,
  GET_CERTIFICATIONS_INFO,
  GET_EDUCDOC_INFO,
  DELETE_EXPERIENCE_DOC,
  DELETE_EDUC_INFO,
  GET_TRGCDOC_INFO,
  GET_LICCDOC_INFO,
  DELETE_REL_DOC,
  DELETE_LIC_INFO,
  DELETE_TRG_INFO,
  IMMIGRATION_TRAVEL_HISTORY,
  GET_IMMIGRATION_TRAVEL_HISTORY,
  VISA_TYPE,
  PET_TYPE,
  VSAOUT_TYPE,
  GET_SELF,
  POST_SELF,
  DELETE_SELF,
  POST_IMMIGRATION_STATUS,
  GET_IMMIGRATION_STATUS,
  IMMI_DOC_TYPE,
  DELETE_IMMI_DOC,
  PASSPORT_DOC,
  DELETE_US_TRAVEL_HISTORY,
  GET_PROFILE_STATUS,
  GREENCARD_DOC,
  GET_BEN_DOC,
} from '../action-types';
import Toast from 'react-native-simple-toast';

export const getIndiBeneficiaryInfo = (token, beneficiaryID) => dispatch =>
  dispatch({
    type: GET_INDIVISUAL_BENEFICIARY_INFO,
    payload: {
      request: {
        url: `api/v1/beneficiary/${beneficiaryID}/profile/self`,
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
              type: `${GET_INDIVISUAL_BENEFICIARY_INFO}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_INDIVISUAL_BENEFICIARY_INFO}_${FAIL}`,
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
              type: `${GET_INDIVISUAL_BENEFICIARY_INFO}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_INDIVISUAL_BENEFICIARY_INFO}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const getEducationInfo =
  (authToken, beneficiaryId, familyId) => dispatch =>
    dispatch({
      type: GET_EDUCATIONAL_INFO,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/education${
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
            if (data.status) {
              dispatch({
                type: `${GET_EDUCATIONAL_INFO}_${SUCCESS}`,
                payload: {...data},
              });
              dispatch({
                type: HOME,
                payload: {...data},
              });
              return Promise.resolve({...data});
            }
            dispatch({
              type: `${GET_EDUCATIONAL_INFO}_${FAIL}`,
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
                type: `${GET_EDUCATIONAL_INFO}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${GET_EDUCATIONAL_INFO}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const getCertificationsInfo =
  (authToken, beneficiaryId, familyId) => dispatch =>
    dispatch({
      type: GET_CERTIFICATIONS_INFO,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/professional/license${
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
            if (data.status) {
              dispatch({
                type: `${GET_CERTIFICATIONS_INFO}_${SUCCESS}`,
                payload: {...data},
              });
              dispatch({
                type: HOME,
                payload: {...data},
              });
              return Promise.resolve({...data});
            }
            dispatch({
              type: `${GET_CERTIFICATIONS_INFO}_${FAIL}`,
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
                type: `${GET_CERTIFICATIONS_INFO}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${GET_CERTIFICATIONS_INFO}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const getEducationaDocumentTypeInfo = authToken => dispatch =>
  dispatch({
    type: GET_EDUCDOC_INFO,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/BENEDUDOC`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status) {
            dispatch({
              type: `${GET_EDUCDOC_INFO}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_EDUCDOC_INFO}_${FAIL}`,
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
              type: `${GET_EDUCDOC_INFO}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${GET_EDUCDOC_INFO}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const getTrainingDocumentTypeInfo = authToken => dispatch =>
  dispatch({
    type: GET_TRGCDOC_INFO,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/BENTRGDOC`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status) {
            dispatch({
              type: `${GET_TRGCDOC_INFO}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_TRGCDOC_INFO}_${FAIL}`,
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
              type: `${GET_TRGCDOC_INFO}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${GET_TRGCDOC_INFO}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const getlicenseDocumentTypeInfo = authToken => dispatch =>
  dispatch({
    type: GET_LICCDOC_INFO,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/BENLICDOC`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status) {
            dispatch({
              type: `${GET_LICCDOC_INFO}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_LICCDOC_INFO}_${FAIL}`,
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
              type: `${GET_LICCDOC_INFO}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${GET_LICCDOC_INFO}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const getTrainingInfo =
  (authToken, beneficiaryId, familyId) => dispatch =>
    dispatch({
      type: GET_TRAINING_INFO,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/professional/Training${
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
            if (data.status) {
              dispatch({
                type: `${GET_TRAINING_INFO}_${SUCCESS}`,
                payload: {...data},
              });
              dispatch({
                type: HOME,
                payload: {...data},
              });
              return Promise.resolve({...data});
            }
            dispatch({
              type: `${GET_TRAINING_INFO}_${FAIL}`,
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
                type: `${GET_TRAINING_INFO}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${GET_TRAINING_INFO}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const fetchCountryList = () => dispatch =>
  dispatch({
    type: FETCH_COUNTRY_LIST,
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
              type: `${FETCH_COUNTRY_LIST}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${FETCH_COUNTRY_LIST}_${FAIL}`,
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
              type: `${FETCH_COUNTRY_LIST}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${FETCH_COUNTRY_LIST}_${FAIL}`, payload: {}});
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
export const EmpTypeList = token => dispatch =>
  dispatch({
    type: EMPTYPE,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/EMPTYP`,
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
              type: `${EMPTYPE}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${EMPTYPE}_${FAIL}`,
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
              type: `${EMPTYPE}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${EMPTYPE}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const CurrList = token => dispatch =>
  dispatch({
    type: CURR,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/CURR`,
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
              type: `${CURR}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${CURR}_${FAIL}`,
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
              type: `${CURR}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${CURR}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const ExperienceDetails = (token, beneficiaryId, familyId) => dispatch =>
  dispatch({
    type: GETEXPERIENCE_DETAILS,
    payload: {
      request: {
        url: `api/v1/beneficiary/${beneficiaryId}/profile/experience${
          familyId !== null ? `?familyId=${familyId}` : ''
        }`,
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
              type: `${GETEXPERIENCE_DETAILS}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GETEXPERIENCE_DETAILS}_${FAIL}`,
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
              type: `${GETEXPERIENCE_DETAILS}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${GETEXPERIENCE_DETAILS}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const updateWorkDetails =
  (token, beneficiaryId, payload, familyId) => dispatch =>
    dispatch({
      type: UPDATE_EXPERIENCE_DETAILS,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/experience${
            familyId !== null ? `?familyId=${familyId}` : ''
          }`,
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
            if (data.status === 500) {
              Toast.show(data.message, Toast.LONG);
            }
            if (data.status !== 500) {
              dispatch({
                type: `${UPDATE_EXPERIENCE_DETAILS}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${UPDATE_EXPERIENCE_DETAILS}_${FAIL}`,
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
                type: `${UPDATE_EXPERIENCE_DETAILS}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${UPDATE_EXPERIENCE_DETAILS}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });
export const deleteWorkDetails =
  (token, beneficiaryId, experienceId) => dispatch =>
    dispatch({
      type: DELETE_EXPERIENCE_DETAILS,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/experience/${experienceId}`,
          method: 'DELETE',
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
                type: `${DELETE_EXPERIENCE_DETAILS}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${DELETE_EXPERIENCE_DETAILS}_${FAIL}`,
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
                type: `${DELETE_EXPERIENCE_DETAILS}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${DELETE_EXPERIENCE_DETAILS}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });
export const fetchDegree = authToken => dispatch =>
  dispatch({
    type: FETCH_DEGREE,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/DEGR`,
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
            console.log('getDegree-error', data);
            Toast.show(data.message, Toast.LONG);
          }
          if (data.status !== 500) {
            dispatch({
              type: `${FETCH_DEGREE}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${FETCH_DEGREE}_${FAIL}`,
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
              type: `${FETCH_DEGREE}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${FETCH_DEGREE}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const sendEducationInfo =
  (authToken, payload, beneficiaryId, familyId) => dispatch =>
    dispatch({
      type: SEND_EDUCATION_INFO,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/education${
            familyId !== null ? `?familyId=${familyId}` : ''
          }`,
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
            if (data.status === 500) {
              console.log('sendEducationaData-error', data);
              Toast.show(data.message, Toast.LONG);
            }
            if (data.status !== 500) {
              dispatch({
                type: `${SEND_EDUCATION_INFO}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${SEND_EDUCATION_INFO}_${FAIL}`,
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
                type: `${SEND_EDUCATION_INFO}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(exception);
            }
            dispatch({type: `${SEND_EDUCATION_INFO}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const studentPesonalDetails =
  (authToken, payloadData, beneficiaryId, familyType) => dispatch =>
    dispatch({
      type: POST_PERSONAL_DETAILS,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/${
            familyType === null ? 'self' : familyType
          }`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
          data: payloadData,
        },
        options: {
          onSuccess({response}) {
            const {data, error} = response;
            if (data.status === 500) {
              Toast.show(data.message, Toast.LONG);
            }
            if (data.status) {
              dispatch({
                type: `${POST_PERSONAL_DETAILS}_${SUCCESS}`,
                payload: {...data},
              });
              dispatch({
                type: HOME,
                payload: {...data},
              });
              return Promise.resolve({...data});
            } else {
              console.log('re');
            }
            dispatch({
              type: `${POST_PERSONAL_DETAILS}_${FAIL}`,
              payload: {...error},
            });
            return Promise.reject(error);
          },
          onError(exception) {
            Toast.show(exception.error.message, Toast.LONG);
            if (exception.error.isAxiosError) {
              const {
                response: {data: dataError},
              } = exception.error;
              dispatch({
                type: `${POST_PERSONAL_DETAILS}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${POST_PERSONAL_DETAILS}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const sendCertificationsInfo =
  (authToken, payload, beneficiaryId, familyId) => dispatch =>
    dispatch({
      type: SEND_CERTIFICATIONS_INFO,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/professional/license${
            familyId !== null ? `?familyId=${familyId}` : ''
          }`,
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
            if (data.status === 500) {
              console.log('sendEducationaData-error', data);
              Toast.show(data.message, Toast.LONG);
            }
            if (data.status !== 500) {
              dispatch({
                type: `${SEND_CERTIFICATIONS_INFO}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${SEND_CERTIFICATIONS_INFO}_${FAIL}`,
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
                type: `${SEND_CERTIFICATIONS_INFO}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${SEND_CERTIFICATIONS_INFO}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });
export const sendTrainingInfo =
  (authToken, payload, beneficiaryId, familyId) => dispatch =>
    dispatch({
      type: SEND_TRAINING_INFO,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/professional/Training${
            familyId !== null ? `?familyId=${familyId}` : ''
          }`,
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
            if (data.status === 500) {
              console.log('sendEducationaData-error', data);
              Toast.show(data.message, Toast.LONG);
            }
            if (data.status !== 500) {
              dispatch({
                type: `${SEND_TRAINING_INFO}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${SEND_TRAINING_INFO}_${FAIL}`,
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
                type: `${SEND_TRAINING_INFO}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${SEND_TRAINING_INFO}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const deleteEducationInfo =
  (authToken, beneficiaryId, educationId) => dispatch =>
    dispatch({
      type: DELETE_EDUC_INFO,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/education/${educationId}`,
          method: 'DELETE',
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
                type: `${DELETE_EDUC_INFO}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${DELETE_EDUC_INFO}_${FAIL}`,
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
                type: `${DELETE_EDUC_INFO}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${DELETE_EDUC_INFO}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const deleteTrainingInfo =
  (authToken, beneficiaryId, professionalId, type) => dispatch =>
    dispatch({
      type: DELETE_TRG_INFO,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/professional/${professionalId}/${type}`,
          method: 'DELETE',
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
                type: `${DELETE_TRG_INFO}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${DELETE_TRG_INFO}_${FAIL}`,
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
                type: `${DELETE_TRG_INFO}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${DELETE_TRG_INFO}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const deleteCertificateInfo =
  (authToken, beneficiaryId, professionalId, type) => dispatch =>
    dispatch({
      type: DELETE_LIC_INFO,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/profile/professional/${professionalId}/${type}`,
          method: 'DELETE',
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
                type: `${DELETE_LIC_INFO}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${DELETE_LIC_INFO}_${FAIL}`,
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
                type: `${DELETE_LIC_INFO}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${DELETE_LIC_INFO}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const relatedDocDelete =
  (authToken, beneficiaryId, categoryName, fileCategory, fileId) => dispatch =>
    dispatch({
      type: DELETE_REL_DOC,
      payload: {
        request: {
          url: `api/v1/document/beneficiary/${beneficiaryId}/category/${categoryName}/fileCategory/${fileCategory}/${fileId}`,
          method: 'DELETE',
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
                type: `${DELETE_REL_DOC}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${DELETE_REL_DOC}_${FAIL}`,
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
                type: `${DELETE_REL_DOC}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${DELETE_REL_DOC}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const deleteExperienceDoc =
  (authToken, beneficiaryId, categoryName, fileCategory, fileId) => dispatch =>
    dispatch({
      type: DELETE_EXPERIENCE_DOC,
      payload: {
        request: {
          url: `api/v1/document/beneficiary/${beneficiaryId}/category/${categoryName}/fileCategory/${fileCategory}/${fileId}`,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
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
                type: `${DELETE_EXPERIENCE_DOC}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${DELETE_EXPERIENCE_DOC}_${FAIL}`,
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
                type: `${DELETE_EXPERIENCE_DOC}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${DELETE_EXPERIENCE_DOC}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const fetchVisa = authToken => dispatch =>
  dispatch({
    type: VISA_TYPE,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/IMMSTAT`,
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
            console.log('getvisa type-error', data);
            Toast.show(data.message, Toast.LONG);
          }
          if (data.status !== 500) {
            dispatch({
              type: `${VISA_TYPE}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${VISA_TYPE}_${FAIL}`,
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
              type: `${VISA_TYPE}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${VISA_TYPE}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const fetchPet = authToken => dispatch =>
  dispatch({
    type: PET_TYPE,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/PETTYP`,
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
            console.log('get pet type-error', data);
            Toast.show(data.message, Toast.LONG);
          }
          if (data.status !== 500) {
            dispatch({
              type: `${PET_TYPE}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${PET_TYPE}_${FAIL}`,
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
              type: `${PET_TYPE}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${PET_TYPE}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const fetchVsaOut = authToken => dispatch =>
  dispatch({
    type: VSAOUT_TYPE,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/VSAOUT `,
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
            console.log('get pet type-error', data);
            Toast.show(data.message, Toast.LONG);
          }
          if (data.status !== 500) {
            dispatch({
              type: `${VSAOUT_TYPE}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${VSAOUT_TYPE}_${FAIL}`,
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
              type: `${VSAOUT_TYPE}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${VSAOUT_TYPE}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const fetchImmigratationSelf =
  (authToken, beneficiaryId, familyId) => dispatch =>
    dispatch({
      type: GET_SELF,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/immigration/self${
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
              console.log('get immigratation self type-error', data);
              Toast.show(data.message, Toast.LONG);
            }
            if (data.status !== 500) {
              dispatch({
                type: `${GET_SELF}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${GET_SELF}_${FAIL}`,
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
                type: `${GET_SELF}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${GET_SELF}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const updateImmigratationSelf =
  (authToken, beneficiaryId, payload, familyId) => dispatch =>
    dispatch({
      type: GET_SELF,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/immigration/self${
            familyId !== null ? `?familyId=${familyId}` : ''
          }`,
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
            if (data.status === 500) {
              console.log('Post immigratation self type-error', data);
              Toast.show(data.message, Toast.LONG);
            }
            if (data.status !== 500) {
              dispatch({
                type: `${POST_SELF}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${POST_SELF}_${FAIL}`,
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
                type: `${POST_SELF}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${POST_SELF}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const deleteImmigratationSelf =
  (authToken, beneficiaryId, immigrationId) => dispatch =>
    dispatch({
      type: DELETE_SELF,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/immigration/${immigrationId}`,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        },
        options: {
          onSuccess({response}) {
            const {data, error} = response;
            if (data.status === 500) {
              console.log('Post immigratation self type-error', data);
              Toast.show(data.message, Toast.LONG);
            }
            if (data.status !== 500) {
              dispatch({
                type: `${DELETE_SELF}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${DELETE_SELF}_${FAIL}`,
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
                type: `${DELETE_SELF}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${DELETE_SELF}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const updateImmigratationStatus =
  (authToken, beneficiaryId, payload, familyId) => dispatch =>
    dispatch({
      type: POST_IMMIGRATION_STATUS,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/immigration/meta/self${
            familyId !== null ? `?familyId=${familyId}` : ''
          }`,
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
            if (data.status === 500) {
              console.log('Post immigratation status type-error', data);
              Toast.show(data.message, Toast.LONG);
            }
            if (data.status !== 500) {
              dispatch({
                type: `${POST_IMMIGRATION_STATUS}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${POST_IMMIGRATION_STATUS}_${FAIL}`,
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
                type: `${POST_IMMIGRATION_STATUS}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${POST_IMMIGRATION_STATUS}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });
export const fetchImmigratationStatus =
  (authToken, beneficiaryId, familyId) => dispatch =>
    dispatch({
      type: GET_IMMIGRATION_STATUS,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/immigration/meta/self${
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
              console.log('Get immigratation status type-error', data);
              Toast.show(data.message, Toast.LONG);
            }
            if (data.status !== 500) {
              dispatch({
                type: `${GET_IMMIGRATION_STATUS}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${GET_IMMIGRATION_STATUS}_${FAIL}`,
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
                type: `${GET_IMMIGRATION_STATUS}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${GET_IMMIGRATION_STATUS}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });
export const immigrationTravelHistory =
  (token, beneficiaryId, immigrationId, payload, familyId) => dispatch =>
    dispatch({
      type: IMMIGRATION_TRAVEL_HISTORY,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/immigration/${immigrationId}/travelInfo${
            familyId !== null ? `?familyId=${familyId}` : ''
          }`,
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
            if (data.status === 500) {
              Toast.show(data.message, Toast.LONG);
            }
            if (data.status !== 500) {
              dispatch({
                type: `${IMMIGRATION_TRAVEL_HISTORY}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${IMMIGRATION_TRAVEL_HISTORY}_${FAIL}`,
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
                type: `${IMMIGRATION_TRAVEL_HISTORY}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${IMMIGRATION_TRAVEL_HISTORY}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });
export const getImmigrationTravelHistory =
  (token, beneficiaryId, immigrationId) => dispatch =>
    dispatch({
      type: GET_IMMIGRATION_TRAVEL_HISTORY,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/immigration/${immigrationId}/travelInfo`,
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
                type: `${GET_IMMIGRATION_TRAVEL_HISTORY}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${GET_IMMIGRATION_TRAVEL_HISTORY}_${FAIL}`,
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
                type: `${GET_IMMIGRATION_TRAVEL_HISTORY}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${GET_IMMIGRATION_TRAVEL_HISTORY}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });
export const fetchImmiDocType = token => dispatch =>
  dispatch({
    type: IMMI_DOC_TYPE,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/BENIMMDOC`,
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
              type: `${IMMI_DOC_TYPE}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${IMMI_DOC_TYPE}_${FAIL}`,
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
              type: `${IMMI_DOC_TYPE}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${IMMI_DOC_TYPE}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const deleteImmiDoc =
  (authToken, beneficiaryId, categoryName, fileCategory, fileId) => dispatch =>
    dispatch({
      type: DELETE_IMMI_DOC,
      payload: {
        request: {
          url: `api/v1/document/beneficiary/${beneficiaryId}/category/${categoryName}/fileCategory/${fileCategory}/${fileId}`,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
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
                type: `${DELETE_IMMI_DOC}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${DELETE_IMMI_DOC}_${FAIL}`,
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
                type: `${DELETE_IMMI_DOC}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({type: `${DELETE_IMMI_DOC}_${FAIL}`, payload: {}});
            return Promise.reject();
          },
        },
      },
    });
export const getPassPortDocInfo =
  (token, beneficiaryid, familyId) => dispatch =>
    dispatch({
      type: PASSPORT_DOC,
      payload: {
        request: {
          url: `api/v1/document/beneficiary/${beneficiaryid}/category/BENPASSDOC${
            familyId !== null ? `?familyId=${familyId}` : ''
          }`,
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
                type: `${PASSPORT_DOC}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${PASSPORT_DOC}_${FAIL}`,
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
                type: `${PASSPORT_DOC}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${PASSPORT_DOC}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });
export const getGreenDocInfo = (token, beneficiaryid, familyId) => dispatch =>
  dispatch({
    type: GREENCARD_DOC,
    payload: {
      request: {
        url: `api/v1/document/beneficiary/${beneficiaryid}/category/BENGREENCARD${
          familyId !== null ? `?familyId=${familyId}` : ''
        }`,
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
              type: `${GREENCARD_DOC}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GREENCARD_DOC}_${FAIL}`,
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
              type: `${GREENCARD_DOC}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${PASSPORT_DOC}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const deleteUsTravelHistory =
  (authToken, beneficiaryId, immigrationId, travelInfoId) => dispatch =>
    dispatch({
      type: DELETE_US_TRAVEL_HISTORY,
      payload: {
        request: {
          url: `api/v1/beneficiary/${beneficiaryId}/immigration/${immigrationId}/travelInfo/${travelInfoId}`,
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
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
                type: `${DELETE_US_TRAVEL_HISTORY}_${SUCCESS}`,
                payload: {...data},
              });

              return Promise.resolve({...data});
            }
            dispatch({
              type: `${DELETE_US_TRAVEL_HISTORY}_${FAIL}`,
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
                type: `${DELETE_US_TRAVEL_HISTORY}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${DELETE_US_TRAVEL_HISTORY}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });

export const fetchProfileStatus = (token, beneficiaryId) => dispatch =>
  dispatch({
    type: GET_PROFILE_STATUS,
    payload: {
      request: {
        url: `api/v1/user?beneficiaryId=${beneficiaryId}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 500) {
            dispatch({
              type: `${GET_PROFILE_STATUS}_${SUCCESS}`,
              payload: {...data},
            });

            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_PROFILE_STATUS}_${FAIL}`,
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
              type: `${GET_PROFILE_STATUS}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${GET_PROFILE_STATUS}_${FAIL}`, payload: {}});
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
