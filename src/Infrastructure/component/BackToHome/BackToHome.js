import React from 'react';
import {TouchableOpacity} from 'react-native';
import colors from '../../assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {StackActions, useNavigation} from '@react-navigation/native';
const BackToHome = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(StackActions.popToTop())}>
      <Entypo name="chevron-small-left" size={30} color={colors.Slate_Grey} />
    </TouchableOpacity>
  );
};

export default BackToHome;
