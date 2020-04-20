import { API_BASE_URL, API_KEY } from 'react-native-dotenv';
import Axios from 'axios';
import {
    SONG_LOAD,
    SONG_SUCCESS,
    SONG_ERROR,
} from './Song_types';

const song_load = () => {
    return {
        type: SONG_LOAD
    }
}

const song_success = (songs) => {
    return {
        type: SONG_SUCCESS,
        payload: songs
    }
}

const song_error = (error) => {
    return {
        type: SONG_ERROR,
        payload: error
    }
}



export const fetch_all_songs_action = () => {
    return (dispatch) => {
        dispatch(song_load());
        Axios(API_BASE_URL + '/song', {
            method: 'GET',
            headers: { 'api_key': API_KEY }
        })
            .then(res => {
                const result = res.data;
                dispatch(song_success(result));
            })
            .catch(err => {
                const error = err.response;
                dispatch(song_error(error));
            });
    }
}


