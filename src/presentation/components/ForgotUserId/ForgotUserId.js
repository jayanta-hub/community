import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Logo from '../../../Infrastructure/component/Logo/Logo';
import styles from './styles';
import {Formik} from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {Button} from 'react-native-paper';
import {forgotUsername} from '../../../application/store/actions/auth';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import Ionicons from 'react-native-vector-icons/Ionicons';
const loginValidationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(/^\S*$/, 'Space is not allowed')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Invalid Email',
    )
    .required('Email Required'),
});
const ForgotUserId = ({validateUser}) => {
  const navigation = useNavigation();
  const formSubmitHandler = async formData => {
    const payload = {
      emailId: formData.email,
    };
    await validateUser(payload)
      .then(async res => {
        Toast.show(res.message, Toast.LONG);
        if (res.status === 200) {
          navigation.navigate('Login');
        }
      })
      .catch(error => {
        Toast.show(
          error?.message ? error.message : 'Something went wrong',
          Toast.LONG,
        );
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
            <Text style={styles.formTitle}>Forgot User Name/ID</Text>
            <Text style={styles.formDetailsTitle}>
              Please provide your registered email address. we will send you the
              Username to your email
            </Text>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{email: ''}}
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
                        textColor: '#24262F',
                        fontFamily: 'SourceSansPro-Regular',
                      }}>
                      Email
                    </Text>
                    <TextInput
                      name="email"
                      placeholder="Enter"
                      placeholderTextColor="#4D4F5C"
                      value={values.email}
                      onBlur={handleBlur('email')}
                      onChangeText={handleChange('email')}
                      style={styles.TextInput}
                    />
                    {touched.email && errors.email && (
                      <Text style={styles.errorMessage}>{errors.email}</Text>
                    )}
                  </View>
                  <TouchableOpacity onPress={handleSubmit}>
                    <Button
                      style={{
                        backgroundColor: '#00A0DA',
                        marginTop: scale(30),
                      }}>
                      <Text style={styles.buttonText}>SUBMIT</Text>
                    </Button>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
ForgotUserId.propTypes = {
  validateUser: PropTypes.func,
};
ForgotUserId.defaultProps = {
  validateUser: () => {},
};
const mapDispatchToProps = {
  validateUser: email => forgotUsername(email),
};
export default connect(null, mapDispatchToProps)(ForgotUserId);
