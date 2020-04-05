import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  FlatList,
  ProgressBarAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
  HEIGHT,
  WIDTH,
  DEVICE_HEIGHT,
  DEVICE_WIDTH,
} from '../CONSTANTS/Sizes';
import {
  col_primary,
  col_secondary,
  col_off_white,
  col_white,
} from '../CONSTANTS/Colors';
import {s_search} from '../CONSTANTS/Sinhala';

import Song_List from '../COMPONENTS/SONG/Song_list';
import {test_song_array} from '../TestData';

const SearchHeader = (searchFilter, searchText) => {
  return (
    <LinearGradient
      colors={[col_primary, col_secondary]}
      style={styles.gradient}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}>
      <View style={styles.searchContainer}>
        <Icon name="search" color={col_off_white} size={HEIGHT(18)} />
        <TextInput
          selectionColor={'red'}
          style={styles.inputSearch}
          placeholder={s_search}
          placeholderTextColor={col_off_white}
          onChangeText={(text) => searchFilter(text)}
          value={searchText}
        />
      </View>
    </LinearGradient>
  );
};

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
      <View>
        <SearchHeader />
        <ProgressBarAndroid />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={songData}
        renderItem={({item, index}) => <Song_List key={item._id} song={item} />}
        ListHeaderComponent={SearchHeader(searchFilter, searchText)}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  gradient: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: HEADER_HEIGHT - STATUS_BAR_HEIGHT,
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: WIDTH(250),
    borderBottomWidth: WIDTH(1),
    borderColor: '#fff',
    marginBottom: HEIGHT(3),
  },

  inputSearch: {
    flex: 1,
    justifyContent: 'center',
    color: col_white,
    letterSpacing: WIDTH(1),

    //borderRadius: 7,
  },
});

export default All_songs;
