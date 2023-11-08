import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  KeyboardAvoidingView,
  Alert,
  RefreshControl,
  FlatList,
  Animated,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React, {useState, useEffect, memo, useRef} from 'react';
import styles from './styles';
import {Avatar} from 'react-native-paper';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {useFormik} from 'formik';
import * as yup from 'yup';
import Loader from '../../../Infrastructure/component/Loader/Loader';
import {connect} from 'react-redux';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import {useCardAnimation} from '@react-navigation/stack';
import {
  getPetitionDecisionsAllcomments,
  decisionPostUpVote,
  followPostToApi,
  fovouritePostApi,
  commentPostApi,
  commentUpVoteApi,
  DeleteCommentApi,
  getCommentView,
  getReortabuseList,
  postReortAbuse,
} from '../../../application/store/actions/petitionDecisions';
import {
  getAuthToken,
  getUserID,
} from '../../../Infrastructure/utils/storageUtility';
import Toast from 'react-native-simple-toast';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {LikeAndCommentCountMethod} from '../../../Infrastructure/commonMethod/commonMethod';
import NoDataFound from '../../../Infrastructure/component/NoDataFound/NoDataFound';
import {Buffer} from 'buffer';
import HalfModal from './HalfModal';

const ValidationSchema = yup.object().shape({
  comment: yup.string().nullable().required('Comment Required'),
});
const DescriptionRow = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flex: 1,
        marginTop: scale(10),
      }}>
      <View style={{flex: 1}}>
        <Text
          style={
            props.headerLeftStyle ? props.headerLeftStyle : styles.headerLeft
          }>
          {props.headerLeft ? props.headerLeft : '--'}
        </Text>
      </View>
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
        <Text style={styles.headerRight}>: </Text>
        <Text
          style={
            props.headerRightStyle ? props.headerRightStyle : styles.headerRight
          }>
          {props.HeaderRight ? props.HeaderRight : '--'}
        </Text>
        {props.decisionName === 'Approved' ||
        props.decisionName === 'RFE Approved' ? (
          <Feather
            name="smile"
            size={scale(19)}
            color="#4CBA20"
            style={{marginLeft: scale(5)}}
          />
        ) : props.decisionName === 'Denied' ? (
          <MaterialCommunityIcons
            name="emoticon-sad-outline"
            size={scale(20)}
            color="#FD747C"
            style={{marginLeft: scale(5)}}
          />
        ) : null}
      </View>
    </View>
  );
};
const ContentDetails = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const {information, contentType} = props.route.params;
  const userInformation = props?.userInformation?.data;
  const [userID, setUserID] = useState('');
  const [isReported, setIsReported] = useState(
    information?.isReported || false,
  );
  const [status, setStatus] = useState(false);
  const [showCommentBox, setShowCommentBox] = useState(true);
  const [showAllCommentBox, setShowAllCommentBox] = useState(false);
  const [allCommentsList, setAllCommentList] = useState([]);
  const [upVote, setUpVote] = useState(
    information?.isUpvoted ? information.isUpvoted : false,
  );
  const [upVoteCount, setUpVoteCount] = useState(
    information?.upvoteCount ? information.upvoteCount : false,
  );
  const [isFollowing, setIsFollowing] = useState(
    information?.isFollowing ? information.isFollowing : false,
  );
  const [isFovourite, setIsFovourite] = useState(
    information?.isFavourite ? information.isFavourite : false,
  );
  const [comment, setComment] = useState(
    information.commentsCount === null ? 0 : information.commentsCount,
  );
  const [isReplyClick, setIsReplyClick] = useState(false);
  const [subComment, setSubComment] = useState('');
  const [viewCount, setViewCount] = useState(
    information?.viewedCount === null ? 0 : information?.viewedCount,
  );
  const [refreshing, setRefreshing] = useState(false);
  const [modalToShow, setModalToShow] = useState(false);
  const [sortBy, setSortBy] = useState('');
  const {height} = useWindowDimensions();
  const {current} = useCardAnimation();
  const inputEl = useRef(null);
  let getFurthestAncestor = (obj, mapById) => {
    let parent = obj;
    while (parent?.commentId !== null || parent?.commentId === userID) {
      parent = mapById[parent?.commentId];
    }
    return parent?._id;
  };
  let getFoldedAncestors = data => {
    const mapById = data.reduce((totalData, curValue) => {
      totalData[curValue._id] = curValue;
      return totalData;
    }, {});
    const parentData = allCommentsList.filter(
      item => item.commentId === null || item.commentId === userID,
    );
    const result = parentData.map(parentItem => {
      parentItem['children'] = data.filter(
        obj =>
          getFurthestAncestor(obj, mapById) === parentItem._id &&
          obj._id !== parentItem._id,
      );
      return parentItem;
    });
    return result;
  };

  const result = getFoldedAncestors(allCommentsList);
  const getAllReportAbuseList = async () => {
    const authToken = await getAuthToken();
    props
      .getReortabuse(authToken)
      .then(res => {
        console.log('res,,,,', res);
      })
      .catch(err => {
        console.log('err', err);
      });
  };
  const getAllComments = async parentId => {
    const authToken = await getAuthToken();
    const postId = information._id;
    const payload = {
      pageNumber: 1,
      recordsPerPage:
        information.commentsCount > 100 ? information.commentsCount : 100,
    };
    parentId === 'refresh' ? null : setStatus(true);
    props
      .getPetitionDecisionsAllcomments(authToken, payload, postId)
      .then(res => {
        setStatus(false);
        setRefreshing(false);
        res?.data?.elements && res?.data?.elements?.length
          ? setComment(res?.data?.elements?.length)
          : setComment(0);
        /**
         * ?isReplyClick parameter added start
         */
        let resData = res?.data?.elements.map((value, index) => {
          if (value._id === parentId) {
            return {...value, isReplyClick: false, viewAllComments: false};
          } else {
            {
              return {...value, isReplyClick: false, viewAllComments: false};
            }
          }
        });
        /**
         * ?isReplyClick parameter added end
         */
        setAllCommentList(resData || []);
      })
      .catch(error => {
        setStatus(false);
        setRefreshing(false);
        console.log('Error get All comment -Decision', error);
        Toast.show(
          error?.message
            ? error?.message
            : 'something went wrong, try again later',
          Toast.LONG,
        );
      });
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getAllComments('refresh');
  }, []);
  const decisionUPVote = async () => {
    const authToken = await getAuthToken();
    const postId = information._id;
    const upVoteType = upVote ? 'DOWNVOTE' : 'UPVOTE';
    props
      .decisionPostUpVote(authToken, postId, upVoteType)
      .then(() => {
        setUpVoteCount(upVote ? upVoteCount - 1 : upVoteCount + 1);
        setUpVote(!upVote);
      })
      .catch(error => {
        console.log('upvote error', error);
        Toast.show(
          error?.message
            ? error?.message
            : 'something went wrong, try again later',
          Toast.LONG,
        );
      });
  };
  const commentViewCount = async () => {
    const authToken = await getAuthToken();
    const postId = information._id;
    props
      .getCommentViewCount(authToken, postId)
      .then(res => {
        setViewCount(viewCount + 1);
      })
      .catch(error => {
        console.log('getCommentViewCount error', error);
      });
  };
  const FollowHandler = async () => {
    const authToken = await getAuthToken();
    const followType = isFollowing ? 'UNFOLLOW' : 'FOLLOW';
    const postId = information._id;
    props
      .followPost(authToken, postId, followType)
      .then(res => {
        setIsFollowing(!isFollowing);
      })
      .catch(error => {
        console.log('upvote error', error);
        Toast.show(
          error?.message
            ? error?.message
            : 'something went wrong, try again later',
          Toast.LONG,
        );
      });
  };
  const FavouriteHandler = async () => {
    const authToken = await getAuthToken();
    const fovouriteType = isFovourite ? 'UNFAVOURITE' : 'FAVOURITE';
    const postId = information._id;
    props
      .fovouritePost(authToken, postId, fovouriteType)
      .then(res => {
        setIsFovourite(!isFovourite);
      })
      .catch(error => {
        console.log('followPost error', error);
        Toast.show(
          error?.message
            ? error?.message
            : 'something went wrong, try again later',
          Toast.LONG,
        );
      });
  };

  const PostComment = async (formData, param, id, parentId) => {
    const authToken = await getAuthToken();
    const postId = information._id;
    const payload = {
      comment: Buffer.from(
        param ? subComment : formData.comment,
        'utf-8',
      ).toString('base64'),
      commentId: id ? id : null,
      postId: postId,
    };
    const payload2 = {
      comment: Buffer.from(
        param ? subComment : formData.comment,
        'utf-8',
      ).toString('base64'),
      commentId: id ? id : null,
    };
    props
      .commentPost(authToken, postId, param ? payload : payload2)
      .then(res => {
        getAllComments(parentId);
        handleReset();
        setSubComment('');
        Toast.show(res.message, Toast.SHORT);
      })
      .catch(error => {
        console.log('commentPost error', error);
        Toast.show(
          error?.message
            ? error?.message
            : 'something went wrong, try again later',
          Toast.LONG,
        );
      });
  };
  const showAlert = parentId => {
    Alert.alert(
      'ImmigrationHub',
      'Would you like to Delete',
      [
        {
          text: 'No',
          onPress: () => console.log('close'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            CommentDelete(parentId);
          },
        },
      ],
      {cancelable: false},
    );
  };
  const CommentDelete = async (commentId, parentId) => {
    const authToken = await getAuthToken();
    const postId = information._id;
    props
      .DeleteComment(authToken, postId, commentId)
      .then(res => {
        getAllComments(parentId);
        Toast.show(res.message, Toast.LONG);
      })
      .catch(error => {
        console.log('Delete Comment error', error);
        Toast.show(
          error?.message
            ? error?.message
            : 'something went wrong, try again later',
          Toast.LONG,
        );
      });
  };
  const PostCommentUpVote = async (postId, parentId) => {
    const authToken = await getAuthToken();
    const payload = {};
    const isUpvoted = allCommentsList?.filter(item => item._id === postId)[0]
      .isUpvoted;
    const upVoteType = isUpvoted ? 'DOWNVOTE' : 'UPVOTE';
    props
      .commentUpVote(authToken, postId, upVoteType)
      .then(res => {
        getAllComments(parentId ? parentId : postId);
      })
      .catch(error => {
        console.log('commentUpVote error', error);
        Toast.show(
          error?.message
            ? error?.message
            : 'something went wrong, try again later',
          Toast.LONG,
        );
      });
  };

  const IsReplyCheck = id => {
    let filterData = allCommentsList;
    filterData.map((value, inx) => {
      if (value._id === id) {
        filterData[inx].isReplyClick = !value.isReplyClick;
      } else {
        filterData[inx].isReplyClick = false;
      }
    });
    setAllCommentList(filterData);
    setIsReplyClick(!isReplyClick);
  };

  const ReplyView = (item, parentId) => {
    return (
      <View style={{backgroundColor: '#ffff'}}>
        <View style={styles.footerProfile}>
          <Avatar.Image
            size={scale(30)}
            source={
              userInformation?.smallProfileImage === null
                ? require('../../../Infrastructure/assets/images/avatar.png')
                : {
                    uri: `data:image/png;base64,${userInformation?.smallProfileImage}`,
                  }
            }
          />
          <TextInput
            name="comment"
            placeholder="Write a Reply..."
            placeholderTextColor="#4D4F5C"
            value={subComment}
            onChangeText={v => {
              setSubComment(v);
            }}
            multiline={true}
            style={{
              ...styles.TextInput,
              fontSize: scale(13),
              flex: 1,
              height: scale(35),
            }}
          />
          {subComment !== '' && (
            <TouchableOpacity
              onPress={() => {
                PostComment(null, true, item._id, parentId);
              }}
              style={{marginLeft: scale(5)}}>
              <Text
                style={{
                  fontSize: scale(13),
                  fontFamily: 'SourceSansPro-SemiBold',
                  paddingHorizontal: scale(5),
                  right: scale(5),
                  color: '#10A0DA',
                }}>
                Post
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };
  const {handleChange, handleSubmit, values, touched, errors, handleReset} =
    useFormik({
      initialValues: {
        comment: '',
      },
      enableReinitialize: true,
      validateOnBlur: true,
      validateOnChange: true,
      onSubmit: () => PostComment(values),
      validationSchema: ValidationSchema,
    });
  const CommentView = (item, ind) => {
    const commentViewHandler = id => {
      setAllCommentList(
        allCommentsList.map(
          item =>
            item._id !== id
              ? {...item, viewAllComments: false} //to show all multiple comment on click
              : {...item, viewAllComments: !item.viewAllComments}, //to show only one multiple comments on click
        ),
      );
    };
    return (
      <>
        <View>
          <>
            <View>
              {/* Main comment section start */}
              <View
                style={{
                  marginTop: scale(10),
                  flexDirection: 'row',
                  flex: 1,
                  key: item.commentId,
                }}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Avatar.Image
                    size={scale(40)}
                    source={
                      item?.opprofile === null
                        ? require('../../../Infrastructure/assets/images/avatar.png')
                        : {
                            uri: `data:image/png;base64,${item?.opprofile}`,
                          }
                    }
                  />
                </View>
                <View style={{flex: 5}}>
                  <View
                    style={{
                      backgroundColor: '#F2F2F2',
                      padding: scale(10),
                      borderRadius: 5,
                    }}>
                    <Text style={styles.profileName}>{item?.opname}</Text>
                    <Text style={styles.commentListText}>{item?.comment}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: scale(5),
                      marginLeft: scale(10),
                      paddingBottom: scale(10),
                    }}>
                    <TouchableOpacity
                      onPress={() => PostCommentUpVote(item._id)}>
                      <Text
                        style={{
                          ...styles.likeNreplyText,
                          color: item?.isUpvoted ? '#10A0DA' : '#687C93',
                        }}>
                        {item?.upvoteCount === 0 ||
                        item?.upvoteCount === null ||
                        item?.upvoteCount === undefined
                          ? 'Like'
                          : `${LikeAndCommentCountMethod(
                              item?.upvoteCount,
                            )} Like`}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => IsReplyCheck(item?._id)}>
                      <Text
                        style={{
                          ...styles.likeNreplyText,
                          marginLeft: scale(30),
                        }}>
                        Reply
                      </Text>
                    </TouchableOpacity>
                    {item?.opid === userID ? (
                      <TouchableOpacity
                        style={{marginLeft: scale(20)}}
                        onPress={() => {
                          showAlert(item?._id);
                        }}>
                        <MaterialCommunityIcons
                          name={'delete'}
                          size={scale(18)}
                          color="#10A0DA"
                        />
                      </TouchableOpacity>
                    ) : null}
                  </View>
                  {item?.isReplyClick ? ReplyView(item) : null}
                </View>
              </View>
              {/* Main comment section End */}
              {!item.viewAllComments && item.children.length > 1 ? (
                <>
                  {/* sub comment section start */}
                  <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={{flex: 1, alignItems: 'center'}}></View>
                    <View
                      style={{
                        flex: 5,
                        left: scale(5),
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingBottom: scale(5),
                      }}>
                      <View style={{padding: scale(5)}}>
                        <Avatar.Image
                          size={scale(30)}
                          source={
                            item?.children?.[0]?.opprofile === null
                              ? require('../../../Infrastructure/assets/images/avatar.png')
                              : {
                                  uri: `data:image/png;base64,${item?.children?.[0]?.opprofile}`,
                                }
                          }
                        />
                      </View>
                      <View>
                        <Text style={styles.subCommenterProfileText}>
                          {item?.children?.[0]?.opname}
                        </Text>
                      </View>
                      <View style={{flex: 1, marginLeft: scale(5)}}>
                        <Text style={styles.subCommentText} numberOfLines={1}>
                          {item?.children?.[0]?.comment}
                        </Text>
                      </View>
                    </View>
                  </View>
                  {/* sub comment section end */}

                  {/* View One more reply section start */}
                  {item?.children?.length > 1 ? (
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <View style={{flex: 1, alignItems: 'center'}}></View>
                      <TouchableOpacity
                        style={{
                          flex: 5,
                          left: scale(5),
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingBottom: scale(5),
                        }}
                        onPress={() => {
                          commentViewHandler(item?._id);
                        }}>
                        <View>
                          <Text
                            style={{
                              ...styles.subCommenterProfileText,
                              marginLeft: scale(10),
                            }}>
                            {`View ${
                              item?.children?.length - 1
                            } more replies...`}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                  {/* View One more reply section End */}
                </>
              ) : (
                <>
                  {item?.children?.reverse().map((data, index) => {
                    /* sub comment section start */
                    return (
                      <>
                        <View
                          style={{
                            flexDirection: 'row',
                            flex: 1,
                          }}
                          key={data._Id}>
                          <View
                            style={{
                              flex: 1,
                              alignItems: 'center',
                            }}></View>
                          <View
                            style={{
                              flex: 5,
                              flexDirection: 'row',
                            }}>
                            <View
                              style={{
                                paddingRight: scale(5),
                                justifyContent: 'flex-start',
                                alignItems: 'center',
                                marginTop: scale(17),
                              }}>
                              <Avatar.Image
                                size={scale(30)}
                                source={
                                  data?.opprofile === null
                                    ? require('../../../Infrastructure/assets/images/avatar.png')
                                    : {
                                        uri: `data:image/png;base64,${data.opprofile}`,
                                      }
                                }
                              />
                            </View>
                            <View style={{flex: 5}}>
                              <View
                                style={{
                                  backgroundColor: '#F2F2F2',
                                  padding: scale(10),
                                  borderRadius: 5,
                                }}>
                                <Text style={styles.profileName}>
                                  {data.opname}
                                </Text>
                                <View
                                  style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                  }}>
                                  <Text
                                    style={{
                                      ...styles.commentListText,
                                      fontFamily: 'SourceSansPro-SemiBold',
                                    }}>
                                    {data?.repliedCommentUserName
                                      ? `@${data?.repliedCommentUserName} `
                                      : data?.comment}{' '}
                                  </Text>
                                  <Text style={styles.commentListText}>
                                    {`${data?.comment}`}{' '}
                                  </Text>
                                </View>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  marginTop: scale(5),
                                  marginLeft: scale(10),
                                  paddingBottom: scale(10),
                                }}>
                                <TouchableOpacity
                                  onPress={() =>
                                    PostCommentUpVote(data?._id, item._id)
                                  }>
                                  <Text
                                    style={{
                                      ...styles.likeNreplyText,
                                      color: data?.isUpvoted
                                        ? '#10A0DA'
                                        : '#687C93',
                                    }}>
                                    {data?.upvoteCount === 0 ||
                                    data?.upvoteCount === null ||
                                    data?.upvoteCount === undefined
                                      ? 'Like'
                                      : `${LikeAndCommentCountMethod(
                                          data?.upvoteCount,
                                        )} Like`}
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => IsReplyCheck(data?._id)}>
                                  <Text
                                    style={{
                                      ...styles.likeNreplyText,
                                      marginLeft: scale(30),
                                    }}>
                                    Reply
                                  </Text>
                                </TouchableOpacity>
                                {data?.opid === userID ? (
                                  <TouchableOpacity
                                    style={{marginLeft: scale(20)}}
                                    onPress={() => {
                                      showAlert(data._id, item._id);
                                    }}>
                                    <MaterialCommunityIcons
                                      name={'delete'}
                                      size={scale(18)}
                                      color="#10A0DA"
                                    />
                                  </TouchableOpacity>
                                ) : null}
                              </View>
                              {data.isReplyClick
                                ? ReplyView(data, item._id)
                                : null}
                            </View>
                          </View>
                        </View>
                      </>
                    );
                    /* sub comment section end */
                  })}
                  {item?.children?.length > 1 ? (
                    <View style={{flexDirection: 'row', flex: 1}}>
                      <View style={{flex: 1, alignItems: 'center'}}></View>
                      <TouchableOpacity
                        style={{
                          flex: 5,
                          left: scale(5),
                          flexDirection: 'row',
                          alignItems: 'center',
                          paddingBottom: scale(5),
                        }}
                        onPress={() => {
                          commentViewHandler(item?._id);
                        }}>
                        <View>
                          <Text
                            style={{
                              ...styles.subCommenterProfileText,
                              marginLeft: scale(10),
                            }}>
                            {`View less replies...`}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : null}
                </>
              )}
            </View>
          </>
        </View>
      </>
    );
  };
  const ReportSubmitHanlder = async () => {
    const authToken = await getAuthToken();
    const postId = information['_id'];
    props
      .postReortabuse(authToken, postId, sortBy)
      .then(res => {
        setIsReported(true);
        setTimeout(() => {
          Toast.show(res.message, Toast.SHORT);
        }, 10);
        setModalToShow(p => !p);
      })
      .catch(err => {
        setTimeout(() => {
          Toast.show(err.message, Toast.SHORT);
        }, 10);
        console.log('postReortabuse err', err);
      });
  };
  useEffect(() => {
    isFocused === true &&
      getUserID()
        .then(userID => {
          setUserID(userID);
        })
        .catch(error => {
          console.log('get userID error', error);
        });
  }, [isFocused]);
  useEffect(() => {
    commentViewCount();
    getAllComments();
    getAllReportAbuseList();
  }, []);
  return (
    <>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? scale(100) : scale(135)}
        style={{flex: 1}}>
        <Loader status={status} />
        <HalfModal modalVisible={modalToShow} setModalVisible={setModalToShow}>
          <ScrollView
            contentContainerStyle={{
              flex: 1,
            }}>
            <Text style={{...styles.headerText, fontSize: scale(16)}}>
              Report on Post
            </Text>
            <RadioButton.Group
              value={sortBy}
              onValueChange={value => setSortBy(value)}>
              <View
                style={{
                  flexDirection: 'column',
                  marginTop: scale(10),
                }}>
                {props?.ReportAbuseList?.data?.map(item => {
                  return (
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Android
                        value={item.code}
                        uncheckedColor="#2DA7D5"
                        color="#0089CF"
                        label="Latest"
                      />
                      <Text style={styles.radioTitle}>{item.name}</Text>
                    </View>
                  );
                })}
              </View>
            </RadioButton.Group>
            <TouchableOpacity
              disabled={sortBy !== '' ? false : true}
              style={{
                backgroundColor: '#10A0DA',
                borderRadius: scale(4),
                height: scale(40),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: scale(20),
                opacity: sortBy !== '' ? 1 : 0.5,
              }}
              onPress={() => {
                ReportSubmitHanlder();
              }}>
              <Text
                style={{
                  color: '#FFFFFF',
                  fontSize: scale(16),
                  fontFamily: 'SourceSansPro-SemiBold',
                }}>
                Submit
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </HalfModal>
        <ScrollView
          contentContainerStyle={styles.container}
          ref={inputEl}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              title="Refreshing"
              titleColor={'#00A0DA'}
              onRefresh={onRefresh}
              tintColor="#00A0DA"
            />
          }>
          {/* <BottomSheet
            // ref={bottomSheet}
            height={400}
            sheetBackgroundColor="#E5E5E5"
            modalToShow={modalToShow}
            setModalToShow={setModalToShow}>
            <View
              style={{
                flex: 1,
                paddingTop: scale(5),
                paddingBottom: scale(25),
                paddingHorizontal: scale(25),
              }}>
              <Entypo
                name="dots-three-horizontal"
                size={scale(25)}
                color="#10A0DA"
                style={{alignSelf: 'center'}}
              />
              <View
                style={{
                  height: scale(5),
                  backgroundColor: '#10A0DA',
                  borderRadius: scale(5),
                  width: scale(35),
                  alignSelf: 'center',
                  marginTop: scale(8),
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={{...styles.headerText, fontSize: scale(16)}}>
                  Report on Post
                </Text>
              </View>
              <ScrollView>
                <RadioButton.Group
                  value={sortBy}
                  onValueChange={value => setSortBy(value)}>
                  <View
                    style={{
                      flexDirection: 'column',
                      marginTop: scale(10),
                    }}>
                    {props?.ReportAbuseList?.data?.map(item => {
                      return (
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <RadioButton.Android
                            value={item.code}
                            uncheckedColor="#2DA7D5"
                            color="#0089CF"
                            label="Latest"
                          />
                          <Text style={styles.radioTitle}>{item.name}</Text>
                        </View>
                      );
                    })}
                  </View>
                </RadioButton.Group>
                <TouchableOpacity
                  disabled={sortBy !== '' ? false : true}
                  style={{
                    backgroundColor: '#10A0DA',
                    borderRadius: scale(4),
                    height: scale(40),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: scale(20),
                    opacity: sortBy !== '' ? 1 : 0.5,
                  }}
                  onPress={() => {
                    ReportSubmitHanlder();
                  }}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                      fontSize: scale(16),
                      fontFamily: 'SourceSansPro-SemiBold',
                    }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </BottomSheet> */}

          <View style={styles.content}>
            {/*  Header Card Start */}
            <View style={styles.headerCard}>
              <View style={{flex: 1}}>
                <Avatar.Image
                  size={scale(55)}
                  source={
                    information?.opprofile === null
                      ? require('../../../Infrastructure/assets/images/avatar.png')
                      : {
                          uri: `data:image/png;base64,${information?.opprofile}`,
                        }
                  }
                />
              </View>
              <View style={{flex: 4, paddingVertical: scale(10)}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}>
                  <Text style={styles.headerText}>
                    {information?.opname ? information?.opname : 'Anonymus'}
                  </Text>
                </View>
                {information?.opid === userID ? null : (
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: 'flex-start',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={FollowHandler}>
                    <FontAwesome5
                      name={isFollowing ? 'user-check' : 'user-plus'}
                      size={scale(15)}
                      color="#10A0DA"
                    />
                    <Text style={{...styles.headerText, color: '#10A0DA'}}>
                      {isFollowing ? ' Following' : ' Follow'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            {/*  Header Card End */}
            <View style={{paddingHorizontal: scale(10)}}>
              {contentType !== 'Story' ? (
                <>
                  {contentType === 'Decision' ? (
                    <DescriptionRow
                      headerLeft="Decision"
                      HeaderRight={
                        information?.decisionName
                          ? information?.decisionName
                          : '--'
                      }
                      headerRightStyle={{
                        fontSize: scale(18),
                        color:
                          information?.decisionName === 'Approved' ||
                          information?.decisionName === 'RFE Approved'
                            ? '#4CBA20'
                            : information?.decisionName === 'Denied'
                            ? '#FD747C'
                            : information?.decisionName === 'Noir' ||
                              information?.decisionName === 'Noid'
                            ? '#FEBC54'
                            : '#4D4F5C',
                        fontFamily: 'SourceSansPro-SemiBold',
                      }}
                      decisionName={
                        information?.decisionName
                          ? information?.decisionName
                          : false
                      }
                    />
                  ) : (
                    <DescriptionRow
                      headerLeft="Rule"
                      HeaderRight={
                        information?.ruleDesc ? information?.ruleDesc : '--'
                      }
                      headerRightStyle={{
                        fontSize: scale(18),
                        color: '#196AA5',
                        fontFamily: 'SourceSansPro-SemiBold',
                      }}
                    />
                  )}
                  <DescriptionRow
                    headerLeft="Date"
                    HeaderRight={
                      information?.createdDate
                        ? moment(information?.createdDate).format('Do MMM yyyy')
                        : '--'
                    }
                  />
                </>
              ) : null}
              {contentType === 'Decision' ? (
                <>
                  <DescriptionRow
                    headerLeft="Visa type"
                    HeaderRight={
                      information?.visaTypeName
                        ? information?.visaTypeName
                        : '--'
                    }
                  />
                  {information.decisionName === 'Denied' ? (
                    <DescriptionRow
                      headerLeft="Reason"
                      HeaderRight={
                        information?.reasonDesc ? information?.reasonDesc : '--'
                      }
                    />
                  ) : null}
                  <DescriptionRow
                    headerLeft="Service Center"
                    HeaderRight={
                      information?.serviceCenterName
                        ? information?.serviceCenterName
                        : '--'
                    }
                  />
                </>
              ) : null}
              {contentType === 'Story' ? (
                <View style={{marginTop: scale(10)}}>
                  <Text style={styles.messageText}>
                    Posted on{' '}
                    {information?.createdDate
                      ? moment(information?.createdDate).format('Do MMM yyyy')
                      : '--'}
                  </Text>
                  <Text
                    style={{
                      fontSize: scale(20),
                      fontFamily: 'SourceSansPro-Semibold',
                      color: '#196AA5',
                      marginTop: scale(10),
                      marginLeft: scale(5),
                    }}>
                    {information?.storyTitle ? information.storyTitle : '--'}
                  </Text>
                  <Text style={styles.messageText}>
                    {information?.description ? information.description : '--'}
                  </Text>
                </View>
              ) : (
                <View style={{marginTop: scale(10)}}>
                  <Text style={styles.headerLeft}>Message/Comments</Text>
                  <Text style={styles.messageText}>
                    {information?.description ? information.description : '--'}
                  </Text>
                </View>
              )}
              <View style={styles.horizontalBar} />
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../../../Infrastructure/assets/images/likedIcon.png')}
                    style={{
                      width: scale(24),
                      height: scale(24),
                      resizeMode: 'contain',
                    }}
                  />
                  <Text style={styles.statusCount}>
                    {LikeAndCommentCountMethod(upVoteCount)}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.statusCount}>
                    {LikeAndCommentCountMethod(comment)} comments
                  </Text>
                  <Text style={styles.statusCount}>|</Text>
                  <Text style={styles.statusCount}>
                    {LikeAndCommentCountMethod(viewCount)} views
                  </Text>
                </View>
              </View>
              {/* Like, comments , favourites action Button start */}
              <View
                style={{
                  ...styles.actionView,
                  justifyContent: 'space-between',
                  paddingHorizontal: scale(10),
                }}>
                <TouchableOpacity
                  style={{
                    ...styles.alignRow,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    decisionUPVote();
                  }}>
                  {upVote ? (
                    <AntDesign name="like1" size={scale(20)} color="#FEBC54" />
                  ) : (
                    <AntDesign name="like2" size={scale(20)} color="#10A0DA" />
                  )}
                  <Text style={styles.footerText}>Like</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.alignRow,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    setShowCommentBox(!showCommentBox);
                    getAllComments();
                  }}>
                  <MaterialCommunityIcons
                    name="message-outline"
                    size={scale(20)}
                    color="#10A0DA"
                  />
                  <Text style={styles.footerText}>Comment</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.alignRow,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={FavouriteHandler}>
                  {isFovourite ? (
                    <Entypo name="star" size={scale(22)} color="#FEBC54" />
                  ) : (
                    <Entypo
                      name="star-outlined"
                      size={scale(22)}
                      color="#10A0DA"
                    />
                  )}
                  <Text style={styles.footerText}>Favourite</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    ...styles.alignRow,
                    justifyContent: 'center',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={
                    () => setModalToShow(p => !p)
                    // bottomSheet?.current?.show()
                  }>
                  <AntDesign
                    name="warning"
                    size={scale(20)}
                    color={isReported ? 'red' : '#10A0DA'}
                  />
                  <Text
                    style={{
                      ...styles.footerText,
                      color: isReported ? 'red' : '#10A0DA',
                    }}>
                    Report
                  </Text>
                </TouchableOpacity>
              </View>
              {/* Like, comments , favourites ,Report action Button End */}
              {showCommentBox ? (
                allCommentsList && allCommentsList.length ? (
                  <>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: scale(10),
                        marginBottom: scale(5),
                      }}>
                      <View>
                        <Text style={styles.commentText}>Comments</Text>
                      </View>
                      <View style={{flexDirection: 'row', flex: 1}}>
                        <View
                          style={{
                            flex: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <View
                            style={{
                              flex: 1,
                              flexDirection: 'row',
                              justifyContent: 'flex-end',
                            }}>
                            <TouchableOpacity
                              onPress={() => {
                                setShowAllCommentBox(!showAllCommentBox);
                              }}
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                              }}>
                              <Text
                                style={{
                                  ...styles.subCommenterProfileText,
                                }}>
                                {!showAllCommentBox
                                  ? `View more comments `
                                  : `View less comments `}
                              </Text>
                              <AntDesign
                                name={showAllCommentBox ? 'up' : 'down'}
                                size={scale(16)}
                                color="#10A0DA"
                                style={{marginTop: scale(3)}}
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                    <View>
                      {!showAllCommentBox ? (
                        <View
                          style={{
                            marginTop: scale(5),
                            marginBottom: scale(
                              showAllCommentBox === false ? 0 : 5,
                            ),
                            paddingHorizontal: scale(5),
                            borderRadius: scale(4),
                            borderColor: '#F3F3F3',
                            borderWidth: 1,
                          }}>
                          {CommentView(result[0])}
                        </View>
                      ) : null}
                    </View>
                    <View>
                      {showAllCommentBox
                        ? result.reverse().map((item, ind) => {
                            return (
                              <View>
                                <View
                                  style={{
                                    marginTop: scale(5),
                                    marginBottom: scale(
                                      showAllCommentBox === false ? 0 : 5,
                                    ),
                                    paddingHorizontal: scale(5),
                                    borderRadius: scale(4),
                                    borderColor: '#F3F3F3',
                                    borderWidth:
                                      showAllCommentBox === false
                                        ? ind === 0
                                          ? 1
                                          : 1 //change to 0
                                        : 1,
                                  }}>
                                  {CommentView(item, ind)}
                                </View>
                              </View>
                            );
                          })
                        : null}
                    </View>
                  </>
                ) : (
                  <NoDataFound
                    Text="There are No Comments yet..."
                    style={{
                      Text: {
                        color: '#505050',
                        fontSize: scale(14),
                        fontFamily: 'SourceSansPro-Semibold',
                      },
                      Image: {
                        height: scale(contentType === 'Decision' ? 150 : 200),
                        width: scale(contentType === 'Decision' ? 150 : 200),
                        resizeMode: 'contain',
                      },
                    }}
                  />
                )
              ) : null}
            </View>
          </View>
        </ScrollView>
        <View style={{backgroundColor: '#ffff'}}>
          <View style={styles.footerProfile}>
            <Avatar.Image
              size={scale(40)}
              source={
                userInformation?.smallProfileImage === null
                  ? require('../../../Infrastructure/assets/images/avatar.png')
                  : {
                      uri: `data:image/png;base64,${userInformation?.smallProfileImage}`,
                    }
              }
            />
            <TextInput
              ref={inputEl}
              name="comment"
              placeholder="Write a comment..."
              placeholderTextColor="#4D4F5C"
              value={values.comment}
              onChangeText={handleChange('comment')}
              style={{
                ...styles.TextInput,
                flex: 1,
              }}
              onPressIn={() => setShowCommentBox(true)}
              multiline={true}
            />
            {showCommentBox && values.comment !== '' && (
              <TouchableOpacity
                onPress={handleSubmit}
                style={{marginLeft: scale(5)}}>
                <Text
                  style={{
                    ...styles.footerProfileText,
                    right: scale(5),
                    color: '#10A0DA',
                  }}>
                  Post
                </Text>
              </TouchableOpacity>
            )}
          </View>
          {touched.comment && errors.comment && (
            <Text style={{...styles.errorMessage, marginLeft: scale(50)}}>
              {errors.comment}
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
};
const mapStateToProps = ({
  timeLine: {userInformation},
  authReducer: {loginUserInformation},
  petitionDecisionsReducer: {
    getPetitionDecisionAllCommentsList,
    ReportAbuseList,
  },
}) => ({
  getPetitionDecisionAllCommentsList,
  userInformation,
  loginUserInformation,
  ReportAbuseList,
});
const mapDispatchToProps = {
  getPetitionDecisionsAllcomments: (authToken, payload, postId) =>
    getPetitionDecisionsAllcomments(authToken, payload, postId),
  decisionPostUpVote: (authToken, postId, upVoteType) =>
    decisionPostUpVote(authToken, postId, upVoteType),
  followPost: (authToken, postId, followType) =>
    followPostToApi(authToken, postId, followType),
  fovouritePost: (authToken, postId, fovouriteType) =>
    fovouritePostApi(authToken, postId, fovouriteType),
  commentPost: (authToken, postId, payload) =>
    commentPostApi(authToken, postId, payload),
  commentUpVote: (authToken, commentId, upVoteType) =>
    commentUpVoteApi(authToken, commentId, upVoteType),
  DeleteComment: (authToken, PostId, commentId) =>
    DeleteCommentApi(authToken, PostId, commentId),
  getCommentViewCount: (authToken, PostId) => getCommentView(authToken, PostId),
  getReortabuse: authToken => getReortabuseList(authToken),
  postReortabuse: (authToken, postId, TypeOfReport) =>
    postReortAbuse(authToken, postId, TypeOfReport),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(memo(ContentDetails));
