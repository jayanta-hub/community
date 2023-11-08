import React, {Component} from 'react';
import {StyleSheet, View, Modal, ActivityIndicator, Text} from 'react-native';
import {scale} from '../../utils/screenUtility';
const Loader = props => {
  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={props.status}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator
            animating={props.status}
            color={'#00A0DA'}
            size={scale(25)}
          />
          <Text style={{color: '#00A0DA', fontSize: scale(15)}}>
            Loading...
          </Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: scale(80),
    width: scale(80),
    borderRadius: scale(5),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Loader;
