import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import TestImage from '../../ASSETS/IMAGES/sanuka.jpg';
import {Avatar} from 'react-native-elements';
import {HEIGHT, WIDTH} from '../../CONSTANTS/Sizes';
import {col_white, col_black, col_off_white} from '../../CONSTANTS/Colors';
import {s_and, s_group_sing} from '../../CONSTANTS/Sinhala';
import {useNavigation} from '@react-navigation/native';
import {im_logo} from '../../CONSTANTS/Imports';

import {test_artist_array} from '../../TestData';

const find_artist_by_id = (artistIdArray) => {
  var result = [];
  for (var i = 0; i < artistIdArray.length; i++) {
    test_artist_array.map((artistObject) => {
      if (artistIdArray[i] === artistObject._id) {
        result.push(artistObject);
      }
    });
  }
  return result;
};

function Song_list({song}) {
  const navigation = useNavigation();
  const {_id, sinhalaTitle, singlishTitle, type, artist} = song;
  var artistArray = find_artist_by_id(artist);

  return (
    <TouchableOpacity>
      <View style={styles.container}>
        {type === 'Solo' ? (
          artistArray[0].image.imageAvailability ? (
            <Avatar
              rounded
              source={{uri: artistArray[0].image.image}}
              size="large"
              overlayContainerStyle={{backgroundColor: col_white}}
              placeholderStyle={{backgroundColor: col_off_white}}
              activeOpacity={0.7}
            />
          ) : (
            <Avatar
              rounded
              source={im_logo}
              size="large"
              overlayContainerStyle={{backgroundColor: col_white}}
              placeholderStyle={{backgroundColor: col_off_white}}
              activeOpacity={0.7}
            />
          )
        ) : type === 'Duet' ? (
          <Avatar
            rounded
            source={im_logo}
            size="large"
            overlayContainerStyle={{backgroundColor: col_white}}
            placeholderStyle={{backgroundColor: col_off_white}}
            activeOpacity={0.7}
          />
        ) : (
          type === 'Group' && (
            <Avatar
              rounded
              source={im_logo}
              size="large"
              overlayContainerStyle={{backgroundColor: col_white}}
              placeholderStyle={{backgroundColor: col_off_white}}
              activeOpacity={0.7}
            />
          )
        )}
        <View style={styles.content}>
          <Text style={styles.sinhalaTitle}>{sinhalaTitle}​</Text>
          <Text style={styles.singlishTitle}>{singlishTitle}</Text>
          {type === 'Solo' ? (
            <Text style={styles.artistName}>{artistArray[0].sinhalaName}</Text>
          ) : type === 'Duet' ? (
            <View style={{flexDirection: 'row'}}>
              {artistArray.map((data, index) => (
                <Text style={styles.artistName}>
                  {index === 0
                    ? `${data.sinhalaName} ${s_and} `
                    : data.sinhalaName}
                </Text>
              ))}
            </View>
          ) : (
            type === 'Group' && (
              <Text style={styles.singlishTitle}>{s_group_sing}</Text>
            )
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: WIDTH(10),
    marginBottom: HEIGHT(5),
    flexDirection: 'row',
    alignItems: 'center',
    //justifyContent: 'center',
    backgroundColor: col_white,
    //height: verticalScale(170),
    //shadowOffset: {width: 10, height: 10},
    shadowColor: col_black,
    shadowOpacity: 5,
    elevation: 5,
    paddingHorizontal: WIDTH(5),
    paddingVertical: WIDTH(5),
    borderRadius: 7,
    overflow: 'hidden',
  },
  content: {
    marginLeft: WIDTH(5),
  },
  sinhalaTitle: {
    fontWeight: 'bold',
  },
  singlishTitle: {
    fontSize: WIDTH(10),
    textTransform: 'uppercase',
  },
  artistName: {
    fontSize: WIDTH(10),
  },
});

export default Song_list;
