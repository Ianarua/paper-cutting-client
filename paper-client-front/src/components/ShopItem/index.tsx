import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { IShopItem } from '@/interface/IShopPage.ts';
import { useNavigation } from '@react-navigation/native';

interface IProps {
    shopItemData: IShopItem;
}

const ShopItem = (props: IProps) => {
    const navigation = useNavigation();
    const { goodCategoryName, goodsCategoryId } = props.shopItemData;
    return (
        <Pressable
            style={ styles.content }
            // @ts-ignore
            onPress={ () => navigation.navigate('ShoppingList', { goodsCategoryId }) }
        >
            <View style={ styles.image }>
                <Text style={ styles.imageText }>{ goodCategoryName }</Text>
            </View>
        </Pressable>
    );
};
export default ShopItem;
const styles = StyleSheet.create({
    content: {
        width: 67.5,
        height: 100,
        display: 'flex',
        justifyContent: 'center',
    },
    image: {
        height: 60,
        width: 60,
        borderRadius: 120,
        backgroundColor: '#f1ece6',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageText: {
        color: '#84321c',
        fontSize: 18
    }
});
