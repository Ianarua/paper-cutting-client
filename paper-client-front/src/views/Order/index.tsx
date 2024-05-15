import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
import { IOrderBlock } from '@/interface/IOrderBlock.ts';
import OrderItem from '@/views/Order/components/OrderItem';

const Order = () => {
    const [orderData, setOrderData] = useState<IOrderBlock[]>([]);
    return (
        <AddBackgroundHOC>
            <TopPage title="我的订单"/>
            <View style={ styles.content }>
                {
                    orderData.map((item, index) => {
                        return (
                            <OrderItem/>
                        );
                    })
                }
            </View>
        </AddBackgroundHOC>
    );
};
export default Order;
const styles = StyleSheet.create({
    content: {
        flex: 1,
        padding: 5
    }
});
