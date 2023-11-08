import {StyleSheet} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
  },
  text: {
    flexShrink: 1,
    fontSize: scale(14),
    color: '#4A4A4A',
    fontFamily: 'SourceSansPro-Regular',
    textAlign: 'justify',
  },
  divider: {
    marginTop: scale(10),
    borderColor: '#C3D0DE',
  },
  dashed: {
    marginTop: scale(13),
    borderWidth: scale(0.9),
    borderStyle: 'dashed',
    borderColor: '#C3D0DE',
  },
  aTypicalInterviewTextBold: {
    color: '#4D4F5C',
    fontSize: scale(14),
    fontFamily: 'SourceSansPro-SemiBold',
    textAlign: 'justify',
  },
});
export default styles;
