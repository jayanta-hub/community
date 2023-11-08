import {StyleSheet, Dimensions} from 'react-native';
import {scale} from '../../utils/screenUtility';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: scale(22),
    marginTop: scale(21),
    fontFamily: 'SourceSansPro-Regular',
  },
});

export default styles;
