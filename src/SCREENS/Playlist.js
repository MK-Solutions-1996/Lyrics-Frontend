import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {HEADER_HEIGHT, STATUS_BAR_HEIGHT, WIDTH} from '../CONSTANTS/Sizes';
import {col_primary, col_secondary} from '../CONSTANTS/Colors';

function Playlist() {
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[col_primary, col_secondary]}
        style={{height: HEADER_HEIGHT - STATUS_BAR_HEIGHT}}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      />

      <Text>Playlist</Text>
    </View>
  );
}

export default Playlist;
