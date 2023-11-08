import {StyleSheet} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Text: {
    fontSize: scale(16),
    fontFamily: 'SourceSansPro-Regular',
    color: '#4D4F5C',
    textAlign: 'justify',
  },
  Buttontext: {
    color: '#fff',
    fontSize: scale(16),
    fontFamily: 'SourceSansPro-Semibold',
  },
  Button: {
    flex: 1.5,
    backgroundColor: '#349beb',
    height: scale(40),
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
export default styles;
