import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CommunityPage from '../views/HomeScreen/components/DiscussPage';
import HomePage from '../views/HomeScreen/components/HomePage';
import router from '@/router/index.tsx';

/*
    HomeScreen用的顶栏
 */

function TopTab () {
    const TopTab = createMaterialTopTabNavigator();
    return (
        <TopTab.Navigator
            screenOptions={ {
                tabBarActiveTintColor: '#f2c88c',
                tabBarLabelStyle: {
                    fontSize: 12,
                },
                tabBarContentContainerStyle: {
                    height: 0
                },
                tabBarStyle: {
                    backgroundColor: '#84321c'
                },
                swipeEnabled: false,
            } }
        >
            { <TopTab.Screen name="主页" component={ HomePage }/> }
            { <TopTab.Screen name="社区" component={ CommunityPage }/> }
        </TopTab.Navigator>
    );
}

export default TopTab;
