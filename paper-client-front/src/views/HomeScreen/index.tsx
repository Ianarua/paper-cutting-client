import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import HomeTop from './components/HomeTop';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '@/views/HomeScreen/components/HomePage';
import DiscussPage from '@/views/HomeScreen/components/DiscussPage';
import { useNavigation } from '@react-navigation/native';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';

/*
    BottomTab的首页,里面有:
        HomeTop,自己的组件
        Stack,HomeTop控制的页面
 */
const HomeScreen = (props: any) => {
    const Stack = createStackNavigator();
    const navigation = useNavigation();
    const [page, setPage] = useState(0);
    const onNavigator = (page: number) => {
        if (page === 0) {
            setPage(0);
            // @ts-ignore
            navigation.navigate('主页');
        } else if (page === 1) {
            setPage(1);
            // @ts-ignore
            navigation.navigate('社区');
        }
    };
    return (
        <AddBackgroundHOC>
            <HomeTop page={ page } onNavigator={ onNavigator }/>
            <Stack.Navigator
                screenOptions={ {
                    // @ts-ignore
                    headerMode: 'none',
                } }
            >
                <Stack.Screen
                    name="主页"
                    component={ HomePage }
                    options={{
                        cardStyleInterpolator: undefined,
                    }}
                />
                <Stack.Screen
                    name="社区"
                    component={ DiscussPage }
                    options={{
                        cardStyleInterpolator: undefined,
                    }}
                />
            </Stack.Navigator>
        </AddBackgroundHOC>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 40
    }
});
export default HomeScreen;
