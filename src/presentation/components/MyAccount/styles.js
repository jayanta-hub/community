import {StyleSheet} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    flexGlow: 1,
    backgroundColor: '#fff',
  },
  dropdown: {
    minHeight: scale(40),
    width: '100%',
    borderRadius: scale(5),
    borderColor: '#C3D0DE',
  },
  errorMessage: {
    fontSize: scale(10),
    color: 'red',
  },
  content: {
    flex: 1,
    backgroundColor: '#fff',
    padding: scale(15),
  },
  headerText: {
    fontSize: scale(16),
    color: '#4A4A4A',
    fontFamily: 'SourceSansPro-SemiBold',
  },
  label: {
    fontSize: scale(14),
    color: '#24262F',
    fontFamily: 'SourceSansPro-Light',
    marginTop: scale(10),
  },
  information: {
    fontSize: scale(16),
    color: '#24262F',
    fontFamily: 'SourceSansPro-Regular',
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#00A8DB',
    width: scale(80),
    height: scale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    marginRight: scale(10),
  },
  editButtonText: {
    fontSize: scale(12),
    color: '#00A8DB',
    fontFamily: 'SourceSansPro-Regular',
  },
  editIcon: {
    marginRight: scale(5),
    marginTop: scale(2),
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
    fontSize: scale(14),
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
  },
  Buttontext: {
    color: '#fff',
    fontSize: scale(14),
    fontFamily: 'SourceSansPro-Regular',
  },
  flexDropdown: {
    minHeight: scale(40),
    borderRadius: scale(5),
    borderColor: '#C3D0DE',
    backgroundColor: null,
    marginTop: scale(5),
  },
  formInputTitle: {
    fontSize: scale(14),
    color: '#24262F',
    fontFamily: 'SourceSansPro-Regular',
    marginTop: scale(10),
  },
});
export default styles;
