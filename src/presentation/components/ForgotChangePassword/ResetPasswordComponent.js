import React, {useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {Button} from 'react-native-paper';
import Logo from '../../../Infrastructure/component/Logo/Logo';
import {Formik} from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import styles from './styles';
import {resetPassword} from '../../../application/store/actions/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
const loginValidationSchema = yup.object().shape({
  password: yup
    .string()
    .matches(/\d/, 'Password must have a number')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')

    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
});

const ResetPassword = ({route, changePassword}) => {
  const {userId} = route.params;
  const navigation = useNavigation();
  const formRef = useRef();
  const saveInput = () => {
    if (formRef.current) {
      formRef.current.handleSubmit();
    }
  };
  const formSubmitHandler = async formData => {
    const payload = {
      username: userId,
      newpassword: formData.password,
    };
    await changePassword(payload)
      .then(async res => {
        Toast.show(res.message, Toast.LONG);
        if (res.status === 200) {
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        console.log('error', error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <TouchableOpacity style={styles.logo}>
          <Logo />
        </TouchableOpacity>
        <View style={styles.form}>
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
          <View>
            <Text style={styles.formTitle}>Reset Your Password</Text>
          </View>
          <View style={{marginTop: scale(11)}}>
            <Text styles={styles.formDetailsTitle}>
              Reset your password & login
            </Text>
            <Formik
              validationSchema={loginValidationSchema}
              innerRef={formRef}
              validateOnBlur={true}
              validateOnChange={true}
              initialValues={{password: '', confirmPassword: ''}}
              onSubmit={values => formSubmitHandler(values)}>
              {({handleChange, handleBlur, touched, values, errors}) => (
                <View>
                  <View style={{flex: 1}}>
                    <Text
                      style={{
                        marginTop: scale(10),
                        fontSize: scale(16),
                        fontFamily: 'SourceSansPro-Regular',
                        color: '#24262F',
                      }}>
                      New Password
                    </Text>
                    <TextInput
                      name="password"
                      placeholder="Enter"
                      placeholderTextColor="#4D4F5C"
                      value={values.password}
                      onBlur={handleBlur('password')}
                      onChangeText={handleChange('password')}
                      autoCorrect={false}
                      secureTextEntry
                      style={styles.TextInput}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorMessage}>{errors.password}</Text>
                    )}
                  </View>
                  <View style={{...styles.formContent, flex: 1}}>
                    <Text
                      style={{
                        marginTop: scale(10),
                        fontSize: scale(16),
                        fontFamily: 'SourceSansPro-Regular',
                        color: '#24262F',
                      }}>
                      Confirm New Password
                    </Text>
                    <TextInput
                      name="confirmPassword"
                      placeholder="Enter"
                      placeholderTextColor="#4D4F5C"
                      value={values.confirmPassword}
                      onBlur={handleBlur('confirmPassword')}
                      onChangeText={handleChange('confirmPassword')}
                      autoCorrect={false}
                      secureTextEntry
                      style={styles.TextInput}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.errorMessage}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={() => {
            saveInput();
          }}>
          <Button
            style={{
              backgroundColor: '#00A0DA',
              widht: scale(100),
              height: scale(54),
              justifyContent: 'center',
            }}>
            <Text style={styles.buttonText}>RESET</Text>
          </Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
ResetPassword.propTypes = {
  changePassword: PropTypes.func,
};
ResetPassword.defaultProps = {
  changePassword: () => {},
};
const mapDispatchToProps = {
  changePassword: payload => resetPassword(payload),
};
export default connect(null, mapDispatchToProps)(ResetPassword);
