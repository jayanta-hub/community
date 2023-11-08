import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale, height} from '../../../Infrastructure/utils/screenUtility';
import DecisionsScreen from '../Decisions/DecisionsScreen';
import ResponseToRuleScreen from '../Response To Rule/ResponseToRuleScreen';
import StoriesScreen from '../Stories/StoriesScreen';
import {View} from 'react-native';
const MyPosts = () => {
  const Tab = createMaterialTopTabNavigator();
  return (
    <Tab.Navigator
      activeColor="#4D4F5C"
      initialRouteName="Decision"
      screenOptions={{
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
        {() => <DecisionsScreen myPostUserId={true} />}
      </Tab.Screen>
      <Tab.Screen name="Responses to Rules">
        {() => <ResponseToRuleScreen myPostUserId={true} />}
      </Tab.Screen>
      <Tab.Screen name="Story">
        {() => <StoriesScreen myPostUserId={true} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
export default MyPosts;
