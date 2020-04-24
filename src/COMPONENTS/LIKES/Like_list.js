import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { HEIGHT, WIDTH } from '../../CONSTANTS/Sizes';
import { col_secondary, col_white, col_black } from '../../CONSTANTS/Colors';
import { useDispatch, useSelector } from 'react-redux';

import {
    like_do_unselect_action,
    like_do_select_action,
    like_initiate_select_action
} from '../../REDUX';
import { useNavigation } from '@react-navigation/native';



const HeartIcon = () => {
    return <Icon name="heart" size={HEIGHT(20)} color={col_secondary} />
}


const checkExist = (id, selectedArray) => {
    //console.log('working');
    var result = false;
    for (var i = 0; i < selectedArray.length; i++) {
        if (id === selectedArray[i]) {

            result = true;
        }
    }
    return result;
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


function Like_list({ songObject, }) {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const { selectState, selectedArray } = useSelector(state => state.like_reducer);
    const { all_artists } = useSelector(state => state.artist_reducer);
    const { _id, sinhalaTitle, singlishTitle, artist } = songObject;


    const isExist = checkExist(_id, selectedArray);

    const artistArray = find_artist_by_id(artist, all_artists);


    const onPress = () => {
        if (selectState) {
            if (isExist) {
                return dispatch(like_do_unselect_action(_id));
            }
            else {
                return dispatch(like_do_select_action(_id));
            }
        }
        else {

            navigation.navigate('Lyrics_view', { songObject, artistArray })

        }
    }

    return (
        <TouchableNativeFeedback
            onPress={() => onPress()}
            onLongPress={() => dispatch(like_initiate_select_action(_id))}>
            <View style={{
                ...styles.container,
                backgroundColor: (isExist) ? 'rgba(0,0,0,0.5)' : col_white,
                elevation: (isExist) ? 0 : 3
            }}>
                <View style={styles.iconConatiner}>
                    <HeartIcon />
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
        shadowColor: col_black,
        shadowOpacity: 0.5,
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

export default Like_list
