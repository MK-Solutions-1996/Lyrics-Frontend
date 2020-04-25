import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'
import { HEIGHT, WIDTH } from '../../CONSTANTS/Sizes';
import { col_secondary, col_black, col_white } from '../../CONSTANTS/Colors';


const MusicIcon = () => {
    return <Icon name="music" style={styles.icon} size={HEIGHT(20)} color={col_secondary} />
}

function List_song_list({ songObject }) {

    const { sinhalaTitle, singlishTitle } = songObject;

    return (
        <TouchableNativeFeedback
        //onPress={}
        //onLongPress={}
        >
            <View style={{
                ...styles.container,
                backgroundColor: col_white,
                elevation: 3
                // backgroundColor: (isExist) ? 'rgba(0,0,0,0.5)' : col_white,
                // elevation: (isExist) ? 0 : 3
            }}>
                <View style={styles.iconConatiner}>
                    <MusicIcon />
                </View>
                <View style={styles.titleContainer}>
                    <Text numberOfLines={1} style={styles.sinhalaTitle}>{sinhalaTitle}</Text>
                    <Text numberOfLines={1} style={styles.singlishTitle}>{singlishTitle}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: WIDTH(10),
        marginBottom: HEIGHT(5),
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: col_black,
        shadowOpacity: 0.5,
        paddingVertical: WIDTH(5),
        borderRadius: 7,
        overflow: 'hidden',
    },
    iconConatiner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'

    },
    titleContainer: {
        flex: 6,
    },
    sinhalaTitle: {
        fontWeight: 'bold',
        fontSize: HEIGHT(10),
    },
    singlishTitle: {
        fontWeight: 'bold',
        fontSize: HEIGHT(8)
    },
    icon: {
        shadowColor: col_black,
        shadowOpacity: 1,
        textShadowRadius: 4,
        textShadowOffset: { width: 1, height: 2 },
    }
});
export default List_song_list
