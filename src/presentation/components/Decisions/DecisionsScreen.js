import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import CommunityCard from '../../../Infrastructure/component/CommunityCard/CommunityCard';
import {scale, width} from '../../../Infrastructure/utils/screenUtility';
import {connect} from 'react-redux';
import {
  DeletePostApi,
  getPetitionDecisions,
} from '../../../application/store/actions/petitionDecisions';
import {
  getAuthToken,
  getUserID,
} from '../../../Infrastructure/utils/storageUtility';
import Loader from '../../../Infrastructure/component/Loader/Loader';
import {useIsFocused} from '@react-navigation/native';
import NoDataFound from '../../../Infrastructure/component/NoDataFound/NoDataFound';
import Toast from 'react-native-simple-toast';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Carousel from 'react-native-reanimated-carousel';
import {useSharedValue} from 'react-native-reanimated';
const DecisionsScreen = props => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [status, setStatus] = useState(false);
  const [petitionDecisionList, setPetitionDecisionList] = useState(
    props.getPetitionDecisionList?.data?.elements || [],
  );
  const [isCheckBeneficiaryList, setIsCheckBeneficiaryList] = useState('1');
  const [pageNo, setPageNo] = useState(1);
  const [isStatus, setIsstatus] = useState(false);
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const ischeck = () => {
    setTimeout(() => {
      setIsstatus(false);
    }, 3000);
  };

  let refs = useRef();
  const progressValue = useSharedValue(0);
  const DeletePost = async PostId => {
    const authToken = await getAuthToken();
    props
      .PostDelete(authToken, PostId)
      .then(res => {
        init(1);
        Toast.show(res.message, Toast.LONG);
      })
      .catch(error => {
        console.log('Delete Decision Post error', error);
        Toast.show(error.message, Toast.LONG);
      });
  };
  const showAlert = PostId => {
    Alert.alert(
      '',
      'Would you like to Delete.',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            DeletePost(PostId);
          },
        },
      ],
      {cancelable: false},
    );
  };

  const init = async Pno => {
    const authToken = await getAuthToken();
    const userID = await getUserID();
    const payload = {
      dateTab: props?.isFav
        ? props?.paramsPayload?.sortBy
        : props?.route?.params?.sortBy
        ? props.route.params.sortBy
        : '',
      decisionCode: props?.isFav
        ? props?.paramsPayload?.decision
        : props?.route?.params?.decision
        ? props.route.params.decision
        : '',
      endDateInMilliSeconds: props?.isFav
        ? props?.paramsPayload?.endDateInMilliSeconds
        : props?.route?.params?.endDateInMilliSeconds
        ? props.route.params.endDateInMilliSeconds
        : '',
      myPostUserId: props?.myPostUserId ? userID : '',
      pageNumber: props?.isRecentPost ? 1 : Pno ? Pno : pageNo,
      reasonCode: '',
      recordsPerPage: props?.isRecentPost ? 5 : 20,
      ruleCode: '',
      searchText: '',
      serviceCenterCode: props?.isFav
        ? props?.paramsPayload?.serviceCenter
        : props?.route?.params?.serviceCenter
        ? props.route.params.serviceCenter
        : '',
      sortDirection: '',
      sortField: '',
      startDateInMilliSeconds: props?.isFav
        ? props?.paramsPayload?.startDateInMilliSeconds
        : props?.route?.params?.startDateInMilliSeconds
        ? props.route.params.startDateInMilliSeconds
        : '',
      storyTitle: '',
      suggestionCode: '',
      visaTypeCode: props?.isFav
        ? props?.paramsPayload?.visaType
        : props?.route?.params?.visaType
        ? props.route.params.visaType
        : '',
      loggedInUserId: userID,
      isFavourite: props?.isFav === undefined ? '' : true,
    };
    pageNo === 1 || Pno ? setStatus(true) : setLoadingSpinner(true);
    console.log('payload', payload);
    console.log('props.isFav', props.isFav);

    await props
      .getPetitionDecisions(authToken, payload)
      .then(res => {
        console.log('response', res);
        let data;
        setPageNo(Pno ? Pno + 1 : pageNo + 1);
        if (pageNo > 1 && Pno !== 1) {
          data = [
            ...petitionDecisionList,
            ...(res?.data?.elements !== null ? res.data.elements : []),
          ];
        } else {
          data = [...(res?.data?.elements !== null ? res.data.elements : [])];
        }
        let concatArray = data.map(eachValue => {
          return Object.values(eachValue).join('');
        });
        let filterValues = data.filter((value, index) => {
          return concatArray.indexOf(concatArray[index]) === index;
        });
        let FavoriteData = filterValues.filter(
          item => item.isFavourite === true,
        );
        setPetitionDecisionList(
          props?.isFav || props.route?.params?.isFav
            ? FavoriteData
            : filterValues,
        );
        setIsCheckBeneficiaryList(
          res?.data?.elements !== null ? res.data.elements : [],
        );
        setLoadingSpinner(false);
        setIsstatus(true);
        ischeck();
        setStatus(false);
      })
      .catch(error => {
        setIsstatus(true);
        setIsCheckBeneficiaryList([]);
        setLoadingSpinner(false);
        ischeck();
        setStatus(false);
        console.log('get petition decision error', error);
      });
  };
  const renderItem = ({item}) => (
    <CommunityCard
      information={item}
      ContentType={'Decision'}
      isMypost={props.myPostUserId}
      DeletePost={showAlert}
      isRecentPost={props?.isRecentPost}
    />
  );
  const footerLoader = () => {
    return loadingSpinner && petitionDecisionList.length >= 0 ? (
      <View>
        <ActivityIndicator size={30} color={'#00A0DA'} />
      </View>
    ) : isStatus && isCheckBeneficiaryList.length === 0 ? (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: scale(10),
        }}>
        <Text
          style={{
            fontFamily: 'SourceSansPro-Bold',
            fontSize: scale(14),
            color: '#475F7B',
          }}>
          No More Data Found
        </Text>
      </View>
    ) : null;
  };
  useEffect(() => {
    isFocused === true && props?.ContentTypeHandler //for Favorite screen
      ? props.ContentTypeHandler('DECISION')
      : null;
    isFocused === true && init();
    return setPageNo(1);
  }, [isFocused]);
  useEffect(() => {
    props.myPostUserId
      ? null
      : props?.navigation?.setOptions({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Filter', {ContentType: 'DECISION'});
              }}>
              <AntDesign
                name="filter"
                size={scale(23)}
                color="#10A0DA"
                style={{marginRight: scale(25)}}
              />
            </TouchableOpacity>
          ),
        });
  }, []);
  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: props?.isRecentPost ? '#EFFAFF' : '#F3F3F3',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: props?.isRecentPost ? 'center' : 'stretch',
        }}>
        {!props?.isRecentPost ? (
          <Loader status={status} />
        ) : status ? (
          <>
            <ActivityIndicator // For Recent Post
              animating={status}
              color={'#00A0DA'}
              size={scale(25)}
            />
          </>
        ) : null}
        {props?.isRecentPost === true ? (
          petitionDecisionList?.length > 0 ? (
            <>
              <Carousel
                ref={refs}
                loop={false}
                width={width}
                height={width / 2}
                autoPlay={true}
                data={petitionDecisionList}
                scrollAnimationDuration={1000}
                onSnapToItem={index => setActiveIndex(index)}
                renderItem={renderItem}
                pagingEnabled={true}
                snapEnabled={true}
                onProgressChange={(_, absoluteProgress) => {
                  progressValue.value = absoluteProgress;
                }}
                autoPlayInterval={2500}
              />
              {!!progressValue && (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignSelf: 'center',
                    marginTop: scale(Platform.isPad ? -125 : -8),
                  }}>
                  {petitionDecisionList.map((backgroundColor, index) => {
                    return (
                      <View
                        style={{
                          width: scale(6),
                          height: scale(6),
                          borderRadius: scale(3),
                          backgroundColor: '#10A0DA',
                          opacity: index === activeIndex ? 1 : 0.3,
                          marginHorizontal: scale(5),
                        }}
                      />
                    );
                  })}
                </View>
              )}
            </>
          ) : (
            <NoDataFound
              Text={'No Record Found...'}
              style={{Image: {width: scale(150), height: scale(150)}}}
            />
          )
        ) : [1, 2, 3]?.length > 0 ? (
          <FlatList
            data={[1, 2, 3]}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            onEndReachedThreshold={1}
            horizontal={props?.isRecentPost ? true : false}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={() =>
              props?.isRecentPost
                ? null
                : isCheckBeneficiaryList.length > 0
                ? init()
                : null
            }
            ListFooterComponent={() => footerLoader()}
          />
        ) : (
          <NoDataFound Text={'No Record Found...'} />
        )}
      </View>
    </>
  );
};
const mapStateToProps = ({
  petitionDecisionsReducer: {getPetitionDecisionList},
}) => ({
  getPetitionDecisionList,
});
const mapDispatchToProps = {
  getPetitionDecisions: (authToken, payload) =>
    getPetitionDecisions(authToken, payload),
  PostDelete: (authToken, PostId) => DeletePostApi(authToken, PostId),
};
export default connect(mapStateToProps, mapDispatchToProps)(DecisionsScreen);
