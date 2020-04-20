import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, ProgressBarAndroid, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HEIGHT, WIDTH, DEVICE_WIDTH, DEVICE_HEIGHT } from '../CONSTANTS/Sizes';
import SongList from '../COMPONENTS/ALL_SONGS/Song_list';

import { test_song_array } from '../TestData';
import SearchHeader from '../COMPONENTS/SearchHeader';
import { MusicBarLoader } from 'react-native-indicator';
import { col_primary } from '../CONSTANTS/Colors';


import { useDispatch, useSelector } from 'react-redux';
import {
  fetch_all_songs_action,
  fetch_all_artists_action,

} from '../REDUX';

function All_songs() {
  const dispatch = useDispatch();
  const song_state = useSelector(state => state.song_reducer);

  const {
    song_loading,
    all_songs,
    song_error } = song_state;

  const [searchText, setSearchText] = useState('');
  const [searchArray, setSearchArray] = useState([]);


  useEffect(() => {
    dispatch(fetch_all_songs_action());
    dispatch(fetch_all_artists_action());
  }, []);

  useEffect(() => {
    if (!song_loading) {
      setSearchArray(all_songs);
    }
  }, [song_loading]);


  const searchFilter = (text) => {
    setSearchText(text);
    const newData = all_songs.filter((item) => {
      const itemData = `${item.singlishTitle} ${item.sinhalaTitle} ${item.song}`;
      return itemData.indexOf(text) > -1;
    });
    setSearchArray(newData);
  }




  if (song_loading) {
    return (
      <View style={styles.container}>
        <SearchHeader editable={false} />
        <View style={styles.loader}>
          <MusicBarLoader
            barHeight={HEIGHT(40)}
            betweenSpace={WIDTH(10)}
            color={col_primary}
          />
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      enabled
      style={styles.container}
      behavior="height"
    >

      <View style={styles.headerContainer}>
        <SearchHeader
          editable={true}
          search_text={searchText}
          search_action={searchFilter}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          scrollEnabled={true}
          data={searchArray}
          renderItem={({ item, index }) => (
            <SongList key={item._id} songObject={item} />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    //backgroundColor: 'red'
  },
  listContainer: {
    flex: 8,
    marginTop: HEIGHT(5),

  },
  loadingContainer: {
    flex: 1,
  },
  loader: {
    flex: 8,
    alignItems: 'center',
    marginTop: HEIGHT(5),
  },
});

export default React.memo(All_songs);
