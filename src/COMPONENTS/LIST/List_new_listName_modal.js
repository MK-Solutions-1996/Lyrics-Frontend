import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useSelector, useDispatch } from 'react-redux';
import { col_white, col_off_white, col_primary, col_secondary } from '../../CONSTANTS/Colors';
import { list_new_name_modal_state_action, list_create_action } from '../../REDUX';
import { DEVICE_HEIGHT, HEIGHT, DEVICE_WIDTH, WIDTH } from '../../CONSTANTS/Sizes';
import { s_name } from '../../CONSTANTS/Sinhala';
import Icon from 'react-native-vector-icons/FontAwesome'

const OkIcon = () => {
    return <Icon name="check-circle" size={DEVICE_HEIGHT * 0.04} color={col_primary} style={styles.icon} />
}
const CloseIcon = () => {
    return <Icon name="times-circle" size={DEVICE_HEIGHT * 0.04} color={col_primary} style={styles.icon} />
}

function List_new_listName_modal() {
    const dispatch = useDispatch();
    const { listArray, listNewNameModalVisibility } = useSelector(state => state.list_reducer);
    const [listName, setListname] = useState('');


    return (
        <Modal
            style={styles.modal}
            isVisible={listNewNameModalVisibility}
            //onBackdropPress={() => dispatch(list_new_name_modal_state_action())}
            animationInTiming={1000}
            animationIn={"slideInDown"}
            animationOutTiming={3000}
            animationOut={"slideOutUp"}
            useNativeDriver={true}
        >
            <StatusBar backgroundColor='rgba(0,0,0,0.7)' />
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder={s_name}
                        onChangeText={(text) => setListname(text)}
                    />
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => dispatch(list_create_action(listName, listArray))}>
                        <OkIcon />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => dispatch(list_new_name_modal_state_action())}>
                        <CloseIcon />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        flexDirection: 'row',
        marginTop: DEVICE_HEIGHT * 0.2,
        alignItems: 'flex-start'

    },
    container: {
        //alignItems: 'center',
        backgroundColor: col_white,
        height: DEVICE_HEIGHT * 0.15,
        width: DEVICE_WIDTH * 0.7,
        borderRadius: HEIGHT(5)

    },
    inputContainer: {
        flex: 2,
        //backgroundColor: col_secondary,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        //backgroundColor: col_primary,
        marginVertical: HEIGHT(2),
        width: DEVICE_WIDTH / 2,
        //borderRadius: HEIGHT(5),
        borderBottomWidth: WIDTH(1),
        borderColor: 'rgba(0,0,0,0.4)'
        ///borderWidth: WIDTH(1)
    },
    iconContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        //backgroundColor: col_secondary
    },
    icon: {
        marginHorizontal: WIDTH(10)
    }

})

export default React.memo(List_new_listName_modal)
