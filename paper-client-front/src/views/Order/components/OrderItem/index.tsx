import { StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';
import { IOrderBlock } from '@/interface/IOrderBlock.ts';

interface IProps extends IOrderBlock {
}

const OrderItem: FC<IProps> = (props) => {
    return (
        <View style={ styles.content }>
            <View style={ styles.address }></View>
            <Text>OrderItem</Text>
        </View>
    );
};
export default OrderItem;
const styles = StyleSheet.create({
    content: {
        width: '100%'
    },
    address: {},

});
