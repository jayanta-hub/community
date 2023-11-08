import {StyleSheet, Dimensions} from 'react-native';

import {scale} from '../../utils/screenUtility';

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(10),
    justifyContent: 'space-between',
    borderRadius: scale(5),
    borderColor: '#EDEDED',
    borderWidth: scale(2),
    // shadowColor: 'black',
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowRadius: 5,
    // shadowOpacity: 1.0,
  },
  profilePic: {
    marginTop: scale(30),
    marginLeft: scale(-15),
  },
  userName: {
    fontFamily: 'Montserrat-Medium',
    fontSize: scale(12),
    color: '#020433',
  },
  email: {
    fontFamily: 'Montserrat-Regular',
    fontSize: scale(9),
    color: '#020433',
  },
  status: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(11),
    color: '#FD747C',
  },
  editContainer: {
    backgroundColor: '#E0F0F7',
    paddingHorizontal: scale(10),
    paddingVertical: scale(5),
    borderRadius: scale(20),
    marginTop: scale(5),
  },
  edit: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(13),
    color: '#19A0DA',
  },
});

export default styles;
