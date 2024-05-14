import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';

const Order = () => {
    return (
        <AddBackgroundHOC>
            <TopPage title="我的订单"/>
            <View>
                <Text>Order</Text>
            </View>
        </AddBackgroundHOC>
    );
};
export default Order;
const styles = StyleSheet.create({});
