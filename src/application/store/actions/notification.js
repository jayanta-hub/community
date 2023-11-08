import {
  NOTIFICATION_STATUS,
  SUCCESS,
  FAIL,
  HOME,
  SEND_NOTIFICATION_STATUS,
  UPDATE_LINK_STATUS,
} from '../action-types';
export const notifications = (authToken, payload) => dispatch =>
  dispatch({
    type: NOTIFICATION_STATUS,
    payload: {
      request: {
        url: `api/v1/notification`,
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
          if (data.status !== 500) {
            dispatch({
              type: `${NOTIFICATION_STATUS}_${SUCCESS}`,
              payload: {...data},
            });
            dispatch({
              type: HOME,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${NOTIFICATION_STATUS}_${FAIL}`,
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
              type: `${NOTIFICATION_STATUS}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${NOTIFICATION_STATUS}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const sendnotifications =
  (authToken, payload, notificationId) => dispatch =>
    dispatch({
      type: SEND_NOTIFICATION_STATUS,
      payload: {
        request: {
          url: `api/v1/notification/${notificationId}`,
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
                type: `${SEND_NOTIFICATION_STATUS}_${SUCCESS}`,
                payload: {...data},
              });
              dispatch({
                type: HOME,
                payload: {...data},
              });
              return Promise.resolve({...data});
            }
            dispatch({
              type: `${SEND_NOTIFICATION_STATUS}_${FAIL}`,
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
                type: `${SEND_NOTIFICATION_STATUS}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${SEND_NOTIFICATION_STATUS}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });
export const UpdateLinkData =
  (authToken, linkrequestId, notificationID) => dispatch =>
    dispatch({
      type: UPDATE_LINK_STATUS,
      payload: {
        request: {
          url: `api/v1/linkrequest/${linkrequestId}/status/ACTV/${notificationID}`,
          method: 'POST',
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
                type: `${UPDATE_LINK_STATUS}_${SUCCESS}`,
                payload: {...data},
              });
              dispatch({
                type: HOME,
                payload: {...data},
              });
              return Promise.resolve({...data});
            }
            dispatch({
              type: `${UPDATE_LINK_STATUS}_${FAIL}`,
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
                type: `${UPDATE_LINK_STATUS}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${UPDATE_LINK_STATUS}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });
