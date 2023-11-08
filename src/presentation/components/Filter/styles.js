import {StyleSheet} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    flexGrow: 1,
    paddingHorizontal: scale(10),
    paddingBottom: scale(20),
  },
  title: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(16),
    color: '#4A4A4A',
  },
  radioTitle: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(16),
    color: '#454545',
  },
  errorMessage: {
    fontSize: scale(10),
    fontFamily: 'SourceSansPro-Regular',
    color: 'red',
    marginLeft: scale(5),
  },
  submitButton: {
    height: scale(40),
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
  },
  buttonText: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: scale(16),
    color: '#FFFFFF',
  },
  Label: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(16),
    color: '#4A4A4A',
    marginTop: scale(10),
  },
  dropdown: {
    minHeight: scale(40),
    borderRadius: scale(5),
    borderColor: '#C3D0DE',
    backgroundColor: null,
    marginTop: scale(10),
  },
  monthCalendarView: {
    borderBottomColor: '#00000029',
    borderBottomWidth: 1,
    marginBottom: scale(10),
  },
  monthCalendarText: {
    fontSize: scale(16),
    color: '#4A4A4A',
    fontFamily: 'SourceSansPro-Bold',
  },
});
export default styles;
