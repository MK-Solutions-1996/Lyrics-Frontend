import React from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { STATUS_BAR_HEIGHT, HEIGHT, WIDTH } from '../../CONSTANTS/Sizes';
import { col_black, col_primary_rgba, col_secondary_rgba, col_white, col_off_white } from '../../CONSTANTS/Colors';
import { im_lyrics_background, im_default_artist } from '../../CONSTANTS/Imports';
import LinearGradient from 'react-native-linear-gradient';
import { Avatar } from 'react-native-elements';
import { useRoute, useNavigation } from '@react-navigation/native';
import SearchHeader from '../SearchHeader';
import Icon from 'react-native-vector-icons/FontAwesome';


const BackIcon = () => {
    return (<Icon name="arrow-circle-left" color={col_off_white} size={HEIGHT(30)} />);
}

function Single_artist_header({ artistObject }) {
    const navigation = useNavigation();
    const { sinhalaName, singlishName, image } = artistObject;

    return (
        <ImageBackground
            style={styles.imageBackground}
            source={im_lyrics_background}
        >
            <LinearGradient
                colors={['rgba(102, 126, 234, 0.9)', 'rgba(118,75,162,0.9)']}
                style={styles.container}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}>
                <View style={styles.topContainer}>
                    <View style={styles.backIcon}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <BackIcon />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={styles.avatarConainer}>
                        {
                            (image.imageAvailability) ? (
                                <Avatar
                                    rounded
                                    source={{ uri: image.image }}
                                    size={HEIGHT(75)}

                                />)
                                : (
                                    <Avatar
                                        rounded
                                        source={im_default_artist}
                                        size={HEIGHT(90)}
                                    />)
                        }
                    </View>
                    <View style={styles.nameContainer}>
                        <Text style={styles.sinhalaName}>{sinhalaName}</Text>
                        <Text style={styles.singlishName}>{singlishName}</Text>
                    </View>
                </View>
                {/* <View style={styles.bottomContainer}>
                    <SearchHeader
                        editable={true}
                        search_text={searchText}
                        search_action={searchFilter}
                    />
                </View> */}
            </LinearGradient>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        flexDirection: 'row',
        shadowColor: col_black,
        shadowOpacity: 0.9,
        shadowRadius: 2,
        elevation: 5,
        overflow: 'hidden'
    },
    container: {
        flex: 1
    },
    topContainer: {
        flex: 1,
        marginTop: STATUS_BAR_HEIGHT + HEIGHT(5),
        marginBottom: HEIGHT(5)
    },
    bottomContainer: {
        flex: 1
    },
    backIcon: {
        position: 'absolute',
        shadowColor: 'black',
        shadowOpacity: 1,
        textShadowRadius: 1,
        textShadowOffset: { width: 1, height: 3 },
        left: WIDTH(10),
        top: HEIGHT(10)
    },
    avatarConainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    avatar: {
        flex: 1,
        alignItems: 'center',
    },
    nameContainer: {
        flex: 1,
        alignItems: 'center'
    },
    sinhalaName: {
        color: col_white,
        fontSize: HEIGHT(12),
        fontWeight: 'bold'
    },
    singlishName: {
        color: col_white,
        fontSize: HEIGHT(10),
        fontWeight: 'bold'
    },

});

export default Single_artist_header
