import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, KeyboardAvoidingView, ToastAndroid, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchHeader from '../COMPONENTS/SearchHeader';
import { LineDotsLoader } from 'react-native-indicator';
import { col_primary, col_secondary, col_white, col_black } from '../CONSTANTS/Colors'
import { WIDTH, HEIGHT, DEVICE_WIDTH } from '../CONSTANTS/Sizes'
import Artist_list from '../COMPONENTS/ALL_ARTISTS/Artist_list';
import { test_artist_array } from '../TestData';
import { useSelector, useDispatch } from 'react-redux';
import { s_try_again, s_can_be_a_network_problem } from '../CONSTANTS/Sinhala';
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  fetch_all_songs_action,
  fetch_all_artists_action
} from '../REDUX';

const showToastMessage = () => {
  ToastAndroid.show(
    s_can_be_a_network_problem,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
  );
};


const ExclamationIcon = () => {
  return <Icon name="exclamation-circle" color={col_secondary} style={styles.icon} size={WIDTH(20)} />
}

function All_artists() {
  const dispatch = useDispatch();
  const { artist_loading, all_artists, artist_error } = useSelector(state => state.artist_reducer);
  const { song_loading, song_error } = useSelector(state => state.song_reducer);


  const [searchText, setSearchText] = useState('');
  const [searchArray, setSearchArray] = useState([]);

  useEffect(() => {
    if (!artist_loading) {
      setSearchArray(all_artists);
    }
  }, [artist_loading]);


  const loadData = () => {
    dispatch(fetch_all_songs_action());
    dispatch(fetch_all_artists_action());
  }

  const searchFilter = (text) => {
    setSearchText(text);
    const newData = all_artists.filter((item) => {
      const itemData = `${item.sinhalaName} ${item.singlishName} ${item.song}`;
      return itemData.indexOf(text) > -1;
    });
    setSearchArray(newData);
  }


  if (artist_loading || song_loading) {
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
    )
  }

  else {
    if (artist_error === "error" || song_error === "error") {
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
          <View style={styles.container}>
            <SearchHeader
              editable={true}
              search_action={searchFilter}
              search_text={searchText}
            />
            <View style={styles.listContainer}>
              <FlatList
                numColumns={3}
                scrollEnabled={true}
                contentContainerStyle={styles.flatlist}
                data={searchArray}
                renderItem={({ item, index }) => <Artist_list key={item._id} artistObject={item} />}
                keyExtractor={(item) => item._id}
              />
            </View>
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
  loader: {
    flex: 8,
    alignItems: 'center',
    marginTop: HEIGHT(5),
  },
  listContainer: {
    flex: 8,
  },
  flatlist: {
    width: DEVICE_WIDTH,
    alignItems: 'center',
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


export default All_artists;

/*
   <Button title="GO" onPress={() => navigation.push('Single_artist')} />
*/
