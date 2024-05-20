import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { FC, ReactNode } from 'react';

interface IProps {
    isShow: boolean,
    onClose: () => void,
    children: ReactNode
}

const CenterModal: FC<IProps> = (props) => {
    const { isShow, onClose, children } = props;
    return (
        <Modal
            transparent={ true }
            animationType="fade"
            visible={ isShow }
            onRequestClose={ onClose } // 返回键调用关闭
        >
            <View style={ styles.overlay }>
                <View style={ styles.content }>
                    { children }
                </View>
            </View>
        </Modal>
    );
};

export default CenterModal;

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center', // 垂直居中
        alignItems: 'center', // 水平居中
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        width: '80%',
        height:'50%',
        justifyContent: 'center', // 垂直居中
        alignItems: 'center', // 水平居中
        backgroundColor: '#ffffff',
        padding: 20,
        borderRadius: 10,
    },
});
