import {StyleSheet} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    marginHorizontal: scale(35),
  },
  form: {
    marginHorizontal: scale(20),
    marginTop: scale(20),
  },
  backButton: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(14),
    color: '#00A0DA',
    alignItems: 'center',
    textDecorationLine: 'underline',
  },
  formTitle: {
    fontSize: scale(21),
    color: '#333246',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  content: {
    marginTop: scale(20),
  },
  errorMessage: {
    fontSize: scale(10),
    color: 'red',
    marginLeft: scale(5),
    fontFamily: 'SourceSansPro-Regular',
  },
  buttonText: {
    color: '#FFFFFF',
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
