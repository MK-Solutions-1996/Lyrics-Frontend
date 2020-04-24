import {
    FETCH_LIKES,
    DO_LIKE,
    DO_UNLIKE,
    INITIATE_SELECT,
    DO_SELECT,
    DO_UNSELECT,
    DO_SELECT_ALL,
    CANCEL_SELECT,
    DELETE_SELECT,
    ERROR_LIKE,
    DO_UNSELECT_ALL
} from './Like_types';
import AsyncStorage from '@react-native-community/async-storage';



const fetch_likes = (array) => {
    return {
        type: FETCH_LIKES,
        payload: array
    }
}

const error_like = (error) => {
    return {
        type: ERROR_LIKE,
        payload: error
    }
}




export const fetch_likes_action = () => {
    return async (dispatch) => {
        let result = await AsyncStorage.getItem('like');
        let likesArray = JSON.parse(result);
        if (likesArray === null) {
            likesArray = []
        }
        dispatch(fetch_likes(likesArray));
    }
}

export const do_like_action = (id, likesArray) => {

    return async (dispatch) => {
        likesArray.push(id);
        await AsyncStorage.setItem('like', JSON.stringify(likesArray))
            .then(() => {
                dispatch(fetch_likes_action())
            })
            .catch(() => {
                const error = 'Error in do_like_action'
                dispatch(error_like(error))
            })
    }
}

export const do_unlike_action = (id, likesArray) => {
    return async (dispatch) => {

        if (likesArray.length > 0) {
            for (var i = 0; i < likesArray.length; i++) {
                if (likesArray[i] === id) {
                    likesArray.splice(i, 1);
                }
            }
        }

        await AsyncStorage.setItem('like', JSON.stringify(likesArray))
            .then(() => {
                dispatch(fetch_likes_action())
            })
            .catch(() => {
                const error = 'Error in do_unlike_action'
                dispatch(error_like(error))
            })
    }

}


export const like_initiate_select_action = (id) => {
    return {
        type: INITIATE_SELECT,
        payload: id
    }
}

export const like_do_select_action = (id) => {
    return {
        type: DO_SELECT,
        payload: id
    }
}

export const like_do_unselect_action = (id) => {
    return {
        type: DO_UNSELECT,
        payload: id
    }
}

export const like_cancel_select_action = () => {
    return {
        type: CANCEL_SELECT
    }
}


export const like_do_select_all_action = () => {
    return {
        type: DO_SELECT_ALL
    }
}

export const like_do_unselect_all_action = () => {
    return {
        type: DO_UNSELECT_ALL
    }
}

const like_delete_select = () => {
    return {
        type: DELETE_SELECT
    }
}

export const like_delete_select_action = () => {
    return (dispatch) => {
        dispatch(like_delete_select());
        dispatch(fetch_likes_action())
    }
}




// const temp5 = async () => {
//     await AsyncStorage.removeItem('like')
//         .then(() => {
//             console.log('deleted')
//         })
//         .catch((err) => {
//             console.log('err:', err);
//         })
// }
