import {
    FETCH_LIST,
    LIST_MODAL_OPEN,
    LIST_MODAL_CLOSE,
    LIST_NEW_ONE_STATE,
    LIST_CREATE,
    LIST_CREATE_ERROR,
    LIST_ERROR,
    LIST_ADD_SONG,
    LIST_REMOVE_SONG,

    LIST_INITIATE_SELECT,
    LIST_DO_SELECT,
    LIST_DO_UNSELECT,
    LIST_ALL_SELECT,
    LIST_ALL_UNSELCT,
    LIST_CANCEL_SELECT,
    LIST_DELETE_SELECT,


    LIST_NEW_NAME_MODAL_STATE,
    LIST_OPEN
} from './List_types';

import AsyncStorage from '@react-native-community/async-storage';
import { s_name_already_exists, s_provide_a_name, s_provide_a_short_name } from '../../CONSTANTS/Sinhala';

export const list_modal_open_action = (songId) => {
    return {
        type: LIST_MODAL_OPEN,
        payload: songId
    }
}

export const list_modal_close_action = () => {
    return {
        type: LIST_MODAL_CLOSE
    }
}

export const list_new_one_state = () => {
    return {
        type: LIST_NEW_ONE_STATE
    }
}

const fetch_list = (listArray) => {
    return {
        type: FETCH_LIST,
        payload: listArray
    }
}

export const fetch_list_action = () => {
    return async (dispatch) => {
        let result = await AsyncStorage.getItem('list');
        let listArray = JSON.parse(result);
        if (listArray === null) {
            listArray = []
        }
        dispatch(fetch_list(listArray));
    }
}


const list_error = () => {
    return {
        type: LIST_ERROR
    }
}

const list_create = () => {
    return {
        type: LIST_CREATE,
    }
}

const list_create_error = (error) => {
    return {
        type: LIST_CREATE_ERROR,
        payload: error
    }
}

const isExistName = (listName, listArray) => {
    var result = false;
    for (var i = 0; i < listArray.length; i++) {
        if (listArray[i].listName === listName) {
            result = true
        }
    }
    return result;
}

export const list_create_action = (listName, listArray) => {
    return async (dispatch) => {
        if (listName === '') {
            dispatch(list_create_error(s_provide_a_name))
        }
        else if (listName.length > 15) {
            dispatch(list_create_error(s_provide_a_short_name))
        }
        else {
            if (isExistName(listName, listArray)) {
                dispatch(list_create_error(s_name_already_exists))
            }
            else {
                const newObject = { listName: listName, songList: [] }
                listArray.unshift(newObject); //object push to start of the array
                await AsyncStorage.setItem('list', JSON.stringify(listArray))
                    .then(() => {
                        dispatch(list_create())
                        dispatch(fetch_list_action());
                    })
                    .catch(() => {
                        const error = 'Error list create action'
                        dispatch(list_error(error))
                    })
            }
        }
    }
}



export const list_add_song_action = (songId, listName, listArray) => {
    return async (dispatch) => {


        for (var i = 0; i < listArray.length; i++) {
            if (listArray[i].listName === listName) {
                var songListArray = listArray[i].songList;
                songListArray = [...songListArray, songId];
                listArray[i] = { listName: listName, songList: songListArray }
            }
        }


        await AsyncStorage.setItem('list', JSON.stringify(listArray))
            .then(() => {
                dispatch(fetch_list_action());
            })
            .catch(() => {
                const error = 'list_add_song_action'
                dispatch(list_error(error))
            })
    }
}


export const list_remove_song_action = (songId, listName, listArray) => {
    return async (dispatch) => {

        for (var i = 0; i < listArray.length; i++) {
            if (listArray[i].listName === listName) {
                var songListArray = listArray[i].songList;
                for (var j = 0; j < songListArray.length; j++) {
                    if (songListArray[j] === songId) {
                        songListArray.splice(j, 1);
                    }
                }
                listArray[i] = { listName: listName, songList: songListArray }
            }
        }

        await AsyncStorage.setItem('list', JSON.stringify(listArray))
            .then(() => {
                dispatch(fetch_list_action());
            })
            .catch(() => {
                const error = 'list_remove_song_action'
                dispatch(list_error(error))
            })
    }
}



export const list_initiate_select_action = (listName) => {
    return {
        type: LIST_INITIATE_SELECT,
        payload: listName
    }
}

export const list_do_select_action = (listName) => {
    return {
        type: LIST_DO_SELECT,
        payload: listName
    }
}

export const list_do_unselect_action = (listName) => {
    return {
        type: LIST_DO_UNSELECT,
        payload: listName
    }
}

export const list_all_select_action = () => {
    return {
        type: LIST_ALL_SELECT
    }
}

export const list_all_unselect_action = () => {
    return {
        type: LIST_ALL_UNSELCT
    }
}

export const list_cancel_select_action = () => {
    return {
        type: LIST_CANCEL_SELECT
    }
}

const delete_select = () => {
    return {
        type: LIST_DELETE_SELECT
    }
}

export const list_delete_select_action = () => {
    return (dispatch) => {
        dispatch(delete_select())
        dispatch(fetch_list_action());
    }
}






export const list_new_name_modal_state_action = () => {
    return {
        type: LIST_NEW_NAME_MODAL_STATE
    }
}


export const list_open_action = (object) => {
    return {
        type: LIST_OPEN,
        payload: object
    }
}




