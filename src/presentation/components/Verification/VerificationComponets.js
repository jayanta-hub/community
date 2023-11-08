import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Logo from '../../../Infrastructure/component/Logo/Logo';
import styles from './styles';
import {
  verifyOtpAction,
  resendOtpAction,
} from '../../../application/store/actions/auth';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-simple-toast';
import {Button} from 'react-native-paper';
import {scale} from '../../../Infrastructure/utils/screenUtility';
const loginValidationSchema = yup.object().shape({
  VerifyCode: yup.string().required('Enter Verification Code'),
});
const VerificationComponets = ({
  route,
  otpVerification,
  resendOTPVarification,
}) => {
  const navigation = useNavigation();
  const {Resp} = route.params;
  const formSubmitHandler = async formData => {
    const id = Resp.verificationOTP.id;
    const userotp = formData.VerifyCode;
    await otpVerification(id, userotp)
      .then(async res => {
        Toast.show(res.message, Toast.LONG);
        if (res.status === 200) {
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.log('error', error);
        Toast.show(
          error?.message ? error.message : 'Something went wrong',
          Toast.LONG,
        );
      });
  };
  const resendOtpHandler = () => {
    const resendotpID = Resp.verificationOTP.id;
    resendOTPVarification(resendotpID)
      .then(async res => {
        Toast.show(res.message, Toast.LONG);
      })
      .catch(error => {
        Toast.show(
          error?.message ? error.message : 'Something went wrong',
          Toast.LONG,
        );
      });
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.logo}>
          <Logo />
        </TouchableOpacity>
        <ScrollView contentContainerStyle={{flexGrow: 1, marginTop: scale(20)}}>
          <View style={styles.contains}>
            <Text style={styles.ProfileName}>
              HEY {Resp.UserLogin.beneficiary.fName}
            </Text>
            <Text style={styles.thankyouNote}>
              Thank you for patiently providing all the details.
            </Text>
          </View>
          <View style={styles.contains}>
            <Text style={styles.profileNote}>
              We have sent a verification code to your personal email account.
            </Text>
          </View>
          <View
            style={{
              ...styles.contains,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={styles.email}>
                {Resp.UserLogin.communicationEmailId}
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <View>
              <Text style={styles.cardHeader}>Verification Code</Text>
              <Formik
                initialValues={{VerifyCode: ''}}
                validationSchema={loginValidationSchema}
                onSubmit={values => formSubmitHandler(values)}>
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  touched,
                  errors,
                }) => (
                  <View>
                    <TextInput
                      name="VerifyCode"
                      placeholder="Enter"
                      placeholderTextColor="#4D4F5C"
                      value={values.VerifyCode}
                      onBlur={handleBlur('VerifyCode')}
                      onChangeText={handleChange('VerifyCode')}
                      autoCorrect={false}
                      keyboardType="numeric"
                      style={styles.input}
                    />
                    {touched.VerifyCode && errors.VerifyCode && (
                      <Text style={styles.errorMessage}>
                        {errors.VerifyCode}
                      </Text>
                    )}
                    <View style={{marginTop: scale(20)}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <View>
                          <Text style={{color: '#2F2F2F'}}>
                            Not yet received
                          </Text>
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
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = ({authReducer: {authData}}) => ({
  authData,
});
const mapDispatchToProps = {
  otpVerification: (id, userotp) => verifyOtpAction(id, userotp),
  resendOTPVarification: id => resendOtpAction(id),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerificationComponets);
