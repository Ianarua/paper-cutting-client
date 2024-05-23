import { createStackNavigator } from '@react-navigation/stack';
import router from '../router';
import { PermissionsAndroid } from 'react-native';
import { useEffect } from 'react';

/*
    只遍历Stack
 */
function CuttingIndex () {
    // 权限请求
    const requestPermissions = async () => {
        try {
            // 请求存储权限
            const storagePermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: '存储权限请求',
                    message: '应用需要访问存储以保存数据。',
                    buttonPositive: '授权',
                    buttonNegative: '拒绝',
                },
            );

            // 请求网络权限
            const networkPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: '网络权限请求',
                    message: '应用需要访问网络以加载数据。',
                    buttonPositive: '授权',
                    buttonNegative: '拒绝',
                },
            );

            // 请求相机权限
            const cameraPermission = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: '相机权限请求',
                    message: '应用需要访问相机以拍摄照片或录制视频。',
                    buttonPositive: '授权',
                    buttonNegative: '拒绝',
                },
            );

            if (
                storagePermission === PermissionsAndroid.RESULTS.GRANTED &&
                networkPermission === PermissionsAndroid.RESULTS.GRANTED &&
                cameraPermission === PermissionsAndroid.RESULTS.GRANTED
            ) {
                console.log('权限已授予');
                // 继续应用程序的正常逻辑
            } else {
                console.log('用户拒绝了权限请求');
                // 提示用户权限未授予，并提供说明或引导用户手动授予权限的方法
            }
        } catch (error) {
            console.error('请求权限时出错:', error);
        }
    };
    useEffect(() => {
        requestPermissions().then();
    }, []);
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator>
            {
                router.map((item, index) => {
                    return (
                        <Stack.Screen
                            key={ index }
                            name={ item.name }
                            component={ item.component }
                            options={ {
                                // @ts-ignore
                                headerMode: 'none',
                                cardStyleInterpolator: undefined,
                            } }
                        />
                    );
                })
            }
        </Stack.Navigator>
    );

}

export default CuttingIndex;
