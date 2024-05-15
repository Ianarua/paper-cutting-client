import { StyleSheet, View } from 'react-native';
import React from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';

const BusinessDetail = () => {
    return (
        <AddBackgroundHOC>
            <TopPage title="店铺信息"/>
            <View style={ styles.content }>

            </View>
        </AddBackgroundHOC>
    );
};
export default BusinessDetail;
const styles = StyleSheet.create({
    content: {
        flex: 1
    }
});
