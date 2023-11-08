import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginComponent from '../../presentation/components/LogIn/LoginComponent';
import RegistrationComponents from '../../presentation/components/Registration/RegistrationComponents';
import VerificationComponets from '../../presentation/components/Verification/VerificationComponets';
import ForgetPassword from '../../presentation/components/ForgetPassword/ForgetPassword';
import ResetPassword from '../../presentation/components/ForgotChangePassword/ResetPasswordComponent';
import OtpVerification from '../../presentation/components/OtpVerification/OtpVerification';
import TermsAndConditions from '../../presentation/components/TermsAndConditions/TermsAndConditions';
import ForgotUserId from '../../presentation/components/ForgotUserId/ForgotUserId';
import {scale} from '../utils/screenUtility';
import Entypo from 'react-native-vector-icons/Entypo';

const AuthNavigator = () => {
  const AuthStack = createStackNavigator();
  const navigation = useNavigation();
  return (
    <AuthStack.Navigator initialRouteName="Login">
      <AuthStack.Screen
        options={{headerShown: false}}
        name="Login"
        component={LoginComponent}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="Registration"
        component={RegistrationComponents}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="Verification"
        component={VerificationComponets}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="ForgotPassword"
        component={ForgetPassword}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="ResetPassword"
        component={ResetPassword}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="changePasswordOTP"
        component={OtpVerification}
      />
      <AuthStack.Screen
        options={{headerShown: false}}
        name="ForgotUserName"
        component={ForgotUserId}
      />
      <AuthStack.Screen
        name="Terms & Conditions"
        component={TermsAndConditions}
        options={{
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Registration')}>
              <Entypo name="chevron-small-left" size={30} color="#687C93" />
            </TouchableOpacity>
          ),
          headerStyle: {borderBottomWidth: 1, borderColor: '#00000029'},
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: scale(16),
            color: '#4D4F5C',
            fontFamily: 'SourceSansPro-SemiBold',
          },
        }}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
