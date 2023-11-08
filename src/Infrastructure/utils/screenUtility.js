import {Dimensions, Platform} from 'react-native';

const {width, height} = Dimensions.get('window');
const guidelineBaseWidth = Platform.isPad ? 600 : 375;
const guidelineBaseHeight = Platform.isPad ? 1024 : 812;
const scale = size => (width / guidelineBaseWidth) * size;
const verticalScale = size => (height / guidelineBaseHeight) * size;
const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
export {
  guidelineBaseWidth,
  guidelineBaseHeight,
  scale,
  verticalScale,
  moderateScale,
  width,
  height,
};
