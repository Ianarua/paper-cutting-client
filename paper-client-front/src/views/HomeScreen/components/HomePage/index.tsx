import { Image, ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import MyText from '@/components/MyText';
import IProjectBlock from '@/interface/IProjectBlock.ts';
import ProjectBlock from '@/components/ProjectBlock';
import IMenu from '@/interface/IHomePage.ts';
import { getRecommendGoods } from '@/api/ProjectInfo';

const HomePage = () => {
    // 历史文化、制作工艺、专属定制  的菜单栏. 不变
    const menu: IMenu[] = [
        {
            imgUrl: require('@/assets/img/homePage/historyLogo.png'),
            imgText: '历史文化',
        },
        {
            imgUrl: require('@/assets/img/homePage/artLogo.png'),
            imgText: '制作工艺',
        },
        {
            imgUrl: require('@/assets/img/homePage/makeLogo.png'),
            imgText: '专属定制'
        }
    ];
    const [projectBlockData, setProjectBlockData] = useState<IProjectBlock[]>([]);
    // 应该查询哪个分页的数据
    let [pageNum, setPageNum] = useState(1);
    let [total, setTotal] = useState(Infinity);
    useEffect(() => {
        async function fetchApi () {
            const res: any = await getRecommendGoods(pageNum, 6);
            setProjectBlockData(prevData => [...prevData, ...res.list]);
            setTotal(res.totalPage);
        }

        fetchApi().then();
    }, [pageNum]);

    function _contentViewScroll (e: any) {
        const offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        const contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        const forgeScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + forgeScrollHeight >= contentSizeHeight) {
            setPageNum(prevState => prevState + 1);
        }
    }

    return (
        <AddBackgroundHOC>
            <ScrollView
                style={ { flex: 1 } }
                onMomentumScrollEnd={ _contentViewScroll }
            >
                <View style={ styles.content }>
                    <View style={ styles.topImgView }>
                        <Image
                            source={ require('@/assets/img/homePage/homePageBigImg.png') }
                            style={ styles.topImg }
                        />
                    </View>
                    <View style={ styles.homeMenuView }>
                        {
                            menu.map((item, index) => {
                                return (
                                    <View key={ index } style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }>
                                        <Image source={ item.imgUrl } style={ styles.homeMenuImg }/>
                                        <MyText text={ item.imgText } styles={ { fontSize: 12, fontWeight: 'bold' } }/>
                                    </View>
                                );
                            })
                        }
                    </View>
                    <View style={ styles.homeProjectTotal }>
                        {
                            projectBlockData.map((item, index) => {
                                return (
                                    <ProjectBlock
                                        key={ index }
                                        projectBlockData={ item }
                                    />
                                );
                            })
                        }
                    </View>
                </View>
                <View style={ styles.hasInBottom }>
                    {
                        pageNum > total - 1
                            ? <MyText text="-----  已经到底啦  -----" styles={ { fontSize: 16 } }/>
                            : <MyText text="…… 加载中 ……" styles={ { fontSize: 16 } }/>
                    }
                </View>
            </ScrollView>
        </AddBackgroundHOC>
    );
};
export default HomePage;
const styles = StyleSheet.create({
    content: {
        display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    topImgView: {
        width: '90%',
        height: 150,
        // backgroundColor: '#fff',
        overflow: 'hidden'
    },
    topImg: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    homeMenuView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '90%',
        // height: 40,
        // backgroundColor: '#fff'
    },
    homeMenuImg: {
        width: 30,
        height: 30,
        objectFit: 'contain'
    },
    homeProjectTotal: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // height: vHeight,
        marginTop: 10,
        // marginLeft: 5,
        // marginRight: 5,
        paddingLeft: 10,
        paddingRight: 10
        // backgroundColor: '#fff'
    },
    hasInBottom: {
        marginTop: 20,
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
