import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
import { useRoute } from '@react-navigation/native';
import { RootRouteType, Views } from '@/interface/IReactNavigationProps.ts';
import IProjectBlock from '@/interface/IProjectBlock.ts';
import { getGoodsByCategory } from '@/api/Category';
import ProjectBlock from '@/components/ProjectBlock';
import MyText from '@/components/MyText';
import { getRecommendGoods } from '@/api/ProjectInfo';

const ShoppingList = () => {
    const route = useRoute<RootRouteType<Views.ShoppingList>>();
    // TODO
    const { goodsCategoryId } = route.params;
    const [listData, setListData] = useState<IProjectBlock[]>([]);
    const [pageNum, setPageNum] = useState(1);

    // 监听哪个分页数据
    useEffect(() => {
        async function fetchApi () {
            const res: any = await getRecommendGoods(pageNum, 8);
            setListData(prevData => [...prevData, ...res.list]);
        }

        fetchApi().then();
    }, [pageNum]);

    // 监听滑到底
    function _contentViewScroll (e: any) {
        const offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        const contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        const forgeScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + forgeScrollHeight >= contentSizeHeight) {
            setPageNum(prevState => prevState + 1);
            console.log('上传滑动到底部事件', pageNum);
        }
    }

    return (
        <AddBackgroundHOC>
            <View style={ styles.content }>
                <TopPage title="商品列表"/>
                <ScrollView
                    style={ { flex: 1 } }
                    onMomentumScrollEnd={ _contentViewScroll }
                >
                    <View style={ styles.list }>

                        {
                            listData.map((item, index) => {
                                return (
                                    <ProjectBlock
                                        key={ index }
                                        projectBlockData={ item }
                                    />
                                );
                            })
                        }
                        <View style={ styles.hasInBottom }>
                            {
                                pageNum > 2
                                    ? <MyText text="-----  已经到底啦  -----" styles={ { fontSize: 16 } }/>
                                    : <MyText text="…… 加载中 ……" styles={ { fontSize: 16 } }/>
                            }
                        </View>
                    </View>

                </ScrollView>
            </View>
        </AddBackgroundHOC>
    );
};
export default ShoppingList;
const window = Dimensions.get('window');
const width = window.width / 2.5;
const height = width * 1.2;
const styles = StyleSheet.create({
    content: {
        flex: 1
    },
    list: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10
    },
    hasInBottom: {
        width: '100%',
        marginTop: 20,
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
