import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import { ILogin } from '@/interface/ILogin.ts';
import Form, { IFormField } from '@/components/Form';
import LinearGradient from 'react-native-linear-gradient';
import { login } from '@/api/login.ts';
import storage from '@/utils/storage.ts';
import { navigate, reset } from '@/utils/navigation.ts';
import { useProjectStore } from '@/store';

const Login = () => {
    const [loginData, setLoginData] = useState<ILogin>({
        username: '',
        password: ''
    });

    const [isLogin, setIsLogin] = useState(false);

    // 修改信息文本
    function changeInput (field: string, value: string) {
        setLoginData(prevState => ({
            ...loginData,
            [field]: value
        }));
    }

    // 表单传回来的是否验证通过
    const [isPass, setIsPass] = useState(false);

    // 表单配置
    const formConfig: IFormField[] = [
        {
            name: 'username',
            label: '账号',
            maxLength: 10,
            required: true
        },
        {
            name: 'password',
            label: '密码',
            maxLength: 10,
            required: true
        },
    ];

    // 登录
    function loginHandle () {
        if (isPass) {
            // Toast.info({
            //     message: '登陆中 ……',
            //     duration: 0
            // })
            setIsLogin(true);
            login(loginData.username, loginData.password).then(async (res: any) => {
                await storage.save({ key: 'token', data: res.token });
                reset('Main');
            }).finally(() => setIsLogin(false));
        }
    }

    return (
        <AddBackgroundHOC>
            <View style={ styles.content }>
                <View style={ styles.title }>
                    <Text style={ styles.titleText }>登录</Text>
                </View>
                <View style={ styles.inner }>
                    <Form
                        formConfig={ formConfig }
                        formData={ loginData }
                        isEditable={ true }
                        onInputChange={ changeInput }
                        verifiedPassedFunc={ (isPass: boolean) => setIsPass(prevState => isPass) }
                    />
                </View>
                <LinearGradient
                    style={ styles.btn }
                    colors={ ['#b94621', '#e36723cc'] }
                    start={ { x: 0, y: 0 } }
                    end={ { x: 1, y: 0 } }
                >
                    {
                        !isLogin
                            ? <Pressable onPress={ loginHandle }>
                                <Text style={ { color: '#fff' } }>登录</Text>
                            </Pressable>
                            : <Pressable>
                                <Text style={ { color: '#fff' } }>登录中……</Text>
                            </Pressable>
                    }
                </LinearGradient>
                <Pressable
                    style={ styles.regBtn }
                    onPress={ () => navigate('Register') }
                >
                    <Text>没有账号?<Text style={ { fontSize: 14, color: '#2279ea' } }>点击去注册</Text></Text>
                </Pressable>
            </View>
        </AddBackgroundHOC>
    );
};
export default Login;
const styles = StyleSheet.create({
    content: {
        padding: 10,
        alignItems: 'center'
    },
    title: {
        width: '100%',
        height: '10%',
        marginTop: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        fontSize: 24,
        color: '#000'
    },
    inner: {
        width: '100%',
        marginTop: '10%',
    },
    btn: {
        marginTop: '15%',
        width: 80,
        height: 40,
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    regBtn: {
        marginTop: '10%',
        position: 'absolute',
        right: 10,
        bottom: -10
    }
});
