import React from 'react';
import { View, TextInput, StyleSheet, StatusBar } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  col_primary,
  col_secondary,
  col_off_white,
  col_white,
} from '../CONSTANTS/Colors';
import { s_search } from '../CONSTANTS/Sinhala';
import {
  //HEADER_HEIGHT,
  STATUS_BAR_HEIGHT,
  HEIGHT,
  WIDTH,
} from '../CONSTANTS/Sizes';
import { useHeaderHeight } from '@react-navigation/stack';




function SearchHeader({ searchFilter, searchText, editable }) {
  const HEADER_HEIGHT = useHeaderHeight();
  return (
    <LinearGradient
      colors={[col_primary, col_secondary]}
      style={{ ...styles.gradient, height: HEADER_HEIGHT - STATUS_BAR_HEIGHT }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <View style={styles.searchContainer}>
        <Icon name="search" color={col_off_white} size={HEIGHT(18)} />
        <TextInput
          editable={editable}
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
}

const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    //height: HEADER_HEIGHT,
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

export default SearchHeader;
