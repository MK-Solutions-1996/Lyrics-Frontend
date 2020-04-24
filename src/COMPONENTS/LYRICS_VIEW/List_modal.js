import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    StatusBar,
    TextInput,
    TouchableNativeFeedback,
    TouchableOpacity,
    ToastAndroid,
    FlatList
} from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import {
    list_modal_close_action,
    list_create_action,
    list_new_one_state,
    list_cancel_select_action,
    list_delete_select_action,
    list_all_select_action,
    list_all_unselect_action

} from '../../REDUX';
import { DEVICE_HEIGHT, HEIGHT, WIDTH, DEVICE_WIDTH } from '../../CONSTANTS/Sizes';
import { col_white, col_secondary, col_off_white, col_primary } from '../../CONSTANTS/Colors';
import Activity_bar from '../Activity_bar';
import { s_new_one, s_name } from '../../CONSTANTS/Sinhala';
import Icon from 'react-native-vector-icons/FontAwesome'
import List_modal_list from './List_modal_list';




const PlusIcon = () => {
    return <Icon name="plus" size={HEIGHT(12)} color={col_off_white} />
}

const OkIcon = () => {
    return <Icon name="check-circle" size={HEIGHT(20)} color={col_off_white} style={styles.inputContainerIcons} />
}
const CloseIcon = () => {
    return <Icon name="times-circle" size={HEIGHT(20)} color={col_off_white} style={styles.inputContainerIcons} />
}

const ExclamationIcon = () => {
    return <Icon name="exclamation-circle" color={col_secondary} style={styles.inputContainer} size={HEIGHT(20)} />
}


const showNameError = (error) => {
    ToastAndroid.showWithGravity(
        error,
        ToastAndroid.LONG,
        ToastAndroid.CENTER
    );
}


function List_modal() {
    const dispatch = useDispatch();
    const {
        listModalVisibility,
        listNewOneState,
        listArray,
        listNameError,

        listSelectState,
        listSelectArray,
        listSelectAll
    } = useSelector(state => state.list_reducer);
    const [listName, setListname] = useState('');


    console.log('listArray:', listArray);
    console.log('listNameError:', listNameError);


    useEffect(() => {
        if (!(listNameError === null)) {
            console.log('work')
            showNameError(listNameError);
        }
    }, [listNameError])

    return (
        <Modal
            isVisible={listModalVisibility}
            onBackdropPress={() => dispatch(list_modal_close_action())}
            style={styles.modal}
            animationIn={"slideInUp"}
            animationInTiming={1000}
            animationOutTiming={1000}
            backdropTransitionInTiming={1000}
            backdropTransitionOutTiming={1000}
            useNativeDriver={true}
        >
            <StatusBar backgroundColor={'rgba(0,0,0,0.7)'} />
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    {
                        (listSelectState) ?
                            (
                                <Activity_bar

                                    allSelectState={listSelectAll}
                                    cancel_select={list_cancel_select_action}
                                    delete_select={list_delete_select_action}
                                    select_all={list_all_select_action}
                                    unselect_all={list_all_unselect_action}
                                />
                            ) :
                            (
                                (listNewOneState) ?
                                    (
                                        <TouchableNativeFeedback onPress={() => dispatch(list_new_one_state())}>
                                            <View style={styles.createListButton}>
                                                <PlusIcon />
                                                <Text style={styles.createListButtonText}>{s_new_one}</Text>
                                            </View>
                                        </TouchableNativeFeedback>
                                    ) :
                                    (
                                        <View style={styles.inputContainer}>
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder={s_name}
                                                onChangeText={(text) => setListname(text)}
                                            />

                                            <TouchableOpacity onPress={() => dispatch(list_create_action(listName, listArray))}>
                                                <OkIcon />
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={() => dispatch(list_new_one_state())}>
                                                <CloseIcon />
                                            </TouchableOpacity>
                                        </View>
                                    )
                            )
                    }
                </View>
                <View style={styles.bottomContainer}>
                    <FlatList
                        data={listArray}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={item => item.listName}
                        renderItem={({ item, index }) => <List_modal_list key={item.listName} listObject={item} />}
                    />
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0
    },

    container: {
        //flex: 1,
        height: DEVICE_HEIGHT * 0.30,
        backgroundColor: col_white,
    },
    topContainer: {
        flex: 1,
        backgroundColor: col_secondary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomContainer: {
        flex: 4,
        //backgroundColor: 'blue'
    },
    createListButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: col_primary,
        paddingHorizontal: WIDTH(15),
        paddingVertical: HEIGHT(5),
        borderRadius: HEIGHT(5),
    },
    createListButtonText: {
        fontSize: HEIGHT(12),
        color: col_off_white,
        marginLeft: WIDTH(5)
    },
    inputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        backgroundColor: col_off_white,
        marginVertical: HEIGHT(2),
        width: DEVICE_WIDTH / 2,
        borderRadius: HEIGHT(5)
    },
    inputContainerIcons: {
        marginHorizontal: DEVICE_WIDTH * 0.04
    },



})

export default React.memo(List_modal)
