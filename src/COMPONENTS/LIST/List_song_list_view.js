import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { col_primary, col_white, col_secondary } from '../../CONSTANTS/Colors';
import { useSelector } from 'react-redux';
import List_song_list from './List_song_list';
import { HEIGHT } from '../../CONSTANTS/Sizes';
import LinearGradient from 'react-native-linear-gradient';
import { list_songList_cancel_select_action, list_songList_delete_select_action, list_songList_all_select_action, list_songList_all_unselect_action } from '../../REDUX';
import Activity_bar from '../Activity_bar';



const findSongs = (songList, allSongsArray) => {
    var result = [];



    for (var i = 0; i < songList.length; i++) {
        for (var j = 0; j < allSongsArray.length; j++) {
            if (songList[i] === allSongsArray[j]._id) {
                result.push(allSongsArray[j])
            }
        }
    }

    return result;
}

function List_song_list_view() {
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

    const { all_songs } = useSelector(state => state.song_reducer);

    const [songArray, setSongArray] = useState([]);


    useEffect(() => {
        if (!(typeof (listOpenObject.songList) === "undefined")) {
            setSongArray(findSongs(listOpenObject.songList, all_songs));
        }
    }, [listOpenObject])


    if (listOpenObject) {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={[col_primary, col_secondary]}
                    style={styles.listNameContainer}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    {
                        (listsongListSelectState) ?
                            (
                                <Activity_bar
                                    allSelectState={listSongListSelectAll}
                                    cancel_select={list_songList_cancel_select_action}
                                    delete_select={list_songList_delete_select_action}
                                    select_all={list_songList_all_select_action}
                                    unselect_all={list_songList_all_unselect_action}
                                />
                            ) :
                            (
                                <Text style={styles.listName}>{listOpenObject.listName}</Text>
                            )
                    }
                    {/* <View style={styles.listNameContainer}> */}


                    {/* </View> */}
                </LinearGradient>
                <View style={styles.songListContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={songArray}
                        keyExtractor={item => item._id}
                        renderItem={({ item, index }) => <List_song_list key={item._id} songObject={item} />}
                    />
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listNameContainer: {
        flex: 1,
        backgroundColor: col_primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    songListContainer: {
        flex: 10,
        marginVertical: HEIGHT(10)
    },
    listName: {
        fontSize: HEIGHT(12),
        fontWeight: 'bold',
        color: col_white
    },
});

export default List_song_list_view
