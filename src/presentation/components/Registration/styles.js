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
  formTitle: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: scale(25),
    color: '#333246',
  },
  formDetailsTitle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(18),
    color: '#797979',
    marginTop: scale(9),
  },
  form: {
    marginHorizontal: scale(20),
    marginTop: scale(30),
  },
  formInputTitle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(16),
    color: '#24262F',
  },
  inputDis: {
    marginTop: scale(14),
  },
  dropdown: {
    marginTop: scale(5),
    minHeight: scale(40),
    width: scale(100),
    borderRadius: scale(5),
    borderColor: '#C3D0DE',
    paddingVertical: -20,
  },
  checkBoxContent: {
    marginTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorMessage: {
    fontSize: scale(10),
    color: 'red',
    fontFamily: 'SourceSansPro-Regular',
    marginLeft: scale(5),
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: scale(18),
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
