import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
import { IAddress } from '@/interface/IAddress.ts';
import { getAllAddress } from '@/api/Address';
import AddressItem from './components/AddressItem/index.tsx';

const Address = () => {
    const [addressData, setAddressData] = useState<IAddress[]>([]);
    useEffect(() => {
        !(async function () {
            const res: any = await getAllAddress();
            setAddressData(res);
        })();
    }, []);
    return (
        <AddBackgroundHOC>
            <TopPage title="我的收货地址"/>
            <View style={ styles.content }>
                {
                    addressData.map((item, index) => {
                        return (
                            <AddressItem key={ index } IAddressData={ item }/>
                        );
                    })
                }
            </View>
        </AddBackgroundHOC>
    );
};
export default Address;
const styles = StyleSheet.create({
    content: {
        flex: 1,
        marginLeft: 5,
        marginRight: 5
    }
});
