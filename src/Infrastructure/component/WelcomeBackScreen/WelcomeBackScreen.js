import {View, Text, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {scale} from '../../utils/screenUtility';
import styles from './styles';
import {RadioButton} from 'react-native-paper';
import {useFormik} from 'formik';
import {useNavigation} from '@react-navigation/native';

const WelcomeBackScreen = props => {
  const [modalVisible, setModalVisible] = useState(props.status);
  const navigation = useNavigation();

  const {handleChange, handleSubmit, values} = useFormik({
    initialValues: {
      option: 'Reactivate',
    },
    enableReinitialize: true,
    validateOnBlur: true,
    validateOnChange: true,
    onSubmit: value => props.activiationHandler(value),
  });
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.headerText}>Welcome Back!</Text>
          <View style={styles.dashedLine} />
          {props.createNow ? (
            <View>
              <View>
                <Text style={styles.labelText}>
                  It's been more than 30 days since you marked your account for
                  deletion, you can't get it back.
                </Text>
              </View>
              <View>
                <Text style={{...styles.labelText, marginTop: scale(30)}}>
                  Create a new Imagility Account instead.
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  props.closeHandler();
                  navigation.navigate('Registration');
                }}>
                <Text style={styles.buttonText}>CREATE NOW</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <View>
                <Text style={styles.labelText}>
                  You have deactivated your Imagility account within 30 days.
                </Text>
              </View>
              <View>
                <Text style={{...styles.labelText, marginTop: scale(20)}}>
                  Check required option to go further :
                </Text>
              </View>
              <View>
                <RadioButton.Group
                  onValueChange={handleChange('option')}
                  value={values.option}>
                  <View style={{flexDirection: 'column', marginTop: scale(10)}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Android
                        value="Reactivate"
                        uncheckedColor="#10A0DA"
                        color="#0089CF"
                        label="Reactivate Account"
                      />
                      <Text style={styles.radioTitle}>Reactivate Account</Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <RadioButton.Android
                        value="Deactivated"
                        uncheckedColor="#10A0DA"
                        color="#0089CF"
                        label="Keep Account Deactivated"
                      />
                      <Text style={styles.radioTitle}>
                        Keep Account Deactivated
                      </Text>
                    </View>
                  </View>
                </RadioButton.Group>
              </View>
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>CONFIRM</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default WelcomeBackScreen;
