import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ToastAndroid, TouchableNativeFeedback, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { STATUS_BAR_HEIGHT, WIDTH, HEIGHT, DEVICE_HEIGHT } from '../CONSTANTS/Sizes';
import { col_primary, col_secondary, col_black, col_white } from '../CONSTANTS/Colors';
import { im_logo } from '../CONSTANTS/Imports';
import Icon from 'react-native-vector-icons/FontAwesome';
import { s_can_be_a_network_problem, s_try_again } from '../CONSTANTS/Sinhala';
import { fetch_all_songs_action, fetch_all_artists_action } from '../REDUX';
import { useDispatch, useSelector } from 'react-redux';
import { LineDotsLoader } from 'react-native-indicator';
import List_header from '../COMPONENTS/LIST/List_header';
import List_new_listName_modal from '../COMPONENTS/LIST/List_new_listName_modal';
import List_list from '../COMPONENTS/LIST/List_list';
import Activity_bar from '../COMPONENTS/Activity_bar';
import List_song_list_view from '../COMPONENTS/LIST/List_song_list_view';



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


function List() {

  const dispatch = useDispatch();
  const { artist_loading, artist_error } = useSelector(state => state.artist_reducer);
  const { song_loading, all_songs, song_error } = useSelector(state => state.song_reducer);
  const {
    listArray,
    songId,
    listSelectState,
    listSelectArray,
    listSelectAll,

  } = useSelector(state => state.list_reducer);


  const loadData = () => {
    dispatch(fetch_all_songs_action());
    dispatch(fetch_all_artists_action());
  }

  useEffect(() => {
    if (!song_loading || !artist_loading) {
      //setLikedSongObjectsArray(findSong(likesArray, all_songs));
    }
  }, [all_songs, song_loading, artist_loading])



  if (artist_loading || song_loading) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <List_header />
        </View>
        <View style={styles.loader}>
          <LineDotsLoader
            size={WIDTH(5)}
            color={col_primary}
            dotsNumer={5}
            betweenSpace={WIDTH(5)}
          />
        </View>
      </View>
    )
  }
  else {
    if (artist_error === "error" || song_error === "error") {
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <List_header />
          </View>
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
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <List_header />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.listContainer}>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={listArray}
                keyExtractor={item => item.listName}
                renderItem={({ item, index }) => <List_list key={item.listName} listObject={item} index={index} />}
              />
            </View>

            <View style={styles.bottomContainer}>
              <List_song_list_view />
            </View>
          </View>

          <List_new_listName_modal />
        </View>
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
  },
  contentContainer: {
    flex: 6,
    //backgroundColor: 'red'
  },
  listContainer: {
    flex: 1,
    //justifyContent: 'center'
    //backgroundColor: 'yellow'
  },

  bottomContainer: {
    flex: 2,
    //backgroundColor: 'blue'
  },


  loader: {
    flex: 6,
    alignItems: 'center',
    marginTop: HEIGHT(5),
  },
  reloadButtonContainer: {
    flex: 6,
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

export default List;
