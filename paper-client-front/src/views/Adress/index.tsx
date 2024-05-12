import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';

const Address = () => {
    return (
        <AddBackgroundHOC>
            <TopPage title="修改地址"/>
            <View style={ styles.content }>
                <Text>Address</Text>
            </View>
        </AddBackgroundHOC>
    );
};
export default Address;
const styles = StyleSheet.create({
    content: {
        flex: 1,
    }
});
