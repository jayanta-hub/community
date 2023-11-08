import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Formik} from 'formik';
import * as yup from 'yup';
import Logo from '../../../Infrastructure/component/Logo/Logo';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import {
  getOTPforForgotPW,
  resendOtpForForgotPW,
} from '../../../application/store/actions/auth';
import {Button} from 'react-native-paper';
const loginValidationSchema = yup.object().shape({
  OTP: yup.string().required('Verification Code Required'),
});
const OtpVerification = ({route, validateOtp, resendOtpForForgotPW}) => {
  const {otpId, userEmail, userId} = route.params;
  const [resendOtpID, setResendOTPid] = useState('');
  const navigation = useNavigation();
  const formSubmitHandler = async formData => {
    const OTP = formData.OTP;
    let Id = resendOtpID !== '' ? resendOtpID : otpId;
    await validateOtp(Id, OTP)
      .then(async res => {
        if (res.status === 200) {
          navigation.navigate('ResetPassword', {
            userId: userId,
            userEmail: userEmail,
          });
        }
        if (res.status === 500) {
          Toast.show(res.message, Toast.SHORT);
        }
      })
      .catch(error => {
        Toast.show(error.message, Toast.SHORT);
      });
  };
  const resendOtpHandler = () => {
    let UserID = userId;
    resendOtpForForgotPW(UserID)
      .then(res => {
        setResendOTPid(res.data.id);
        Toast.show(res.message, Toast.SHORT);
      })
      .catch(error => {
        console.log('resend error', error);
        Toast.show(error.message, Toast.SHORT);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <TouchableOpacity style={styles.logo}>
          <Logo />
        </TouchableOpacity>
        <View style={styles.form}>
          <View>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                right: scale(5),
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Ionicons name="chevron-back" size={scale(17)} color="#00A0DA" />
              <Text style={styles.backButton}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.formTitle}>Reset Your Password</Text>
            <Text style={styles.formDetailsTitle}>
              Your account verification code has sent to{' '}
              <Text style={styles.formSubTitle}>{userEmail}</Text>
            </Text>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{OTP: ''}}
              onSubmit={values => formSubmitHandler(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                values,
                errors,
              }) => (
                <View style={styles.content}>
                  <View>
                    <Text
                      style={{
                        fontSize: scale(16),
                        color: '#24262F',
                        fontFamily: 'SourceSansPro-Regular',
                      }}>
                      Verification Code
                    </Text>
                    <TextInput
                      name="OTP"
                      placeholder="Enter"
                      placeholderTextColor="#4D4F5C"
                      value={values.email}
                      onBlur={handleBlur('OTP')}
                      onChangeText={handleChange('OTP')}
                      style={styles.TextInput}
                    />
                    {touched.OTP && errors.OTP && (
                      <Text style={styles.errorMessage}>{errors.OTP}</Text>
                    )}
                  </View>
                  <View style={{marginTop: scale(20), marginLeft: scale(5)}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={{color: '#2F2F2F'}}>Not yet received</Text>
                        <Text
                          style={{
                            color: '#128BFF',
                            textDecorationLine: 'underline',
                            marginTop: scale(5),
                          }}
                          onPress={resendOtpHandler}>
                          Resend Code
                        </Text>
                      </View>
                      <TouchableOpacity
                        style={{alignContent: 'flex-end'}}
                        onPress={handleSubmit}>
                        <Button
                          style={{
                            backgroundColor: '#00A0DA',
                            borderRadius: 4,
                          }}>
                          <Text style={styles.buttonText}>VERIFY</Text>
                        </Button>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
OtpVerification.propTypes = {
  validateOtp: PropTypes.func,
};
OtpVerification.defaultProps = {
  validateOtp: () => {},
};
const mapDispatchToProps = {
  validateOtp: (Id, OTP) => getOTPforForgotPW(Id, OTP),
  resendOtpForForgotPW: UserID => resendOtpForForgotPW(UserID),
};
export default connect(null, mapDispatchToProps)(OtpVerification);
