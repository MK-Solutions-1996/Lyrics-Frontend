import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, KeyboardAvoidingView, TouchableNativeFeedback } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import Single_artist_header from '../COMPONENTS/SINGLE_ARTIST/Single_artist_header';
import { useSelector } from 'react-redux';
import Single_artist_song_list from '../COMPONENTS/SINGLE_ARTIST/Single_artist_song_list';
import { HEIGHT } from '../CONSTANTS/Sizes';
import SearchHeader from '../COMPONENTS/SearchHeader';


const get_all_songs_of_single_artist = (artistId, allSongs) => {
  const result = [];
  for (var i = 0; i < allSongs.length; i++) {
    var artistArray = allSongs[i].artist;
    for (var j = 0; j < artistArray.length; j++) {
      if (artistId === artistArray[j]) {
        result.push(allSongs[i]);
      }
    }
  }

  // for (var i = 0; i < allSongs.length; i++) {
  //   var artistArray = allSongs[i].artist;
  //   if (artistId === artistArray[0]) {
  //     result.push(allSongs[i]);
  //   }
  // }
  return result;
}

function Single_artist() {
  const navigation = useNavigation();
  const route = useRoute();

  const { artistObject } = route.params;
  const { _id } = artistObject;

  const { all_songs } = useSelector(state => state.song_reducer);





  //const [songsSet, setSongsSet] = useState([]);
  var songsSet = get_all_songs_of_single_artist(_id, all_songs);
  const [searchText, setSearchText] = useState('');
  const [searchArray, setSearchArray] = useState(songsSet);



  const searchFilter = (text) => {
    setSearchText(text);
    const newData = songsSet.filter((item) => {
      const itemData = `${item.singlishTitle} ${item.sinhalaTitle} ${item.song}`;
      return itemData.indexOf(text) > -1;
    });
    setSearchArray(newData);
  }


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.artistHeader}>
          <Single_artist_header
            artistObject={artistObject}

          />
        </View>
        <View style={styles.searchHeader}>
          <SearchHeader
            editable={true}
            search_text={searchText}
            search_action={searchFilter}
          />
        </View>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={searchArray}
          renderItem={({ item, index }) => <Single_artist_song_list key={item._id} songObject={item} />}
        />
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 1,

  },
  artistHeader: {
    flex: 3
  },
  searchHeader: {
    flex: 1
  },

  listContainer: {
    marginVertical: HEIGHT(5),
    flex: 2
  }
});

export default Single_artist;
