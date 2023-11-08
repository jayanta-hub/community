import React from 'react';
import colors from '../../assets/colors/colors';
import {TextInput, Button, Text} from 'react-native-paper';
import {scale} from '../../utils/screenUtility';

export const CustomInput = () => (
  <TextInput
    mode="outlined"
    placeholder="Enter"
    style={{
      height: props => props.size || '40px',
      borderColor: colors.borderColor,
      padding: scale(10),
      alignItems: 'center',
    }}
  />
);

export const Labeltext = (
  <Text
    style={{
      fontSize: props => props.fontSize || '16px',
      paddingTop: props => props.paddingTop || '0px',
      textColor: props => props.textColor || colors.customBlack,
      fontFamily: 'SourceSansPro-Regular',
    }}
  />
);

export const Linktext = (
  <Text
    style={{
      fontSize: props => props.fontSize || '14px',
      paddingTop: props => props.paddingTop || '0px',
      textColor: props => props.textColor || colors.linkColor,
      fontFamily: 'SourceSansPro-Regular',
    }}
  />
);

export const CustomButton = (
  <Button
    mode="contained"
    style={{
      backgroundColor: props => props.bgcolor || '#349beb',
      height: props => props.height || '40px',
      width: props => props.width || '115px',
      fontFamily: 'SourceSansPro-Regular',
      fontSize: props => props.fontsize || '8px',
      borderColor: props => props.borderradiuscolor || '',
      borderRadius: props => props.borderradius || '8px',
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: props => props.marginTop || '0px',
      marginBottom: props => props.marginBottom || '0px',
      marginLeft: props => props.marginLeft || '0px',
    }}
  />
);
