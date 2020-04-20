import Axios from 'axios';
import { API_BASE_URL, API_KEY } from 'react-native-dotenv';

import {
    ARTIST_LOAD,
    ARTIST_SUCCESS,
    ARTIST_ERROR,

} from './Artist_types';

const artist_load = () => {
    return {
        type: ARTIST_LOAD
    }
}

const artist_success = (artists) => {
    return {
        type: ARTIST_SUCCESS,
        payload: artists
    }
}

const artist_fail = (error) => {
    return {
        type: ARTIST_FAIL,
        payload: error
    }
}











export const fetch_all_artists_action = () => {
    return (dispatch) => {
        dispatch(artist_load());
        Axios(API_BASE_URL + "/artist", {
            method: 'GET',
            headers: { 'api_key': API_KEY }
        })
            .then(res => {
                const result = res.data;
                dispatch(artist_success(result));
            })
            .catch(err => {
                const error = err.response;
                dispatch(artist_fail(error));
            });
    }
}


