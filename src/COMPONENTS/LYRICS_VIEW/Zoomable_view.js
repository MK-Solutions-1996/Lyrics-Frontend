import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView
} from 'react-native';

import {
    col_white_glass,
    col_black,
    col_white,
    col_off_white,
    col_secondary
} from '../../CONSTANTS/Colors';

import { WIDTH, HEIGHT } from '../../CONSTANTS/Sizes';
import Icon from 'react-native-vector-icons/FontAwesome'
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';


const HeartIcon = () => {
    return <Icon name="heart" size={WIDTH(15)} color={col_off_white} style={styles.icon} />
};
const PlayListIcon = () => {
    return <Icon name="list-alt" size={WIDTH(15)} color={col_off_white} style={styles.icon} />
};

function Zoomable_view({ lyrics }) {
    return (
        <View style={styles.container}>
            <ScrollView style={{ marginTop: HEIGHT(10) }}>
                <ReactNativeZoomableView
                    maxZoom={1}
                    minZoom={0.2}
                    zoomStep={0.3}
                    initialZoom={1}
                    bindToBorders={true}
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                    }}>
                    <Text style={styles.lyrics}>{lyrics}</Text>
                </ReactNativeZoomableView>
            </ScrollView>
            <View style={styles.bottomContainer}>
                <View style={styles.iconContainer}>
                    <HeartIcon />
                </View>
                <View style={styles.iconContainer}>
                    <PlayListIcon />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: col_white_glass,
        marginHorizontal: WIDTH(20),
        shadowColor: col_black,
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 5,
        marginBottom: HEIGHT(25)


    },
    lyrics: {
        color: col_white,
        fontWeight: 'bold',
        fontSize: WIDTH(12),
        marginLeft: WIDTH(15),
        marginVertical: HEIGHT(5),
        letterSpacing: WIDTH(1)
    },

    bottomContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        //width: 80,
        //height: 50,
        position: 'absolute',
        right: 2,
        bottom: HEIGHT(-12),
        //backgroundColor: 'red',
        //paddingHorizontal: WIDTH(5)

    },
    iconContainer: {
        marginHorizontal: WIDTH(4),
        backgroundColor: col_secondary,
        borderRadius: 50,
        padding: 7,
        shadowColor: col_black,
        shadowOpacity: 0.5,
        elevation: 5,
        shadowRadius: 5
    },
    icon: {
        shadowColor: col_black,
        shadowOpacity: 1,
        textShadowRadius: 4,
        textShadowOffset: { width: 1, height: 2 },
    }

});

export default Zoomable_view
