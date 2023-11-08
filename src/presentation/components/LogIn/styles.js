import {StyleSheet} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logo: {
    marginLeft: scale(35),
  },
  form: {
    marginHorizontal: scale(20),
  },
  content: {
    marginTop: scale(20),
  },
  forgotContent: {
    marginTop: scale(16),
  },
  linkText: {
    textDecorationLine: 'underline',
    fontSize: scale(14),
    color: '#00A0DA',
    fontFamily: 'SourceSansPro-Regular',
  },
  buttonText: {
    color: '#FFFFFF',
  },
  errorMessage: {
    fontSize: scale(10),
    fontFamily: 'SourceSansPro-Regular',
    color: 'red',
    marginLeft: scale(5),
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
  labelText: {
    marginTop: scale(10),
    fontSize: scale(16),
    fontFamily: 'SourceSansPro-Regular',
    color: '#24262F',
  },
  Button: {
    backgroundColor: '#349beb',
    height: scale(40),
    borderRadius: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scale(20),
  },
  Buttontext: {
    color: '#fff',
    fontSize: scale(18),
    fontFamily: 'SourceSansPro-Bold',
  },
  header: {
    color: '#818181',
    fontSize: scale(16),
    fontFamily: 'SourceSansPro-Regular',
    marginLeft: scale(20),
    marginBottom: scale(10),
  },
  registerButton: {
    borderColor: '#00A0DA',
    borderWidth: 1,
    borderRadius: 4,
    width: scale(120),
    height: scale(40),
    marginLeft: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: scale(10),
  },
});
export default styles;
