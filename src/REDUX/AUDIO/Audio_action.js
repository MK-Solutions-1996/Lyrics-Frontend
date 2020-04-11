import {
    AUDIO_LOAD,
    AUDIO_SUCCESS,
    AUDIO_ERROR,
    AUDIO_RELEASE,
    AUDIO_PLAY,
    AUDIO_PAUSE,
    AUDIO_STOP,
    ON_SLIDER_EDITING,
    SET_AUDIO_LOADING_TIME_COUNTER,
    AUDIO_RELOAD,
    SET_SLIDER_CURRENT_TIME
} from './Audio_types';
import Audio from 'react-native-sound';


const audio_load = () => {
    return {
        type: AUDIO_LOAD
    }
}

const audio_success = (playingAudio) => {
    return {
        type: AUDIO_SUCCESS,
        payload: playingAudio
    }
}

const audio_error = (error) => {
    return {
        type: AUDIO_ERROR,
        payload: error
    }
}

const audio_release = () => {
    return {
        type: AUDIO_RELEASE
    }
}


const audio_play = (state) => {
    return {
        type: AUDIO_PLAY,
        payload: state
    }
}

const audio_pause = (state) => {
    return {
        type: AUDIO_PAUSE,
        payload: state
    }
}

const audio_stop = (state) => {
    return {
        type: AUDIO_STOP,
        payload: state
    }
}

const on_slider_editing = (time) => {
    return {
        type: ON_SLIDER_EDITING,
        payload: time
    }
}

const set_slider_current_time = (time) => {
    return {
        type: SET_SLIDER_CURRENT_TIME,
        payload: time
    }
}

const set_audio_loading_time_counter = () => {
    return {
        type: SET_AUDIO_LOADING_TIME_COUNTER,
    }
}

const audio_reload = () => {
    return {
        type: AUDIO_RELOAD
    }
}





export const initialize_audio_action = (track) => {
    return (dispatch) => {
        dispatch(audio_load());
        const playingAudio = new Audio(track, null, (error) => {
            if (error) {
                dispatch(audio_error(error));
            }
            else {
                const duration = playingAudio.getDuration();
                const payload = {
                    playingAudio: playingAudio,
                    audioDuration: duration
                }
                dispatch(audio_success(payload));
            }
        });
    }
}


export const release_audio_action = (playingAudio) => {
    return (dispatch) => {
        if (playingAudio) {
            playingAudio.release();
        }
        dispatch(audio_release());
    }
}

export const audio_play_action = (playingAudio) => {
    return (dispatch) => {
        if (playingAudio) {
            playingAudio.play();
            dispatch(audio_play(true));
        }
    }
}

export const audio_pause_action = (playingAudio) => {
    return (dispatch) => {
        if (playingAudio) {
            playingAudio.pause();
            dispatch(audio_pause(false));
        }
    }
}

export const audio_stop_action = (playingAudio) => {
    return (dispatch) => {
        if (playingAudio) {
            playingAudio.stop();
            dispatch(audio_stop(false));

            playingAudio.setCurrentTime(0);

        }
    }
}

export const on_slider_editing_action = (playingAudio, time) => {
    return (dispatch) => {
        if (playingAudio) {
            playingAudio.setCurrentTime(time);
            dispatch(on_slider_editing(time));
        }
    }
}

export const set_slider_current_time_action = (time) => {
    return (dispatch) => {
        dispatch(set_slider_current_time(time));
    }
}

export const set_audio_loading_time_counter_action = () => {
    return (dispatch) => {
        dispatch(set_audio_loading_time_counter());
    }
}

export const audio_reload_action = (playingAudio) => {
    return (dispatch) => {
        if (playingAudio) {
            dispatch(audio_reload());
        }
        else {
            dispatch(audio_reload());
            dispatch(release_audio_action());
        }
    }
}


