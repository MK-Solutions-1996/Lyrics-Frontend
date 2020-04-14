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





function SearchHeader({ searchFilter, searchText, editable }) {
  return (

    <LinearGradient
      colors={[col_primary, col_secondary]}
      style={{ ...styles.container, backgroundColor: 'blue' }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}>
      <View style={styles.searchContainer}>
        <View style={styles.iconContainer}>
          <Icon name="search" color={col_off_white} size={HEIGHT(18)} />
        </View>
        <View style={styles.inputContainer}>
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
      </View>
    </LinearGradient>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',

  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: WIDTH(10),
    // borderColor: col_off_white,
    // borderBottomWidth: WIDTH(1),


  },

  iconContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },

  inputContainer: {
    flex: 4,
    justifyContent: 'center',
  },

  inputSearch: {
    //flex: 1,
    color: col_white,
    letterSpacing: WIDTH(1),
    fontSize: WIDTH(12),
    height: HEIGHT(50),

  },
});

export default SearchHeader;
