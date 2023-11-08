import {
  FAIL,
  SUCCESS,
  GET_PETITION_DECISION,
  GET_PETITION_DECISION_ALL_COMMENTS,
  DECISION_POST_UPVOTE,
  GET_IMM_RULE,
  GET_STORY,
  FOLLOW_POST,
  FOVOURITE_POST,
  COMMENT_POST,
  COMMENT_UPVOTE,
  COMMENT_DELETE,
  POST_DELETE,
  COMMENT_VIEW_COUNT,
  GET_REPORT_LIST,
  POST_REPORT,
} from '../action-types';

export const getPetitionDecisions = (authToken, payload) => dispatch =>
  dispatch({
    type: GET_PETITION_DECISION,
    payload: {
      request: {
        url: 'api/v1/post/DECISION/pages/list',
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
              type: `${GET_PETITION_DECISION}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_PETITION_DECISION}_${FAIL}`,
            payload: {...data, ...payload},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${GET_PETITION_DECISION}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${GET_PETITION_DECISION}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const getImmRuleData = (authToken, payload) => dispatch =>
  dispatch({
    type: GET_IMM_RULE,
    payload: {
      request: {
        url: 'api/v1/post/RULERESPONSE/pages/list',
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
              type: `${GET_IMM_RULE}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_IMM_RULE}_${FAIL}`,
            payload: {...data, ...payload},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${GET_IMM_RULE}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${GET_IMM_RULE}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });
export const getStoryData = (authToken, payload) => dispatch =>
  dispatch({
    type: GET_STORY,
    payload: {
      request: {
        url: 'api/v1/post/STORY/pages/list',
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
              type: `${GET_STORY}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_STORY}_${FAIL}`,
            payload: {...data, ...payload},
          });
          return Promise.reject(data);
        },
        onError(exception) {
          if (exception.error.isAxiosError) {
            const {
              response: {data: dataError},
            } = exception.error;
            dispatch({
              type: `${GET_STORY}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({type: `${GET_STORY}_${FAIL}`, payload: {}});
          return Promise.reject();
        },
      },
    },
  });

export const getPetitionDecisionsAllcomments =
  (authToken, payload, postId) => dispatch =>
    dispatch({
      type: GET_PETITION_DECISION_ALL_COMMENTS,
      payload: {
        request: {
          url: `api/v1/post/${postId}/comment/pages/list`,
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
                type: `${GET_PETITION_DECISION_ALL_COMMENTS}_${SUCCESS}`,
                payload: {...data},
              });
              return Promise.resolve({...data});
            }
            dispatch({
              type: `${GET_PETITION_DECISION_ALL_COMMENTS}_${FAIL}`,
              payload: {...data, ...payload},
            });
            return Promise.reject(data);
          },
          onError(exception) {
            if (exception.error.isAxiosError) {
              const {
                response: {data: dataError},
              } = exception.error;
              dispatch({
                type: `${GET_PETITION_DECISION_ALL_COMMENTS}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${GET_PETITION_DECISION_ALL_COMMENTS}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });

export const decisionPostUpVote = (authToken, postId, upVoteType) => dispatch =>
  dispatch({
    type: DECISION_POST_UPVOTE,
    payload: {
      request: {
        url: `api/v1/post/${postId}/activity/${upVoteType}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        // data: payload,
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 500) {
            dispatch({
              type: `${DECISION_POST_UPVOTE}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${DECISION_POST_UPVOTE}_${FAIL}`,
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
              type: `${DECISION_POST_UPVOTE}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${DECISION_POST_UPVOTE}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const getCommentView = (authToken, postId) => dispatch =>
  dispatch({
    type: COMMENT_VIEW_COUNT,
    payload: {
      request: {
        url: `api/v1/post/${postId}/activity/VIEW`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 500) {
            dispatch({
              type: `${COMMENT_VIEW_COUNT}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${COMMENT_VIEW_COUNT}_${FAIL}`,
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
              type: `${COMMENT_VIEW_COUNT}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${COMMENT_VIEW_COUNT}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const followPostToApi = (authToken, postId, followType) => dispatch =>
  dispatch({
    type: FOLLOW_POST,
    payload: {
      request: {
        url: `api/v1/post/${postId}/activity/${followType}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 500) {
            dispatch({
              type: `${FOLLOW_POST}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${FOLLOW_POST}_${FAIL}`,
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
              type: `${FOLLOW_POST}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${FOLLOW_POST}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const fovouritePostApi =
  (authToken, postId, fovouriteType) => dispatch =>
    dispatch({
      type: FOVOURITE_POST,
      payload: {
        request: {
          url: `api/v1/post/${postId}/activity/${fovouriteType}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        },
        options: {
          onSuccess({response}) {
            const {data, error} = response;
            if (data.status !== 500) {
              dispatch({
                type: `${FOVOURITE_POST}_${SUCCESS}`,
                payload: {...data},
              });
              return Promise.resolve({...data});
            }
            dispatch({
              type: `${FOVOURITE_POST}_${FAIL}`,
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
                type: `${FOVOURITE_POST}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${FOVOURITE_POST}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });
export const commentPostApi = (authToken, postId, payload) => dispatch =>
  dispatch({
    type: COMMENT_POST,
    payload: {
      request: {
        url: `api/v1/post/${postId}/comment`,
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
              type: `${COMMENT_POST}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${COMMENT_POST}_${FAIL}`,
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
              type: `${COMMENT_POST}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${COMMENT_POST}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const commentUpVoteApi =
  (authToken, commentId, upVoteType) => dispatch =>
    dispatch({
      type: COMMENT_UPVOTE,
      payload: {
        request: {
          url: `api/v1/post/comment/${commentId}/activity/${upVoteType}`,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        },
        options: {
          onSuccess({response}) {
            const {data, error} = response;
            if (data.status !== 500) {
              dispatch({
                type: `${COMMENT_UPVOTE}_${SUCCESS}`,
                payload: {...data},
              });
              return Promise.resolve({...data});
            }
            dispatch({
              type: `${COMMENT_UPVOTE}_${FAIL}`,
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
                type: `${COMMENT_UPVOTE}_${FAIL}`,
                payload: {dataError},
              });
              return Promise.reject(dataError);
            }
            dispatch({
              type: `${COMMENT_UPVOTE}_${FAIL}`,
              payload: {},
            });
            return Promise.reject();
          },
        },
      },
    });
export const DeleteCommentApi = (authToken, PostId, commentId) => dispatch =>
  dispatch({
    type: COMMENT_DELETE,
    payload: {
      request: {
        url: `api/v1/post/${PostId}/comment/${commentId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        // data: payload,
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 500) {
            dispatch({
              type: `${COMMENT_DELETE}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${COMMENT_DELETE}_${FAIL}`,
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
              type: `${COMMENT_DELETE}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${COMMENT_DELETE}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const DeletePostApi = (authToken, PostId) => dispatch =>
  dispatch({
    type: POST_DELETE,
    payload: {
      request: {
        url: `api/v1/post/${PostId}`,
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        // data: payload,
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 500) {
            dispatch({
              type: `${POST_DELETE}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${POST_DELETE}_${FAIL}`,
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
              type: `${POST_DELETE}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${POST_DELETE}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const getReortabuseList = authToken => dispatch =>
  dispatch({
    type: GET_REPORT_LIST,
    payload: {
      request: {
        url: `api/v1/referenceLibrary/REPORTABUSE`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 500) {
            dispatch({
              type: `${GET_REPORT_LIST}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${GET_REPORT_LIST}_${FAIL}`,
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
              type: `${GET_REPORT_LIST}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${GET_REPORT_LIST}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
export const postReortAbuse = (authToken, postid, TypeOfReport) => dispatch =>
  dispatch({
    type: POST_REPORT,
    payload: {
      request: {
        url: `api/v1/post/${postid}/activity/REPORTABUSE?code=${TypeOfReport}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      },
      options: {
        onSuccess({response}) {
          const {data, error} = response;
          if (data.status !== 500) {
            dispatch({
              type: `${POST_REPORT}_${SUCCESS}`,
              payload: {...data},
            });
            return Promise.resolve({...data});
          }
          dispatch({
            type: `${POST_REPORT}_${FAIL}`,
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
              type: `${POST_REPORT}_${FAIL}`,
              payload: {dataError},
            });
            return Promise.reject(dataError);
          }
          dispatch({
            type: `${POST_REPORT}_${FAIL}`,
            payload: {},
          });
          return Promise.reject();
        },
      },
    },
  });
