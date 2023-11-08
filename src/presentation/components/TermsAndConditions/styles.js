import {StyleSheet} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: scale(16),
    paddingVertical: scale(10),
    borderRadius: scale(4),
  },
  text: {
    flexShrink: 1,
    fontSize: scale(14),
    color: '#797979',
    fontFamily: 'SourceSansPro-Regular',
    textAlign: 'justify',
  },
});
export default styles;
