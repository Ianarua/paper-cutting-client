import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import router from './index.tsx';
import { StyleSheet } from 'react-native';

function BottomTab () {
    const BottomTab = createBottomTabNavigator();
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
                router[0].bottomTab!.map((item, index) => {
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
