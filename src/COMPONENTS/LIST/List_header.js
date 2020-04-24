import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import { col_primary, col_secondary, col_off_white } from '../../CONSTANTS/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HEIGHT, WIDTH } from '../../CONSTANTS/Sizes';
import { s_new_one } from '../../CONSTANTS/Sinhala';
import Activity_bar from '../Activity_bar';

const PlusIcon = () => {
    return <Icon name="plus" size={HEIGHT(12)} color={col_off_white} />
}

function List_header() {
    return (
        <LinearGradient
            colors={[col_primary, col_secondary]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <View style={styles.topContainer}>
                <View style={styles.buttonContainer}>
                    <PlusIcon />
                    <Text style={styles.text}>{s_new_one}</Text>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Activity_bar />
            </View>
        </LinearGradient>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    topContainer: {
        flex: 2,
        //backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        flex: 1,
        backgroundColor: 'blue',

    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: col_primary,
        paddingHorizontal: WIDTH(15),
        paddingVertical: HEIGHT(5),
        borderRadius: HEIGHT(5),



    },
    text: {
        fontSize: HEIGHT(12),
        color: col_off_white,
        marginLeft: WIDTH(5)
    }

});

export default List_header;
