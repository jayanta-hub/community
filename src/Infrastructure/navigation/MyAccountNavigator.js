import React, {useState} from 'react';
import {TouchableOpacity, View, Alert, Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../utils/context';
import Entypo from 'react-native-vector-icons/Entypo';
import {Menu, Provider} from 'react-native-paper';
import {scale} from '../utils/screenUtility';
import EditIcon from 'react-native-vector-icons/Octicons';
import Back from '../component/back/Back';
import MyAccount from '../../presentation/components/MyAccount/MyAccount';
import PersonalDetailsEdit from '../../presentation/components/MyAccount/PersonalDetailsEdit';
const HomeStack = createStackNavigator();

const CommingSoon = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: scale(14),
          fontFamily: 'SourceSansPro-Regular',
          color: '#4D4F5C',
        }}>
        Coming Soon..
      </Text>
    </View>
  );
};

const MyAccountHeaderRight = props => {
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const {signOut} = React.useContext(AuthContext);

  const showAlert = () => {
    Alert.alert(
      'ImmigrationHub',
      'Would you like to Logout',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            navigation.goBack(), signOut();
          },
        },
      ],
      {cancelable: false},
    );
  };
  return (
    <TouchableOpacity>
      <View
        style={{
          marginRight: scale(20),
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={{
            zIndex: 100,
            marginTop: scale(32),
          }}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <Entypo color="#687C93" name="dots-three-vertical" size={20} />
            </TouchableOpacity>
          }>
          <Menu.Item
            onPress={() => {
              navigation.navigate('Change Password');
            }}
            title="Change Password"
            style={{height: scale(25)}}
          />
          <View style={{borderWidth: 0.2, borderColor: '#707070'}} />
          <Menu.Item
            onPress={() => {
              showAlert();
            }}
            title="Logout"
            style={{height: scale(25)}}
          />
        </Menu>
      </View>
    </TouchableOpacity>
  );
};
export const PersonalDetailsRight = props => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const {EditPersonalDetailsField} = React.useContext(AuthContext);
  return (
    <TouchableOpacity>
      <View
        style={{
          marginRight: scale(20),
        }}>
        <Menu
          visible={visible}
          onDismiss={closeMenu}
          style={{
            zIndex: 100,
            marginTop: scale(32),
          }}
          anchor={
            <TouchableOpacity onPress={openMenu}>
              <EditIcon name="pencil" size={scale(17)} color="#10A0DA" />
            </TouchableOpacity>
          }>
          <Menu.Item
            onPress={() => {
              props.editHandler();
            }}
            title="Edit"
            style={{height: scale(25)}}
          />
        </Menu>
      </View>
    </TouchableOpacity>
  );
};

const MyAccountNavigator = props => {
  const navigation = useNavigation();

  return (
    <Provider>
      <HomeStack.Navigator initialRouteName="MYACCOUNT">
        <HomeStack.Screen
          name="MYACCOUNT"
          component={MyAccount}
          options={{
            title: 'My Account',
            headerShown: true,
            headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
            headerTitleStyle: {
              fontSize: scale(16),
              color: '#4D4F5C',
              fontFamily: 'SourceSansPro-SemiBold',
            },
            headerLeft: props => <Back />,
            headerRight: props => <MyAccountHeaderRight />,
          }}
        />

        <HomeStack.Screen
          name="PersonalDetailsEdit"
          component={PersonalDetailsEdit}
          options={{
            title: 'Personal Details',
            headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
            headerShown: true,
            headerTitleStyle: {
              fontSize: scale(16),
              color: '#4D4F5C',
              fontFamily: 'SourceSansPro-SemiBold',
            },
            // headerLeft: props => <Back />,
          }}
        />
      </HomeStack.Navigator>
      {/* <Disclaimer /> */}
    </Provider>
  );
};

export default MyAccountNavigator;
