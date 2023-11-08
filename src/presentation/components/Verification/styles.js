import {StyleSheet, height} from 'react-native';
import {scale} from '../../../Infrastructure/utils/screenUtility';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    height: height,
  },
  logo: {
    marginLeft: scale(35),
  },
  contains: {
    marginHorizontal: scale(20),
    marginTop: scale(10),
  },
  ProfileName: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: scale(25),
    color: '#333246',
    textTransform: 'capitalize',
  },
  thankyouNote: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(16),
    color: '#333333',
  },
  profileNote: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(18),
    color: '#333333',
  },
  errorMessage: {
    fontSize: scale(10),
    color: 'red',
    fontFamily: 'SourceSansPro-Regular',
    marginLeft: scale(5),
  },
  email: {
    fontFamily: 'SourceSansPro-SemiBold',
    fontSize: scale(18),
    color: '#464646',
  },
  card: {
    backgroundColor: '#EFFAFF',
    padding: 20,
    borderRadius: 5,
    borderColor: '#C6C6C6',
    marginHorizontal: scale(20),
    marginTop: scale(25),
    height: scale(192),
    marginBottom: scale(20),
  },
  cardHeader: {
    fontFamily: 'SourceSansPro-Regular',
    fontSize: scale(16),
    color: '#24262F',
  },
  input: {
    marginTop: scale(5),
    borderRadius: 4,
    borderColor: '#C3D0DE',
    borderWidth: 1,
    height: scale(40),
    fontSize: scale(14),
    fontFamily: 'SourceSansPro-Regular',
    paddingHorizontal: scale(10),
    backgroundColor: '#FFFFFF',
    color: '#4D4F5C',
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: 'SourceSansPro-Bold',
    fontSize: scale(18),
  },
});
export default styles;
