import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {useFormik} from 'formik';
import * as yup from 'yup';
import {RadioButton} from 'react-native-paper';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import DropDownPicker from 'react-native-dropdown-picker';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getAuthToken} from '../../../Infrastructure/utils/storageUtility';
import {connect} from 'react-redux';
import {
  getDecisionData,
  getRuleData,
  getServiceCenterData,
  getVisaData,
  PostCreatePost,
} from '../../../application/store/actions/timeLine';
import Loader from '../../../Infrastructure/component/Loader/Loader';
import Toast from 'react-native-simple-toast';
import {Buffer} from 'buffer';
const ValidationSchema = yup.object().shape({
  typeOfPost: yup.string().required('Type of Post Required'),
  visaType: yup
    .string()
    .nullable()
    .when('typeOfPost', {
      is: typeOfPost => typeOfPost === 'DECISION',
      then: yup.string().nullable().required('Visa Type Required'),
    }),
  decision: yup
    .string()
    .nullable()
    .when('typeOfPost', {
      is: typeOfPost => typeOfPost === 'DECISION',
      then: yup.string().nullable().required('decision Required'),
    }),
  serviceCenter: yup
    .string()
    .nullable()
    .when('typeOfPost', {
      is: typeOfPost => typeOfPost === 'DECISION',
      then: yup.string().nullable().required('Service center Required'),
    }),
  ImmigrationRule: yup
    .string()
    .nullable()
    .when('typeOfPost', {
      is: typeOfPost => typeOfPost === 'RULERESPONSE',
      then: yup.string().nullable().required('ImmigrationRule Required'),
    }),
  StoryTitle: yup
    .string()
    .nullable()
    .when('typeOfPost', {
      is: typeOfPost => typeOfPost === 'STORY',
      then: yup
        .string()
        .nullable()
        .min(5, 'Minimum 5 characters.')
        .max(50, 'Maximum 50 characters.')
        .required('Title Required'),
    }),
  message: yup
    .string()
    .nullable()
    .when('typeOfPost', {
      is: typeOfPost => typeOfPost === 'STORY',
      then: yup.string().nullable().required('Description Required'),
    })
    .when('typeOfPost', {
      is: typeOfPost => typeOfPost !== 'STORY',
      then: yup.string().nullable().required('Message/comments Required'),
    }),
  reason: yup
    .string()
    .nullable()
    .when('typeOfPost', {
      is: typeOfPost => typeOfPost === 'DECISION',
      then: yup.string().when('decision', {
        is: decision => decision === 'DENIED',
        then: yup.string().nullable().required('Reason Required'),
      }),
    }),
});
const CreatePost = props => {
  const [status, setStatus] = useState(false);
  const [openVisaType, setOpenVisaType] = useState(false);
  const [visaType, setVisaType] = useState('');
  const [visaItems, setVisaItems] = useState([]);
  const [openImmigrationRule, setOpenImmigrationRule] = useState(false);
  const [ImmigrationRule, setImmigrationRule] = useState('');
  const [ruleItems, setRuleItems] = useState([]);
  const [openDecision, setOpenDecision] = useState(false);
  const [decision, setDecision] = useState('');
  const [decisionItems, setDecisionItems] = useState([]);
  const [openServiceCenter, setOpenServiceCenter] = useState(false);
  const [serviceCenter, setServiceCenter] = useState('');
  const [serviceCenterItems, setServiceCenterItems] = useState([]);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const Reset = () => {
    setFieldValue('visaType', '');
    setFieldValue('decision', '');
    setFieldValue('serviceCenter', '');
    setFieldValue('message', '');
    setFieldValue('ImmigrationRule', '');
    setFieldValue('StoryTitle', '');
    setFieldValue('reason', '');
    setDecision('');
    setVisaType('');
    setServiceCenter('');
    setImmigrationRule('');
  };
  const onChangeHandler = value => {
    setFieldValue('typeOfPost', value);
    Reset();
  };
  const formSubmitHandler = async formData => {
    const authToken = await getAuthToken();
    const payload = {
      visaType: formData.visaType,
      decision: formData.decision,
      reason: formData.reason,
      otherReason: '',
      serviceCenter: formData.serviceCenter,
      description: Buffer.from(formData.message, 'utf-8').toString('base64'),
      postType: formData.typeOfPost,
      rule: formData.ImmigrationRule,
      suggestion: '',
      storyTitle: formData.StoryTitle.replace(/\n/g, ' '),
      isAnonymous: formData.isAnonymous,
      postId: '',
    };
    setStatus(true);
    await props
      .createPost(authToken, payload)
      .then(res => {
        setStatus(false);
        Toast.show(res.message, Toast.LONG);
        navigation.navigate('My Posts');
      })
      .catch(error => {
        setStatus(false);
        setTimeout(() => {
          Toast.show(
            error.message
              ? error.message
              : 'Something went wrong, try again later',
            Toast.SHORT,
          );
        }, 100);
      });
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    touched,
    errors,
    setFieldValue,
  } = useFormik({
    initialValues: {
      typeOfPost: 'DECISION',
      visaType: '',
      decision: '',
      serviceCenter: '',
      message: '',
      ImmigrationRule: '',
      StoryTitle: '',
      reason: '',
      isAnonymous: 'true',
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => formSubmitHandler(values),
    validationSchema: ValidationSchema,
  });
  const init = async () => {
    const authToken = await getAuthToken();
    let Decision = props.getDecision(authToken).then(value => {
      value.data && value.data.length
        ? setDecisionItems(
            value.data.map(decision => {
              return {
                label: decision.name,
                value: decision.code,
              };
            }),
          )
        : null;
    });
    let Visa = props.getVisa(authToken).then(value => {
      value.data && value.data.length
        ? setVisaItems(
            value.data.map(decision => {
              return {
                label: decision.name,
                value: decision.code,
              };
            }),
          )
        : null;
    });
    let ServiceCenter = props.getServiceCenter(authToken).then(value => {
      value.data && value.data.length
        ? setServiceCenterItems(
            value.data.map(decision => {
              return {
                label: decision.name,
                value: decision.code,
              };
            }),
          )
        : null;
    });
    let Rule = props.getRule(authToken).then(value => {
      value.data && value.data.length
        ? setRuleItems(
            value.data.map(decision => {
              return {
                label: decision.name,
                value: decision.code,
              };
            }),
          )
        : null;
    });
    setStatus(true);
    Promise.allSettled([Decision, Visa, ServiceCenter, Rule])
      .then(data => {
        setStatus(false);
      })
      .catch(error => {
        setStatus(false);
        console.log('error init apicall =>>', error);
      });
  };
  useEffect(() => {
    init();
  }, []);
  useEffect(() => {
    isFocused === true && Reset();
  }, [isFocused]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? scale(80) : scale(135)}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.container}>
        <Loader status={status} />
        <View>
          <Text style={styles.title}>Type of Post</Text>
          <View>
            <RadioButton.Group
              value={values.typeOfPost}
              onValueChange={value => onChangeHandler(value)}>
              <View style={{flexDirection: 'column', marginTop: scale(10)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <RadioButton.Android
                    value="DECISION"
                    uncheckedColor="#2DA7D5"
                    color="#0089CF"
                    label="Petition Decision"
                  />
                  <Text style={styles.radioTitle}>Petition Decision</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: scale(5),
                  }}>
                  <RadioButton.Android
                    value="RULERESPONSE"
                    uncheckedColor="#2DA7D5"
                    color="#0089CF"
                    label="Respond to Immigration Rule"
                  />
                  <Text style={styles.radioTitle}>
                    Respond to Immigration Rule
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: scale(5),
                  }}>
                  <RadioButton.Android
                    value="STORY"
                    uncheckedColor="#2DA7D5"
                    color="#0089CF"
                    label="Enter your own Story"
                  />
                  <Text style={styles.radioTitle}>Enter your own Story</Text>
                </View>
              </View>
            </RadioButton.Group>
            {touched.typeOfPost && errors.typeOfPost && (
              <Text style={{...styles.errorMessage, marginLeft: scale(5)}}>
                {errors.typeOfPost}
              </Text>
            )}
          </View>
        </View>
        <View>
          <View>
            <Text style={styles.Header}>
              {values.typeOfPost === 'STORY'
                ? 'Let the community hear your story. Enter story details'
                : 'Select from dropdown options to start your post'}
            </Text>
          </View>
          {/* Petition Decision */}
          {values.typeOfPost === 'DECISION' ? (
            <>
              <View style={{zIndex: 150}}>
                <Text style={styles.Label}>
                  Visa Type<Text style={{color: 'red'}}>*</Text>
                </Text>
                <DropDownPicker
                  name="visaType"
                  listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                  open={openVisaType}
                  value={visaType ? visaType : ''}
                  items={visaItems}
                  setOpen={setOpenVisaType}
                  setItems={setVisaItems}
                  setValue={setVisaType}
                  onChangeValue={handleChange('visaType')}
                  placeholder="Select"
                  searchable={true}
                  dropDownDirection={'BOTTOM'}
                  searchContainerStyle={{
                    borderBottomColor: '#dfdfdf',
                  }}
                  searchTextInputStyle={{
                    color: '#4D4F5C',
                    borderColor: '#4D4F5C',
                  }}
                  placeholderStyle={{
                    color: '#4D4F5C',
                  }}
                  textStyle={{
                    color: '#4D4F5C',
                  }}
                  maxHeight={scale(250)}
                  style={styles.dropdown}
                  autoScroll={true}
                />
                {touched.visaType && errors.visaType && (
                  <Text style={styles.errorMessage}>{errors.visaType}</Text>
                )}
              </View>
              <View style={{zIndex: 140}}>
                <Text style={styles.Label}>
                  Decision<Text style={{color: 'red'}}>*</Text>
                </Text>
                <DropDownPicker
                  scrollViewProps={{
                    persistentScrollbar: true,
                  }}
                  name="decision"
                  listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                  open={openDecision}
                  value={decision ? decision : ''}
                  items={decisionItems}
                  setOpen={setOpenDecision}
                  setItems={setDecisionItems}
                  setValue={setDecision}
                  onChangeValue={handleChange('decision')}
                  placeholder="Select"
                  dropDownDirection={'BOTTOM'}
                  placeholderStyle={{
                    color: '#4D4F5C',
                  }}
                  textStyle={{
                    color: '#4D4F5C',
                  }}
                  maxHeight={scale(250)}
                  style={styles.dropdown}
                  autoScroll={true}
                />
                {touched.decision && errors.decision && (
                  <Text style={styles.errorMessage}>{errors.decision}</Text>
                )}
              </View>
              {decision === 'DENIED' ? (
                <View>
                  {/* Enter your own Story */}
                  <Text style={styles.Label}>
                    Reason<Text style={{color: 'red'}}>*</Text>
                  </Text>
                  <TextInput
                    name="reason"
                    placeholder="Enter"
                    placeholderTextColor="#4D4F5C"
                    value={values.reason}
                    onBlur={handleBlur('reason')}
                    onChangeText={handleChange('reason')}
                    editable={true}
                    multiline
                    style={{...styles.TextInput, height: scale(50)}}
                  />
                  {touched.reason && errors.reason && (
                    <Text style={styles.errorMessage}>{errors.reason}</Text>
                  )}
                </View>
              ) : null}
              <View style={{zIndex: 120}}>
                <Text style={styles.Label}>
                  Service Center<Text style={{color: 'red'}}>*</Text>
                </Text>
                <DropDownPicker
                  scrollViewProps={{
                    persistentScrollbar: true,
                  }}
                  name="serviceCenter"
                  listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                  open={openServiceCenter}
                  value={serviceCenter ? serviceCenter : ''}
                  items={serviceCenterItems}
                  setOpen={setOpenServiceCenter}
                  setItems={setServiceCenterItems}
                  setValue={setServiceCenter}
                  onChangeValue={handleChange('serviceCenter')}
                  dropDownDirection={'BOTTOM'}
                  placeholder="Select"
                  placeholderStyle={{
                    color: '#4D4F5C',
                  }}
                  textStyle={{
                    color: '#4D4F5C',
                  }}
                  maxHeight={scale(250)}
                  style={styles.dropdown}
                  autoScroll={true}
                />
                {touched.serviceCenter && errors.serviceCenter && (
                  <Text style={styles.errorMessage}>
                    {errors.serviceCenter}
                  </Text>
                )}
              </View>
            </>
          ) : values.typeOfPost === 'RULERESPONSE' ? (
            <>
              {/* Respond to Immigration Rule */}
              <View style={{zIndex: 110}}>
                <Text style={styles.Label}>
                  Immigration Rule<Text style={{color: 'red'}}>*</Text>
                </Text>
                <DropDownPicker
                  scrollViewProps={{
                    persistentScrollbar: true,
                  }}
                  name="ImmigrationRule"
                  listMode={Platform.OS == 'ios' ? 'SCROLLVIEW' : 'MODAL'}
                  open={openImmigrationRule}
                  value={ImmigrationRule ? ImmigrationRule : ''}
                  items={ruleItems}
                  setOpen={setOpenImmigrationRule}
                  setItems={setRuleItems}
                  setValue={setImmigrationRule}
                  onChangeValue={handleChange('ImmigrationRule')}
                  placeholder="Select"
                  dropDownDirection={'BOTTOM'}
                  placeholderStyle={{
                    color: '#4D4F5C',
                  }}
                  textStyle={{
                    color: '#4D4F5C',
                  }}
                  maxHeight={scale(250)}
                  style={styles.dropdown}
                  autoScroll={true}
                />
                {touched.ImmigrationRule && errors.ImmigrationRule && (
                  <Text style={styles.errorMessage}>
                    {errors.ImmigrationRule}
                  </Text>
                )}
              </View>
            </>
          ) : (
            <View>
              {/* Enter your own Story */}
              <Text style={styles.Label}>
                Title<Text style={{color: 'red'}}>*</Text>
              </Text>
              <TextInput
                name="StoryTitle"
                placeholder="Enter"
                placeholderTextColor="#4D4F5C"
                value={values.StoryTitle}
                onBlur={handleBlur('StoryTitle')}
                onChangeText={handleChange('StoryTitle')}
                editable={true}
                multiline
                style={{...styles.TextInput, height: scale(40)}}
              />
              {touched.StoryTitle && errors.StoryTitle && (
                <Text style={styles.errorMessage}>{errors.StoryTitle}</Text>
              )}
            </View>
          )}
          <View style={{zIndex: 70}}>
            <Text style={styles.Label}>
              {values.typeOfPost === 'STORY'
                ? 'Description'
                : 'Enter message/comments'}
              <Text style={{color: 'red'}}>*</Text>
            </Text>
            <TextInput
              name="message"
              placeholder={
                values.typeOfPost === 'STORY'
                  ? 'Enter your Description'
                  : 'Enter your message/comments'
              }
              placeholderTextColor="#4D4F5C"
              value={values.message}
              onBlur={handleBlur('message')}
              onChangeText={handleChange('message')}
              editable={true}
              style={{...styles.TextInput, height: scale(90)}}
              multiline
            />
            {touched.message && errors.message && (
              <Text style={styles.errorMessage}>{errors.message}</Text>
            )}
          </View>
        </View>
        <View>
          <RadioButton.Group
            value={values.isAnonymous}
            onValueChange={handleChange('isAnonymous')}>
            <View style={{flexDirection: 'row', marginTop: scale(10)}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <RadioButton.Android
                  value="true"
                  uncheckedColor="#2DA7D5"
                  color="#0089CF"
                  label="Post Anonymus"
                />
                <Text style={styles.radioTitle}>Post Anonymus</Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: scale(5),
                }}>
                <RadioButton.Android
                  value="false"
                  uncheckedColor="#2DA7D5"
                  color="#0089CF"
                  label="Post Signed"
                />
                <Text style={styles.radioTitle}>Post Signed</Text>
              </View>
            </View>
          </RadioButton.Group>
          {touched.typeOfPost && errors.typeOfPost && (
            <Text style={{...styles.errorMessage, marginLeft: scale(5)}}>
              {errors.typeOfPost}
            </Text>
          )}
        </View>
        <TouchableOpacity onPress={handleSubmit}>
          <View style={styles.submitButton}>
            <Text style={styles.buttonText}>POST</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const mapStateToProps = ({
  timeLine: {DecisionData, VisaData, ServiceCenterData, RuleData},
}) => ({
  DecisionData,
  VisaData,
  ServiceCenterData,
  RuleData,
});
const mapDispatchToProps = {
  getDecision: (AuthToken, payload) => getDecisionData(AuthToken, payload),
  getVisa: (AuthToken, payload) => getVisaData(AuthToken, payload),
  getServiceCenter: (AuthToken, payload) =>
    getServiceCenterData(AuthToken, payload),
  getRule: (AuthToken, payload) => getRuleData(AuthToken, payload),
  createPost: (authToken, payload) => PostCreatePost(authToken, payload),
};
export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);
