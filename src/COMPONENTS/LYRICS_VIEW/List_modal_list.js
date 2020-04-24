import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableNativeFeedback, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { HEIGHT, DEVICE_HEIGHT, WIDTH } from '../../CONSTANTS/Sizes';
import { col_black, col_off_white, col_primary, col_secondary, col_secondary_rgba, col_primary_rgba } from '../../CONSTANTS/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { list_remove_song_action, list_add_song_action, list_do_select_action, list_initiate_select_action, list_do_unselect_action } from '../../REDUX';


const FolderPlusIcon = () => {
    return <Icon name="folder-plus" size={(DEVICE_HEIGHT * 0.3) / 3} color={'rgba(102,126,234,0.5)'} style={styles.icon} />
}

const FolderMinusIcon = () => {
    return <Icon name="folder-minus" size={(DEVICE_HEIGHT * 0.3) / 3} color={'rgba(102,126,234,0.8)'} style={styles.icon} />
}


const checkSongExist = (songId, listName, listArray) => {
    for (var i = 0; i < listArray.length; i++) {
        if (listName === listArray[i].listName) {
            const songListArray = listArray[i].songList;
            for (var j = 0; j < songListArray.length; j++) {
                if (songId === songListArray[j]) {
                    return true
                }
            }
        }
    }
    return false;
}

const checkListNameExist = (listName, listSelectArray) => {
    for (var i = 0; i < listSelectArray.length; i++) {
        if (listSelectArray[i] === listName) {
            return true;
        }
    }
    return false;
}

function List_modal_list({ listObject }) {
    const { listName } = listObject;
    const dispatch = useDispatch();

    const {
        listArray,
        songId,
        listSelectState,
        listSelectArray,
        listSelectAll
    } = useSelector(state => state.list_reducer);

    const isSongExist = checkSongExist(songId, listName, listArray);
    const isListNameExist = checkListNameExist(listName, listSelectArray);

    //console.log('isSongExist:', isSongExist);

    const onPress = () => {
        if (listSelectState) {
            if (isListNameExist) {
                dispatch(list_do_unselect_action(listName));
            }
            else {
                dispatch(list_do_select_action(listName));
            }
        }
        else {
            if (isSongExist) {
                dispatch(list_remove_song_action(songId, listName, listArray))
            }
            else {
                dispatch(list_add_song_action(songId, listName, listArray))
            }

        }
    }


    if (isSongExist) {
        return (
            <TouchableOpacity
                onLongPress={() => dispatch(list_initiate_select_action(listName))}
                onPress={() => onPress()}>
                <View style={styles.conatiner}>
                    <View style={{ ...styles.content, backgroundColor: (isListNameExist) ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                        <FolderMinusIcon />
                        <Text numberOfLines={1} style={styles.text}>{listName}</Text>
                    </View>
                </View>
            </TouchableOpacity >
        )
    }
    else {
        return (
            <TouchableOpacity
                onLongPress={() => dispatch(list_initiate_select_action(listName))}
                onPress={() => onPress()}>
                <View style={styles.conatiner}>
                    <View style={{ ...styles.content, backgroundColor: (isListNameExist) ? 'rgba(0,0,0,0.5)' : 'transparent' }}>
                        <FolderPlusIcon />
                        <Text numberOfLines={1} style={styles.text}>{listName}</Text>
                    </View>
                </View>
            </TouchableOpacity >
        )
    }

}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        //backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: WIDTH(15),

    },
    content: {
        borderRadius: HEIGHT(5),
        paddingHorizontal: WIDTH(5),
        paddingVertical: HEIGHT(5)
    },

    icon: {
        textShadowColor: col_black,
        textShadowOffset: { width: 0, height: 2 },
        //textShadowRadius: 0.1
    },

    text: {
        fontSize: HEIGHT(10),
        fontWeight: 'bold'
    }


})

export default List_modal_list
