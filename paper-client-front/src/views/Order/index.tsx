import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
import { IOrderBlock } from '@/interface/IOrderBlock.ts';
import OrderItem from '@/views/Order/components/OrderItem';
import { getAllOrder } from '@/api/Order';
import { useIsFocused } from '@react-navigation/native';

const Order = () => {
    const isFocused = useIsFocused();
    const [orderData, setOrderData] = useState<IOrderBlock[]>([]);
    useEffect(() => {
        !(async function () {
            const res: any = getAllOrder();
            setOrderData(res.list);
        })();
    }, [isFocused]);
    return (
        <AddBackgroundHOC>
            <TopPage title="我的订单"/>
            <View style={ styles.content }>
                {
                    orderData.map((item, index) => {
                        return (
                            <OrderItem
                                key={ index }
                                orderItemData={ item }
                            />
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
