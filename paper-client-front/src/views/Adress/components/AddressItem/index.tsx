import { Pressable, StyleSheet, Text, View } from 'react-native';
import { FC } from 'react';
import { IAddress } from '@/interface/IAddress.ts';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

interface IProps {
    IAddressData: IAddress;
}

const AddressItem: FC<IProps> = (props) => {
    const navigation = useNavigation();
    const { receivingAddressId, buyerId, recipientName, recipientPhone, recipientAddress, recipientRegion } = props.IAddressData;
    return (
        <View style={ styles.content }>
            <View style={ styles.avatar }>
                <Text style={ { color: '#84321c', fontSize: 18 } }>
                    { recipientName.slice(0, 1) }
                </Text>
            </View>
            <View style={ styles.info }>
                <View style={ styles.nameTel }>
                    <Text style={ { fontSize: 16, fontWeight: 'bold', marginRight: 5 } }>{ recipientName }</Text>
                    <Text>{ recipientPhone }</Text>
                </View>
                <View style={ styles.address }>
                    <Text>{ recipientRegion + ' ' + recipientAddress }</Text>
                </View>
            </View>
            <Pressable
                style={ styles.editBtn }
                // @ts-ignore
                onPress={ () => navigation.navigate('AddressDetail', {
                    addressDetailParams: {
                        receivingAddressId, buyerId, recipientName, recipientPhone, recipientAddress, recipientRegion
                    }
                }) }
            >
                <AntDesignIcon name="edit" size={ 16 }/>
            </Pressable>
        </View>
    );
};
export default AddressItem;
const styles = StyleSheet.create({
    content: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        marginTop: 15,
        borderRadius: 15,
        backgroundColor: '#fff'
    },
    avatar: {
        width: 30,
        height: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1ece6',
        borderRadius: 120,
        marginRight: 10
    },
    info: {
        flex: 1
    },
    nameTel: {
        display: 'flex',
        flexDirection: 'row',
    },
    address: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    editBtn: {
        width: '5%'
    }
});

