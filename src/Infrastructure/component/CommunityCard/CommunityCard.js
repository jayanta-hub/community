import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import styles from './styles';
import {Avatar} from 'react-native-paper';
import {scale} from '../../utils/screenUtility';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment';
import {LikeAndCommentCountMethod} from '../../commonMethod/commonMethod';
const CommunityCard = props => {
  const {information, ContentType} = props;
  const navigation = useNavigation();
  const deleteView = id => {
    return (
      <TouchableOpacity
        style={{
          alignItems: 'flex-end',
        }}
        onPress={() => props.DeletePost(id)}>
        <MaterialCommunityIcons
          name="delete"
          size={scale(20)}
          color="#10A0DA"
          style={{padding: scale(2)}}
        />
      </TouchableOpacity>
    );
  };
  return (
    <TouchableOpacity
      style={
        props?.isRecentPost === true
          ? styles.recentPostCardView
          : styles.cardView
      }
      onPress={() => {
        navigation.navigate('Content Details', {
          information: information,
          contentType: ContentType,
        });
      }}>
      <View style={styles.headerView}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Avatar.Image
            size={scale(65)}
            source={
              information?.opprofile === null ||
              information?.opprofile === undefined
                ? require('../../assets/images/avatar.png')
                : {
                    uri: `data:image/png;base64,${information?.opprofile}`,
                  }
            }
          />
          <Text style={styles.TextStyle}>
            {information?.opname ? information.opname : 'Anonymus'}
          </Text>
        </View>
        <View
          style={{
            flex: 3,
            justifyContent: 'space-evenly',
            paddingLeft: scale(20),
          }}>
          {props.ContentType === 'Decision' ? (
            <View
              style={{
                ...styles.alignRow,
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.TextStyle}>
                  Decision :{' '}
                  <Text
                    style={{
                      fontFamily: 'SourceSansPro-SemiBold',
                      fontSize: scale(14),

                      color:
                        information.decisionName === 'Approved' ||
                        information.decisionName === 'RFE Approved'
                          ? '#4CBA20'
                          : information.decisionName === 'Denied'
                          ? '#FD747C'
                          : information.decisionName === 'Noir' ||
                            information.decisionName === 'Noid'
                          ? '#FEBC54'
                          : '#4D4F5C',
                    }}>
                    {information.decisionName ? information.decisionName : '--'}
                  </Text>
                </Text>
                {information.decisionName === 'Approved' ||
                information.decisionName === 'RFE Approved' ? (
                  <Feather
                    name="smile"
                    size={scale(19)}
                    color="#4CBA20"
                    style={{marginLeft: scale(5)}}
                  />
                ) : information.decisionName === 'Denied' ? (
                  <MaterialCommunityIcons
                    name="emoticon-sad-outline"
                    size={scale(20)}
                    color="#FD747C"
                    style={{marginLeft: scale(5)}}
                  />
                ) : null}
              </View>
              {props?.isMypost ? deleteView(information._id) : null}
            </View>
          ) : props.ContentType === 'ResponseToRule' ? (
            <View
              style={{
                ...styles.alignRow,
                justifyContent: 'space-between',
              }}>
              <Text style={{...styles.TextStyle, flex: 1}}>
                Rule :{' '}
                <Text
                  style={{
                    fontFamily: 'SourceSansPro-SemiBold',
                    fontSize: scale(14),
                    color: '#196AA5',
                  }}>
                  {information?.ruleDesc ? information.ruleDesc : '--'}
                </Text>
              </Text>
              {props?.isMypost ? deleteView(information._id) : null}
            </View>
          ) : (
            <View
              style={{
                ...styles.alignRow,
                justifyContent: 'space-between',
              }}>
              <Text style={{...styles.TextStyle, flex: 1}}>
                Title :{' '}
                <Text
                  style={{
                    fontFamily: 'SourceSansPro-SemiBold',
                    fontSize: scale(14),
                    color: '#196AA5',
                  }}>
                  {information?.storyTitle ? information.storyTitle : '--'}
                </Text>
              </Text>
              <View>
                {props?.isMypost ? deleteView(information._id) : null}
              </View>
            </View>
          )}
          <View>
            <Text style={styles.TextStyle}>
              Date :{' '}
              <Text style={styles.subcontentText}>
                {information.createdDate
                  ? moment(information.createdDate).format('Do MMM YYYY')
                  : '--'}
              </Text>
            </Text>
          </View>
          {props.ContentType === 'Story' ? (
            <View>
              <Text style={styles.TextStyle} numberOfLines={2}>
                Description :{' '}
                <Text style={styles.subcontentText}>
                  {information.description ? information.description : '--'}
                </Text>
              </Text>
            </View>
          ) : props.ContentType === 'Decision' ? (
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              <Text style={styles.TextStyle}>Visa Type : </Text>
              <View style={{flex: props?.isRecentPost ? 0 : 1}}>
                <Text style={styles.subcontentText}>
                  {information.visaTypeName ? information.visaTypeName : '--'}
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
      <View style={styles.footerView}>
        <View style={styles.alignRow}>
          {information.isUpvoted ? (
            <AntDesign name="like1" size={scale(20)} color={'#10A0DA'} />
          ) : (
            <AntDesign name="like2" size={scale(20)} color={'#687C93'} />
          )}
          <Text style={styles.footerText}>
            {LikeAndCommentCountMethod(
              information.upvoteCount === null ? 0 : information.upvoteCount,
            )}
          </Text>
        </View>
        <View style={styles.alignRow}>
          {information.isCommented ? (
            <MaterialCommunityIcons
              name="message"
              size={scale(20)}
              color="#10A0DA"
            />
          ) : (
            <MaterialCommunityIcons
              name="message-outline"
              size={scale(20)}
              color="#687C93"
            />
          )}
          <Text style={styles.footerText}>
            {LikeAndCommentCountMethod(
              information.commentsCount === null
                ? 0
                : information.commentsCount,
            )}
          </Text>
        </View>
        <View style={styles.alignRow}>
          <FontAwesome5 name="eye" size={scale(20)} color="#687C93" />
          <Text style={styles.footerText}>
            {LikeAndCommentCountMethod(
              information.viewedCount === null ? 0 : information.viewedCount,
            )}
          </Text>
        </View>
        <View style={styles.alignRow}>
          {information.isFavourite ? (
            <Entypo name="star" size={scale(22)} color="#FEBC54" />
          ) : (
            <Entypo name="star-outlined" size={scale(22)} color="#687C93" />
          )}
        </View>
        <View style={styles.alignRow}>
          <AntDesign
            name="warning"
            size={scale(20)}
            color={information.isReported ? 'red' : '#687C93'}
          />
        </View>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#FFFFFF',
          }}
          onPress={() => {
            navigation.navigate('Content Details', {
              information: information,
              contentType: ContentType,
            });
          }}>
          <MaterialIcons
            name="navigate-next"
            size={scale(30)}
            color="#10A0DA"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default CommunityCard;
