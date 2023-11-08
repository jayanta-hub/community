import React, {useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import DecisionsScreen from '../Decisions/DecisionsScreen';
import ResponseToRuleScreen from '../Response To Rule/ResponseToRuleScreen';
import StoriesScreen from '../Stories/StoriesScreen';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
const Favorite = props => {
  const [contentType, setContentType] = useState('');
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  const ContentTypeHandler = type => {
    setContentType(type);
  };
  useEffect(() => {
    props.myPostUserId
      ? null
      : props?.navigation?.setOptions({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Filter', {
                  ContentType: contentType !== '' ? contentType : 'DECISION',
                  isFav: true,
                });
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
  }, [contentType]);
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
        {() => (
          <DecisionsScreen
            ContentTypeHandler={ContentTypeHandler}
            isFav={true}
            paramsPayload={props.route.params}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Responses to Rules">
        {() => (
          <ResponseToRuleScreen
            ContentTypeHandler={ContentTypeHandler}
            isFav={true}
            paramsPayload={props.route.params}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Story">
        {() => (
          <StoriesScreen
            ContentTypeHandler={ContentTypeHandler}
            isFav={true}
            paramsPayload={props.route.params}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};
export default Favorite;
