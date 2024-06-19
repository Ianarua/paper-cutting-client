import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import MyText from '@/components/MyText';
import IProjectBlock from '@/interface/IProjectBlock.ts';
import ProjectBlock from '@/components/ProjectBlock';
import IMenu from '@/interface/IHomePage.ts';
import { getRecommendGoods } from '@/api/ProjectInfo';
import CenterModal from '@/components/Modal/CenterModal';
import { useProjectStore } from '@/store';

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
    // const [projectBlockData, setProjectBlockData] = useState<IProjectBlock[]>([]);
    const projectBlockData = useProjectStore(state => state.projectBlockData);
    const setProjectBlockData = useProjectStore(state => state.setProjectBlockData);
    const isFirstRun = useRef(true);

    // 应该查询哪个分页的数据
    let [pageNum, setPageNum] = useState(2);
    let [total, setTotal] = useState(Infinity);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        !(pageNum > total - 1) && !(async function () {
            const res: any = await getRecommendGoods(pageNum, 6);
            setProjectBlockData(res.list);
            setTotal(res.totalPage);
        })();
    }, [pageNum]);

    function _contentViewScroll (e: any) {
        const offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        const contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        const forgeScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + forgeScrollHeight >= contentSizeHeight) {
            setPageNum(prevState => prevState + 1);
        }
    }

    // 控制 历史文化、制作工艺弹窗 是否显示
    let [isShowHistory, setIsShowHistory] = useState(false);
    let [isShowArt, setIsShowArt] = useState(false);

    // 历史文化、制作工艺点击
    function menuHandle (imgText: string) {
        if (imgText === '历史文化') {
            setIsShowHistory(true);
        } else if (imgText === '制作工艺') {
            setIsShowArt(true);
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
                                    <Pressable
                                        key={ index }
                                        style={ { display: 'flex', justifyContent: 'center', alignItems: 'center' } }
                                        onPress={ () => menuHandle(item.imgText) }
                                    >
                                        <Image source={ item.imgUrl } style={ styles.homeMenuImg }/>
                                        <MyText text={ item.imgText } styles={ { fontSize: 12, fontWeight: 'bold' } }/>
                                    </Pressable>
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
            {/*  历史文化居中弹窗  */ }
            <CenterModal isShow={ isShowHistory } onClose={ () => setIsShowHistory(false) } style={ { justifyContent: 'space-around' } }>
                <Text style={ { fontSize: 20, color: '#666' } }>剪纸的历史文化</Text>
                <ScrollView>
                    <Text
                        style={ { fontSize: 14, lineHeight: 25, marginTop: 15 } }
                    >
                        { '\u3000\u3000' }剪纸文化起源于中国，是一种古老的民间艺术，已有千年历史。它最早可以追溯到东汉时期，随着造纸术的发展而兴盛。剪纸技艺精湛，内容丰富，常见题材包括吉祥图案、民俗风情和自然景观等。作为一种表达祝福、祈福的艺术形式，剪纸在节庆、婚礼等场合广泛应用，象征着喜庆和美好。它不仅是中华民族传统文化的重要组成部分，更是人们情感寄托和审美表达的载体。
                    </Text>
                </ScrollView>
                <Pressable
                    style={ {
                        width: 80,
                        height: 40,
                        borderRadius: 18,
                        backgroundColor: '#f67e3e',
                        marginTop: 15,
                        justifyContent: 'center',
                        alignItems: 'center'
                    } }
                    onPress={ () => setIsShowHistory(false) }
                >
                    <Text style={ { fontSize: 18, color: '#fff' } }>确定</Text>
                </Pressable>
            </CenterModal>
            {/*  制作工艺居中弹窗  */ }
            <CenterModal isShow={ isShowArt } onClose={ () => setIsShowArt(false) } style={ { justifyContent: 'space-between' } }>
                <Text style={ { fontSize: 20, color: '#666' } }>剪纸的制作工艺</Text>
                <ScrollView>
                    <Text
                        style={ { fontSize: 14, lineHeight: 25, marginTop: 15 } }
                    >
                        { '\u3000\u3000' }剪纸文化的制作工艺精细，需要高度的手工技巧。首先选用质地细腻的红纸或彩纸，使用剪刀或刻刀进行创作。设计图案多为对称结构，以花卉、动物、人物为常见题材。制作过程中，要求剪工稳准，线条流畅，精雕细琢。剪纸既可单独成品，也可粘贴于窗户、灯笼等物品上，用以装饰或祈福，充分体现了民间艺术的巧思与审美。
                    </Text>
                </ScrollView>
                <Pressable
                    style={ {
                        width: 80,
                        height: 40,
                        borderRadius: 18,
                        backgroundColor: '#f67e3e',
                        marginTop: 15,
                        justifyContent: 'center',
                        alignItems: 'center'
                    } }
                    onPress={ () => setIsShowArt(false) }
                >
                    <Text style={ { fontSize: 18, color: '#fff' } }>确定</Text>
                </Pressable>
            </CenterModal>
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
