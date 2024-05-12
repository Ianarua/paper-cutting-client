import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';

const SetUp = () => {
    return (
        <AddBackgroundHOC>
            <TopPage title="设置"/>
            <View style={ styles.content }>
                <Text>SetUp</Text>
            </View>
        </AddBackgroundHOC>
    );
};
export default SetUp;
const styles = StyleSheet.create({
    content: {}
});
