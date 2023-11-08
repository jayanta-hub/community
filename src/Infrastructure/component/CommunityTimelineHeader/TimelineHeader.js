import React from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Avatar} from 'react-native-paper';
import {scale} from '../../utils/screenUtility';
import styles from './styles';
import {connect} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const TimelineHeader = props => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: '#EFFAFF',
        height: scale(90),
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {props?.profilePic !== null ? (
          <View>
            <Image
              style={{
                width: scale(40),
                height: scale(40),
                borderRadius: scale(4),
              }}
              source={{
                uri: `data:image/png;base64,${props.profilePic}`,
              }}
            />
          </View>
        ) : (
          <View>
            <Avatar.Image
              size={scale(50)}
              source={require('../../assets/images/avatar.png')}
            />
          </View>
        )}

        <View style={styles.profilePic}>
          {props.EditProfilePic ? (
            <TouchableOpacity onPress={() => props.editPic()}>
              <MaterialIcons name="edit" size={25} color="#08C299" />
            </TouchableOpacity>
          ) : (
            <MaterialIcons name="verified-user" size={20} color="#08C299" />
          )}
        </View>

        <View style={{flex: 0.9}}>
          <View
            style={{marginLeft: 10, flex: 1, justifyContent: 'space-around'}}>
            <Text style={styles.userName}>
              {props.name ? props.name : '--'}
            </Text>
            <View>
              <Text
                style={{
                  fontFamily: 'SourceSansPro-Regular',
                  fontSize: scale(11),
                  color: '#404B69',
                }}>
                {props.Following !== undefined &&
                props.Following !== null &&
                props.Following !== ''
                  ? `${props.Following} Following`
                  : '0 Following'}{' '}
                |{' '}
                {props.Followers !== undefined &&
                props.Followers !== null &&
                props.Followers !== ''
                  ? `${props.Followers} Followers`
                  : '0 Followers'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: '#EFFAFF',
                  borderRadius: scale(25),
                  borderColor: '#0CA0DA',
                  borderWidth: 1,
                  marginTop: scale(5),
                  flexDirection: 'row',
                  height: scale(25),
                  alignItems: 'center',
                  flex: 1,
                }}
                onPress={() => {
                  navigation.navigate('Create Post');
                }}>
                <View>
                  <AntDesign
                    name="pluscircle"
                    size={scale(23)}
                    color="#0CA0DA"
                  />
                </View>
                <Text
                  style={{
                    fontFamily: 'SourceSansPro-SemiBold',
                    fontSize: scale(12),
                    color: '#404B69',
                    left: scale(10),
                  }}>
                  Create Post
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{flex: 1, justifyContent: 'center', left: scale(20)}}
                onPress={() => navigation.navigate('My Posts')}>
                <Text
                  style={{
                    fontFamily: 'SourceSansPro-Regular',
                    fontSize: scale(13),
                    color: '#128BFF',
                    textDecorationLine: 'underline',
                  }}>
                  My Posts
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {!props.accStatus ? (
        <View style={{alignItems: 'center', right: scale(5)}}>
          <TouchableOpacity
            style={styles.editContainer}
            onPress={() => {
              // signOut();
              props.onAction();
            }}>
            <MaterialIcons name="person-outline" size={25} color="#00A8DB" />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
};

const mapStateToProps = ({timeLine: {profileInfo, getProfileStatus}}) => ({
  profileInfo,
  getProfileStatus,
});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(TimelineHeader);
