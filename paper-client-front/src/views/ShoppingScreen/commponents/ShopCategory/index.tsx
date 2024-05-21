import { StyleSheet, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { IShopCategory } from '@/interface/IShopCategory.ts';
import ShopItem from '@/components/ShopItem';
import MyText from '@/components/MyText';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';

interface IProps {
    shopCategoryData: IShopCategory;
}

const ShopCategory: FC<IProps> = (props) => {
    // const route = useRoute<RootRouteType<Views.Shop>>();
    // 路由参数获取
    // const { shopCategoryData } = route.params;
    const { shopCategoryData } = props;
    const shopCategoryDataChildren = shopCategoryData;
    shopCategoryDataChildren?.children.push({
        goodCategoryName: '',
        goodsCategoryId: -1,
        categorySuperiorId: -1,
        children: []
    });
    return (
        <AddBackgroundHOC>
            <View style={ styles.content }>
                <View style={ styles.title }>
                    <MyText text={ shopCategoryData.goodCategoryName } styles={ { color: '#84321c', fontWeight: 'bold' } }/>
                </View>
                <View style={ styles.mainInner }>
                    {
                        shopCategoryDataChildren?.children.map((item, index) => {
                            return (
                                <ShopItem key={ index } shopItemData={ item }/>
                            );
                        })
                    }
                </View>
            </View>
        </AddBackgroundHOC>
    );
};
export default ShopCategory;
const styles = StyleSheet.create({
    content: {
        width: '100%',
        height: '100%',
        padding: 10,
    },
    title: {
        marginTop: 10,
    },
    mainInner: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    }
});
