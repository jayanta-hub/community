import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import styles from './styles';
import colors from '../../assets/colors/colors';
const AdvertisingCard = props => {
  return (
    <TouchableOpacity
      onPress={() =>
        Platform.OS == 'ios' && props.iosLink !== ''
          ? Linking.openURL(decodeURI(props.iosLink))
          : Platform.OS == 'android' && props.androidLink !== ''
          ? Linking.openURL(decodeURI(props.androidLink))
          : ''
      }
      style={styles.cardContainer}>
      <View style={styles.cardBody}>
        <View style={{flex: 1}}>
          <View
            style={{
              ...styles.cardImageContainer,
              backgroundColor: colors.ColumbiaBlue,
            }}>
            <Image
              style={styles.cardImage}
              source={{
                uri: `data:image/png;base64,${
                  props.image ? props.image : '---'
                }`,
              }}
            />
          </View>
          <View style={styles.cardText}>
            <Text style={styles.appNameText}>
              {props.appName ? props.appName : '---'}
            </Text>
            <TouchableOpacity
              onPress={() =>
                Platform.OS == 'ios' && props.iosLink !== ''
                  ? Linking.openURL(decodeURI(props.iosLink))
                  : Platform.OS !== 'ios' && props.androidLink !== ''
                  ? Linking.openURL(decodeURI(props.androidLink))
                  : ''
              }>
              <Text style={styles.downloadText}>
                {Platform.OS == 'ios' && props.iosLink !== ''
                  ? `Download`
                  : Platform.OS == 'android' && props.androidLink !== ''
                  ? `Download`
                  : `Coming Soon...`}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AdvertisingCard;
