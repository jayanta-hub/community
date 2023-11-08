import AsyncStorage from '@react-native-async-storage/async-storage';
let jwt_decode = require('jwt-decode');
export const setLogin = async value => {
  console.log('loggin in store func = ', value);
  try {
    await AsyncStorage.setItem('@isLoggedIn', JSON.stringify(value));
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getLogin = async () => {
  try {
    const value = await AsyncStorage.getItem('@isLoggedIn');
    console.log('get async login = ', value);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setAuthToken = async value => {
  console.log('token in store func = ', value);
  try {
    await AsyncStorage.setItem('@authToken', JSON.stringify(value));
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getAuthToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@authToken');
    console.log('get async getAuthToken = ', value);
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};
export const setUserInfo = async value => {
  console.log('UserInfo asyncStore = ', value);
  try {
    await AsyncStorage.setItem('@UserInfo', JSON.stringify(value));
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getUserInfo = async () => {
  try {
    const value = await AsyncStorage.getItem('@UserInfo');
    console.log('get UserInfo asyncstore = ', value);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setBeneficiaryUserID = async value => {
  console.log('set BeneficiaryID asyncStore = ', value);
  try {
    await AsyncStorage.setItem('@BeneficiaryID', JSON.stringify(value));
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getBeneficiaryUserID = async () => {
  try {
    const value = await AsyncStorage.getItem('@BeneficiaryID');
    console.log('get BeneficiaryID asyncstore = ', JSON.parse(value));
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setBeneficiaryDetails = async value => {
  console.log('BeneficiaryDetails asyncStore = ', JSON.stringify(value));
  try {
    await AsyncStorage.setItem('@BeneficiaryDetails', JSON.stringify(value));
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getBeneficiaryDetails = async () => {
  try {
    const value = await AsyncStorage.getItem('@BeneficiaryDetails');
    console.log('get BeneficiaryDetails asyncstore = ', value);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setCompanyId = async value => {
  console.log('company in store func = ', value);
  try {
    await AsyncStorage.setItem('@companyId', JSON.stringify(value));
  } catch (e) {
    console.log('saving error: ', e);
  }
};
export const getCompanyId = async () => {
  try {
    const value = await AsyncStorage.getItem('@companyId');
    console.log('get companyId async login = ', value);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setAttorneyId = async value => {
  console.log('attorneyId in store func = ', value);
  try {
    await AsyncStorage.setItem('@attorneyId', JSON.stringify(value));
  } catch (e) {
    console.log('saving error: ', e);
  }
};
export const getAttorneyId = async () => {
  try {
    const value = await AsyncStorage.getItem('@attorneyId');
    console.log('get attorneyId async login = ', value);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setAuthSurveyId = async value => {
  console.log('setSurveyId in store func = ', value);
  try {
    await AsyncStorage.setItem('@surveyId', JSON.stringify(value));
  } catch (e) {
    console.log('saving error: ', e);
  }
};
export const getAuthSurveyId = async () => {
  try {
    const value = await AsyncStorage.getItem('@surveyId');
    console.log('get async getSurveyId = ', JSON.parse(value));
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setreferralCompanyId = async value => {
  console.log('ReferralCompanyId in store func = ', value);
  try {
    await AsyncStorage.setItem('@referralCompanyId', JSON.stringify(value));
  } catch (e) {
    console.log('saving error: ', e);
  }
};
export const getreferralCompanyId = async () => {
  try {
    const value = await AsyncStorage.getItem('@referralCompanyId');
    console.log('get company async login Referral = ', value);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setAuthTokenExpiry = async value => {
  const {exp} = await jwt_decode(value);
  console.log('exp--', exp);
  try {
    await AsyncStorage.setItem('@authTokenExpiry', JSON.stringify(exp));
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};
export const getAuthTokenExpiry = async () => {
  try {
    const value = await AsyncStorage.getItem('@authTokenExpiry');
    console.log('get async getAuthTokenExpiry = ', value);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setUserFName = async value => {
  // const {exp} = await jwt_decode(value);
  console.log('value--', value);
  try {
    await AsyncStorage.setItem('@firstName', value);
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getUserFName = async () => {
  try {
    const value = await AsyncStorage.getItem('@firstName');
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setUserLName = async value => {
  // const {exp} = await jwt_decode(value);
  console.log('value--', value);
  try {
    await AsyncStorage.setItem('@lastName', value);
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getUserLName = async () => {
  try {
    const value = await AsyncStorage.getItem('@lastName');
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setUserEmail = async value => {
  // const {exp} = await jwt_decode(value);
  console.log('asyc email value--', value);
  try {
    await AsyncStorage.setItem('@userEmail', value);
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getUserEmail = async () => {
  try {
    const value = await AsyncStorage.getItem('@userEmail');
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setUserType = async value => {
  console.log('userType-----', value);
  try {
    await AsyncStorage.setItem('@userType', value);
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getUserType = async () => {
  try {
    const value = await AsyncStorage.getItem('@userType');
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setBeneficiaryType = async value => {
  console.log('BeneficaryMOC-----', value);
  try {
    await AsyncStorage.setItem('@BeneficaryMOC', value);
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getBeneficiaryType = async () => {
  try {
    const value = await AsyncStorage.getItem('@BeneficaryMOC');
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setUserID = async value => {
  try {
    await AsyncStorage.setItem('@userID', JSON.stringify(value));
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getUserID = async () => {
  try {
    const value = await AsyncStorage.getItem('@userID');
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setLogInFirst = async value => {
  try {
    await AsyncStorage.setItem('@isLogingFirst', JSON.stringify(value));
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getLogInFirst = async () => {
  try {
    const value = await AsyncStorage.getItem('@isLogingFirst');
    if (value !== null) {
      // value previously stored
      return JSON.parse(value);
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setVisaStampingStatus = async value => {
  try {
    await AsyncStorage.setItem('@visaStampingStatus', JSON.stringify(value));
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getVisaStampingStatus = async () => {
  try {
    const value = await AsyncStorage.getItem('@visaStampingStatus');
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};

export const setLoginID = async value => {
  try {
    await AsyncStorage.setItem('@loginID', value);
  } catch (e) {
    console.log('saving error: ', e);
    // saving error
  }
};

export const getLoginID = async () => {
  try {
    const value = await AsyncStorage.getItem('@loginID');
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (e) {
    console.log('retrive error: ', e);
  }
};
