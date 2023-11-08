import {StyleSheet, Dimensions} from 'react-native';
import {scale} from '../../utils/screenUtility';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000040',
  },
  modalView: {
    margin: scale(20),
    borderRadius: scale(5),
    shadowOpacity: scale(0.25),
    shadowRadius: scale(4),
    backgroundColor: '#ffff',
    padding: scale(20),
  },
  headerText: {
    color: '#4D4F5C',
    fontSize: scale(16),
    fontFamily: 'SourceSansPro-SemiBold',
  },
  dashedLine: {
    borderWidth: scale(0.6),
    borderStyle: 'solid',
    borderColor: '#CCD5E6',
    marginVertical: scale(10),
  },
  labelText: {
    color: '#4D4F5C',
    fontSize: scale(16),
    fontFamily: 'SourceSansPro-Regular',
  },
  radioTitle: {
    color: '#4D4F5C',
    fontSize: scale(14),
    fontFamily: 'SourceSansPro-Regular',
  },
  button: {
    backgroundColor: '#10A0DA',
    borderRadius: scale(4),
    height: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(20),
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: scale(16),
    fontFamily: 'SourceSansPro-SemiBold',
  },
});

export default styles;
