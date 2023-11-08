import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/application/store';
import {AuthContext} from './src/Infrastructure/utils/context';
import SplashComponent from './src/Infrastructure/component/SplashScreen/SplashScreen';
import {
  setLogin,
  setAuthToken,
  getAuthToken,
  getAuthTokenExpiry,
  setAuthTokenExpiry,
  setLoginID,
  setCompanyId,
} from './src/Infrastructure/utils/storageUtility';
import AuthNavigator from './src/Infrastructure/navigation/AuthNavigator';
import DrawerNavigator from './src/Infrastructure/navigation/DrawerNavigator';
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(false);
  const [spalshTime, setSplashTime] = useState(true);
  const authContext = React.useMemo(
    () => ({
      signIn: () => {
        setIsLoading(true);
        setLogin(true);
      },
      signOut: () => {
        setUserToken(false);
        setIsLoading(false);
        setAuthToken('');
        setLogin(false);
        setAuthTokenExpiry('');
        setLoginID('');
        setCompanyId('');
      },
    }),
    [],
  );
  const checkLoginStatus = React.useMemo(async () => {
    const token = await getAuthToken();
    const tokenEx = await getAuthTokenExpiry();
    const expirationTime = tokenEx * 1000 - 60000;
    let currDate = Date.now();
    if (expirationTime < currDate) {
      setUserToken('');
      setIsLoading(false);
      setAuthToken('');
    } else {
      setIsLoading(false);
      setUserToken(token);
    }
  }, []);
  useEffect(() => {
    checkLoginStatus;
  }, []);
  useEffect(() => {
    setTimeout(() => {
      setSplashTime(false);
    }, 2000);
  }, []);
  if (spalshTime) {
    return (
      <NavigationContainer>
        <SplashComponent />
      </NavigationContainer>
    );
  }
  return (
    <>
      <Provider store={store}>
        <AuthContext.Provider value={authContext}>
          <NavigationContainer>
            {userToken || true ? <DrawerNavigator /> : <AuthNavigator />}
          </NavigationContainer>
        </AuthContext.Provider>
      </Provider>
    </>
  );
};
export default App;
