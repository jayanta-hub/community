import React from 'react';
import {TouchableOpacity} from 'react-native';
import colors from '../../assets/colors/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
const Back = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Entypo name="chevron-small-left" size={30} color={colors.Slate_Grey} />
    </TouchableOpacity>
  );
};

export default Back;
