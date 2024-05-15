import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
import { useNavigation } from '@react-navigation/native';

const SetUp = () => {
    const navigation = useNavigation();
    return (
        <AddBackgroundHOC>
            <TopPage title="设置"/>
            <View style={ styles.content }>
                <Pressable
                    style={ styles.address }
                    // @ts-ignore
                    onPress={ () => navigation.navigate('Address') }
                >
                    <Text>修改收货地址</Text>
                </Pressable>
            </View>
        </AddBackgroundHOC>
    );
};
export default SetUp;
const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    address: {}
});
