import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DEVICE_WIDTH, WIDTH, DEVICE_HEIGHT, HEIGHT } from '../../CONSTANTS/Sizes';
import { col_primary, col_white, col_black } from '../../CONSTANTS/Colors';
import { useSelector, useDispatch } from 'react-redux';
import { list_open_action, list_initiate_select_action, list_do_unselect_action, list_do_select_action } from '../../REDUX';

const FolderOpenIcon = () => {
    return <Icon name="folder-open" size={DEVICE_HEIGHT * 0.07} color={col_primary} />
}
const FolderCloseIcon = () => {
    return <Icon name="folder" size={DEVICE_HEIGHT * 0.07} color={col_primary} />
}


const checkSelected = (listName, listSelectArray) => {
    for (var i = 0; i < listSelectArray.length; i++) {
        if (listSelectArray[i] === listName) {
            return true;
        }
    }
    return false;
}


const checkListObject = (listOpenObject, listName) => {
    if (listOpenObject.listName === listName) {
        return true;
    }
    return false;
}

function List_list({ listObject, index }) {
    const dispatch = useDispatch();
    const { listName, songList } = listObject;

    const {
        listArray,
        songId,
        listSelectState,
        listSelectArray,
        listSelectAll,
        listOpenObject
    } = useSelector(state => state.list_reducer);

    const isListNameExist = checkListObject(listOpenObject, listName);
    const isSelected = checkSelected(listName, listSelectArray)





    useEffect(() => {
        if (index === 0) {
            dispatch(list_open_action(listObject))
        }
    }, []);


    const onPress = () => {
        if (listSelectState) {
            if (isSelected) {
                dispatch(list_do_unselect_action(listName));
            }
            else {
                dispatch(list_do_select_action(listName));
            }
        }
        else {
            dispatch(list_open_action(listObject))
        }
    }


    return (
        <View style={styles.container}>
            <TouchableNativeFeedback
                onLongPress={() => dispatch(list_initiate_select_action(listName))}
                onPress={() => onPress()}>
                <View style={{
                    ...styles.content,
                    backgroundColor: (isSelected) ? 'rgba(0,0,0,0.5)' : col_white,
                    elevation: (isSelected) ? 0 : 3
                }}>
                    {
                        (isListNameExist) ? <FolderOpenIcon /> : <FolderCloseIcon />
                    }
                    <Text style={styles.listName}>{listName}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: DEVICE_WIDTH * 0.03,

    },
    content: {
        alignItems: 'center',
        paddingHorizontal: WIDTH(15),
        paddingVertical: HEIGHT(5),
        borderRadius: HEIGHT(7),
        shadowColor: col_black,
        shadowOpacity: 0.5,

    },
    listName: {
        fontSize: HEIGHT(10),
        fontWeight: 'bold',

    },
})

export default List_list
