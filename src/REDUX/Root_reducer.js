import { combineReducers } from 'redux';
import audio_reducer from './AUDIO/Audio_reducer';
import song_reducer from './SONG/Song_reducer';
import artist_reducer from './ARTIST/Artist_reducer';
import theme_reducer from './THEME/Theme_reducer';


const Root_reducer = combineReducers({
    audio_reducer: audio_reducer,
    song_reducer: song_reducer,
    artist_reducer: artist_reducer,
    theme_reducer: theme_reducer,
});

export default Root_reducer;