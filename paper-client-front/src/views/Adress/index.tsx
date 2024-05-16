import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
import { IAddress } from '@/interface/IAddress.ts';
import { getAllAddress } from '@/api/Address';
import AddressItem from './components/AddressItem/index.tsx';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const Address = () => {
        const [addressData, setAddressData] = useState<IAddress[]>([]);
        const isFocused = useIsFocused();
        const navigation = useNavigation();

        useEffect(() => {
            !(async function () {
                const res: any = await getAllAddress();
                setAddressData(res);
            })();
        }, [isFocused]);

        // 控制底部input是否显示(点add就显示)
        return (
            <AddBackgroundHOC>
                <TopPage title="我的收货地址"/>
                <ScrollView>
                    <View style={ styles.content }>
                        {
                            addressData.map((item, index) => {
                                return (
                                    <AddressItem key={ index } IAddressData={ item }/>
                                );
                            })
                        }
                    </View>
                </ScrollView>
                <Pressable
                    style={ styles.btn }
                    // @ts-ignore
                    onPress={ () => navigation.navigate('AddressDetail', {
                        addressDetailParams: {
                            receivingAddressId: 0,
                            buyerId: 0,
                            recipientName: '',
                            recipientPhone: '',
                            recipientAddress: '',
                            recipientRegion: ''
                        },
                        isAdd: true
                    }) }
                >
                    <AntDesignIcon name="pluscircle" color="#84321c" size={ 50 }/>
                </Pressable>
            </AddBackgroundHOC>
        );
    }
;
export default Address;
const styles = StyleSheet.create({
    content: {
        flex: 1,
        // position: 'relative',
        marginLeft: 5,
        marginRight: 5,
        paddingBottom: 100,
    }
    ,
    btn: {
        position: 'absolute',
        bottom: 30,
        right: 30,
    }
});
