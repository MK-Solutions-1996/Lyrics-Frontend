import React, { useState } from 'react';
import { View, StyleSheet, FlatList, ProgressBarAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { HEIGHT, WIDTH } from '../CONSTANTS/Sizes';

import Song_List from '../COMPONENTS/SONG/Song_list';
import { test_song_array } from '../TestData';

import SearchHeader from '../COMPONENTS/SearchHeader';

import { MusicBarLoader } from 'react-native-indicator';
import { col_primary } from '../CONSTANTS/Colors';

function All_songs() {
  const navigation = useNavigation();
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
    <View style={styles.container}>
      <SearchHeader
        searchFilter={searchFilter}
        searchText={searchText}
        editable={true}
      />
      <View style={styles.listContainer}>
        <FlatList
          data={songData}
          renderItem={({ item, index }) => (
            <Song_List key={item._id} songObject={item} />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    marginTop: HEIGHT(5),
  },
  loadingContainer: {
    flex: 1,

    // backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
});

export default All_songs;
