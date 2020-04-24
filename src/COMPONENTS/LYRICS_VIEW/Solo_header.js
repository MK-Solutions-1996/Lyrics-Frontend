import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    StatusBar,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import {
    HEADER_HEIGHT,
    STATUS_BAR_HEIGHT,
    HEIGHT,
    WIDTH,
    DEVICE_HEIGHT,
    DEVICE_WIDTH,
    HEADER_WITH_BACKGROUND_IMAGE_HEIGHT
} from '../../CONSTANTS/Sizes';

import { s_sorry_audio_not_availabale_for_this_song } from '../../CONSTANTS/Sinhala';
import { im_default_artist } from '../../CONSTANTS/Imports';


import {
    col_primary_rgba,
    col_secondary_rgba,
    col_primary, col_secondary,
    col_off_white, col_white, col_black
} from '../../CONSTANTS/Colors';

import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Avatar } from 'react-native-elements';
import AudioPlayer from '../Audio_player';



const BackIcon = () => {
    return (<Icon name="arrow-circle-left" color={col_off_white} size={HEIGHT(30)} style={styles.backIcon} />);
}

function Solo_header({ artistArray, songObject, goBackFunction }) {
    const { _id, type, sinhalaTitle, singlishTitle, audio } = songObject;

    if (artistArray[0].image.imageAvailability) {
        return (
            <ImageBackground
                resizeMode="stretch"
                style={styles.imageBackground}
                source={{ uri: artistArray[0].image.image }}
            >
                <LinearGradient
                    colors={[col_primary_rgba, col_secondary_rgba]}
                    style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerTopContainer}>
                            <View style={styles.backAndTitleContent}>
                                <TouchableOpacity onPress={() => goBackFunction()}>
                                    <BackIcon />
                                </TouchableOpacity>
                                <View style={styles.titleList}>
                                    <Text numberOfLines={1} style={styles.sinhalaTitle}>{sinhalaTitle}</Text>
                                    <Text numberOfLines={1} style={styles.singlishTitle}>{singlishTitle}</Text>
                                    <Text numberOfLines={1} style={styles.singlishTitle}>{artistArray[0].sinhalaName}</Text>
                                </View>
                            </View>
                            <View style={styles.headerTopRightContainer}>
                                <Avatar
                                    rounded
                                    source={{ uri: artistArray[0].image.image }}
                                    size={HEIGHT(60)}
                                    overlayContainerStyle={{ backgroundColor: col_white }}
                                    placeholderStyle={{ backgroundColor: col_off_white }}
                                    activeOpacity={0.7}
                                />
                            </View>
                        </View>
                        <View style={styles.headerBottomContainer}>
                            {
                                (audio.audioAvailability) ?
                                    (<AudioPlayer track={audio.audio} />)
                                    : (<View style={styles.audioNotAvailable}>
                                        <Text style={styles.audioNotAvailableText}>{s_sorry_audio_not_availabale_for_this_song}</Text>
                                    </View>)
                            }
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        );
    }
    else {
        return (
            <ImageBackground
                resizeMode="stretch"
                style={styles.imageBackground}
                source={im_default_artist}
            >
                <LinearGradient
                    colors={[col_primary_rgba, col_secondary_rgba]}
                    style={styles.container}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}>
                    <View style={styles.headerContainer}>
                        <View style={styles.headerTopContainer}>
                            <View style={styles.backAndTitleContent}>
                                <TouchableOpacity onPress={() => goBackFunction()}>
                                    <BackIcon />
                                </TouchableOpacity>
                                <View style={styles.titleList}>
                                    <Text numberOfLines={1} style={styles.sinhalaTitle}>{sinhalaTitle}</Text>
                                    <Text numberOfLines={1} style={styles.singlishTitle}>{singlishTitle}</Text>
                                    <Text numberOfLines={1} style={styles.singlishTitle}>{artistArray[0].sinhalaName}</Text>
                                </View>
                            </View>
                            <View style={styles.headerTopRightContainer}>
                                <Avatar
                                    rounded
                                    source={im_default_artist}
                                    size={HEIGHT(60)}
                                    overlayContainerStyle={{ backgroundColor: col_white }}
                                    placeholderStyle={{ backgroundColor: col_off_white }}
                                    activeOpacity={0.7}
                                />
                            </View>
                        </View>
                        <View style={styles.headerBottomContainer}>
                            {
                                (audio.audioAvailability) ?
                                    (<AudioPlayer track={audio.audio} />)
                                    : (<View style={styles.audioNotAvailable}>
                                        <Text style={styles.audioNotAvailableText}>{s_sorry_audio_not_availabale_for_this_song}</Text>
                                    </View>)
                            }
                        </View>
                    </View>
                </LinearGradient>
            </ImageBackground>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        flexDirection: 'row',
        shadowColor: col_black,
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 5,
        overflow: 'hidden'
    },
    headerContainer: {
        flex: 1,
        justifyContent: 'space-between',

    },
    headerTopContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: "space-between",
        marginTop: STATUS_BAR_HEIGHT + HEIGHT(5),
        marginHorizontal: HEIGHT(10),
    },
    backAndTitleContent: {
        flex: 4,
        flexDirection: 'row',
    },
    headerTopRightContainer: {
        flex: 1,

    },
    artistImageContainer: {
        flex: 1,
        borderRadius: 7,
        shadowColor: col_black,
        shadowOpacity: 1,
        elevation: 5,
        paddingVertical: HEIGHT(3),
        paddingHorizontal: WIDTH(3)
    },
    artistImage: {
        flex: 1,
        borderRadius: 7
    },
    titleList: {
        flex: 1,
    },
    sinhalaTitle: {
        fontWeight: 'bold',
        color: col_white,
        fontSize: HEIGHT(18),
        paddingLeft: WIDTH(5)
    },
    singlishTitle: {
        color: col_white,
        fontSize: HEIGHT(10),
        paddingLeft: WIDTH(5),
        textTransform: 'uppercase'
    },

    backIcon: {
        flex: 1,
        marginTop: HEIGHT(5),
        shadowColor: 'black',
        shadowOpacity: 1,
        textShadowRadius: 1,
        textShadowOffset: { width: 1, height: 3 },
    },
    headerBottomContainer: {
        flex: 1,
        marginBottom: HEIGHT(10),
        marginHorizontal: WIDTH(10),
        justifyContent: 'flex-end',
    },
    audioNotAvailable: {
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
    audioNotAvailableText: {
        color: col_off_white,
        fontSize: HEIGHT(12)

    }
});


export default React.memo(Solo_header);
