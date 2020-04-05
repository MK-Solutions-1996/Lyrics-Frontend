import React from 'react';
import {View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {HEADER_HEIGHT, STATUS_BAR_HEIGHT, WIDTH} from '../CONSTANTS/Sizes';
import {col_primary, col_secondary} from '../CONSTANTS/Colors';

function Likes() {
  return (
    <View style={{flex: 1}}>
      <LinearGradient
        colors={[col_primary, col_secondary]}
        style={{height: HEADER_HEIGHT - STATUS_BAR_HEIGHT}}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
      />

      <Text>Likes</Text>

      {/* <View
        style={{
          //flex: 1,
          flexDirection: 'column-reverse',
          backgroundColor: 'red',
          alignSelf: 'flex-start',
        }}>
        <LinearGradient
          style={{height: HEADER_HEIGHT - STATUS_BAR_HEIGHT}}
          colors={[
            ' rgba(201,45,253,1) ',
            'rgba(143,46,235,0.9) ',
            'rgba(107,42,210,0.9) ',
            'rgba(125,48,216,1) ',
            'rgba(118,62,255,1) ',
            'rgba(107,42,210,0.9) ',
          ]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
        />
      </View> */}
    </View>
  );
}

export default Likes;
