import {
    FETCH_LIKES,
    DO_LIKE,
    DO_UNLIKE,
    INITIATE_SELECT,
    DO_SELECT,
    DO_UNSELECT,
    DO_SELECT_ALL,
    DO_UNSELECT_ALL,
    CANCEL_SELECT,
    DELETE_SELECT,
    ERROR_LIKE
} from './Like_types';

import AsyncStorage from '@react-native-community/async-storage';


const initial_state = {
    likesArray: [],
    selectState: false,
    like_errors: [],
    selectedArray: [],
    selectAll: false
}


const like_reducer = (state = initial_state, action) => {

    let selectedArray = state.selectedArray;
    let likesArray = state.likesArray;
    let selectAll = state.selectAll;
    let selectState = state.selectState;


    const delete_selected = async () => {
        if (likesArray.length > 0) {
            for (var i = 0; i < selectedArray.length; i++) {
                for (var j = 0; j < likesArray.length; j++) {
                    if (selectedArray[i] === likesArray[j]) {
                        likesArray.splice(j, 1);
                    }
                }
            }
        }

        await AsyncStorage.setItem('like', JSON.stringify(likesArray))
            .then(() => {
                return {
                    ...state,
                    selectedArray: [],
                    selectAll: false,
                    selectState: false
                }
            })
            .catch(() => {
                return {
                    ...state,
                    selectAll: false,
                    selectState: false,
                    like_errors: 'Error in delete'
                }
            })
    }


    switch (action.type) {
        case FETCH_LIKES: return {
            likesArray: action.payload,
            selectState: false,
            like_errors: [],
            selectedArray: []
        }
        case INITIATE_SELECT:
            selectedArray.push(action.payload);
            return {
                ...state,
                selectState: true,
                selectedArray: selectedArray
            }

        case DO_SELECT:
            selectedArray.push(action.payload);
            return {
                ...state,
                selectedArray: selectedArray
            }

        case DO_UNSELECT:
            for (var i = 0; i < selectedArray.length; i++) {
                if (action.payload === selectedArray[i]) {
                    selectedArray.splice(i, 1);
                }
            }
            return {
                ...state,
                selectedArray: selectedArray
            }

        case DO_SELECT_ALL:
            selectedArray = likesArray;
            return {
                ...state,
                selectAll: true,
                selectedArray: selectedArray
            }

        case DO_UNSELECT_ALL: return {
            ...state,
            selectAll: false,
            selectedArray: []
        }

        case CANCEL_SELECT: return {
            ...state,
            selectState: false,
            selectedArray: [],
            selectAll: false

        }

        case DELETE_SELECT: delete_selected(selectedArray, likesArray)



        case ERROR_LIKE: return {
            ...state,
            like_errors: action.payload
        }
        default: return state
    }
}






export default like_reducer;