import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {HEADER_HEIGHT} from '../CONSTANTS/Sizes';

function Playlist() {
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[
          ' rgba(201,45,253,1) ',
          'rgba(143,46,235,0.9) ',
          'rgba(107,42,210,0.9) ',
          'rgba(125,48,216,1) ',
          'rgba(118,62,255,1) ',
          'rgba(107,42,210,0.9) ',
        ]}
        style={{height: HEADER_HEIGHT / 2}}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      />

      <Text>Playlist</Text>
    </View>
  );
}

export default Playlist;
