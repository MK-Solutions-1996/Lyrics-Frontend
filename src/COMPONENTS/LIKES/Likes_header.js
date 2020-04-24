import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { col_primary, col_secondary, col_black, col_white, col_off_white } from '../../CONSTANTS/Colors';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { HEIGHT, WIDTH } from '../../CONSTANTS/Sizes';
import { useSelector, useDispatch } from 'react-redux';
import {
    like_cancel_select_action,
    like_delete_select_action,
    like_do_unselect_all_action,
    like_do_select_all_action
} from '../../REDUX';



const HeartIcon = () => {
    return <Icon1 name="heart" size={HEIGHT(40)} color={col_off_white} />;
}

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



function Likes_header() {
    const dispatch = useDispatch();
    const { likesArray, selectState, selectAll } = useSelector(state => state.like_reducer);

    return (
        <LinearGradient
            colors={[col_primary, col_secondary]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>

            <View style={styles.imageConatiner}>
                <HeartIcon />
            </View>
            {
                (selectState) &&
                <View style={styles.avtivityBarContainer}>
                    <TouchableOpacity onPress={() => dispatch(like_cancel_select_action())}>
                        <CancelIcon />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => dispatch(like_delete_select_action())}>
                        <TrachIcon />
                    </TouchableOpacity>
                    {
                        (selectAll) ?
                            (
                                <TouchableOpacity onPress={() => dispatch(like_do_unselect_all_action())}>
                                    <CheckedSquare />
                                </TouchableOpacity>
                            )
                            :
                            (
                                <TouchableOpacity onPress={() => dispatch(like_do_select_all_action())}>
                                    <SquareIcon />
                                </TouchableOpacity>
                            )
                    }
                </View>
            }

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageConatiner: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
        //backgroundColor: 'blue'
    },
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

export default Likes_header
