import {Dimensions, Platform, StyleSheet} from 'react-native';
import {scale} from '../../utils/screenUtility';
const {width, height} = Dimensions.get('screen');

const styles = StyleSheet.create({
  recentPostCardView: {
    height: scale(170),
    backgroundColor: '#fff',
    borderRadius: scale(4),
    borderColor: '#EDEDED',
    borderWidth: 1,
    marginHorizontal: scale(13),
  },
  cardView: {
    height: scale(160),
    backgroundColor: '#fff',
    borderRadius: scale(4),
    borderColor: '#0000001F',
    borderWidth: 1,
    marginVertical: scale(5),
    marginHorizontal: scale(5),
  },
  TextStyle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(14),
    color: '#4D4F5C',
  },
  textContent: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(14),
    color: '#4D4F5C',
  },
  subcontentText: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: scale(14),
    color: '#4D4F5C',
  },
  headerView: {
    flexDirection: 'row',
    flex: 1,
    padding: scale(10),
  },
  footerText: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(14),
    color: '#687C93',
    marginLeft: scale(5),
  },
  footerView: {
    backgroundColor: '#F4F5F7',
    height: scale(30),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(10),
    justifyContent: 'space-between',
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default styles;
