import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {Formik} from 'formik';
import * as yup from 'yup';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import styles from './styles';
import {
  userInfo,
  changePassword,
} from '../../../application/store/actions/auth';
import {AuthContext} from '../../../Infrastructure/utils/context';
import {getAuthToken} from '../../../Infrastructure/utils/storageUtility';
import Loader from '../../../Infrastructure/component/Loader/Loader';
const loginValidationSchema = yup.object().shape({
  current: yup.string().required('Current is required'),
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
const ResetPassword = props => {
  const [status, setStatus] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [newPass, setNewPass] = useState(true);
  const [confirmPass, setConfirmPass] = useState(true);
  const [userName, setUserName] = useState('');
  const {signOut} = React.useContext(AuthContext);
  const formSubmitHandler = async formData => {
    let authToken = await getAuthToken();
    if (formData.current === formData.password) {
      Alert.alert(
        'ImmigrationHub',
        'New Password should not be same as Old Password',
        [
          {
            text: 'OK',
            onPress: () => console.log('close'),
            style: 'cancel',
          },
        ],
        {cancelable: false},
      );
      return;
    }
    const payload = {
      oldpassword: formData.current,
      newpassword: formData.password,
      username: userName,
    };
    await props
      .Password(authToken, payload)
      .then(async res => {
        if (res.status === 200) {
          Alert.alert(
            'ImmigrationHub',
            'Password Changed Sucessfully',
            [
              {
                text: 'OK',
                onPress: () => {
                  signOut();
                },
                style: 'cancel',
              },
            ],
            {cancelable: false},
          );
        } else {
          Toast.show(
            res.message
              ? res.message
              : 'something went wrong, logout and login again',
            Toast.LONG,
          );
        }
      })
      .catch(async error => {
        setStatus(false);
        Toast.show(
          error.message
            ? error.message
            : 'something went wrong, logout and login again',
          Toast.LONG,
        );
      });
  };
  const init = async () => {
    setStatus(true);
    let token = await getAuthToken();
    await props
      .getUsername(token)
      .then(async res => {
        setUserName(res.data.fullName);
        setStatus(false);
      })
      .catch(async error => {
        setStatus(false);
        Toast.show(error.message ? error.message : 'Something went wrong');
      });
  };
  useEffect(() => {
    init();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <Loader status={status} />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.form}>
          <View style={{marginTop: scale(5)}}>
            <Formik
              validationSchema={loginValidationSchema}
              validateOnBlur={true}
              validateOnChange={true}
              initialValues={{current: '', password: '', confirmPassword: ''}}
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
                  <View style={{...styles.formContent, flex: 1}}>
                    <Text
                      style={{
                        marginTop: scale(10),
                        fontSize: scale(14),
                        fontFamily: 'SourceSansPro-Regular',
                        color: '#24262F',
                      }}>
                      Current Password
                    </Text>
                    <TextInput
                      name="current"
                      placeholder="Enter"
                      placeholderTextColor="#4D4F5C"
                      value={values.current}
                      onBlur={handleBlur('current')}
                      onChangeText={handleChange('current')}
                      autoCorrect={false}
                      secureTextEntry={passwordVisible}
                      style={styles.TextInput}
                    />
                    <Feather
                      name={passwordVisible ? 'eye-off' : 'eye'}
                      onPress={() => setPasswordVisible(!passwordVisible)}
                      size={scale(15)}
                      color="grey"
                      style={{
                        position: 'absolute',
                        right: 10,
                        marginTop: scale(45),
                      }}
                    />
                    {touched.current && errors.current && (
                      <Text style={styles.errorMessage}>{errors.current}</Text>
                    )}
                  </View>
                  <View style={{...styles.formContent, flex: 1}}>
                    <Text
                      style={{
                        marginTop: scale(10),
                        fontSize: scale(14),
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
                      secureTextEntry={newPass}
                      style={styles.TextInput}
                    />
                    <Feather
                      name={newPass ? 'eye-off' : 'eye'}
                      onPress={() => setNewPass(!newPass)}
                      size={scale(15)}
                      color="grey"
                      style={{
                        position: 'absolute',
                        right: 10,
                        marginTop: scale(45),
                      }}
                    />
                    {touched.password && errors.password && (
                      <Text style={styles.errorMessage}>{errors.password}</Text>
                    )}
                  </View>
                  <View style={{...styles.formContent, flex: 1}}>
                    <Text
                      style={{
                        marginTop: scale(10),
                        fontSize: scale(14),
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
                      secureTextEntry={confirmPass}
                      style={styles.TextInput}
                    />
                    <Feather
                      name={confirmPass ? 'eye-off' : 'eye'}
                      onPress={() => setConfirmPass(!confirmPass)}
                      size={scale(15)}
                      color="grey"
                      style={{
                        position: 'absolute',
                        right: 10,
                        marginTop: scale(45),
                      }}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <Text style={styles.errorMessage}>
                        {errors.confirmPassword}
                      </Text>
                    )}
                  </View>
                  <View
                    style={{
                      marginTop: scale(20),
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        handleSubmit();
                      }}
                      style={{
                        marginLeft: scale(5),
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: scale(5),
                        backgroundColor: '#00A8DB',
                        height: scale(40),
                        width: scale(100),
                      }}
                      disabled={false}>
                      <Text
                        style={{
                          fontSize: scale(18),
                          fontFamily: 'SourceSansPro-SemiBold',
                          color: '#ffff',
                        }}>
                        save
                      </Text>
                    </TouchableOpacity>
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
const mapDispatchToProps = {
  getUsername: (authToken, payload) => userInfo(authToken, payload),
  Password: (authToken, payload) => changePassword(authToken, payload),
};
export default connect(null, mapDispatchToProps)(ResetPassword);
