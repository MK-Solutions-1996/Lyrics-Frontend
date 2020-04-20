import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Slider, } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import { WIDTH, HEIGHT, DEVICE_WIDTH } from '../CONSTANTS/Sizes';
import {
    col_white,
    col_primary,
    col_secondary_rgba,
    col_off_white,
    col_black
} from '../CONSTANTS/Colors';
import { MusicBarLoader } from 'react-native-indicator';
import { s_try_again_for_the_audio } from '../CONSTANTS/Sinhala';
import { useSelector, useDispatch } from 'react-redux';
import {
    initialize_audio_action,
    audio_pause_action,
    audio_play_action,
    audio_reload_action,
    audio_stop_action,
    on_slider_editing_action,
    set_audio_loading_time_counter_action,
    set_slider_current_time_action
} from '../REDUX';


const iconSize = HEIGHT(20);

const PlayIcon = () => {
    return <Icon name="play" size={iconSize} color={col_off_white} style={styles.icon} />
};
const PauseIcon = () => { return <Icon name="pause" size={iconSize} color={col_off_white} style={styles.icon} /> };
const StopIcon = () => { return <Icon name="stop" size={iconSize} color={col_off_white} style={styles.icon} /> };


function Audio_player({ track }) {
    const dispatch = useDispatch();
    const audio_state = useSelector(state => state.audio_reducer);
    const {
        loadingAudio,
        playingAudio,
        audioError,
        audioDuration,
        playState,
        sliderCurrentTime,
        audioLoadingTimeCounter
    } = audio_state;


    useEffect(() => {
        dispatch(initialize_audio_action(track));
    }, [track])



    useEffect(() => {
        const interval = setInterval(() => {
            if ((playState)) {
                playingAudio.getCurrentTime((seconds) => {
                    dispatch(set_slider_current_time_action(seconds));
                })
            }
        }, 100);

        return () => {
            clearInterval(interval);
        };
    });

    useEffect(() => {
        const loadingAudioListner = setInterval(() => {
            if ((audioLoadingTimeCounter < 5) && (loadingAudio)) {
                dispatch(set_audio_loading_time_counter_action());
            }
            else {
                clearInterval(loadingAudioListner)
            }
        }, 1000);

        return () => {
            clearInterval(loadingAudioListner);
        }
    }, [audioLoadingTimeCounter, loadingAudio]);


    const getAudioTimeString = (seconds) => {
        const h = parseInt(seconds / (60 * 60));
        const m = parseInt(seconds % (60 * 60) / 60);
        const s = parseInt(seconds % 60);

        return ((m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s));
    }

    var currentTimeString = getAudioTimeString(sliderCurrentTime);
    var durationString = getAudioTimeString(audioDuration);


    if (!(loadingAudio) & (audioLoadingTimeCounter < 5)) {
        return (
            <View style={styles.container}>

                {
                    (!playState) ? (<TouchableOpacity onPress={() => dispatch(audio_play_action(playingAudio))}>
                        <PlayIcon />
                    </TouchableOpacity>)
                        : <TouchableOpacity onPress={() => dispatch(audio_pause_action(playingAudio))}>
                            <PauseIcon />
                        </TouchableOpacity>
                }
                <TouchableOpacity onPress={() => dispatch(audio_stop_action(playingAudio))}>
                    <StopIcon />
                </TouchableOpacity>
                <Slider
                    maximumValue={audioDuration}
                    thumbTintColor={col_white}
                    style={styles.slider}
                    minimumTrackTintColor={col_white}
                    maximumTrackTintColor={col_white}
                    onValueChange={(time) => dispatch(on_slider_editing_action(playingAudio, time))}
                    value={sliderCurrentTime}
                />
                <Text style={styles.time}> {currentTimeString} / {durationString}</Text>
            </View>

        );
    }
    else {
        if (audioLoadingTimeCounter === 5) {
            return (
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => dispatch(audio_reload_action(playingAudio))}>
                        <Text style={styles.tryAgainText}>{s_try_again_for_the_audio}</Text>
                    </TouchableOpacity>
                </View>

            )
        }
        else {
            return (<View style={styles.container}>
                <MusicBarLoader
                    barHeight={HEIGHT(20)}
                    betweenSpace={WIDTH(5)}
                    color={col_primary}
                />
            </View>);
        }
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: col_secondary_rgba,
        borderRadius: HEIGHT(7),
        shadowColor: col_black,
        shadowOpacity: 0.5,
        shadowOffset: { width: 4, height: 10 },
        shadowRadius: 5,
        elevation: 5,
        paddingVertical: HEIGHT(2)

    },

    icon: {
        shadowColor: 'black',
        shadowOpacity: 2,
        textShadowRadius: 4,
        textShadowOffset: { width: 1, height: 4 },
    },
    slider: {
        width: DEVICE_WIDTH / 2,
    },
    time: {
        color: col_white,
        fontSize: WIDTH(12)
    },
    tryAgainText: {
        color: col_off_white,
        fontSize: HEIGHT(12)
    }
});

export default React.memo(Audio_player)
