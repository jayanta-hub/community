import Toast from 'react-native-simple-toast';

export const ToastMessage = message => {
  setTimeout(() => {
    Toast.show(message, Toast.LONG);
  }, 1);
};
