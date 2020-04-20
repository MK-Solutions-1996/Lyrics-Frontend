import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { DEVICE_HEIGHT, HEIGHT, WIDTH } from '../../CONSTANTS/Sizes';
import { col_white, col_black, col_primary, col_secondary } from '../../CONSTANTS/Colors';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native'



const MusicIcon = () => {
    return <Icon name="music" style={styles.icon} size={HEIGHT(20)} color={col_secondary} />
}


const find_artist_by_id = (artistIdArray, all_artists) => {
    var result = [];
    for (var i = 0; i < artistIdArray.length; i++) {
        all_artists.map((artistObject) => {
            if (artistIdArray[i] === artistObject._id) {
                result.push(artistObject);
            }
        });
    }
    return result;
};


function Single_artist_song_list({ songObject }) {
    const navigation = useNavigation();
    const { sinhalaTitle, singlishTitle, artist } = songObject;
    const { all_artists } = useSelector(state => state.artist_reducer);

    const artistArray = find_artist_by_id(artist, all_artists);

    return (
        <TouchableNativeFeedback
            onPress={() =>
                navigation.navigate('Lyrics_view', {
                    songObject,
                    artistArray,
                })}>
            <View style={styles.container}>
                <View style={styles.iconConatiner}>
                    <MusicIcon />
                </View>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.sinhalaTitle}>{sinhalaTitle}</Text>
                    <Text numberOfLines={1} style={styles.singlishTitle}>{singlishTitle}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: WIDTH(10),
        marginBottom: HEIGHT(5),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: col_white,
        shadowColor: col_black,
        shadowOpacity: 5,
        elevation: 3,
        paddingVertical: WIDTH(5),
        borderRadius: 7,
        overflow: 'hidden',
    },
    iconConatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    titleContainer: {
        flex: 6,
    },
    sinhalaTitle: {
        fontWeight: 'bold',
        fontSize: HEIGHT(10),
    },
    singlishTitle: {
        fontWeight: 'bold',
        fontSize: HEIGHT(8)
    },
    icon: {
        shadowColor: col_black,
        shadowOpacity: 1,
        textShadowRadius: 4,
        textShadowOffset: { width: 1, height: 2 },
    }

});

export default Single_artist_song_list
