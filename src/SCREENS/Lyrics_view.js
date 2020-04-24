import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  ScrollView,
  FlatList
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
  HEIGHT,
  WIDTH,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../CONSTANTS/Sizes';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements';

import {
  col_primary_rgba,
  col_secondary_rgba,
  col_primary, col_secondary,
  col_off_white, col_white, col_black
} from '../CONSTANTS/Colors';

import { im_lyrics_background } from '../CONSTANTS/Imports';
import { s_other_songs } from '../CONSTANTS/Sinhala';

import AudioPlayer from '../COMPONENTS/Audio_player';
import { useSelector, useDispatch } from 'react-redux';
import { release_audio_action } from '../REDUX';


import ZoomableView from '../COMPONENTS/LYRICS_VIEW/Zoomable_view';
import Group_header from '../COMPONENTS/LYRICS_VIEW/Group_header';

import useBackButton from '../HOOKS/useBackButton';
import Solo_header from '../COMPONENTS/LYRICS_VIEW/Solo_header';
import Duet_header from '../COMPONENTS/LYRICS_VIEW/Duet_header';




function Lyrics_view() {

  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch()

  const { songObject, artistArray } = route.params;
  const { _id, type, sinhalaTitle, singlishTitle, audio, song } = songObject;

  const audio_state = useSelector(state => state.audio_reducer);
  const { playingAudio } = audio_state;


  const goBackFunction = () => {
    dispatch(release_audio_action(playingAudio));
    navigation.goBack();
    return true;
  }

  useBackButton(goBackFunction);







  return (
    <View style={styles.container}>
      {
        (type === 'Solo') ? (
          <Solo_header artistArray={artistArray} songObject={songObject} goBackFunction={goBackFunction} />
        ) : (type === 'Duet') ? (
          <Duet_header artistArray={artistArray} songObject={songObject} goBackFunction={goBackFunction} />
        ) : (type === 'Group') && (
          <Group_header artistArray={artistArray} songObject={songObject} goBackFunction={goBackFunction} />
        )
      }

      <ImageBackground style={styles.zoomableContainer} source={im_lyrics_background}>
        <LinearGradient
          colors={['rgba(102,126,234,0.7)', 'rgba(118,75,162,0.7)']}
          style={styles.container}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <View style={styles.zoomableContainer}>
            <ZoomableView lyrics={song} id={_id} />
          </View>
        </LinearGradient>
      </ImageBackground>

    </View>
  );
}




const styles = StyleSheet.create({

  container: {
    flex: 1,
  },

  zoomableContainer: {
    flex: 3,
  }
});

export default React.memo(Lyrics_view);
