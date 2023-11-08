import React from 'react';
import {View, Text, Image} from 'react-native';
import {Avatar} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {scale} from '../../../Infrastructure/utils/screenUtility';
import {connect} from 'react-redux';
import {getUserInformation} from '../../../application/store/actions/timeLine';
const Profile = props => {
  const PrimEmail = [];
  let userInformation = props?.userInformation?.data
    ? props?.userInformation?.data
    : [];
  props?.userInformation?.data?.emailContacts
    ? props?.userInformation?.data?.emailContacts.filter(items => {
        if (items.type.description === 'Primary') {
          PrimEmail.push({Primary: items.email});
        }
      })
    : null;
  return (
    <View style={{flex: 1, flexDirection: 'row', marginRight: scale(-30)}}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: scale(15),
        }}>
        {userInformation?.profileImage ? (
          <View>
            <Image
              style={{
                width: scale(40),
                height: scale(40),
                borderRadius: scale(4),
              }}
              source={{
                uri: `data:image/png;base64,${userInformation.profileImage}`,
              }}
            />
          </View>
        ) : (
          <Avatar.Image
            size={scale(50)}
            source={require('../../../Infrastructure/assets/images/avatar.png')}
          />
        )}
      </View>
      <View
        style={{
          flex: 7,
          paddingHorizontal: scale(5),
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'SourceSansPro-Regular',
            fontSize: scale(13),
            color: '#475F7B',
            textTransform: 'uppercase',
          }}>
          {userInformation?.firstName
            ? `${userInformation.firstName} ${userInformation.lastName}`
            : '--'}
        </Text>
        <Text
          style={{
            fontFamily: 'SourceSansPro-Bold',
            fontSize: scale(12),
            color: '#828D99',
          }}>
          {userInformation?.email ? `${userInformation.email}` : '--'}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingRight: scale(5),
        }}>
        <AntDesign name="right" size={20} />
      </View>
    </View>
  );
};
const mapStateToProps = ({timeLine: {userInformation}}) => ({
  userInformation,
});
const mapDispatchToProps = {
  getUserInformation: authToken => getUserInformation(authToken),
};
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
