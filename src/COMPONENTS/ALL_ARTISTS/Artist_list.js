import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ImageBackground, TouchableNativeFeedback } from 'react-native';
import TestImage from '../../ASSETS/IMAGES/sanuka.jpg';
import { Avatar } from 'react-native-elements';
import { HEIGHT, WIDTH, DEVICE_WIDTH, DEVICE_HEIGHT } from '../../CONSTANTS/Sizes';
import { col_white, col_black, col_off_white } from '../../CONSTANTS/Colors';
import { s_and, s_group_sing } from '../../CONSTANTS/Sinhala';
import { useNavigation } from '@react-navigation/native';

import { test_artist_array } from '../../TestData';
import { im_default_artist, im_loading } from '../../CONSTANTS/Imports';

import { useSelector } from 'react-redux';

function Artist_list({ artistObject }) {

    const navigation = useNavigation();
    const { sinhalaName, singlishName, image } = artistObject;



    return (
        <TouchableNativeFeedback onPress={() => navigation.navigate('Single_artist', { artistObject })}>
            <View style={styles.conatiner}>
                <ImageBackground
                    source={im_loading}
                    style={styles.imageContainer}>
                    {
                        (image.imageAvailability) ? (
                            <Image
                                resizeMode='stretch'
                                style={styles.image}
                                source={{ uri: image.image }}
                            />
                        ) : (
                                <Image
                                    resizeMode='cover'
                                    style={styles.image}
                                    source={im_default_artist}
                                />
                            )
                    }
                </ImageBackground>
                <View style={styles.nameContainer}>
                    <Text numberOfLines={1} style={styles.sinhalaName}>{sinhalaName}</Text>
                    <Text numberOfLines={1} style={styles.singlishName}>{singlishName}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    conatiner: {
        //flex: 1,
        width: DEVICE_WIDTH / 3.5,
        height: DEVICE_HEIGHT / 6,
        backgroundColor: col_white,
        shadowColor: col_black,
        shadowOpacity: 0.5,
        elevation: 2,
        borderRadius: HEIGHT(5),
        overflow: 'hidden',
        marginVertical: HEIGHT(5),
        marginHorizontal: WIDTH(5)
    },
    imageContainer: {
        flex: 2.5,
        overflow: 'hidden',
        shadowColor: col_black,
        shadowOpacity: 0.5,
        elevation: 5,
        borderBottomLeftRadius: HEIGHT(150),
        borderBottomRightRadius: HEIGHT(150),
    },
    nameContainer: {
        flex: 1.5,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginHorizontal: WIDTH(0.5)
    },
    image: {
        width: '100%',
        height: '100%',
    },
    sinhalaName: {
        fontWeight: 'bold',
        fontSize: WIDTH(9)
    },
    singlishName: {
        fontSize: WIDTH(8)
    },
})

export default Artist_list
