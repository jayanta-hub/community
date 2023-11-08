import {StyleSheet, Dimensions} from 'react-native';
import {scale} from '../../utils/screenUtility';

const styles = StyleSheet.create({
  container: {
    padding: scale(10),
    borderRadius: scale(5),
    marginTop: scale(20),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: scale(5),
    shadowOpacity: 0.2,
    elevation: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: scale(10),
    flex: 9,
  },
  title: {
    flexShrink: 1,
    fontSize: scale(16),
    color: '#413434',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  subtitle: {
    flexShrink: 1,
    fontSize: scale(12),
    color: '#413434',
    fontFamily: 'SourceSansPro-Light',
  },
});

export default styles;
