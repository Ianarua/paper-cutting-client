import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { FC, ReactNode } from 'react';

interface IProps {
    isShow: boolean,
    onClose: () => void,
    children: ReactNode
}

const DownerModal: FC<IProps> = (props) => {
    const { isShow, onClose, children } = props;
    return (
        <Modal
            transparent={ true }
            animationType="fade"
            visible={ isShow }
            onResponderRelease={ onClose }
        >
            <Pressable style={ styles.overlay } onPress={ onClose }/>
            <View style={ styles.content }>
                { children }
            </View>
        </Modal>
    );
};
export default DownerModal;
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        width: '100%',
        backgroundColor: '#ffffff',
        zIndex: 1,
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
});
