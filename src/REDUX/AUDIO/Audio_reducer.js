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

const audio_state = {
    loadingAudio: true,
    playingAudio: '',
    audioError: null,
    audioDuration: 0,
    playState: false,
    sliderCurrentTime: 0,
    audioLoadingTimeCounter: 0
}

const audio_reducer = (state = audio_state, action) => {
    switch (action.type) {
        case AUDIO_LOAD: return {
            ...state,
            loadingAudio: true
        }
        case AUDIO_SUCCESS: return {
            ...state,
            loadingAudio: false,
            playingAudio: action.payload.playingAudio,
            audioDuration: action.payload.audioDuration,
            audioError: null,
        }
        case AUDIO_ERROR: return {
            ...state,
            audioError: action.payload,
            loadingAudio: false,
            playingAudio: '',
            audioDuration: 0,

        }
        case AUDIO_RELEASE: return audio_state

        case AUDIO_PLAY: return {
            ...state,
            playState: action.payload
        }

        case AUDIO_PAUSE: return {
            ...state,
            playState: action.payload
        }

        case AUDIO_STOP: return {
            ...state,
            playState: action.payload,
            sliderCurrentTime: 0,
        }

        case ON_SLIDER_EDITING: return {
            ...state,
            sliderCurrentTime: action.payload
        }

        case SET_AUDIO_LOADING_TIME_COUNTER: return {
            ...state,
            audioLoadingTimeCounter: state.audioLoadingTimeCounter + 1
        }

        case AUDIO_RELOAD: return {
            ...state,
            audioLoadingTimeCounter: 0
        }

        case SET_SLIDER_CURRENT_TIME: return {
            ...state,
            sliderCurrentTime: action.payload
        }

        default: return state
    }
}

export default audio_reducer;