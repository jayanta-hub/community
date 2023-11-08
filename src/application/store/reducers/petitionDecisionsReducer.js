import {
  GET_PETITION_DECISION,
  FAIL,
  SUCCESS,
  GET_PETITION_DECISION_ALL_COMMENTS,
  DECISION_POST_UPVOTE,
  GET_IMM_RULE,
  GET_STORY,
  GET_REPORT_LIST,
} from '../action-types';

const initialState = {
  isUserValid: false,
  isAuthenticating: false,
  error: {},
  getPetitionDecisionList: {},
  getPetitionDecisionAllCommentsList: {},
  decisionUpVote: {},
  ImmRulesList: {},
  StoryList: {},
  ReportAbuseList: {},
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case GET_PETITION_DECISION:
      return {...state, isAuthenticating: true};
    case `${GET_PETITION_DECISION}_${SUCCESS}`:
      return {
        ...state,
        isAuthenticating: false,
        getPetitionDecisionList: {...payload},
      };
    case `${GET_PETITION_DECISION}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case GET_PETITION_DECISION_ALL_COMMENTS:
      return {...state, isAuthenticating: true};
    case `${GET_PETITION_DECISION_ALL_COMMENTS}_${SUCCESS}`:
      return {
        ...state,
        isAuthenticating: false,
        getPetitionDecisionAllCommentsList: {...payload},
      };
    case `${GET_PETITION_DECISION_ALL_COMMENTS}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case DECISION_POST_UPVOTE:
      return {...state, isAuthenticating: true};
    case `${DECISION_POST_UPVOTE}_${SUCCESS}`:
      return {
        ...state,
        isAuthenticating: false,
        decisionUpVote: {...payload},
      };
    case `${DECISION_POST_UPVOTE}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case GET_IMM_RULE:
      return {...state, isAuthenticating: true};
    case `${GET_IMM_RULE}_${SUCCESS}`:
      return {
        ...state,
        isAuthenticating: false,
        ImmRulesList: {...payload},
      };
    case `${GET_IMM_RULE}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case GET_STORY:
      return {...state, isAuthenticating: true};
    case `${GET_STORY}_${SUCCESS}`:
      return {
        ...state,
        isAuthenticating: false,
        StoryList: {...payload},
      };
    case `${GET_STORY}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    case GET_REPORT_LIST:
      return {...state, isAuthenticating: true};
    case `${GET_REPORT_LIST}_${SUCCESS}`:
      return {
        ...state,
        isAuthenticating: false,
        ReportAbuseList: {...payload},
      };
    case `${GET_REPORT_LIST}_${FAIL}`:
      return {...state, isAuthenticating: false, error: {...payload}};

    default:
      return state;
  }
};
