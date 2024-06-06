import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
import { useNavigation } from '@react-navigation/native';
import { navigate, navigationRef, reset } from '@/utils/navigation.ts';
import { logout } from '@/api/login.ts';
import storage from '@/utils/storage.ts';

const SetUp = () => {
    const navigation = useNavigation();
    const data = [
        {
            title: '修改收货地址',
            page: 'Address'
        },
        {
            title: '我的安全'
        },
        {
            title: '通用'
        },
        {
            title: '帮助与反馈'
        },
        {
            title: '关于'
        },
        {
            title: '退出登录',
            page: 'Login'
        },
        // {
        //     title: '注册',
        //     page: 'Register'
        // }
    ];

    async function pressHandle (item: { title: string, page: string }) {
        if (item.hasOwnProperty('page')) {
            if (item.title === '退出登录') {
                await logout();
                await storage.remove({ key: 'token' });
                reset('Login'); // 清空栈并跳转到登录页面
            } else {
                navigate(item.page);
            }
        }
    }

    return (
        <AddBackgroundHOC>
            <TopPage title="设置"/>
            <View style={ styles.content }>
                {/*<Pressable*/ }
                {/*    style={ styles.address }*/ }
                {/*    // @ts-ignore*/ }
                {/*    onPress={ () => navigation.navigate('Address') }*/ }
                {/*>*/ }
                {/*    <Text>修改收货地址</Text>*/ }
                {/*</Pressable>*/ }
                {
                    data.map((item, index) => {
                        return (
                            <Pressable
                                key={ index }
                                style={ styles.item }
                                onPress={ () => {
                                    // item.title === '修改收货地址' && navigation.navigate('Address');
                                    // @ts-ignore
                                    // item.hasOwnProperty('page') && page === 'Login'
                                    //     ? navigationRef(item.page)
                                    //     : navigationRef(item.page);
                                    pressHandle(item);
                                } }
                            >
                                <Text style={ { fontSize: 16, color: '#000' } }>{ item.title } </Text>
                                <Text style={ { fontSize: 16, color: '#000' } }>{ '>' }</Text>
                            </Pressable>
                        );
                    })
                }
            </View>
        </AddBackgroundHOC>
    );
};
export default SetUp;
const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingLeft: 5,
        paddingRight: 5,
        display: 'flex',
        alignItems: 'center'
    },
    item: {
        width: '100%',
        height: 50,
        marginTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f2f2f2',
        borderRadius: 18
    }
});
