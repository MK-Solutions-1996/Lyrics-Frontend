import {
    SONG_LOAD,
    SONG_SUCCESS,
    SONG_ERROR,
} from './Song_types';

const initial_state = {
    song_loading: false,
    all_songs: [],
    song_error: ''
}

const song_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case SONG_LOAD: return {
            ...state,
            song_loading: true,
        }
        case SONG_SUCCESS: return {
            song_loading: false,
            all_songs: action.payload,
            song_error: ''
        }
        case SONG_ERROR: return {
            song_loading: false,
            song_error: action.payload,
            all_songs: []
        }
        default: return state
    }
}

export default song_reducer;