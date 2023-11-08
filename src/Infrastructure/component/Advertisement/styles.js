import {StyleSheet} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: scale(10),
    paddingHorizontal: scale(10),
  },
  titleText: {
    fontSize: scale(16),
    color: '#4D4F5C',
    fontFamily: 'SourceSansPro-Semibold',
  },
  cardContainer: {
    paddingHorizontal: scale(5),
    paddingVertical: scale(10),
    marginBottom: scale(20),
  },
  cardBody: {
    width: scale(120),
    height: scale(190),
    borderRadius: scale(8),
  },
  cardImage: {
    width: scale(100),
    height: scale(100),
    zIndex: 100,
  },
  cardImageContainer: {
    width: scale(120),
    height: scale(121),
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: scale(8),
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
  },
  downloadText: {
    fontSize: scale(12),
    color: '#00000066',
    fontFamily: 'Poppins-Regular',
  },
  appNameText: {
    fontSize: scale(14),
    color: '#000000',
    fontFamily: 'SourceSansPro-Semibold',
  },
});

export default styles;
