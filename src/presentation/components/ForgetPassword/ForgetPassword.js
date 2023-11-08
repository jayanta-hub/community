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
import {forgotPasswordOTP} from '../../../application/store/actions/auth';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import Ionicons from 'react-native-vector-icons/Ionicons';
const loginValidationSchema = yup.object().shape({
  userId: yup.string().required('User Name / ID Required'),
});
const ForgetPassword = ({validateUser}) => {
  const navigation = useNavigation();
  const formSubmitHandler = async formData => {
    const username = formData.userId;
    await validateUser(username)
      .then(async res => {
        Toast.show(res.message, Toast.LONG);
        if (res.status === 200) {
          navigation.navigate('changePasswordOTP', {
            otpId: res.data.id,
            userEmail: res.data.email,
            userId: formData.userId,
          });
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
            <Text style={styles.formTitle}>Forgot Password</Text>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{userId: ''}}
              onSubmit={values => formSubmitHandler(values)}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                values,
                errors,
                isValid,
              }) => (
                <View style={styles.content}>
                  <View>
                    <Text
                      style={{
                        fontSize: scale(16),
                        color: '#24262F',
                        fontFamily: 'SourceSansPro-Regular',
                      }}>
                      User Name / ID
                    </Text>
                    <TextInput
                      name="userId"
                      placeholder="Enter"
                      placeholderTextColor="#4D4F5C"
                      value={values.userId}
                      onBlur={handleBlur('userId')}
                      onChangeText={handleChange('userId')}
                      style={styles.TextInput}
                    />
                    {touched.userId && errors.userId && (
                      <Text style={styles.errorMessage}>{errors.userId}</Text>
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
ForgetPassword.propTypes = {
  validateUser: PropTypes.func,
};
ForgetPassword.defaultProps = {
  validateUser: () => {},
};
const mapDispatchToProps = {
  validateUser: userName => forgotPasswordOTP(userName),
};
export default connect(null, mapDispatchToProps)(ForgetPassword);
