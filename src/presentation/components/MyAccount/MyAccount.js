import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProfileHeader from '../../../Infrastructure/component/ProfileHeader/ProfileHeader';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {getAuthToken} from '../../../Infrastructure/utils/storageUtility';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import {decode as atob} from 'base-64';
import Toast from 'react-native-simple-toast';
import {baseURL} from '../../../application/config';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import {connect} from 'react-redux';
import Loader from '../../../Infrastructure/component/Loader/Loader';
import styles from './styles';
import {Divider} from 'react-native-paper';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {
  fetchStateList,
  fetchVisaList,
} from '../../../application/store/actions/myAccount';
import {getUserInformation} from '../../../application/store/actions/timeLine';
const MyAccount = props => {
  const userInformation = props?.userInformation?.data;
  const [status, setStatus] = useState(false);
  const [country, setCountry] = useState('--');
  const [state, setState] = useState('--');
  const [Visa, setVisa] = useState('--');
  const navigation = useNavigation();
  const [edit, setEdit] = React.useState(false);
  const isFocused = useIsFocused();
  const PrimEmail = [];
  userInformation?.email
    ? PrimEmail.push({Primary: props?.userInformation?.data?.email})
    : null;
  const EditProfilePic = async () => {
    const token = await getAuthToken();
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
      });
      let imageType = ['jpeg', 'png', 'jpg'];
      if (imageType.includes(res[0].type.split('/').reverse()[0])) {
        if (res[0].size >= 1048576) {
          Toast.show(
            'The file is too large to upload, please try a file with less than 1MB',
            Toast.LONG,
          );
        } else {
          let uri = decodeURI(res?.[0]?.uri);
          uri
            ? RNFS.readFile(uri, 'base64').then(async base64data => {
                const binary = atob(base64data);
                let formData = new FormData();
                formData.append('file', {
                  uri: uri,
                  type: res[0].type,
                  name: res[0].name,
                  data: binary,
                });
                setStatus(true);
                let resp = await fetch(
                  `${baseURL}/api/v1/community/profile/self/profileimage`,
                  {
                    method: 'post',
                    body: formData,
                    headers: {
                      'Content-Type': 'multipart/form-data; ',
                      Authorization: `Bearer ${token}`,
                    },
                  },
                );
                let responseJson = resp;
                if (responseJson.status === 200) {
                  props
                    .getUserInformation(token)
                    .then(res => {
                      setStatus(false);
                      setTimeout(() => {
                        Toast.show(
                          'Profile image is saved successfully',
                          Toast.LONG,
                        );
                      }, 400);
                    })
                    .catch(error => {
                      console.log('error', error);
                      setStatus(false);
                      setTimeout(() => {
                        Toast.show(
                          'Failed to update profile Picture',
                          Toast.SHORT,
                        );
                      }, 400);
                    });
                } else {
                  setStatus(false);
                  setTimeout(() => {
                    Toast.show('Failed to update profile Picture', Toast.SHORT);
                  }, 1);
                }
              })
            : null;
        }
      } else {
        Toast.show(
          `Unaccepted format!. Please upload a 'jpeg/png/jpg' format file`,
          Toast.LONG,
        );
      }
    } catch (err) {
      setStatus(false);
      if (DocumentPicker.isCancel(err)) {
      } else {
        throw err;
      }
    }
  };
  const toggleHandler = () => {
    setEdit(!edit);
  };
  const getStateData = async countryCode => {
    setStatus(true);
    await props
      .getState(countryCode)
      .then(Countryvalue => {
        props
          .getVisa()
          .then(res => {
            props.CountryList?.data.filter(item => {
              if (item.countryCode === countryCode) {
                setCountry(item.countryName);
              }
            });
            Countryvalue.data.length > 0
              ? Countryvalue.data.filter(item => {
                  if (
                    item.stateProvinceCode === userInformation.stateProvinceCode
                  ) {
                    setState(item.stateProvinceName);
                  }
                })
              : setState(
                  userInformation?.stateProvinceName
                    ? userInformation.stateProvinceName
                    : '--',
                );
            userInformation.currentVisaStatus !== '' &&
            userInformation.currentVisaStatus !== null &&
            userInformation.currentVisaStatus !== undefined
              ? res.data.filter(item => {
                  if (item.code === userInformation.currentVisaStatus) {
                    setVisa(item.name);
                  }
                })
              : setVisa('--');
            setStatus(false);
          })
          .catch(error => {
            setStatus(false);
          });
      })
      .catch(error => {
        setStatus(false);
      });
  };
  useEffect(() => {
    getStateData(userInformation?.countryCode);
  }, [isFocused]);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={150}
      style={{flex: 1}}>
      <Loader status={status} />
      <ScrollView contentContainerStyl={{flexGrow: 1}}>
        <View style={{paddingHorizontal: scale(10), marginTop: scale(10)}}>
          <ProfileHeader
            profilePic={
              userInformation?.profileImage
                ? userInformation.profileImage
                : null
            }
            name={
              userInformation?.firstName
                ? `${userInformation.firstName} ${userInformation.lastName}`
                : '--'
            }
            primaryEmail={
              userInformation?.email ? `${userInformation.email}` : '--'
            }
            accStatus="Incomplete"
            editPic={EditProfilePic}
            EditProfile="Edit Profile"
            Toggle={toggleHandler}
            EditProfilePic={true}
          />
        </View>
        <View
          style={{
            ...styles.content,
            marginHorizontal: scale(12),
            marginTop: scale(10),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
              }}>
              <Text style={{...styles.headerText, flex: 1}}>
                Personal Details
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                style={{
                  ...styles.editButton,
                  flexDirection: 'row',
                }}
                onPress={() => {
                  navigation.navigate('PersonalDetailsEdit');
                }}>
                <SimpleLineIcons
                  name="pencil"
                  size={scale(12)}
                  color="#00A8DB"
                  style={styles.editIcon}
                />
                <Text style={{...styles.editButtonText}}>EDIT</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.label}>Title</Text>
            <Text style={styles.information}>
              {userInformation?.title ? userInformation?.title : '--'}
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginTop: scale(10)}}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>First Name</Text>
              <Text style={styles.information}>
                {userInformation?.firstName ? userInformation?.firstName : '--'}
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Last Name</Text>
              <Text style={styles.information}>
                {userInformation?.lastName ? userInformation?.lastName : '--'}
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', marginBottom: scale(10)}}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Middle Name</Text>
              <Text style={styles.information}>
                {userInformation?.middleName
                  ? userInformation?.middleName
                  : '--'}
              </Text>
            </View>
          </View>
          <Divider />
          <Divider />
          <Divider />
          <Divider />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginTop: scale(20),
            }}>
            <Text style={{...styles.headerText, flex: 1}}>Contact Details</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Email ID</Text>
              <Text style={styles.information}>
                {PrimEmail[0]?.Primary ? PrimEmail[0]?.Primary : '--'}
              </Text>
            </View>
          </View>
          <Divider style={{marginTop: scale(20)}} />
          <Divider />
          <Divider />
          <Divider />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginTop: scale(20),
            }}>
            <Text style={{...styles.headerText, flex: 1}}>Other Details</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>Country</Text>
              <Text style={styles.information}>{country}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.label}>State</Text>
              <Text style={styles.information}>{state}</Text>
            </View>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>City</Text>
              <Text style={styles.information}>
                {userInformation?.city ? userInformation?.city : '--'}
              </Text>
            </View>
          </View>
          <Divider style={{marginTop: scale(20)}} />
          <Divider />
          <Divider />
          <Divider />
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              marginTop: scale(20),
            }}>
            <Text style={{...styles.headerText, flex: 1}}>
              Immigration Details
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <Text style={styles.label}>What visa you are holding now?</Text>
              <Text style={styles.information}>{Visa}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  getState: countryCode => fetchStateList(countryCode),
  getVisa: () => fetchVisaList(),
  getUserInformation: authToken => getUserInformation(authToken),
};
export default connect(mapStateToProps, mapDispatchToProps)(MyAccount);
