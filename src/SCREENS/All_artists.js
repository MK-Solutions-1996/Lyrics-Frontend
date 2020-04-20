import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SearchHeader from '../COMPONENTS/SearchHeader';
import { LineDotsLoader } from 'react-native-indicator';
import { col_primary } from '../CONSTANTS/Colors'
import { WIDTH, HEIGHT, DEVICE_WIDTH } from '../CONSTANTS/Sizes'
import Artist_list from '../COMPONENTS/ALL_ARTISTS/Artist_list';
import { test_artist_array } from '../TestData';
import { useSelector, useDispatch } from 'react-redux';


function All_artists() {
  const navigation = useNavigation();

  const artist_state = useSelector(state => state.artist_reducer);

  const {
    artist_loading,
    all_artists,
    artist_error,
  } = artist_state;


  const [searchText, setSearchText] = useState('');
  const [searchArray, setSearchArray] = useState([]);

  useEffect(() => {
    if (!artist_loading) {
      setSearchArray(all_artists);
    }
  }, [artist_loading]);


  const searchFilter = (text) => {
    setSearchText(text);
    const newData = all_artists.filter((item) => {
      const itemData = `${item.sinhalaName} ${item.singlishName} ${item.song}`;
      return itemData.indexOf(text) > -1;
    });
    setSearchArray(newData);
  }


  if (artist_loading) {
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
            renderItem={({ item, index }) => <Artist_list artistObject={item} />}
            keyExtractor={(item) => item._id}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
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
  }
});


export default All_artists;

/*
   <Button title="GO" onPress={() => navigation.push('Single_artist')} />
*/
