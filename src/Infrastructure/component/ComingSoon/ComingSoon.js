import {View, Text, Image} from 'react-native';
import React from 'react';
import {scale} from '../../utils/screenUtility';
import colors from '../../assets/colors/colors';

const ComingSoon = () => {
  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.mainWhite,
        }}>
        <Image
          style={{
            width: scale(160),
            height: scale(160),
            zIndex: 100,
            resizeMode: 'contain',
          }}
          source={require('../../assets/images/comingSoon.png')}
        />
      </View>
    </>
  );
};

export default ComingSoon;
