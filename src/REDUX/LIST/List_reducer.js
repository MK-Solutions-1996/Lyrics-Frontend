import {
    FETCH_LIST,
    LIST_MODAL_OPEN,
    LIST_MODAL_CLOSE,
    LIST_NEW_ONE_STATE,
    LIST_ERROR,
    LIST_CREATE_ERROR,
    LIST_CREATE,

    LIST_DO_SELECT,
    LIST_DO_UNSELECT,
    LIST_ALL_SELECT,
    LIST_ALL_UNSELCT,
    LIST_CANCEL_SELECT,
    LIST_DELETE_SELECT,
    LIST_INITIATE_SELECT,

    LIST_NEW_NAME_MODAL_STATE,
    LIST_OPEN,


    LIST_SONGLIST_INITIATE_SELECT,
    LIST_SONGLIST_DO_SELECT,
    LIST_SONGLIST_DO_UNSELECT,
    LIST_SONGLIST_ALL_SELECT,
    LIST_SONGLIST_ALL_UNSELECT,
    LIST_SONGLIST_CANCEL_SELECT,
    LIST_SONGLIST_DELETE_SELECT
} from './List_types';

import AsyncStorage from '@react-native-community/async-storage';

const initial_state = {
    listArray: [],
    songId: '',
    listModalVisibility: false,
    listNewOneState: true,
    listNameError: null,
    listError: null,

    listSelectState: false,
    listSelectArray: [],
    listSelectAll: false,

    listNewNameModalVisibility: false,
    listOpenObject: {},

    listsongListSelectState: false,
    listSongListSelectArray: [],
    listSongListSelectAll: false,


}

