import React from 'react';
import {View, Text, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './styles';
import {scale} from '../../utils/screenUtility';

const TimelineCard = props => {
  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: props.bgColor ? props.bgColor : '#fff',
      }}>
      <View style={styles.content}>
        {props.iconName ? (
          <AntDesign name={props.iconName} color="#158FC4" size={scale(20)} />
        ) : props.iconImage !== null &&
          props.iconImage !== undefined &&
          props.iconImage !== '' ? (
          <Image source={props.iconImage} style={props.iconSize} />
        ) : (
          <MaterialCommunityIcons
            name={props.IconName}
            color="#158FC4"
            size={scale(20)}
          />
        )}
        <View
          style={
            props.style?.titleContent
              ? props.style.titleContent
              : {marginLeft: scale(20)}
          }>
          <Text style={styles.title}>{props.Title}</Text>
          {props.SubTitle ? (
            <Text style={styles.subtitle}>{props.SubTitle}</Text>
          ) : null}
        </View>
      </View>
      <View
        style={{
          flex: 0.5,
          alignItems: 'flex-end',
        }}>
        <MaterialIcons
          name={'navigate-next'}
          size={scale(20)}
          color="#158FC4"
        />
      </View>
    </View>
  );
};

export default TimelineCard;
