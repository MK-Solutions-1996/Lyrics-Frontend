import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { col_off_white, col_secondary } from '../CONSTANTS/Colors';
import { useDispatch } from 'react-redux';
import { WIDTH, HEIGHT } from '../CONSTANTS/Sizes';


const TrachIcon = () => {
    return <Icon1 name="trash" size={HEIGHT(20)} color={col_off_white} style={styles.icon} />;
}

const CancelIcon = () => {
    return <Icon1 name="close" size={HEIGHT(20)} color={col_off_white} style={styles.icon} />;
}

const SquareIcon = () => {
    return <Icon2 name="square" size={HEIGHT(20)} color={col_off_white} style={styles.icon} />;
}

const CheckedSquare = () => {
    return <Icon1 name="check-square" size={HEIGHT(20)} color={col_off_white} style={styles.icon} />;
}


function Activity_bar({ allSelectState, cancel_select, delete_select, unselect_all, select_all }) {
    const dispatch = useDispatch()
    return (
        <View style={styles.avtivityBarContainer}>
            <TouchableOpacity onPress={() => dispatch(cancel_select())}>
                <CancelIcon />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => dispatch(delete_select())}>
                <TrachIcon />
            </TouchableOpacity>
            {
                (allSelectState) ?
                    (
                        <TouchableOpacity onPress={() => dispatch(unselect_all())}>
                            <CheckedSquare />
                        </TouchableOpacity>
                    )
                    :
                    (
                        <TouchableOpacity onPress={() => dispatch(select_all())}>
                            <SquareIcon />
                        </TouchableOpacity>
                    )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    avtivityBarContainer: {
        flex: 1,
        backgroundColor: col_secondary,
        alignItems: 'center',
        flexDirection: 'row-reverse',
        //justifyContent: 'center'
    },
    icon: {
        marginHorizontal: WIDTH(10),
        //marginVertical: HEIGHT(5)
    }
});

export default Activity_bar
