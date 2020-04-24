import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  TouchableNativeFeedback,
  Text,
  ToastAndroid,
  TouchableOpacity
} from 'react-native';
import { HEIGHT, WIDTH } from '../CONSTANTS/Sizes';
import SongList from '../COMPONENTS/ALL_SONGS/Song_list';

import SearchHeader from '../COMPONENTS/SearchHeader';
import { LineDotsLoader } from 'react-native-indicator';


import { col_primary, col_secondary, col_white, col_black } from '../CONSTANTS/Colors';


import { useDispatch, useSelector } from 'react-redux';
import {
  fetch_all_songs_action,
  fetch_all_artists_action,
  fetch_likes_action,
  fetch_list_action
} from '../REDUX';
import { s_try_again, s_can_be_a_network_problem } from '../CONSTANTS/Sinhala';
import Icon from 'react-native-vector-icons/FontAwesome'




const ExclamationIcon = () => {
  return <Icon name="exclamation-circle" color={col_secondary} style={styles.icon} size={WIDTH(20)} />
}

const showToastMessage = () => {
  ToastAndroid.show(
    s_can_be_a_network_problem,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
  );
};


function All_songs() {

  const dispatch = useDispatch();
  const { song_loading, all_songs, song_error } = useSelector(state => state.song_reducer);
  const { artist_loading, artist_error } = useSelector(state => state.artist_reducer);


  const [searchText, setSearchText] = useState('');
  const [searchArray, setSearchArray] = useState([]);


  const loadData = () => {
    dispatch(fetch_all_songs_action());
    dispatch(fetch_all_artists_action());
    dispatch(fetch_likes_action())
    dispatch(fetch_list_action());
  }

  useEffect(() => {
    loadData();
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


  if (song_loading || artist_loading) {
    return (
      <View style={styles.container}>
        <SearchHeader editable={false} />
        <View style={styles.loader}>
          <LineDotsLoader
            size={WIDTH(5)}
            color={col_primary}
            dotsNumer={5}
            betweenSpace={WIDTH(5)}
          />
        </View>
      </View>
    );
  }
  else {
    if (song_error === "error" || artist_error === "error") {
      return (
        <View style={styles.container}>
          <SearchHeader editable={false} />
          <View style={styles.reloadButtonContainer}>
            <TouchableNativeFeedback onPress={() => loadData()}>
              <View style={styles.reloadButton}>
                <Text style={styles.reloadText}>{s_try_again}</Text>
              </View>
            </TouchableNativeFeedback>
            <TouchableOpacity onPress={() => showToastMessage()}>
              <ExclamationIcon />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    else {
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
              renderItem={({ item, index }) => <SongList key={item._id} songObject={item} />}
              keyExtractor={(item) => item._id}
            />
          </View>
        </KeyboardAvoidingView>
      );
    }
  }

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
  reloadButtonContainer: {
    flex: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: HEIGHT(5),
  },
  reloadButton: {
    borderRadius: WIDTH(5),
    backgroundColor: col_secondary,
    shadowColor: col_black,
    shadowOpacity: 0.5,
    elevation: 5
  },
  reloadText: {
    color: col_white,
    fontSize: WIDTH(12),
    fontWeight: 'bold',
    marginHorizontal: WIDTH(5),
    marginVertical: HEIGHT(5)
  },
  icon: {
    shadowColor: col_black,
    shadowOpacity: 1,
    textShadowRadius: 4,
    textShadowOffset: { width: 1, height: 2 },
    marginLeft: WIDTH(5)
  }
});

export default React.memo(All_songs);
