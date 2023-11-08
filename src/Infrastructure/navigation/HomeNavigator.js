import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {scale} from '../utils/screenUtility';
import TimeLine from '../../presentation/components/TimeLine/TimeLine';
import {connect} from 'react-redux';
import Back from '../component/back/Back';
import {useNavigation} from '@react-navigation/native';
import LOGOSVG from '../../Infrastructure/assets/images/splashScreenLogo.svg';
import DecisionsScreen from '../../presentation/components/Decisions/DecisionsScreen';
import ResponseToRuleScreen from '../../presentation/components/Response To Rule/ResponseToRuleScreen';
import StoriesScreen from '../../presentation/components/Stories/StoriesScreen';
import CreatePost from '../../presentation/components/CreatePost/CreatePost';
import MyPosts from '../../presentation/components/MyPosts/MyPosts';
import ContentDetails from '../../presentation/components/ContentDetails/ContentDetails';
import Filter from '../../presentation/components/Filter/Filter';
import BackToHome from '../component/BackToHome/BackToHome';
const HomeStack = createStackNavigator();
const HeaderLeft = props => {
  return (
    <View style={{marginLeft: 20}}>
      <Ionicons color="#4D4F5C" name="menu" size={30} />
    </View>
  );
};
const HearderTitle = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <LOGOSVG width="140px" />
      </View>
    </View>
  );
};
const HomeNavigator = props => {
  const navigation = useNavigation();
  return (
    <>
      <HomeStack.Navigator initialRouteName="Dashboard">
        <>
          <HomeStack.Screen
            name="Dashboard"
            component={TimeLine}
            options={{
              headerStyle: {
                borderBottomWidth: 1,
                borderColor: '#00000029',
              },
              headerLeft: props => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}>
                  <HeaderLeft {...props} />
                </TouchableOpacity>
              ),
              headerTitle: props => <HearderTitle {...props} />,
            }}
          />
          <HomeStack.Screen
            name="Decisions"
            component={DecisionsScreen}
            options={{
              title: 'Petition Decisions',
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="Responses to Rule"
            component={ResponseToRuleScreen}
            options={{
              title: 'Response to Immigration Rules',
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="Stories"
            component={StoriesScreen}
            options={{
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="Create Post"
            component={CreatePost}
            options={{
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="My Posts"
            component={MyPosts}
            options={{
              headerLeft: () => <BackToHome />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="Content Details"
            component={ContentDetails}
            options={{
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
          <HomeStack.Screen
            name="Filter"
            component={Filter}
            options={{
              headerLeft: () => <Back />,
              headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
              headerBackTitleVisible: false,
              headerTitleStyle: {
                fontSize: scale(16),
                color: '#4D4F5C',
                fontFamily: 'SourceSansPro-SemiBold',
              },
            }}
          />
        </>
      </HomeStack.Navigator>
    </>
  );
};
const mapStateToProps = ({notificationReducer: {notificationStatus}}) => ({
  notificationStatus,
});
export default connect(mapStateToProps, null)(HomeNavigator);
