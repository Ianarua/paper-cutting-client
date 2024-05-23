import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
import { IPersonalInfoIn } from '@/interface/IPersonalInfo.ts';
import { getShowInfo, postChangeInfo } from '@/api/buyerInfo';
import { useIsFocused } from '@react-navigation/native';
import Form, { IFormField } from '@/components/Form';

const PersonalInfo = () => {
    const [personalInfoDataIn, setPersonalInfoDataIn] = useState<IPersonalInfoIn>({
        picUrl: require('@/assets/img/logo.png'),
        buyerId: '',
        buyerName: '',
        buyerHobby: '',
        buyerAutograph: ''
    });

    const isFocused = useIsFocused();

    useEffect(() => {
        !(async function () {
            const res: any = await getShowInfo();
            res.buyerHobby === null && (res.buyerHobby = '');
            res.buyerAutograph === null && (res.buyerAutograph = '');
            setPersonalInfoDataIn(res);
        })();
    }, [isFocused]);
    // 切换修改/保存状态
    const [isEdit, setIsEdit] = useState(false);

    async function handleEditButtonPress () {
        // 当前是修改状态 -> 保存信息(加了判断有没有通过验证)
        if (isEdit && isPass) {
            // 调接口
            await postChangeInfo(personalInfoDataIn);
            setIsEdit(false);
        } else {
            // 当前不是修改状态 -> 点一下变成修改状态
            setIsEdit(true);
        }
    }

    // 修改信息文本
    function changeInput (field: string, value: string) {
        setPersonalInfoDataIn(prevState => ({
            ...personalInfoDataIn,
            [field]: value
        }));
    }

    // 表单传回来的是否验证通过
    const [isPass, setIsPass] = useState(false);

    // 表单配置
    const formConfig: IFormField[] = [
        {
            name: 'buyerHobby',
            label: '爱好',
            maxLength: 10,
            required: true
        },
        {
            name: 'buyerAutograph',
            label: '个人签名',
            maxLength: 10,
            required: true
        },
    ];

    return (
        <AddBackgroundHOC>
            <TopPage title="个人信息"/>
            <View style={ styles.content }>
                <View style={ styles.info }>
                    <View style={ styles.editView }>
                        <Pressable
                            style={ styles.editBtn }
                            onPress={ handleEditButtonPress }
                        >
                            {
                                isEdit
                                    ? <Text style={ { color: '#fff', fontSize: 16 } }>保存</Text>
                                    : <Text style={ { color: '#fff', fontSize: 16 } }>修改</Text>
                            }
                        </Pressable>
                    </View>
                    <View style={ {
                        width: 120,
                        height: 120,
                        borderRadius: 240,
                        backgroundColor: '#f2c88c',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    } }>
                        <Image
                            style={ styles.picUrl }
                            // source={ personalInfoDataIn.picUrl }
                            source={ require('@/assets/img/minePage/mine.png') }
                            defaultSource={ require('@/assets/img/logo.png') }
                        />
                    </View>
                    <Form
                        formConfig={ formConfig }
                        formData={ personalInfoDataIn }
                        isEditable={ isEdit }
                        onInputChange={ changeInput }
                        verifiedPassedFunc={ (isPass: boolean) => {
                            setIsPass(prevState => isPass);
                        } }
                    />
                    {/*<View style={ styles.buyerItem }>*/ }
                    {/*    <Text style={ styles.buyerText }>用户名称: </Text>*/ }
                    {/*    <TextInput*/ }
                    {/*        maxLength={ 10 }*/ }
                    {/*        style={ styles.buyerTextInput }*/ }
                    {/*        value={ personalInfoDataIn.buyerName }*/ }
                    {/*        editable={ isEdit }*/ }
                    {/*        onChangeText={ (value) => changeInput('buyerName', value) }*/ }
                    {/*    />*/ }
                    {/*</View>*/ }
                    {/*<View style={ styles.buyerItem }>*/ }
                    {/*    <Text style={ styles.buyerText }>爱好: </Text>*/ }
                    {/*    <TextInput*/ }
                    {/*        maxLength={ 10 }*/ }
                    {/*        style={ styles.buyerTextInput }*/ }
                    {/*        value={ personalInfoDataIn.buyerHobby }*/ }
                    {/*        editable={ isEdit }*/ }
                    {/*        onChangeText={ (value) => changeInput('buyerHobby', value) }*/ }
                    {/*    />*/ }
                    {/*</View>*/ }
                    {/*<View style={ styles.buyerItem }>*/ }
                    {/*    <Text style={ styles.buyerText }>个人签名: </Text>*/ }
                    {/*    <TextInput*/ }
                    {/*        maxLength={ 10 }*/ }
                    {/*        style={ styles.buyerTextInput }*/ }
                    {/*        value={ personalInfoDataIn.buyerAutograph }*/ }
                    {/*        editable={ isEdit }*/ }
                    {/*        onChangeText={ (value) => changeInput('buyerAutograph', value) }*/ }
                    {/*    />*/ }
                    {/*</View>*/ }
                </View>
            </View>
        </AddBackgroundHOC>
    );
};
export default PersonalInfo;
const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    info: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10
    },
    editView: {
        position: 'relative',
        width: '100%',
        height: 30,
    },
    editBtn: {
        width: 50,
        height: 30,
        position: 'absolute',
        right: 10,
        backgroundColor: '#deb880',
        borderRadius: 15,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    picUrl: {
        width: 100,
        height: 100
    },
    buyerItem: {
        width: '100%',
        height: 40,
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buyerText: {
        width: '20%',
        paddingLeft: 5
    },
    buyerTextInput: {
        flex: 1,
        paddingLeft: 10,
        backgroundColor: '#f5f5f5',
        borderRadius: 15
    }
});
