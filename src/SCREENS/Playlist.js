import React from 'react';
import { View, Text, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { STATUS_BAR_HEIGHT, WIDTH } from '../CONSTANTS/Sizes';
import { col_primary, col_secondary } from '../CONSTANTS/Colors';
import { im_logo } from '../CONSTANTS/Imports';
//import { useHeaderHeight } from '@react-navigation/stack';


console.log('https://storage.cloud.google.com/lyrics-server-bucket/logo.png');

function Playlist() {
  //const HEADER_HEIGHT = useHeaderHeight();
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[col_primary, col_secondary]}
        //style={{ height: HEADER_HEIGHT - STATUS_BAR_HEIGHT }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      />

      <Text>Playlist</Text>
      <Image
        style={{ width: 200, height: 200 }}
        source={{ uri: 'https://storage.cloud.google.com/lyrics-server-bucket/logo.png' }}

      />
    </View>
  );
}

export default Playlist;
