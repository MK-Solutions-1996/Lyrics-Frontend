import { LYRICS_MODEL_THEME } from './Theme_types';

const lyrics_model_theme = (theme) => {
    return {
        type: LYRICS_MODEL_THEME,
        payload: theme
    }
}

export const lyrics_model_theme_action = (color) => {
    return (dispatch) => {
        dispatch(lyrics_model_theme(color));
    }
}