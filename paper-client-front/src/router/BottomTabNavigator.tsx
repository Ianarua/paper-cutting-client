import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { StyleSheet } from 'react-native';
import HomeScreen from '@/views/HomeScreen';
import ShoppingScreen from '@/views/ShoppingScreen';
import CarScreen from '@/views/CarScreen';
import MineScreen from '@/views/MineScreen';

function BottomTab () {
    const BottomTab = createBottomTabNavigator();
    const bottomTab = [
        {
            name: '首页',
            component: HomeScreen,
        },
        {
            name: '商城',
            component: ShoppingScreen
        },
        {
            name: '购物车',
            component: CarScreen
        },
        {
            name: '我的',
            component: MineScreen
        }
    ];
    return (
        <BottomTab.Navigator
            screenOptions={ ({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = '';
                    switch (route.name) {
                        case '首页':
                            iconName = 'home';
                            break;
                        case '商城':
                            iconName = 'isv';
                            break;
                        case '购物车':
                            iconName = 'shoppingcart';
                            break;
                        case '我的':
                            iconName = 'user';
                            break;
                    }

                    return (
                        <AntDesignIcon
                            name={ iconName }
                            size={ size }
                            color={ '#FFFFFFBA' }
                        />
                    );
                },
                tabBarStyle: {
                    backgroundColor: '#84331c'
                },
                tabBarActiveTintColor: '#f2c88c',
                tabBarShowLabel: false
            }) }
        >
            {
                bottomTab.map((item, index) => {
                    return (
                        <BottomTab.Screen
                            key={ index }
                            name={ item.name }
                            component={ item.component }
                            options={ {
                                headerShown: false,
                            } }
                        />
                    );
                })
            }
        </BottomTab.Navigator>
    );
}

const styles = StyleSheet.create({
    content: {
        width: '20%'
    }
});

export default BottomTab;
