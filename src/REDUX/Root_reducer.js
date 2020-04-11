import { combineReducers } from 'redux';
import audio_reducer from './AUDIO/Audio_reducer';

const Root_reducer = combineReducers({
    audio_reducer: audio_reducer
});

export default Root_reducer;