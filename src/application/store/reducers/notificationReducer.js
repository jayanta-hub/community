import {
  FAIL,
  SUCCESS,
  NOTIFICATION_STATUS,
  SEND_NOTIFICATION_STATUS,
  UPDATE_LINK_STATUS,
} from '../action-types';

const initialState = {
  isLoading: true,
  notificationStatus: {},
  sendNotificationStatus: {},
  updateLinkStatus: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case NOTIFICATION_STATUS:
      return {...state};
    case `${NOTIFICATION_STATUS}_${SUCCESS}`:
      return {...state, notificationStatus: {...payload}};
    case `${NOTIFICATION_STATUS}_${FAIL}`:
      return {...state, error: {...payload}};

    case SEND_NOTIFICATION_STATUS:
      return {...state};
    case `${SEND_NOTIFICATION_STATUS}_${SUCCESS}`:
      return {...state, sendNotificationStatus: {...payload}};
    case `${SEND_NOTIFICATION_STATUS}_${FAIL}`:
      return {...state, error: {...payload}};

    case UPDATE_LINK_STATUS:
      return {...state};
    case `${UPDATE_LINK_STATUS}_${SUCCESS}`:
      return {...state, updateLinkStatus: {...payload}};
    case `${UPDATE_LINK_STATUS}_${FAIL}`:
      return {...state, error: {...payload}};

    default:
      return state;
  }
};
