import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import LOGOSVG from '../../assets/images/splashScreenLogo.svg';
const SplashComponent = props => {
  return (
    <View style={styles.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <LOGOSVG width="80%" height="70%" style={{flex: 1}} />
      </View>
    </View>
  );
};

export default SplashComponent;
