import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  Modal,
  Pressable,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import * as yup from 'yup';
import {useFormik} from 'formik';
import styles from './styles';
import Loader from '../../../Infrastructure/component/Loader/Loader';
import {connect} from 'react-redux';
import {
  getAuthToken,
  getUserID,
} from '../../../Infrastructure/utils/storageUtility';
import Toast from 'react-native-simple-toast';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import Entypo from 'react-native-vector-icons/Entypo';
import colors from '../../../Infrastructure/assets/colors/colors';
import {getUserInformation} from '../../../application/store/actions/timeLine';
import {
  fetchStateList,
  updatePersonalDetails,
} from '../../../application/store/actions/myAccount';
const validationSchema = yup.object().shape({
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
  middleName: yup
    .string()
    .matches(/^\S*$/, 'Space is not allowed')
    .matches(/^[aA-zZ\s]+$/, 'Please enter alphabets only'),
  countryName: yup.string().required('Select Country'),
  State: yup.string().required('Select State'),
  city: yup.string().required('Enter city'),
  ImmigrationVisa: yup.string().required('Required'),
});
const PersonalDetailsEdit = props => {
  const navigation = useNavigation();
  const userInformation = props?.userInformation?.data;
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [titleValue, setTitleValue] = useState(
    userInformation?.title ? userInformation.title : '',
  );
  const [items, setItems] = useState([
    {label: 'Mr', value: 'Mr'},
    {label: 'Mrs', value: 'Mrs'},
    {label: 'Ms', value: 'Ms'},
  ]);
  const [alertMessage, setAlertMessage] = useState(false);
  const [openCountry, setOpenCountry] = useState(false);
  const [valueCountry, setValueCountry] = useState(
    userInformation?.countryCode ? userInformation.countryCode : '',
  );
  const [openstate, setOpenState] = useState(false);
  const [valueState, setValueState] = useState(
    userInformation?.stateProvinceCode ? userInformation.stateProvinceCode : '',
  );
  const [openIMMVISA, setOpenIMMVISA] = useState(false);
  const [visa, setVisa] = useState(
    userInformation?.currentVisaStatus ? userInformation.currentVisaStatus : '',
  );
  const [visaName, setVisaName] = useState('');
  const [currentStateList, setCurrentStateList] = useState([]);
  const [showdropDown, setshowDropdown] = useState(false);
  const countryData = [];
  const [stateData, setStateData] = useState([]);
  const VisaData = [];
  props?.VisaList?.data
    ? props.VisaList.data.map(item => {
        VisaData.push({
          label: item.name,
          value: item.code,
        });
      })
    : null;
  props?.CountryList?.data
    ? props.CountryList.data.map(item => {
        countryData.push({
          label: item.countryName,
          value: item.countryCode,
        });
      })
    : null;

  const ref = useRef(null);
  const changeRef = value => {
    ref.current = value;
  };
  const stateRef = useRef(null);
  const changeStateRef = value => {
    stateRef.current = value;
  };
  const getStateData = value => {
    console.log('value', value);
    setStateData([]);
    let list = [];
    setStatus(true);
    props
      .getstate(value)
      .then(res => {
        setStatus(false);
        res?.data.map(item => {
          list.push({
            label: item.stateProvinceName,
            value: item.stateProvinceCode,
            stateProvinceName: item.stateProvinceName,
            stateProvinceCode: item.stateProvinceCode,
          });
        });
        setStateData(list);
        res?.data && res?.data?.length
          ? setshowDropdown(true)
          : setshowDropdown(false);
      })
      .catch(error => {
        setTimeout(() => {
          Toast.show(error?.message, Toast.LONG);
        }, 1);
        setStatus(false);
        setshowDropdown(false);
      });
  };
  const Redirect = () => {
    setTimeout(() => {
      navigation.goBack();
    }, 1);
  };
  const formsubmit = async formData => {
    const authToken = await getAuthToken();
    const beneficiaryUserID = await getUserID();
    const payLoad = {
      title: formData.title,
      firstName: formData.firstName,
      lastName: formData.lastName,
      id: beneficiaryUserID,
      middleName: formData.middleName,
      countryCode: valueCountry,
      currentVisaStatusCode: visa,
      stateProvinceCode: valueState,
      stateProvinceName: formData.State,
      city: formData.city,
    };
    setStatus(true);
    props
      .updatePersonalDetails(authToken, payLoad)
      .then(res => {
        props
          .getUserInformation(authToken)
          .then(ress => {
            setStatus(false);
            setAlertMessage(false);
            setTimeout(() => {
              Toast.show(res.message, Toast.LONG);
            }, 100);
            navigation.goBack();
          })
          .catch(error => {
            console.log('error', error);
            setStatus(false);
          });
      })
      .catch(error => {
        console.log('update-error', error);
        setTimeout(() => {
          Toast.show(error.message, Toast.LONG);
        }, 1);
        setStatus(false);
      });
  };
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    values,
    touched,
    errors,
  } = useFormik({
    initialValues: {
      title: userInformation?.title ? userInformation.title : '',
      firstName: userInformation?.firstName ? userInformation.firstName : '',
      lastName: userInformation?.lastName ? userInformation.lastName : '',
      middleName: userInformation?.middleName ? userInformation.middleName : '',
      State: userInformation?.stateProvinceName
        ? userInformation.stateProvinceName
        : '',
      city: userInformation?.city ? userInformation.city : '',
      countryName: userInformation?.countryCode
        ? userInformation.countryCode
        : '',
      ImmigrationVisa: userInformation?.currentVisaStatus
        ? userInformation.currentVisaStatus
        : '',
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: () => formsubmit(values),
    validationSchema,
  });
  useEffect(() => {
    userInformation?.countryCode !== '' &&
    userInformation?.countryCode !== null &&
    userInformation?.countryCode !== undefined
      ? (getStateData(userInformation?.countryCode), console.log('fire'))
      : null;
  }, []);
  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() =>
            alertMessage ? setModalVisible(!modalVisible) : navigation.goBack()
          }>
          <Entypo
            name="chevron-small-left"
            size={30}
            color={colors.Slate_Grey}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            alertMessage ? setModalVisible(!modalVisible) : navigation.goBack()
          }>
          <AntDesign
            name="close"
            size={23}
            style={{
              color: 'grey',
              marginTop: scale(10),
              marginRight: scale(10),
            }}
          />
        </TouchableOpacity>
      ),
    });
  }, [alertMessage]);
  console.log('stateData', stateData);
  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <ScrollView contentContainerStyle={styles.container}>
          <Loader status={status} />
          <View style={styles.content}>
            <Text style={{...styles.headerText}}>Personal Info</Text>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: scale(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 100,
                }}>
                <View style={{flex: 0.45}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.labelText}>
                      Title<Text style={{color: 'red'}}>*</Text>
                    </Text>
                  </View>
                  <DropDownPicker
                    name="title"
                    listMode="SCROLLVIEW"
                    open={open}
                    value={titleValue}
                    items={items}
                    setOpen={setOpen}
                    setItems={setItems}
                    setValue={setTitleValue}
                    onChangeValue={handleChange('title')}
                    placeholder="Select"
                    placeholderStyle={{
                      color: '#4D4F5C',
                    }}
                    textStyle={{
                      color: '#4D4F5C',
                    }}
                    onSelectItem={() => setAlertMessage(true)}
                    maxHeight={scale(160)}
                    style={{...styles.dropdown, marginTop: scale(5)}}
                  />
                  {touched.title && errors.title && (
                    <Text style={styles.errorMessage}>{errors.title}</Text>
                  )}
                </View>
                <View style={{flex: 1, marginLeft: scale(5)}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.labelText}>First Name</Text>
                    <Text style={{color: 'red'}}>*</Text>
                  </View>
                  <TextInput
                    name="firstName"
                    placeholder="Enter"
                    placeholderTextColor="#4D4F5C"
                    value={values.firstName}
                    onBlur={handleBlur('firstName')}
                    onChangeText={handleChange('firstName')}
                    onChange={() => setAlertMessage(true)}
                    autoCorrect={false}
                    style={styles.TextInput}
                  />
                  {touched.firstName && errors.firstName && (
                    <Text style={styles.errorMessage}>{errors.firstName}</Text>
                  )}
                </View>
              </View>
              <View>
                <View style={{marginTop: scale(10)}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.labelText}>Last Name</Text>
                    <Text style={{color: 'red'}}>*</Text>
                  </View>
                  <TextInput
                    name="lastName"
                    placeholder="Enter"
                    placeholderTextColor="#4D4F5C"
                    value={values.lastName}
                    onBlur={handleBlur('lastName')}
                    onChangeText={handleChange('lastName')}
                    onChange={() => setAlertMessage(true)}
                    autoCorrect={false}
                    style={styles.TextInput}
                  />
                  {touched.lastName && errors.lastName && (
                    <Text style={styles.errorMessage}>{errors.lastName}</Text>
                  )}
                </View>
              </View>
              <View>
                <View style={{marginTop: scale(10)}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.labelText}>Middle Name</Text>
                  </View>
                  <TextInput
                    name="middleName"
                    placeholder="Enter"
                    placeholderTextColor="#4D4F5C"
                    value={values.middleName}
                    onBlur={handleBlur('middleName')}
                    onChangeText={handleChange('middleName')}
                    onChange={() => setAlertMessage(true)}
                    autoCorrect={false}
                    style={styles.TextInput}
                  />
                  {touched.middleName && errors.middleName && (
                    <Text style={styles.errorMessage}>{errors.middleName}</Text>
                  )}
                </View>
              </View>
              <View>
                <View style={{marginTop: scale(20)}}>
                  <Text style={{...styles.headerText}}>Contact Details</Text>
                </View>

                <View style={{marginTop: scale(10)}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{...styles.labelText, opacity: 0.7}}>
                      Email<Text style={{color: 'red'}}>*</Text>
                    </Text>
                  </View>
                  <TextInput
                    name="primaryEmail"
                    placeholderTextColor="#4D4F5C"
                    value={userInformation?.email}
                    onBlur={handleBlur('primaryEmail')}
                    onChangeText={handleChange('primaryEmail')}
                    autoCorrect={false}
                    style={{...styles.TextInput, opacity: 0.8}}
                    editable={false}
                    disable={true}
                  />
                  {touched.primaryEmail && errors.primaryEmail && (
                    <Text style={styles.errorMessage}>
                      {errors.primaryEmail}
                    </Text>
                  )}
                </View>
              </View>
              <View>
                <View style={{marginTop: scale(20)}}>
                  <Text style={{...styles.headerText}}>Other Details</Text>
                </View>
                <View style={{flex: 1, zIndex: 100, marginTop: scale(10)}}>
                  <View>
                    <Text style={styles.formInputTitle}>
                      Country<Text style={{color: 'red'}}>*</Text>
                    </Text>
                  </View>
                  <DropDownPicker
                    open={openCountry}
                    value={valueCountry}
                    items={countryData}
                    setOpen={setOpenCountry}
                    setValue={setValueCountry}
                    placeholder="Select"
                    placeholderStyle={{
                      color: '#4D4F5C',
                    }}
                    searchable={true}
                    style={styles.flexDropdown}
                    textStyle={{
                      color: '#4D4F5C',
                    }}
                    onSelectItem={value => {
                      setValueState('');
                      setFieldValue('State', '');
                      setStateData([]);
                      getStateData(value.value);
                      changeRef(value);
                      setFieldValue('countryName', value.value);
                      setAlertMessage(true);
                    }}
                    listMode="MODAL"
                    name="CurrenttAddressCountry"
                  />
                  {touched.countryName && errors.countryName && (
                    <Text style={styles.errorMessage}>
                      {errors.countryName}
                    </Text>
                  )}
                </View>
                <View style={{flex: 1, marginTop: scale(10)}}>
                  <View>
                    <Text style={styles.formInputTitle}>
                      State<Text style={{color: 'red'}}>*</Text>
                    </Text>
                  </View>
                  {showdropDown ? (
                    <DropDownPicker
                      open={openstate}
                      value={valueState}
                      items={stateData}
                      setOpen={setOpenState}
                      setValue={setValueState}
                      searchable
                      placeholder="Select"
                      placeholderStyle={{
                        color: '#4D4F5C',
                      }}
                      style={styles.flexDropdown}
                      textStyle={{
                        color: '#4D4F5C',
                      }}
                      listMode="MODAL"
                      onSelectItem={value => {
                        setFieldValue('State', value.value);
                        changeStateRef(value);
                        setAlertMessage(true);
                      }}
                    />
                  ) : (
                    <TextInput
                      name="State"
                      placeholder="Enter"
                      placeholderTextColor="#4D4F5C"
                      value={values.State}
                      onBlur={handleBlur('State')}
                      onChangeText={handleChange('State')}
                      onChange={() => setAlertMessage(true)}
                      style={styles.TextInput}
                    />
                  )}
                  {touched.State && errors.State && (
                    <Text style={styles.errorMessage}>{errors.State}</Text>
                  )}
                </View>
                <View style={{flex: 1, marginTop: scale(10)}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={styles.formInputTitle}>
                      City<Text style={{color: 'red'}}>*</Text>
                    </Text>
                  </View>
                  <TextInput
                    name="CurrentCity"
                    placeholder="Enter"
                    placeholderTextColor="#4D4F5C"
                    value={values.city}
                    onBlur={handleBlur('city')}
                    onChangeText={handleChange('city')}
                    onChange={() => setAlertMessage(true)}
                    style={styles.TextInput}
                  />
                  {touched.city && errors.city && (
                    <Text style={styles.errorMessage}>{errors.city}</Text>
                  )}
                </View>
              </View>
              <View>
                <View style={{marginTop: scale(20)}}>
                  <Text style={{...styles.headerText}}>
                    Immigration Details
                  </Text>
                </View>
                <View style={{flex: 1, zIndex: 100, marginTop: scale(10)}}>
                  <View>
                    <Text style={styles.formInputTitle}>
                      What visa you are holding now?
                      <Text style={{color: 'red'}}>*</Text>
                    </Text>
                  </View>
                  <DropDownPicker
                    open={openIMMVISA}
                    value={visa}
                    items={VisaData}
                    setOpen={setOpenIMMVISA}
                    setValue={setVisa}
                    onSelectItem={visaItem => {
                      setVisaName(visaItem.label);
                      setFieldValue('ImmigrationVisa', visaItem.label);
                      setAlertMessage(true);
                    }}
                    placeholder="Select"
                    placeholderStyle={{
                      color: '#4D4F5C',
                    }}
                    searchable={true}
                    searchContainerStyle={{
                      borderBottomColor: '#dfdfdf',
                    }}
                    searchTextInputStyle={{
                      color: '#4D4F5C',
                      borderColor: '#4D4F5C',
                    }}
                    style={styles.flexDropdown}
                    textStyle={{
                      color: '#4D4F5C',
                    }}
                    listMode="MODAL"
                    name="CurrenttAddressCountry"
                  />
                  {touched.ImmigrationVisa && errors.ImmigrationVisa && (
                    <Text style={styles.errorMessage}>
                      {errors.ImmigrationVisa}
                    </Text>
                  )}
                </View>
              </View>
            </View>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TouchableOpacity
                onPress={() =>
                  alertMessage
                    ? setModalVisible(!modalVisible)
                    : navigation.goBack()
                }
                style={{
                  flex: 0.5,
                  backgroundColor: '#B4BECA',
                  height: scale(40),
                  width: scale(120),
                  borderRadius: 4,
                  alignItems: 'center',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  marginTop: scale(20),
                }}>
                <Text style={styles.Buttontext}>CANCEL</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSubmit}
                style={{
                  flex: 1,
                  ...styles.Button,
                  marginTop: scale(20),
                  marginLeft: scale(20),
                }}>
                <Text style={styles.Buttontext}>SAVE</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
                backgroundColor: '#00000040',
              }}>
              <View
                style={{
                  margin: scale(20),
                  backgroundColor: '#FFFFFF',
                  padding: scale(20),
                  shadowOpacity: 0.25,
                  elevation: 5,
                  height: scale(213),
                  width: scale(328),
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: scale(18),
                        color: '#4D4F5C',
                        fontFamily: 'SourceSansPro-Semibold',
                      }}>
                      Unsaved changes!
                    </Text>
                    <Pressable onPress={() => setModalVisible(!modalVisible)}>
                      <AntDesign
                        name="close"
                        size={23}
                        style={{
                          color: 'grey',
                          marginBottom: scale(10),
                        }}
                      />
                    </Pressable>
                  </View>
                  <View
                    style={{
                      marginVertical: scale(10),
                      borderBottomWidth: scale(1),
                      borderBottomColor: '#00000029',
                    }}
                  />
                  <Text
                    style={{
                      fontSize: scale(14),
                      color: '#4D4F5C',
                      fontFamily: 'SourceSansPro-Regular',
                    }}>
                    If you leave before saving, all changes made on the page
                    will be lost. Do you wish to continue ?
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: scale(30),
                      justifyContent: 'space-between',
                    }}>
                    <TouchableOpacity
                      onPress={() => setModalVisible(!modalVisible)}
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: scale(12),
                        borderRadius: scale(5),
                        backgroundColor: '#EFEFEF',
                        width: '30%',
                      }}
                      disabled={false}>
                      <Text
                        style={{
                          fontSize: scale(14),
                          fontFamily: 'SourceSansPro-SemiBold',
                          color: '#656565',
                        }}>
                        No
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setModalVisible(!modalVisible);
                        Redirect();
                      }}
                      style={{
                        marginLeft: scale(30),
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: scale(12),
                        borderRadius: scale(5),
                        backgroundColor: '#00A0DA',
                        width: '30%',
                      }}
                      disabled={false}>
                      <Text
                        style={{
                          fontSize: scale(14),
                          fontFamily: 'SourceSansPro-SemiBold',
                          color: '#FFFFFF',
                        }}>
                        Yes
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};
const mapStateToProps = ({
  timeLine: {userInformation, CountryList},
  myAccountReducer: {VisaList},
}) => ({
  userInformation,
  CountryList,
  VisaList,
});
const mapDispatchToProps = {
  getstate: countryCode => fetchStateList(countryCode),
  updatePersonalDetails: (authToken, payLoad) =>
    updatePersonalDetails(authToken, payLoad),
  getUserInformation: authToken => getUserInformation(authToken),
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PersonalDetailsEdit);
