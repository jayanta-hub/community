import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
} from 'react-native';
import * as yup from 'yup';
import Logo from '../../../Infrastructure/component/Logo/Logo';
import styles from './styles';
import {logIn} from '../../../application/store/actions/auth';
import Toast from 'react-native-simple-toast';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {useNavigation} from '@react-navigation/native';
import {
  setAuthToken,
  setBeneficiaryUserID,
  setBeneficiaryType,
  setAuthTokenExpiry,
  setUserFName,
  setUserLName,
  setUserType,
  setUserID,
  setLogInFirst,
  setLoginID,
  setCompanyId,
} from '../../../Infrastructure/utils/storageUtility';
import {AuthContext} from '../../../Infrastructure/utils/context';
import Loader from '../../../Infrastructure/component/Loader/Loader';
import Feather from 'react-native-vector-icons/Feather';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import NetInfo from '@react-native-community/netinfo';
import WelcomeBackScreen from '../../../Infrastructure/component/WelcomeBackScreen/WelcomeBackScreen';
import {useFormik} from 'formik';
import {
  getAccountStatus,
  updateAccountStatus,
} from '../../../application/store/actions/auth';
const loginValidationSchema = yup.object().shape({
  userID: yup.string().required('User Name / ID Required'),
  password: yup.string().required('Password Required'),
});
const LoginComponent = props => {
  const [status, setStatus] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [internetConnected, setInternetConnected] = useState(true);
  const [showWelcomeBackScreen, setShowWelcomeBackScreen] = useState(false);
  const [showCreateNewScreen, setShowCreateNewScreen] = useState(false);
  const navigation = useNavigation();
  const {signIn} = React.useContext(AuthContext);
  const activiationHandler = activiationStatus => {
    let userName = values.userID;
    activiationStatus.option === 'Reactivate'
      ? props
          .updateAccountStatus(userName)
          .then(res => {
            console.log('updated Account status response', res);
            res.data.accountActivated === true
              ? (setShowWelcomeBackScreen(false),
                setShowCreateNewScreen(false),
                loginHandler())
              : null;
          })
          .catch(error => {
            console.log('updated accounnt status error', error);
          })
      : (setShowWelcomeBackScreen(false), handleReset());
  };
  const closeHandler = () => {
    handleReset();
    setShowWelcomeBackScreen(false);
    setShowCreateNewScreen(false);
  };
  const loginHandler = async () => {
    const payload = {
      password: values.password,
      username: values.userID,
    };
    await props
      .authLogIn(payload)
      .then(async res => {
        console.log('login res ==>>>', res);
        if (res.status === 200 && res.data.userType === 'Beneficiary') {
          await setUserType(res.data.userType);
          await setLoginID(values.userID);
          await setAuthToken(res.data.jwt);
          await setAuthTokenExpiry(res.data.jwt);
          await setBeneficiaryUserID(res.data.beneficiaryId);
          await setBeneficiaryType(res.data.beneficiaryType);
          await setCompanyId(res.data.companyId);
          await setUserID(res.data.userId);
          await signIn();
          await setUserFName(res.data.firstname);
          await setUserLName(res.data.lastName);
          await setLogInFirst(res.data.isLogingFirst);
          handleReset(), setStatus(false);
          setTimeout(() => {
            Toast.show(res.message, Toast.SHORT);
          }, 10);
        } else {
          setStatus(false);
          setTimeout(() => {
            Toast.show(
              'Please provide correct Beneficiary login credentials. For Petitioner or Attorney Login, download our ImagilityPetitioner App or ImagilityAttorney App',
              Toast.LONG,
            );
          }, 1);
        }
      })
      .catch(async err => {
        console.log('error', err);
        setStatus(false);
        setTimeout(() => {
          Toast.show(err.message, Toast.LONG);
        }, 10);
      });
  };
  const formSubmitHandler = async formData => {
    let userName = formData.userID;
    internetConnected === true
      ? (setStatus(true),
        await props
          .getAccountStatus(userName)
          .then(res => {
            console.log('get account status res', res);
            res.data?.loginAccountStatus === 'ACTIVE'
              ? loginHandler()
              : res.data?.loginAccountStatus === 'DEACTIVATED'
              ? (setStatus(false), setShowWelcomeBackScreen(true))
              : res.data?.loginAccountStatus === 'DELETED'
              ? (setStatus(false),
                setShowCreateNewScreen(true),
                setShowWelcomeBackScreen(true))
              : setStatus(false);
          })
          .catch(error => {
            setStatus(false), console.log('account status error', error);
            setTimeout(() => {
              Toast.show(error.message, Toast.LONG);
            }, 1);
          }))
      : // loginHandler()
        Toast.show('No Internet, Try Again Later', Toast.LONG);
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    handleReset,
  } = useFormik({
    initialValues: {userID: '', password: ''},
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => formSubmitHandler(values),
    validationSchema: loginValidationSchema,
  });
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected && state.isInternetReachable) {
        setInternetConnected(true);
      } else {
        setInternetConnected(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <Loader status={status} />
        {showWelcomeBackScreen ? (
          <WelcomeBackScreen
            activiationHandler={activiationHandler}
            status={showWelcomeBackScreen}
            closeHandler={closeHandler}
            createNow={showCreateNewScreen}
          />
        ) : null}
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'space-between',
          }}>
          <View style={{flex: 1, justifyContent: 'space-between'}}>
            <View style={{flex: 1}}>
              <TouchableOpacity style={{...styles.logo}}>
                <Logo />
              </TouchableOpacity>
              <View style={styles.form}>
                <View style={styles.content}>
                  <View>
                    <Text style={styles.labelText}>User Name / ID</Text>
                    <TextInput
                      name="userID"
                      placeholder="Enter"
                      placeholderTextColor="#4D4F5C"
                      value={values.userID}
                      onBlur={handleBlur('userID')}
                      onChangeText={handleChange('userID')}
                      style={styles.TextInput}
                    />
                    {touched.userID && errors.userID && (
                      <Text style={styles.errorMessage}>{errors.userID}</Text>
                    )}
                  </View>
                  <View style={{marginTop: scale(10)}}>
                    <Text style={styles.labelText}>Password</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <TextInput
                        name="password"
                        placeholder="Enter"
                        placeholderTextColor="#4D4F5C"
                        value={values.password}
                        onBlur={handleBlur('password')}
                        onChangeText={handleChange('password')}
                        secureTextEntry={passwordVisible}
                        autoCorrect={false}
                        style={{...styles.TextInput, flex: 1}}
                      />
                      <Feather
                        name={passwordVisible ? 'eye' : 'eye-off'}
                        onPress={() => setPasswordVisible(!passwordVisible)}
                        size={scale(15)}
                        color="grey"
                        style={{position: 'absolute', right: 10}}
                      />
                    </View>
                    {touched.password && errors.password && (
                      <Text style={styles.errorMessage}>{errors.password}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.Button}>
                    <Text style={styles.Buttontext}>LOGIN</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.forgotContent}
                    onPress={() => {
                      navigation.navigate('ForgotUserName');
                    }}>
                    <Text style={{...styles.linkText}}>
                      Forgot User Name / ID ?
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{marginTop: scale(15)}}
                    onPress={() => {
                      navigation.navigate('ForgotPassword');
                    }}>
                    <Text style={styles.linkText}>Forgot Password ?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.header}>Don’t have an account ?</Text>
              <TouchableOpacity
                style={styles.registerButton}
                onPress={() => {
                  navigation.navigate('Registration');
                }}>
                <Text
                  style={{
                    color: '#00A0DA',
                    fontSize: scale(14),
                    fontFamily: 'SourceSansPro-SemiBold',
                  }}>
                  Register
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
LoginComponent.propTypes = {
  authLogIn: PropTypes.func,
};
LoginComponent.defaultProps = {
  authLogIn: () => {},
};
const mapDispatchToProps = {
  authLogIn: payloadData => logIn(payloadData),
  getAccountStatus: userName => getAccountStatus(userName),
  updateAccountStatus: userName => updateAccountStatus(userName),
};
export default connect(null, mapDispatchToProps)(LoginComponent);
