import {View, Text, SafeAreaView, TouchableOpacity, Alert} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../../Infrastructure/utils/context';
import {deleteBeneficiaryAccount} from '../../../application/store/actions/auth';
import {connect} from 'react-redux';
import {
  getAuthToken,
  getBeneficiaryUserID,
} from '../../../Infrastructure/utils/storageUtility';
import Toast from 'react-native-simple-toast';
import Loader from '../../../Infrastructure/component/Loader/Loader';
const DeleteAccount = props => {
  const navigation = useNavigation();
  const {signOut} = React.useContext(AuthContext);
  const [status, setStatus] = useState(false);
  const showAlert = () => {
    Alert.alert(
      'Imagility',
      'Would you like to delete your account',
      [
        {
          text: 'No',
          onPress: () => console.log('close'),
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            deleteHandler();
          },
        },
      ],
      {cancelable: false},
    );
  };
  const deleteHandler = async () => {
    let token = await getAuthToken();
    let beneficiaryId = await getBeneficiaryUserID();
    setStatus(true);
    props
      .deleteBeneficiaryAccount(token, beneficiaryId)
      .then(res => {
        setStatus(false),
          navigation.goBack(),
          signOut(),
          setTimeout(() => {
            Toast.show(res.message, Toast.LONG);
          }, 200);
      })
      .catch(error => {
        setStatus(false),
          setTimeout(() => {
            Toast.show(error.message, Toast.LONG);
          }, 200);
        console.log('delete account error', error);
      });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Loader status={status} />
      <View style={{marginHorizontal: scale(20), marginVertical: scale(10)}}>
        <Text style={styles.Text}>
          If you delete your account, you'll have a 30-day window to reactivate
          your account. Take backup of your data before deactivation. If your
          account is deactivated, you will not be able to access any data or
          petitions on Imagility.
        </Text>
        <Text style={{...styles.Text, marginTop: scale(20)}}>
          Beyond 30 days, you will not be able to reactivate your account. You
          will then need to create a new account on Imagility.
        </Text>
        <View
          style={{
            flexDirection: 'row',
            marginTop: scale(20),
            marginBottom: scale(10),
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              flex: 1,
              backgroundColor: '#B4BECA',
              height: scale(40),
              borderRadius: 4,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: scale(20),
            }}>
            <Text style={styles.Buttontext}>CANCEL</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showAlert}
            style={{
              ...styles.Button,
              marginTop: scale(20),
              marginLeft: scale(10),
            }}>
            <Text style={styles.Buttontext}>CONFIRM DELETE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const mapDispatchToProps = {
  deleteBeneficiaryAccount: (token, beneficiaryId) =>
    deleteBeneficiaryAccount(token, beneficiaryId),
};
export default connect(null, mapDispatchToProps)(DeleteAccount);
