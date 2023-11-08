import {StyleSheet} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    alignItems: 'center',
    marginLeft: scale(35),
  },
  form: {
    marginHorizontal: scale(50),
    marginTop: scale(20),
  },
  formTitle: {
    fontSize: scale(18),
    color: '#333246',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  formDetailsTitle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(16),
    color: '#797979',
  },
  errorMessage: {
    fontSize: scale(10),
    color: 'red',
    fontFamily: 'SourceSansPro-Regular',
    marginLeft: scale(5),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(18),
    fontFamily: 'SourceSansPro-SemiBold',
  },
  TextInput: {
    marginTop: scale(5),
    borderRadius: 4,
    borderColor: '#C3D0DE',
    borderWidth: 1,
    height: scale(40),
    fontSize: scale(14),
    fontFamily: 'SourceSansPro-Regular',
    paddingHorizontal: scale(10),
    color: '#4D4F5C',
  },
});
export default styles;
