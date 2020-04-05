import React from 'react';
import {Image, StyleSheet} from 'react-native';
import {im_logo} from '../CONSTANTS/Imports';
import {WIDTH, HEIGHT} from '../CONSTANTS/Sizes';

function Header_image() {
  return <Image style={styles.container} source={im_logo} />;
}

const styles = StyleSheet.create({
  container: {
    width: WIDTH(35),
    height: HEIGHT(35),
    marginLeft: WIDTH(10),
  },
});

export default Header_image;
