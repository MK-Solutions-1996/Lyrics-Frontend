import { LYRICS_MODEL_THEME } from './Theme_types';
import { col_white, col_black } from '../../CONSTANTS/Colors'

const initialState = {
    lyrics_model_container: col_white,
    lyrics_model_text: col_black
}

const theme_reducer = (state = initialState, action) => {
    switch (action.type) {
        case LYRICS_MODEL_THEME: return {
            ...state,
            lyrics_model_container: action.payload.container,
            lyrics_model_text: action.payload.text
        }
        default: return state
    }
}

export default theme_reducer;



