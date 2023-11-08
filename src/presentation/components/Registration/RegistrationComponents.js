import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {Formik} from 'formik';
import {useNavigation} from '@react-navigation/native';
import * as yup from 'yup';
import {Button, Checkbox} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Logo from '../../../Infrastructure/component/Logo/Logo';
import styles from './styles';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import {signUp} from '../../../application/store/actions/auth';
import Toast from 'react-native-simple-toast';
import {getCountryDetails} from '../../../application/store/actions/auth';
import {useIsFocused} from '@react-navigation/native';
const loginValidationSchema = yup.object().shape({
  title: yup.string().required('Select Title').nullable(),
  firstName: yup
    .string()
    .matches(/^\S*$/, 'Space is not allowed')
    .matches(/^[aA-zZ\s]+$/, 'Please enter alphabets only')
    .required('First Name Required'),
  lastName: yup
    .string()
    .matches(/^\S*$/, 'Space is not allowed')
    .matches(/^[aA-zZ\s]+$/, 'Please enter alphabets only')
    .required('Last Name Required'),
  email: yup
    .string()
    .email('Please enter valid Email')
    .required('Email Required'),
  password: yup
    .string()
    .matches(/^\S*$/, 'Space is not allowed')
    .matches(/\d/, 'Password must have a number')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({min}) => `Password must be at least ${min} characters`)
    .required('Password Required')
    .matches(
      /[!@#$%^&*()\-_"=+{}; :,<.>]/,
      'Password must have a special character',
    ),
  confirmPassword: yup
    .string()
    .matches(/^\S*$/, 'Space is not allowed')
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm Password Required'),
  userID: yup
    .string()
    .matches(/^\S*$/, 'Space is not allowed')
    .matches(
      /^[^!@#$%^&*()\"/?'=+{}; :,<>]*$/,
      'May contain special character(s)(. - _)',
    )
    .min(5, ({min}) => `User Name / ID must be at least ${min} characters`)
    .max(12, ({max}) => `User Name / ID not more than ${max} characters`)
    .matches(/\w*[A-Z,a-z]\w*/, 'User Name / ID must have a letter')
    .matches(/\d/, 'User Name / ID must have a number')
    .required('User Name / ID Required'),
});
const RegistrationComponents = props => {
  const navigation = useNavigation();
  const formRef = useRef();
  const isFocused = useIsFocused();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [open, setOpen] = useState(false);
  const [titleValue, setTitleValue] = useState(null);
  const [step, setStep] = useState(1);
  const [checkMsg, setCheckMsg] = useState('');
  const [items, setItems] = useState([
    {label: 'Mr', value: 'Mr'},
    {label: 'Mrs', value: 'Mrs'},
    {label: 'Ms', value: 'Ms'},
  ]);

  const saveInput = () => {
    if (!toggleCheckBox) {
      setCheckMsg('Please read & accept terms and conditions');
    }
    if (formRef.current) {
      formRef.current.handleSubmit();
      // formSubmitHandler();
      if (formRef.current.isValid) {
        setStep(2);
      }
    }
  };
  const formSubmitHandler = async formData => {
    const payload = {
      title: titleValue,
      firstName: formData.firstName,
      lastName: formData.lastName,
      middleName: formData.middleName,
      password: formData.password,
      confirmpassword: formData.confirmPassword,
      userId: formData.userID,
      email: formData.email,
      isPetitionerInitiated: 'false',
      terms: true,
      policyId: 1,
    };
    if (toggleCheckBox) {
      await props
        .addBenificiary(payload)
        .then(async res => {
          Toast.show(res.message, Toast.LONG);
          if (res.status === 200) {
            navigation.navigate('Verification', {Resp: res.data});
          } else {
            console.log('res');
          }
        })
        .catch(error => {
          Toast.show(error.message, Toast.LONG);
        });
    }
  };
  const init = () => {
    props
      .getCountryDetails()
      .then(res => {})
      .catch(error => {
        console.log('country list error', error);
      });
  };
  useEffect(() => {
    isFocused === true && init();
  }, [isFocused]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.logo}>
          <Logo />
        </TouchableOpacity>
        <ScrollView
          nestedScrollEnabled={true}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.form}>
            <View>
              <View>
                <Text style={styles.formTitle}>
                  Let us know some personal details
                </Text>
                <Text styles={styles.formDetailsTitle}>
                  * Entered Information will be secure and will not be shared
                  for any other purpose.
                </Text>
              </View>
              <View style={{marginTop: scale(20)}}>
                <Formik
                  initialValues={{
                    title: titleValue,
                    firstName: '',
                    middleName: '',
                    lastName: '',
                    email: '',
                    userID: '',
                    password: '',
                    confirmPassword: '',
                    countryName: '',
                    phoneNumber: '',
                  }}
                  innerRef={formRef}
                  validateOnBlur={true}
                  validateOnChange={true}
                  onSubmit={values => formSubmitHandler(values)}
                  validationSchema={loginValidationSchema}>
                  {({handleChange, handleBlur, values, touched, errors}) => (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flex: 1,
                          zIndex: 100,
                          alignItems: 'center',
                        }}>
                        <View>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.formInputTitle}>Title</Text>
                            <Text style={{color: 'red'}}>*</Text>
                          </View>
                          <View>
                            <DropDownPicker
                              listMode="SCROLLVIEW"
                              open={open}
                              value={titleValue}
                              items={items}
                              setOpen={setOpen}
                              setValue={setTitleValue}
                              setItems={setItems}
                              onChangeValue={handleChange('title')}
                              placeholder="Select"
                              placeholderStyle={{
                                color: '#4D4F5C',
                              }}
                              style={styles.dropdown}
                            />
                            {touched.title && errors.title && (
                              <Text style={styles.errorMessage}>
                                {errors.title}
                              </Text>
                            )}
                          </View>
                        </View>
                        <View style={{flex: 1, marginLeft: scale(10)}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.formInputTitle}>
                              First Name
                            </Text>
                            <Text style={{color: 'red'}}>*</Text>
                          </View>
                          <TextInput
                            name="firstName"
                            placeholder="Enter"
                            placeholderTextColor="#4D4F5C"
                            value={values.firstName}
                            onBlur={handleBlur('firstName')}
                            onChangeText={handleChange('firstName')}
                            autoCorrect={false}
                            style={styles.TextInput}
                          />
                          {touched.firstName && errors.firstName && (
                            <Text style={styles.errorMessage}>
                              {errors.firstName}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View
                        style={{
                          ...styles.inputDis,
                          flexDirection: 'row',
                          flex: 1,
                        }}>
                        <View style={{flex: 1}}>
                          <Text style={styles.formInputTitle}>Middle Name</Text>
                          <TextInput
                            name="middleName"
                            placeholder="Enter"
                            placeholderTextColor="#4D4F5C"
                            value={values.middleName}
                            onBlur={handleBlur('middleName')}
                            onChangeText={handleChange('middleName')}
                            autoCorrect={false}
                            style={styles.TextInput}
                          />
                          {touched.middleName && errors.middleName && (
                            <Text style={styles.errorMessage}>
                              {errors.middleName}
                            </Text>
                          )}
                        </View>
                        <View style={{flex: 1, marginLeft: 10}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.formInputTitle}>Last Name</Text>
                            <Text style={{color: 'red'}}>*</Text>
                          </View>
                          <TextInput
                            name="lastName"
                            placeholder="Enter"
                            placeholderTextColor="#4D4F5C"
                            value={values.lastName}
                            onBlur={handleBlur('lastName')}
                            onChangeText={handleChange('lastName')}
                            autoCorrect={false}
                            style={styles.TextInput}
                          />
                          {touched.lastName && errors.lastName && (
                            <Text style={styles.errorMessage}>
                              {errors.lastName}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={{...styles.inputDis}}>
                        <View>
                          <View
                            style={{
                              flexDirection: 'row',
                            }}>
                            <Text style={styles.formInputTitle}>
                              User Name / ID
                            </Text>
                            <Text style={{color: 'red'}}>*</Text>
                          </View>
                          <TextInput
                            name="userID"
                            placeholder="Enter"
                            placeholderTextColor="#4D4F5C"
                            value={values.userID}
                            onBlur={handleBlur('userID')}
                            onChangeText={handleChange('userID')}
                            autoCorrect={false}
                            style={styles.TextInput}
                          />
                          {touched.userID && errors.userID && (
                            <Text style={styles.errorMessage}>
                              {errors.userID}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View style={{...styles.inputDis, marginTop: scale(20)}}>
                        <View>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.formInputTitle}>
                              Communication Email
                            </Text>
                            <Text style={{color: 'red'}}>*</Text>
                          </View>
                          <TextInput
                            name="email"
                            placeholder="Enter"
                            placeholderTextColor="#4D4F5C"
                            value={values.email}
                            onBlur={handleBlur('email')}
                            onChangeText={handleChange('email')}
                            autoCorrect={false}
                            style={styles.TextInput}
                          />
                          {touched.email && errors.email && (
                            <Text style={styles.errorMessage}>
                              {errors.email}
                            </Text>
                          )}
                        </View>
                      </View>
                      <View
                        style={{
                          ...styles.inputDis,
                          flexDirection: 'row',
                          flex: 1,
                        }}>
                        <View style={{flex: 1}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.formInputTitle}>Password</Text>
                            <Text style={{color: 'red'}}>*</Text>
                          </View>
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
                            <Text style={styles.errorMessage}>
                              {errors.password}
                            </Text>
                          )}
                        </View>
                        <View style={{flex: 1, marginLeft: 10}}>
                          <View style={{flexDirection: 'row'}}>
                            <Text style={styles.formInputTitle}>
                              Confirm Password
                            </Text>
                            <Text style={{color: 'red'}}>*</Text>
                          </View>
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
                          {touched.confirmPassword &&
                            errors.confirmPassword && (
                              <Text style={styles.errorMessage}>
                                {errors.confirmPassword}
                              </Text>
                            )}
                        </View>
                      </View>
                      <View style={styles.checkBoxContent}>
                        <View style={{flexDirection: 'row'}}>
                          <Checkbox.Android
                            name="checkbox"
                            status={toggleCheckBox ? 'checked' : 'unchecked'}
                            color="#00A0DA"
                            onPress={() => {
                              setToggleCheckBox(!toggleCheckBox);
                            }}
                          />
                        </View>
                        <Text style={styles.formInputTitle}>
                          I have read & accepted
                        </Text>
                        <TouchableOpacity
                          onPress={() =>
                            navigation.navigate('Terms & Conditions')
                          }>
                          <Text style={{color: '#00A0DA', marginLeft: 5}}>
                            Terms & Conditions
                            <Text style={{color: 'red'}}>*</Text>
                          </Text>
                        </TouchableOpacity>
                      </View>
                      {toggleCheckBox === false && (
                        <Text
                          style={{
                            ...styles.errorMessage,
                            marginLeft: scale(10),
                          }}>
                          {checkMsg}
                        </Text>
                      )}
                    </View>
                  )}
                </Formik>
              </View>
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
              bgcolor="#00A0DA"
              borderradius="0px"
              width="100%"
              height="54px"
              style={{
                backgroundColor: '#00A0DA',
                height: scale(54),
                width: '100%',
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text style={styles.buttonText}>PROCEED</Text>
            </Button>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
const mapDispatchToProps = {
  addBenificiary: payload => signUp(payload),
  getCountryDetails: () => getCountryDetails(),
};
export default connect(null, mapDispatchToProps)(RegistrationComponents);
