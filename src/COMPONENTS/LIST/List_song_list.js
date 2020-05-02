import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { HEIGHT, WIDTH } from '../../CONSTANTS/Sizes';
import { col_secondary, col_black, col_white } from '../../CONSTANTS/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { list_songList_do_unselect_action, list_songList_do_select_action, list_songList_initiate_select_action } from '../../REDUX';


const MusicIcon = () => {
    return <Icon name="music" style={styles.icon} size={HEIGHT(20)} color={col_secondary} />
}


const checkSongId = (songId, selectedArray) => {
    for (var i = 0; i < selectedArray.length; i++) {
        if (songId === selectedArray[i]) {
            return true;
        }
    }
    return false;
}

function List_song_list({ songObject }) {
    const dispatch = useDispatch();
    const { _id, sinhalaTitle, singlishTitle } = songObject;
    const {
        listArray,
        songId,
        listSelectState,
        listSelectArray,
        listSelectAll,
        listOpenObject,
        listsongListSelectState,
        listSongListSelectArray,
        listSongListSelectAll
    } = useSelector(state => state.list_reducer);



    const isExist = checkSongId(_id, listSongListSelectArray);
    console.log('listSongListSelectArray:', listSongListSelectArray);
    console.log('isExist:', isExist);


    const onPress = () => {
        if (listsongListSelectState) {
            if (isExist) {
                dispatch(list_songList_do_unselect_action(_id))
            }
            else {
                dispatch(list_songList_do_select_action(_id));
            }
        }
        else {
            console.log('go to lyricsView');
        }
    }


    return (
        <TouchableNativeFeedback
            onPress={() => onPress()}
            onLongPress={() => dispatch(list_songList_initiate_select_action(_id))}
        >
            <View style={{
                ...styles.container,
                //backgroundColor: col_white,
                //elevation: 3
                backgroundColor: (isExist) ? 'rgba(0,0,0,0.5)' : col_white,
                elevation: (isExist) ? 0 : 3
            }}>
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
export default List_song_list
