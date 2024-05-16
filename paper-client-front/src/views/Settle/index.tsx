import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootRouteType, Views } from '@/interface/IReactNavigationProps.ts';
import TopPage from '@/components/TopPage';
import SettleItem from '@/views/Settle/components/SettleItem';
import LinearGradient from 'react-native-linear-gradient';
import { IAddress } from '@/interface/IAddress.ts';
import { getAllAddress } from '@/api/Address';
import AddressItem from '@/views/Adress/components/AddressItem';
import { getSettleGoods } from '@/api/ProjectInfo';
import { postSettleCar } from '@/api/Car';


const Settle: FC = () => {
    const route = useRoute<RootRouteType<Views.Settle>>();
    const { settleData } = route.params;
    const navigation = useNavigation();

    // 收货地址
    const [addressData, setAddressData] = useState<IAddress[]>([]);
    useEffect(() => {
        !(async function () {
            const res: any = await getAllAddress();
            setAddressData(res);
        })();
    }, []);

    const [totalAmount, setTotalAmount] = useState(0);
    // 计算总额
    useEffect(() => {
        setTotalAmount(settleData.reduce((sum, item) => {
            return sum + item.projectInfo.promotionPrice * item.quantity;
        }, 0));
    }, []);

    // 真正结算函数
    async function settleFunc () {
        const ids: number[] = settleData.map(item => item.projectInfo.cartId);
        // 调接口
        await postSettleCar(addressData[0].receivingAddressId, ids);
        navigation.goBack();
    }

    return (
        <AddBackgroundHOC>
            <TopPage title="结算"/>
            <View style={ styles.content }>
                <View style={ styles.address }>
                    {
                        addressData.length > 0
                            ? <AddressItem IAddressData={ addressData[0] }/>
                            : <Text>暂无收货地址</Text>
                    }
                </View>
                <View style={ styles.main }>
                    {
                        settleData.map((item, index) => {
                            return (
                                <SettleItem
                                    key={ index }
                                    settleData={ item }
                                />
                            );
                        })
                    }
                </View>
                <View style={ styles.bottom }>
                    <View style={ styles.bottomLeft }>
                        <Text style={ { fontSize: 15 } }>
                            合计:
                            <Text style={ { color: '#ff0000', fontWeight: 'bold' } }>
                                ￥ { totalAmount }
                            </Text>
                        </Text>
                    </View>
                    <LinearGradient
                        style={ styles.bottomRight }
                        colors={ ['#b94621', '#e36723cc'] }
                        start={ { x: 0, y: 0 } }
                        end={ { x: 1, y: 0 } }
                    >
                        <Pressable onPress={ settleFunc }>
                            <Text style={ { color: '#fff' } }>付款</Text>
                            {/*({ isCheckedArr.length })*/ }
                        </Pressable>
                    </LinearGradient>
                </View>
            </View>
        </AddBackgroundHOC>
    );
};
export default Settle;
const styles = StyleSheet.create({
    content: {
        flex: 1,
        position: 'relative',
        display: 'flex',
        alignItems: 'center'
    },
    address: {
        width: '100%'
    },
    main: {
        flex: 1,
        display: 'flex',
        zIndex: 100
    },
    bottom: {
        position: 'absolute',
        bottom: 10,
        width: '100%',
        height: Dimensions.get('window').height * 0.06,
        paddingLeft: 15,
        paddingRight: 10,
        borderRadius: 18,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        zIndex: 101
    },
    bottomLeft: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    bottomRight: {
        width: '25%',
        height: '80%',
        marginLeft: 20,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
    }
});