const list_reducer = (state = initial_state, action) => {
    let listArray = state.listArray;
    let listSelectArray = state.listSelectArray;
    let listSongListSelectArray = state.listSongListSelectArray;
    let listOpenObject = state.listOpenObject;


    const deleteSelectedLists = async () => {
        if (listArray.length > 0) {
            for (var i = 0; i < listSelectArray.length; i++) {
                for (var j = 0; j < listArray.length; j++) {
                    if (listSelectArray[i] === listArray[j].listName) {
                        listArray.splice(j, 1);
                    }
                }
            }
        }

        await AsyncStorage.setItem('list', JSON.stringify(listArray))
            .then(() => {
                return {
                    ...state,
                    listSelectArray: [],
                    listSelectAll: false,
                    listSelectState: false
                }
            })
            .catch(() => {
                return {
                    ...state,
                    listSelectAll: false,
                    listSelectState: false,
                    listError: 'Error in deleteSelectedLists'
                }
            })
    }


    const deleteSelectedSong = async () => {
        //const songId = action.payload;
        if (!(typeof (listOpenObject.songList) === 'undefined')) {

            var songListArray = listOpenObject.songList;
            for (var x = 0; x < listSongListSelectArray.length; x++) {
                for (var y = 0; y < songListArray.length; y++) {
                    if (listSongListSelectArray[x] === songListArray[y]) {
                        songListArray.splice(y, 1);
                    }
                }
            }



            console.log('xxxxxxxxxxx:', songListArray)

            for (var z = 0; z < listArray.length; z++) {
                if (listArray[z].listName === listOpenObject.listName) {
                    listArray[z] = { listName: listOpenObject.listName, songList: songListArray }
                }
            }

            await AsyncStorage.setItem('list', JSON.stringify(listArray))
                .then(() => {
                    return {
                        ...state,
                        listSongListSelectArray: [],
                        listSongListSelectAll: false,
                        listsongListSelectState: false
                    }
                })
                .catch(() => {
                    return {
                        ...state,
                        listSongListSelectAll: false,
                        listsongListSelectState: false,
                        listError: 'Error in deleteSelectedSong'
                    }
                })
        }




    }





    switch (action.type) {
        case FETCH_LIST: return {
            ...state,
            listArray: action.payload
        }

        case LIST_MODAL_OPEN: return {
            ...state,
            songId: action.payload,
            listModalVisibility: true
        }
        case LIST_MODAL_CLOSE: return {
            ...state,
            listModalVisibility: false
        }

        case LIST_NEW_ONE_STATE: return {
            ...state,
            listNewOneState: !state.listNewOneState
        }
        case LIST_ERROR: return {
            ...state,
            listError: action.payload
        }
        case LIST_CREATE: return {
            ...state,
            listNewOneState: !state.listNewOneState,
            listNameError: null,
            listError: null,
            listNewNameModalVisibility: false
        }
        case LIST_CREATE_ERROR: return {
            ...state,
            listNameError: action.payload
        }


        case LIST_INITIATE_SELECT: return {
            ...state,
            listSelectState: true,
            listSelectArray: [...state.listSelectArray, action.payload]
        }

        case LIST_DO_SELECT:
            listSelectArray = [...state.listSelectArray, action.payload]
            if (listSelectArray.length === listArray.length) {
                return {
                    ...state,
                    listSelectAll: true,
                    listSelectArray: listSelectArray
                }
            }
            else {
                return {
                    ...state,
                    listSelectArray: listSelectArray
                }
            }



        case LIST_DO_UNSELECT:
            let listName = action.payload;
            for (var i = 0; i < listSelectArray.length; i++) {
                if (listSelectArray[i] === listName) {
                    listSelectArray.splice(i, 1);
                }
            }

            return {
                ...state,
                listSelectArray: listSelectArray,
                listSelectAll: false,
            }





        case LIST_ALL_SELECT:
            let array = [];
            for (var x = 0; x < listArray.length; x++) {
                array.push(listArray[x].listName)
            }
            return {
                ...state,
                listSelectAll: true,
                listSelectArray: array
            }

        case LIST_ALL_UNSELCT: return {
            ...state,
            listSelectAll: false,
            listSelectArray: []
        }


        case LIST_CANCEL_SELECT: return {
            ...state,
            listSelectArray: [],
            listSelectState: false,
            listSelectAll: false,
        }


        case LIST_NEW_NAME_MODAL_STATE: return {
            ...state,
            listNewNameModalVisibility: !state.listNewNameModalVisibility
        }

        case LIST_OPEN: return {
            ...state,
            listOpenObject: action.payload
        }

        case LIST_SONGLIST_INITIATE_SELECT: return {
            ...state,
            listsongListSelectState: true,
            listSongListSelectArray: [...listSongListSelectArray, action.payload],
        }

        case LIST_SONGLIST_DO_SELECT:
            listSongListSelectArray = [...listSongListSelectArray, action.payload]
            if (listSongListSelectArray.length === state.listOpenObject.songList.length) {
                return {
                    ...state,
                    listSongListSelectAll: true,
                    listSongListSelectArray: listSongListSelectArray
                }
            }
            else {
                return {
                    ...state,
                    listSongListSelectArray: listSongListSelectArray
                }
            }



        case LIST_SONGLIST_DO_UNSELECT:
            let songId = action.payload;
            for (var i = 0; i < listSongListSelectArray.length; i++) {
                if (listSongListSelectArray[i] === songId) {
                    listSongListSelectArray.splice(i, 1);
                }
            }


            return {
                ...state,
                listSongListSelectArray: listSongListSelectArray,
                listSongListSelectAll: false,
            }




        case LIST_SONGLIST_ALL_SELECT: return {
            ...state,
            listSongListSelectAll: true,
            listSongListSelectArray: state.listOpenObject.songList
        }


        case LIST_SONGLIST_ALL_UNSELECT: return {
            ...state,
            listSongListSelectAll: false,
            listSongListSelectArray: []
        }

        case LIST_SONGLIST_CANCEL_SELECT: return {
            ...state,
            listSongListSelectArray: [],
            listSongListSelectAll: false,
            listsongListSelectState: false
        }


        case LIST_SONGLIST_DELETE_SELECT: deleteSelectedSong();


        case LIST_DELETE_SELECT: deleteSelectedLists();


        default: return state
    }
}

export default list_reducer;