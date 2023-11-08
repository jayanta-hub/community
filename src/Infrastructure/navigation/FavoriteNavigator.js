import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-native-paper';
import {scale} from '../utils/screenUtility';
import Back from '../component/back/Back';
import Favorite from '../../presentation/components/Favorit/Favorite';
import Filter from '../../presentation/components/Filter/Filter';
import ContentDetails from '../../presentation/components/ContentDetails/ContentDetails';
import StoriesScreen from '../../presentation/components/Stories/StoriesScreen';
import ResponseToRuleScreen from '../../presentation/components/Response To Rule/ResponseToRuleScreen';
import DecisionsScreen from '../../presentation/components/Decisions/DecisionsScreen';
const HomeStack = createStackNavigator();
const FavoriteNavigator = props => {
  return (
    <Provider>
      <HomeStack.Navigator initialRouteName="Favorite">
        <HomeStack.Screen
          name="Favorite"
          component={Favorite}
          options={{
            title: 'Favorite',
            headerShown: true,
            headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
            headerTitleStyle: {
              fontSize: scale(16),
              color: '#4D4F5C',
              fontFamily: 'SourceSansPro-SemiBold',
            },
            headerLeft: props => <Back />,
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
      </HomeStack.Navigator>
      {/* <Disclaimer /> */}
    </Provider>
  );
};

export default FavoriteNavigator;
