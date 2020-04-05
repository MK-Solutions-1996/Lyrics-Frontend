import {Dimensions, StatusBar} from 'react-native';
const {width, height} = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

export const WIDTH = (size) => (width / guidelineBaseWidth) * size;
export const HEIGHT = (size) => (height / guidelineBaseHeight) * size;
export const HEADER_HEIGHT = HEIGHT(73);
export const STATUS_BAR_HEIGHT = HEIGHT(StatusBar.currentHeight);
export const DEVICE_HEIGHT = height;
export const DEVICE_WIDTH = width;

const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor;
