import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RootRouteType, Views } from '@/interface/IReactNavigationProps.ts';
import { postCreateCar } from '@/api/Car';
import IsRenderHOC from '@/components/HOC/IsRenderHOC.tsx';

const ProjectDetail = () => {
    const route = useRoute<RootRouteType<Views.ProjectDetail>>();
    const navigation = useNavigation();
    const { projectBlockData } = route.params;
    let [isJoinCart, setIsJoinCart] = useState(false);
    useEffect(() => {
        setIsJoinCart(projectBlockData.isJoinCart);
    }, [projectBlockData]);

    async function addToCar () {
        if (!isJoinCart) {
            await postCreateCar(projectBlockData.goodsId, 1);
            setIsJoinCart(true);
            console.log('添加成功!');
        } else {
            console.log('已添加至购物车了');
        }
    }

    return (
        <AddBackgroundHOC>
            <TopPage title="商品信息"/>
            <ScrollView style={ styles.content }>
                <View style={ styles.inner }>
                    <Image
                        source={ { uri: `data:image/png;base64,${ projectBlockData.picUrl }` } }
                        // source={ require('@/assets/img/logo.png') }
                        style={ styles.image }
                        resizeMode={ 'cover' }
                    />
                    <View style={ styles.price }>
                        <Text style={ { color: '#cd2929', fontSize: 20 } }>￥ { projectBlockData.promotionPrice }</Text>
                        <Text>已售 { projectBlockData.soldNumber } 件</Text>
                    </View>
                    <View style={ styles.goodsName }>
                        <Text style={ { fontSize: 20, color: '#000' } }>{ projectBlockData.goodsName }</Text>
                    </View>
                    <View style={ styles.goodsIntroduction }>
                        <Text>{ projectBlockData.goodsIntroduction }</Text>
                    </View>
                    <View style={ styles.btn }>
                        {/* 没有加入购物车 */ }
                        <IsRenderHOC isShow={ !isJoinCart }>
                            <Pressable
                                style={ styles.addToCar }
                                onPress={ addToCar }
                            >
                                <Text style={ { fontSize: 15, color: '#fff' } }>添加至购物车</Text>
                            </Pressable>
                        </IsRenderHOC>
                        {/*  已经加入了购物车  */ }
                        <IsRenderHOC isShow={ isJoinCart }>
                            <Pressable
                                style={ [styles.addToCar, styles.hasAddToCar] }
                                onPress={ addToCar }
                            >
                                <Text style={ { fontSize: 15, color: '#fff' } }>已添加至购物车</Text>
                            </Pressable>
                        </IsRenderHOC>
                    </View>
                    <View style={ styles.partition }/>
                    <View style={ styles.businessInfo }>
                        <Image
                            style={ { width: 40, height: 40, backgroundColor: '#000', marginRight: 10 } }
                            // source={ { uri: `data:image/png;base64,${ }` } }
                        />
                        <Pressable
                            // @ts-ignore
                            onPress={ () => navigation.navigate('BusinessDetail', { shopId: 1 }) }
                        >
                            <Text style={ { fontSize: 16, color: '#000', fontWeight: 'bold' } }>啊啊啊啊啊</Text>
                        </Pressable>
                    </View>
                </View>
            </ScrollView>
        </AddBackgroundHOC>
    );
};
export default ProjectDetail;
const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    inner: {
        display: 'flex',
        padding: 10,
        backgroundColor: '#fff'
    },
    image: {
        width: Dimensions.get('window').width,
        height: 200,
        // height: 100,
        // height: height,
        objectFit: 'contain',
        marginBottom: 10
    },
    price: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    goodsName: {
        marginTop: 10
    },
    goodsIntroduction: {
        marginTop: 10
    },
    btn: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    addToCar: {
        width: 110,
        height: 40,
        backgroundColor: '#ff8f12',
        borderRadius: 20,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    hasAddToCar: {
        backgroundColor: '#ff5200',
        marginBottom: 10
    },
    partition: {
        width: '100%',
        height: 10,
        backgroundColor: '#f2f2f2'
    },
    businessInfo: {
        marginTop: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    }
});
