import {
    ARTIST_LOAD,
    ARTIST_SUCCESS,
    ARTIST_ERROR
} from './Artist_types';

const initial_state = {
    artist_loading: false,
    all_artists: [],
    artist_error: ''
}

const artist_reducer = (state = initial_state, action) => {
    switch (action.type) {
        case ARTIST_LOAD: return {
            ...state,
            artist_loading: true
        }
        case ARTIST_SUCCESS: return {
            artist_loading: false,
            all_artists: action.payload,
            artist_error: ''
        }
        case ARTIST_ERROR: return {
            artist_loading: false,
            artist_error: action.payload,
            all_artists: []
        }
        default: return state
    }
}

export default artist_reducer;