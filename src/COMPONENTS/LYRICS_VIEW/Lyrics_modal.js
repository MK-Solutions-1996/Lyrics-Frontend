import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, BackHandler } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { col_primary, col_secondary, col_white, col_black, col_off_white } from '../../CONSTANTS/Colors';
import { STATUS_BAR_HEIGHT, WIDTH, HEIGHT, DEVICE_WIDTH } from '../../CONSTANTS/Sizes';
import { useRoute, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector, useDispatch } from 'react-redux';
import { lyrics_model_theme_action } from '../../REDUX';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import useBackButton from '../../HOOKS/useBackButton';

const CloseIcon = ({ color }) => {
    return <Icon name="close" size={WIDTH(15)} color={color} style={styles.icon} />
};

function Lyrics_modal() {
    const route = useRoute();
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const { lyrics } = route.params;
    const theme_state = useSelector(state => state.theme_reducer);
    const { lyrics_model_container, lyrics_model_text } = theme_state;


    const goBackFunction = () => {
        navigation.goBack();
        return true;
    }

    useBackButton(goBackFunction);

    return (
        <LinearGradient
            colors={[col_primary, col_secondary]}
            style={styles.background}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }} >
            <View style={{ ...styles.container, backgroundColor: lyrics_model_container }}>
                <View style={styles.topContainer}>
                    <View style={styles.topRightCorner}>
                        <TouchableOpacity onPress={() => dispatch(lyrics_model_theme_action({ container: col_white, text: col_black }))}>
                            <View style={{ ...styles.theme, backgroundColor: col_white }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch(lyrics_model_theme_action({ container: col_off_white, text: col_black }))}>
                            <View style={{ ...styles.theme, backgroundColor: col_off_white }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch(lyrics_model_theme_action({ container: col_black, text: col_white }))}>
                            <View style={{ ...styles.theme, backgroundColor: col_black }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => goBackFunction()}>
                            <CloseIcon color={col_secondary} />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={styles.bottomContainer}> */}

                <ReactNativeZoomableView
                    maxZoom={2}
                    minZoom={0.2}
                    zoomStep={0.5}
                    initialZoom={1}
                    bindToBorders={true}
                    style={{ flex: 1, justifyContent: 'center' }}
                >
                    <ScrollView>
                        <Text style={{ ...styles.text, color: lyrics_model_text }}>{lyrics}</Text>
                    </ScrollView>
                </ReactNativeZoomableView>
                {/* </View> */}
            </View>
        </LinearGradient>


    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,

        //backgroundColor: 'rgba(255,255,255,0.5)'
    },

    container: {
        flex: 1,
        marginTop: STATUS_BAR_HEIGHT,
        marginHorizontal: WIDTH(5),
        borderTopStartRadius: HEIGHT(40),
        borderTopEndRadius: HEIGHT(40),
        shadowColor: col_black,
        shadowOpacity: 1,
        elevation: 2,
        overflow: 'hidden'

    },
    topContainer: {
        height: HEIGHT(40),
        //backgroundColor: 'blue',
        alignItems: 'flex-end'

    },
    topRightCorner: {
        flex: 1,
        backgroundColor: col_primary,
        flexDirection: 'row',
        alignItems: 'center',
        width: DEVICE_WIDTH / 2.5,
        justifyContent: 'space-evenly',
        borderBottomLeftRadius: HEIGHT(40)


        //marginRight: WIDTH(40)
        //justifyContent: 'center'
    },
    text: {
        marginLeft: WIDTH(5),
        fontSize: HEIGHT(5),

        //color: col_black
    },

    theme: {
        width: WIDTH(10),
        height: HEIGHT(10),
        borderRadius: WIDTH(50),
        shadowColor: col_black,
        shadowOpacity: 0.5,
        elevation: WIDTH(10),

    },
    icon: {
        shadowColor: col_black,
        shadowOpacity: 1,
        textShadowRadius: 4,
        textShadowOffset: { width: 1, height: 2 },
    }

});


export default Lyrics_modal;