import {StyleSheet} from 'react-native';
import {scale} from '../../utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: scale(10),
  },
  Text: {
    color: '#505050',
    fontSize: scale(16),
    fontFamily: 'SourceSansPro-Semibold',
  },
  Image: {width: scale(200), height: scale(200)},
});

export default styles;
