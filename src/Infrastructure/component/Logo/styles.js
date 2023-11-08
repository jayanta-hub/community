import {StyleSheet} from 'react-native';
import {scale} from '../../utils/screenUtility';
const styles = StyleSheet.create({
  Logo: {
    width: scale(160),
    height: scale(50),
    resizeMode: 'contain',
    marginTop: scale(29),
    marginVertical: scale(0),
    paddingHorizontal: scale(15),
  },
});

export default styles;
