import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ProgressBarAndroid, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HEIGHT, WIDTH, DEVICE_WIDTH, DEVICE_HEIGHT } from '../CONSTANTS/Sizes';
import SongList from '../COMPONENTS/ALL_SONGS/Song_list';

import { test_song_array } from '../TestData';
import SearchHeader from '../COMPONENTS/SearchHeader';
import { MusicBarLoader } from 'react-native-indicator';
import { col_primary } from '../CONSTANTS/Colors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


function All_songs() {

  const [searchText, setSearchText] = useState('');
  const [songData, setSongData] = useState(test_song_array);

  const songs_loading = false;
  const searchFilter = (text) => {
    setSearchText(text);
    const newData = test_song_array.filter((item) => {
      const itemData = `${item.singlishTitle} ${item.sinhalaTitle} ${item.song}`;

      return itemData.indexOf(text) > -1;
    });
    setSongData(newData);
  };

  if (songs_loading) {
    return (
      <View style={styles.loadingContainer}>
        <SearchHeader editable={false} />
        <View style={styles.loader}>
          <MusicBarLoader
            barHeight={HEIGHT(40)}
            betweenSpace={WIDTH(5)}
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
    //behavior="padding"
    //enableResetScrollToCoords={true}

    //scrollEnabled={false}
    >
      {/* <View style={styles.container}> */}
      <View style={styles.headerContainer}>
        <SearchHeader
          searchFilter={searchFilter}
          searchText={searchText}
          editable={true}
        />
      </View>
      <View style={styles.listContainer}>
        <FlatList
          scrollEnabled={true}
          data={songData}
          renderItem={({ item, index }) => (
            <SongList key={item._id} songObject={item} />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
      {/* </View> */}
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
    flex: 1,
    alignItems: 'center',
  },
});

export default All_songs;
