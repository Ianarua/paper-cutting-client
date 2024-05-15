import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyText from '@/components/MyText';
import { createStackNavigator } from '@react-navigation/stack';
import { Shadow } from 'react-native-shadow-2';
import ShopCategory from '@/views/ShoppingScreen/commponents/ShopCategory';
import { IShopCategory } from '@/interface/IShopPage.ts';
import { useNavigation } from '@react-navigation/native';
import IsRenderHOC from '@/components/HOC/IsRenderHOC.tsx';
import { getWithChildrenCategory } from '@/api/Category';
import shopCategory from '@/views/ShoppingScreen/commponents/ShopCategory';

const ShoppingScreen = () => {
    const [searchValue, setSearchValue] = useState('');
    const [shopItemAll, setShopItemAll] = useState<IShopCategory[]>([]);
    const [shopItemActive, setShopItemActive] = useState<IShopCategory>({
        goodCategoryName: '',
        goodsCategoryId: 0,
        categorySuperiorId: 0,
        children: []
    });
    // 获取所有目录
    useEffect(() => {
        !(async function () {
            const res = await getWithChildrenCategory();
            // @ts-ignore   后端直接在data里面返回来了数组,
            setShopItemAll(res);
        })();
    }, []);
    // 等待获取完所有目录的时候,设置active目录
    useEffect(() => {
        if (shopItemAll.length > 0) {
            setShopItemActive(shopItemAll[0]);
        }
    }, [shopItemAll]);


    function changeShopCategory (goodsCategoryId: number) {
        // 设置active
        const activeItem = shopItemAll?.find(item => item.goodsCategoryId === goodsCategoryId)!;
        console.log('点击了', activeItem.goodCategoryName);
        setShopItemActive({
            goodCategoryName: activeItem.goodCategoryName,
            goodsCategoryId: activeItem.goodsCategoryId,
            categorySuperiorId: activeItem.categorySuperiorId,
            children: activeItem.children
        });
        // @ts-ignore
        // navigation.navigate('商品', { shopCategoryData: activeItem });
    }

    const sideMenu = shopItemAll?.map(item => ({
        goodCategoryName: item.goodCategoryName,
        goodsCategoryId: item.goodsCategoryId,
        categorySuperiorId: item.categorySuperiorId
    }));

    return (
        <View style={ styles.content }>
            <ImageBackground source={ require('@/assets/img/shoppingPage/topBackground.png') }>
                <View style={ styles.header }>
                    <View style={ styles.title }><MyText text="商 城" styles={ { color: '#863620', fontSize: 18 } }/></View>
                    <View style={ styles.search }>
                        <Image
                            source={ require('@/assets/img/shoppingPage/topIcon.png') }
                            style={ { height: 20, width: 74, marginRight: 10 } }
                        />
                        <View style={ styles.searchBarInner }>
                            <Image
                                source={ require('@/assets/img/shoppingPage/search.png') }
                                style={ { width: 12, height: 12, marginRight: 5 } }
                            />
                            <TextInput
                                style={ styles.searchBarInput }
                                placeholder={ '输入搜索内容' }
                                value={ searchValue }
                                onChangeText={ text => setSearchValue(text) }
                            />
                            <Image
                                source={ require('@/assets/img/shoppingPage/camera.png') }
                                style={ { width: 12, height: 12, marginLeft: 5 } }
                            />
                        </View>
                    </View>
                </View>
                <View style={ styles.main }>
                    <View style={ styles.sideMenu }>
                        {
                            sideMenu?.map((item, index) => {
                                return (
                                    <View key={ index } style={ item.goodsCategoryId === shopItemActive?.goodsCategoryId && styles.sideMenuActive }>
                                        <IsRenderHOC
                                            isShow={ item.goodsCategoryId === shopItemActive?.goodsCategoryId }
                                            style={ styles.sideMenuActiveBlock }
                                        >
                                            <View/>
                                        </IsRenderHOC>
                                        <Pressable
                                            style={ styles.sideMenuItem }
                                            onPress={ () => changeShopCategory(item.goodsCategoryId) }
                                        >
                                            <MyText text={ item.goodCategoryName }/>
                                        </Pressable>
                                    </View>
                                );
                            })
                        }
                    </View>

                    <View style={ { flex: 1 } }>
                        <Shadow distance={ 5 } offset={ [-1, 5] } style={ styles.mainInner }>
                            {/*/!*{ isDataLoaded && (*!/*/ }
                            {/*    <Stack.Navigator*/ }
                            {/*        screenOptions={ {*/ }
                            {/*            // @ts-ignore*/ }
                            {/*            headerMode: 'none'*/ }
                            {/*        } }*/ }
                            {/*    >*/ }
                            {/*        <Stack.Screen*/ }
                            {/*            name="商品"*/ }
                            {/*            component={ ShopCategory }*/ }
                            {/*            initialParams={ { shopCategoryData: shopItemAll[0] } }*/ }
                            {/*        />*/ }
                            {/*    </Stack.Navigator>*/ }
                            {/*/!*) }*!/*/ }
                            <ShopCategory shopCategoryData={ shopItemActive }/>
                        </Shadow>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
};
export default ShoppingScreen;
const styles = StyleSheet.create({
    content: {},
    header: {
        height: 80,
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        marginTop: 10
    },
    search: {
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        overflow: 'hidden'
    },
    searchBarInner: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 18,
    },
    searchBarInput: {
        flex: 1,
        padding: 0,
    },
    main: {
        width: '100%',
        height: Dimensions.get('window').height - 80,
        display: 'flex',
        flexDirection: 'row'
    },
    sideMenu: {
        width: '25%',
        height: '100%',
        backgroundColor: '#fff'
    },
    sideMenuActive: {
        backgroundColor: '#f1ece6',
        position: 'relative'
    },
    sideMenuActiveBlock: {
        position: 'absolute',
        height: 15,
        width: 8,
        left: 5,
        top: '35%',
        backgroundColor: '#84321c'
    },
    sideMenuItem: {
        height: 50,
        marginLeft: 10,
        marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#b0b0b0',
        borderStyle: 'solid',
    },
    mainInner: {
        width: '100%',
        height: '100%',
        // display: 'flex',
        // flexDirection: 'row'
    },
});
