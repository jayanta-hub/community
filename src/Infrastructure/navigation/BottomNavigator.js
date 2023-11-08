import React from 'react';
import {View, Text, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import HomeNavigator from './HomeNavigator';
import {Provider} from 'react-native-paper';
import {scale} from '../utils/screenUtility';
import Back from '../component/back/Back';
import MyAccountNavigator from './MyAccountNavigator';
import ComingSoon from '../component/ComingSoon/ComingSoon';
import FavoriteNavigator from './FavoriteNavigator';
const BottomStack = createBottomTabNavigator();

const BottomNavigator = props => {
  const {navigation} = props;
  return (
    <Provider>
      <BottomStack.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home';
              return (
                <Entypo
                  name={iconName}
                  size={size}
                  color={color === '#0077A3' ? '#00A0DA' : '#687C93'}
                />
              );
            } else if (route.name === `Favourites`) {
              iconName = focused ? 'star-outlined' : 'star-outlined';
              return (
                <Entypo
                  name={iconName}
                  size={size}
                  color={color === '#0077A3' ? '#00A0DA' : '#687C93'}
                />
              );
            } else if (route.name === `My Account`) {
              return (
                <View>
                  {color === '#0077A3' ? (
                    <Image
                      source={require('../../Infrastructure/assets/images/myaccountIconBluez.png')}
                      style={{
                        width: scale(20),
                        height: scale(20),
                        resizeMode: 'contain',
                      }}
                    />
                  ) : (
                    <Image
                      source={require('../../Infrastructure/assets/images/myaccountIconz.png')}
                      style={{
                        width: scale(20),
                        height: scale(20),
                        resizeMode: 'contain',
                      }}
                    />
                  )}
                </View>
              );
            }
          },
          tabBarActiveTintColor: '#0077A3',
        })}>
        <BottomStack.Screen
          options={{
            headerShown: false,
            tabBarLabelStyle: {
              fontSize: scale(12),
              fontFamily: 'SourceSansPro-SemiBold',
            },
          }}
          name="Home"
          component={HomeNavigator}
        />
        <BottomStack.Screen
          name="Favourites"
          component={FavoriteNavigator}
          // component={ComingSoon}
          options={{
            headerShown: false,
            headerLeft: () => <Back />,
            headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
            headerTitleStyle: {
              fontSize: scale(16),
              color: '#4D4F5C',
              fontFamily: 'SourceSansPro-SemiBold',
            },
            tabBarLabelStyle: {
              fontSize: scale(12),
              fontFamily: 'SourceSansPro-SemiBold',
            },
          }}
        />
        <BottomStack.Screen
          name="My Account"
          component={MyAccountNavigator}
          // component={ComingSoon}
          options={{
            headerLeft: () => <Back />,
            headerShown: false,
            headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
            headerTitleStyle: {
              fontSize: scale(16),
              color: '#4D4F5C',
              fontFamily: 'SourceSansPro-SemiBold',
            },
            tabBarLabelStyle: {
              fontSize: scale(12),
              fontFamily: 'SourceSansPro-SemiBold',
            },
          }}
        />
      </BottomStack.Navigator>
    </Provider>
  );
};

export default BottomNavigator;
