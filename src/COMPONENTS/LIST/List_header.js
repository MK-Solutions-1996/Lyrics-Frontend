import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { col_primary, col_secondary, col_off_white } from '../../CONSTANTS/Colors';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HEIGHT, WIDTH } from '../../CONSTANTS/Sizes';
import { s_new_one } from '../../CONSTANTS/Sinhala';
import Activity_bar from '../Activity_bar';
import { useDispatch, useSelector } from 'react-redux';
import { list_new_name_modal_state_action, list_cancel_select_action, list_delete_select_action, list_all_select_action, list_all_unselect_action } from '../../REDUX'

const PlusIcon = () => {
    return <Icon name="plus" size={HEIGHT(12)} color={col_off_white} />
}

function List_header() {

    const dispatch = useDispatch();

    const {
        listArray,
        songId,
        listSelectState,
        listSelectArray,
        listSelectAll,
        listOpenObject
    } = useSelector(state => state.list_reducer);


    return (
        <LinearGradient
            colors={[col_primary, col_secondary]}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}>
            <View style={styles.topContainer}>
                <TouchableNativeFeedback onPress={() => dispatch(list_new_name_modal_state_action())}>
                    <View style={styles.buttonContainer}>
                        <PlusIcon />
                        <Text style={styles.text}>{s_new_one}</Text>
                    </View>
                </TouchableNativeFeedback>
            </View>
            <View style={styles.bottomContainer}>
                {
                    (listSelectState) &&
                    <Activity_bar
                        allSelectState={listSelectAll}
                        cancel_select={list_cancel_select_action}
                        delete_select={list_delete_select_action}
                        select_all={list_all_select_action}
                        unselect_all={list_all_unselect_action}
                    />
                }

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
        //backgroundColor: 'blue',

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
