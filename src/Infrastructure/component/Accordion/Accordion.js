import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  LayoutAnimation,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {scale} from '../../utils/screenUtility';
import Entypo from 'react-native-vector-icons/Entypo';

const Accordion = props => {
  const [expanded, setExpanded] = useState(
    props.expanded ? props.expanded : false,
  );
  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    {
      props.selectedItem
        ? props.selectedItem(props.id)
        : setExpanded(!expanded);
    }
  };
  return (
    <>
      <View>
        {props.line ? null : (
          <View
            style={{
              marginVertical: props.noMarginVertical ? null : scale(10),
              borderBottomWidth: scale(1),
              borderStyle: 'solid',
              borderBottomColor: expanded ? '#E0F0F7' : '#FFFFFF',
            }}
          />
        )}
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingHorizontal: scale(5),
            paddingVertical: props.subTitle ? scale(18) : scale(5),
            backgroundColor: expanded
              ? props.backgroundColor
                ? '#E0F0F7'
                : '#ffff'
              : props.backgroudColourInit
              ? '#fff'
              : '#E0F0F7',
            marginTop: props.marginTop
              ? props.marginTop
              : props.icon === false
              ? scale(10)
              : null,
            flexWrap: 'wrap',
            borderColor: props.borderColor ? props.borderColor : null,
            borderWidth: props.borderWidth ? 1 : 0,
            borderRadius: props.borderRadius ? props.borderRadius : 0,
            borderBottomWidth: props.visaStamping ? (expanded ? 0 : 1) : 0,
          }}
          onPress={() => toggleExpand()}>
          {props.count ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={
                  props.style?.titleContent
                    ? props.style.titleContent
                    : {
                        fontFamily: 'SourceSansPro-SemiBold',
                        fontSize: scale(14),
                        color: '#4D4F5C',
                        overflow: 'hidden',
                      }
                }>
                {props.count}.
              </Text>
            </View>
          ) : null}
          {props.iconLeft ? (
            <>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  // backgroundColor: 'red',
                }}>
                <Icon
                  name={
                    props.open || expanded
                      ? 'keyboard-arrow-up'
                      : 'keyboard-arrow-down'
                  }
                  size={30}
                  color={props.subTitle ? '#505050' : '#10A0DA'}
                />
              </View>
            </>
          ) : null}

          {props.subTitle ? (
            <>
              <View
                style={{
                  flex: 4,
                  justifyContent: 'center',
                  marginLeft: props.count
                    ? null
                    : props.titlemargin
                    ? null
                    : scale(10),
                  // backgroundColor: 'green',
                }}>
                <Text
                  style={
                    props.style?.titleContent
                      ? props.style.titleContent
                      : {
                          fontFamily: 'SourceSansPro-Regular',
                          fontSize: scale(12),
                          color: '#505050',
                          overflow: 'hidden',
                        }
                  }>
                  {props.title}
                </Text>
              </View>
              <View
                style={{
                  flex: 3.5,
                  justifyContent: 'center',
                  marginLeft: props.count
                    ? null
                    : props.titlemargin
                    ? null
                    : scale(10),
                  // backgroundColor: 'yellow',
                }}>
                <Text
                  style={
                    props.style?.titleContent
                      ? props.style.titleContent
                      : {
                          fontFamily: 'SourceSansPro-Regular',
                          fontSize: scale(12),
                          color: '#505050',
                          overflow: 'hidden',
                        }
                  }>
                  {props.naiscCode}
                </Text>
              </View>
              <View
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  marginLeft: props.count
                    ? null
                    : props.titlemargin
                    ? null
                    : scale(10),
                  // backgroundColor: 'blue',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    props.setModalVisible(props.item);
                  }}>
                  <Entypo
                    name="link"
                    size={23}
                    style={{
                      color: '#1C90C0',
                    }}
                  />
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <View
              style={{
                flex: 8,
                justifyContent: 'center',
                marginLeft: props.count
                  ? null
                  : props.titlemargin
                  ? null
                  : scale(10),
              }}>
              <Text
                style={
                  props.style?.titleContent
                    ? props.style.titleContent
                    : {
                        fontFamily: 'SourceSansPro-SemiBold',
                        fontSize: scale(14),
                        color: '#4D4F5C',
                        overflow: 'hidden',
                      }
                }>
                {props.title}
              </Text>
            </View>
          )}

          {!props.iconLeft ? (
            <>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Icon
                  name={
                    props.open || expanded
                      ? 'keyboard-arrow-up'
                      : 'keyboard-arrow-down'
                  }
                  size={30}
                  color="#10A0DA"
                />
              </View>
            </>
          ) : null}
        </TouchableOpacity>
        {(props.open || expanded) && (
          <>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              scrollEnabled={true}
              nestedScrollEnabled={true}>
              <View
                style={
                  props.style?.body
                    ? props.style.body
                    : {
                        padding: scale(10),
                        marginLeft: props.noMarginLeft ? scale(5) : scale(25),
                      }
                }>
                {props.data}
              </View>
            </ScrollView>
          </>
        )}
        {props.removeBorder ? null : (
          <View
            style={
              props.style?.borderStyle
                ? props.style.borderStyle
                : {
                    borderWidth: scale(0.8),
                    borderStyle: 'dashed',
                    borderColor: '#C3D0DE',
                  }
            }
          />
        )}
      </View>
    </>
  );
};

export default Accordion;
