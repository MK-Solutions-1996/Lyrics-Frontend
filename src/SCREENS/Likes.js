import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableNativeFeedback, TouchableOpacity, ToastAndroid } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { STATUS_BAR_HEIGHT, WIDTH, HEIGHT } from '../CONSTANTS/Sizes';
import { col_primary, col_secondary, col_black, col_white } from '../CONSTANTS/Colors';
import Likes_header from '../COMPONENTS/LIKES/Likes_header';
import { useSelector, useDispatch } from 'react-redux';
import { fetch_all_songs_action, fetch_all_artists_action, initiate_select_action } from '../REDUX';
import { s_try_again, s_can_be_a_network_problem } from '../CONSTANTS/Sinhala';
import { LineDotsLoader } from 'react-native-indicator';
import Icon from 'react-native-vector-icons/FontAwesome';
import Like_list from '../COMPONENTS/LIKES/Like_list';



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


const findSong = (likesArray, allSongsArray) => {
  const result = [];
  for (var i = 0; i < likesArray.length; i++) {
    for (var j = 0; j < allSongsArray.length; j++) {
      if (likesArray[i] === allSongsArray[j]._id) {
        result.push(allSongsArray[j]);
      }
    }
  }
  return result;
}


function Likes() {
  const dispatch = useDispatch();

  const { likesArray, selectState, selectedArray } = useSelector(state => state.like_reducer);
  const { artist_loading, artist_error } = useSelector(state => state.artist_reducer);
  const { song_loading, all_songs, song_error } = useSelector(state => state.song_reducer);

  const [likedSongObjectsArray, setLikedSongObjectsArray] = useState([]);


  const loadData = () => {
    dispatch(fetch_all_songs_action());
    dispatch(fetch_all_artists_action());
  }

  useEffect(() => {
    if (!song_loading || !artist_loading) {
      setLikedSongObjectsArray(findSong(likesArray, all_songs));
    }
  }, [likesArray, all_songs, song_loading, artist_loading])


  console.log('selectedArray:', selectedArray)



  if (artist_loading || song_loading) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Likes_header />
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
            <Likes_header />
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
            <Likes_header />
          </View>
          <View style={styles.listContainer}>
            <FlatList
              data={likedSongObjectsArray}
              keyExtractor={item => item._id}
              renderItem={({ item, index }) => <Like_list
                songObject={item} />}
            />
          </View>
        </View>
      );
    }
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    //backgroundColor: 'red'
  },
  listContainer: {
    marginTop: HEIGHT(10),
    flex: 6,
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

export default Likes;
