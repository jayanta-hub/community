import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Text,
  Platform,
} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {getAuthToken} from '../../../Infrastructure/utils/storageUtility';
import TimelineCard from '../../../Infrastructure/component/TimelineCards/TimelineCard';
import {useIsFocused} from '@react-navigation/native';
import Loader from '../../../Infrastructure/component/Loader/Loader';
import Advertisement from '../../../Infrastructure/component/Advertisement/Advertisement';
import {notifications} from '../../../application/store/actions/notification';
import {
  fetchCountryList,
  getOtherSupportingAppData,
  getUserInformation,
} from '../../../application/store/actions/timeLine';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TimelineHeader from '../../../Infrastructure/component/CommunityTimelineHeader/TimelineHeader';
import DecisionsScreen from '../Decisions/DecisionsScreen';
import ResponseToRuleScreen from '../Response To Rule/ResponseToRuleScreen';
import StoriesScreen from '../Stories/StoriesScreen';
const TimeLineComponent = props => {
  const navigation = useNavigation();
  const Tab = createMaterialTopTabNavigator();
  const [status, setStatus] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const userInformation = props?.userInformation?.data
    ? props.userInformation?.data
    : [];
  const isFocused = useIsFocused();
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshBeneficiaryInformation();
  }, []);
  const onViewProfile = () => {
    navigation.navigate('My Account');
  };
  const init = async () => {
    const authToken = await getAuthToken();
    await props
      .getOtherSupportingAppDetails(authToken)
      .then(res => {
        console.log('res', res);
      })
      .catch(error => {
        console.log('error', error);
      });
    let countryList = props.getCountryList(authToken);
    Promise.allSettled([countryList])
      .then(data => {
        console.log('data', data);
        setStatus(false);
        setRefreshing(false);
      })
      .catch(error => {
        setStatus(false);
        setRefreshing(false);
        console.log('error init apicall =>>', error);
      });
  };
  const refreshBeneficiaryInformation = async () => {
    const authToken = await getAuthToken();
    let beneficiaryInformation = await props.getUserInformation(authToken);
    Promise.allSettled([beneficiaryInformation])
      .then(data => {
        setStatus(false);
        setRefreshing(false);
      })
      .catch(error => {
        setStatus(false);
        setRefreshing(false);
        console.log('error refresh apicall =>>', error);
      });
  };
  // useEffect(() => {
  //   init() && setStatus(true);
  // }, []);
  // useEffect(() => {
  //   isFocused === true && refreshBeneficiaryInformation() && setStatus(true);
  // }, [isFocused]);

  return (
    <SafeAreaView style={{backgroundColor: '#F3F3F3', flex: 1}}>
      <Loader status={status} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, marginBottom: scale(20)}}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            title="Refreshing"
            titleColor={'#00A0DA'}
            onRefresh={onRefresh}
            tintColor="#00A0DA"
          />
        }>
        <View
          style={{
            flex: 1,
            marginHorizontal: scale(10),
          }}>
          <View style={{marginTop: scale(10)}}>
            <TimelineHeader
              onAction={onViewProfile}
              actionLabel="View Profile"
              profilePic={
                userInformation?.profileImage
                  ? userInformation.profileImage
                  : null
              }
              name={
                userInformation?.firstName
                  ? `${userInformation.firstName} ${userInformation.lastName}`
                  : '--'
              }
              primaryEmail={
                userInformation?.email ? `${userInformation.email}` : '--'
              }
              Following={userInformation?.following}
              Followers={userInformation?.followers}
            />
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Decisions');
              }}>
              <TimelineCard
                Title="Petition Decisions"
                iconImage={require('../../../Infrastructure/assets/images/PetitionDecissionIcon.png')}
                iconSize={{
                  width: scale(25),
                  height: scale(25),
                  marginLeft: scale(10),
                  resizeMode: 'contain',
                }}
                style={{
                  titleContent: {
                    marginLeft: scale(26),
                  },
                }}
                king07
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Responses to Rule');
              }}>
              <TimelineCard
                Title="Response to Immigration Rules"
                iconImage={require('../../../Infrastructure/assets/images/ImmRulesIcon.png')}
                iconSize={{
                  width: scale(22),
                  height: scale(22),
                  marginLeft: scale(10),
                  resizeMode: 'contain',
                }}
                style={{
                  titleContent: {
                    marginLeft: scale(26),
                  },
                }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Stories');
              }}>
              <TimelineCard
                Title="Stories"
                iconImage={require('../../../Infrastructure/assets/images/StoryIcon.png')}
                iconSize={{
                  width: scale(22),
                  height: scale(22),
                  marginLeft: scale(10),
                  resizeMode: 'contain',
                }}
                style={{
                  titleContent: {
                    marginLeft: scale(26),
                  },
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginTop: scale(20),
            }}>
            <Text
              style={{
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-Semibold',
                marginLeft: scale(10),
              }}>
              Recent Posts
            </Text>
            <Tab.Navigator
              activeColor="#4D4F5C"
              initialRouteName="Decision"
              style={{
                marginTop: scale(10),
                height: scale(Platform.isPad ? 260 : 270),
              }}
              screenOptions={{
                swipeEnabled: false, // to disable horizontal scroll
                tabBarActiveTintColor: '#00A0DA',
                tabBarInactiveTintColor: '#4D4F5C',
                tabBarIndicatorStyle: {
                  borderBottomColor: '#00A0DA',
                  borderBottomWidth: 4,
                },
                // To fixed Alignment issue in ios
                tabBarContentContainerStyle: {
                  height: scale(65),
                },
                tabBarLabelStyle: {
                  fontSize: scale(14),
                  fontFamily: 'SourceSansPro-SemiBold',
                  textTransform: 'none',
                },
              }}>
              <Tab.Screen name="Decision">
                {() => <DecisionsScreen isRecentPost={true} />}
              </Tab.Screen>
              <Tab.Screen name="Responses to Rules">
                {() => <ResponseToRuleScreen isRecentPost={true} />}
              </Tab.Screen>
              <Tab.Screen name="Story">
                {() => <StoriesScreen isRecentPost={true} />}
              </Tab.Screen>
            </Tab.Navigator>
          </View>
        </View>
        <View style={{marginTop: scale(10)}}>
          <Advertisement />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const mapStateToProps = ({
  timeLine: {userInformation, getOtherSupportingAppData},
}) => ({
  userInformation,
  getOtherSupportingAppData,
});
const mapDispatchToProps = {
  notification: (AuthToken, payload) => notifications(AuthToken, payload),
  getOtherSupportingAppDetails: authToken =>
    getOtherSupportingAppData(authToken),
  getUserInformation: authToken => getUserInformation(authToken),
  getCountryList: authToken => fetchCountryList(authToken),
};
export default connect(mapStateToProps, mapDispatchToProps)(TimeLineComponent);
