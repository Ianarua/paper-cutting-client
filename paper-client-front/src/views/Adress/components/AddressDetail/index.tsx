import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
import { useRoute } from '@react-navigation/native';
import { RootRouteType, Views } from '@/interface/IReactNavigationProps.ts';
import IsRenderHOC from '@/components/HOC/IsRenderHOC.tsx';
import { useEffect, useState } from 'react';
import { IAddress } from '@/interface/IAddress.ts';
import { getDeleteAddress, postUpdateAddress } from '@/api/Address';

const AddressDetail = () => {
    const route = useRoute<RootRouteType<Views.AddressDetail>>();
    const { addressDetailParams } = route.params;
    const [addressDetailData, setAddressDetailData] = useState<IAddress>({
        receivingAddressId: 0,
        recipientName: 'a',
        recipientPhone: 'b',
        recipientRegion: 'c',
        recipientAddress: 'd'
    });
    useEffect(() => {
        setAddressDetailData(addressDetailParams);
    }, []);
    // 报错信息
    const errorMap = new Map([
        ['recipientName', '请填写姓名'],
        ['recipientPhoneEmpty', '请填写手机号'],
        ['recipientPhoneNotNum', '必须输入数字'],
        ['recipientRegion', '请填写地区'],
        ['recipientAddress', '请填写详细地址']
    ]);
    // 一共有什么字段
    const fieldArr = ['recipientName', 'recipientPhone', 'recipientRegion', 'recipientAddress'];
    const filedMap = new Map([
        ['recipientName', '姓名'],
        ['recipientPhone', '手机号'],
        ['recipientRegion', '地区'],
        ['recipientAddress', '详细地址']
    ]);
    // 存储error报错的对象
    const [inputErrors, setInputErrors] = useState<any>({});

    // 验证函数
    function validateInput (field: string, value: string) {
        let errorMessage = '';
        switch (field) {
            case 'recipientPhone':
                if (value === '') {
                    errorMessage = errorMap.get('recipientPhoneEmpty')!;
                } else {
                    errorMessage = /^\d+$/.test(value) ? '' : errorMap.get('recipientPhoneNotNum')!;
                }
                break;
            default:
                errorMessage = value ? '' : errorMap.get(field)!;
                break;
        }
        return errorMessage;
    }

    function changeInput (field: string, value: string | number) {
        setAddressDetailData({
            ...addressDetailData,
            [field]: value
        });
    }

    // 保存按钮
    function saveAddressBtn () {
        const newErrors = {
            recipientName: '',
            recipientPhone: '',
            recipientRegion: '',
            recipientAddress: ''
        };
        newErrors.recipientName = validateInput('recipientName', addressDetailData.recipientName);
        newErrors.recipientPhone = validateInput('recipientPhone', addressDetailData.recipientPhone);
        newErrors.recipientRegion = validateInput('recipientRegion', addressDetailData.recipientRegion);
        newErrors.recipientAddress = validateInput('recipientAddress', addressDetailData.recipientAddress);
        setInputErrors(newErrors);
        // TODO 如果 newErrors 对象中没有错误信息，则可以执行保存操作
        // if (Object.values(newErrors).every(error => !error)) {
        postUpdateAddress(addressDetailData).then();
        // }
    }

    // 删除按钮
    function deleteAddressBtn () {
        // TODO 调删除接口
        getDeleteAddress(addressDetailData.receivingAddressId).then();
    }

    return (
        <AddBackgroundHOC>
            <TopPage title="编辑收货地址"/>
            <View style={ styles.content }>
                {
                    fieldArr.map((field, index) => {
                        return (
                            <View
                                key={ index }
                                style={ styles.item }
                            >
                                <View style={ styles.title }>
                                    <Text>{ filedMap.get(field) }</Text>
                                    <Text style={ { color: '#ff0000' } }>*</Text>
                                </View>
                                <View style={ styles.inputView }>
                                    <TextInput
                                        style={ styles.input }
                                        value={ addressDetailData[field] }
                                        onChangeText={ (value) => changeInput(field, value) }
                                    />
                                    {/* 取消验证 */ }
                                    {/*<View style={ styles.inputError }>*/ }
                                    {/*    <IsRenderHOC isShow={ inputErrors[field] !== '' }>*/ }
                                    {/*        <Text style={ { color: '#ff0000', fontSize: 12 } }>{ errorMap.get(field) }</Text>*/ }
                                    {/*    </IsRenderHOC>*/ }
                                    {/*</View>*/ }
                                    {/*<Text style={ { color: '#ff0000' } }>{ errorMap.get(field) }</Text>*/ }
                                </View>
                            </View>
                        );
                    })
                }
                <View style={ styles.btn }>
                    <Pressable
                        style={ styles.deleteBtn }
                        onPress={ deleteAddressBtn }
                    >
                        <Text style={ { color: '#fff' } }>删除</Text>
                    </Pressable>
                    <Pressable
                        style={ styles.saveBtn }
                        onPress={ saveAddressBtn }
                    >
                        <Text style={ { color: '#fff' } }>保存</Text>
                    </Pressable>
                </View>
            </View>
        </AddBackgroundHOC>
    );
};
export default AddressDetail;
const styles = StyleSheet.create({
    content: {
        flex: 1,
        position: 'relative',
        display: 'flex',
    },
    item: {
        width: '100%',
        height: 60,
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 5,
        display: 'flex',
        flexDirection: 'row'
    },
    title: {
        width: '20%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    inputView: {
        flex: 1
    },
    input: {
        height: '75%',
        backgroundColor: 'rgba(245,245,245,0.47)',
        borderRadius: 25
    },
    inputError: {
        flex: 1
    },
    btn: {
        width: '100%',
        height: 40,
        position: 'absolute',
        bottom: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    deleteBtn: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: '#ea3731'
    },
    saveBtn: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: '#ff7502'
    }
});
