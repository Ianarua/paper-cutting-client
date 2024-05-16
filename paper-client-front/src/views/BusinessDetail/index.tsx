import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
import { useIsFocused, useRoute } from '@react-navigation/native';
import { RootRouteType, Views } from '@/interface/IReactNavigationProps.ts';
import { IBusinessInfo } from '@/interface/IBusinessPage.ts';
import { getShopGoods, getShopInfo } from '@/api/Business';
import IProjectBlock from '@/interface/IProjectBlock.ts';
import ProjectBlock from '@/components/ProjectBlock';

const BusinessDetail = () => {
    const route = useRoute<RootRouteType<Views.BusinessDetail>>();
    const { shopId } = route.params;
    const isFocused = useIsFocused();

    // 店铺信息
    const [businessData, setBusinessData] = useState<IBusinessInfo>({
        shopId: 0,
        shopName: '',
        picUrl: '',
        isFavorite: false
    });
    useEffect(() => {
        !(async function () {
            const res: any = await getShopInfo(shopId);
            setBusinessData(res);
        })();
    }, [isFocused]);

    // 店铺里面的商品
    const [projectList, setProjectList] = useState<IProjectBlock[]>([]);
    const [pageNum, setPageNum] = useState(1);
    useEffect(() => {
        !(async function () {
            const res: any = await getShopGoods(shopId, pageNum, 8);
            setProjectList(prevData => [...prevData, ...res.list]);
        })();
    }, [pageNum]);

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
            <TopPage title="店铺信息"/>
            <ScrollView
                style={ { flex: 1 } }
                onMomentumScrollEnd={ _contentViewScroll }
            >
                <View style={ styles.content }>
                    <View style={ styles.businessInfo }>
                        <Image
                            style={ { width: 40, height: 40, backgroundColor: '#000', marginRight: 10 } }
                            source={ { uri: `data:image/png;base64,${ businessData.picUrl }` } }
                        />
                        <Text style={ { fontSize: 16, color: '#000', fontWeight: 'bold' } }>{ businessData.shopName }</Text>
                    </View>
                    <View style={ styles.projectList }>
                        {
                            projectList.map((item, index) => {
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
            </ScrollView>
        </AddBackgroundHOC>
    );
};
export default BusinessDetail;
const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    businessInfo: {
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    projectList: {
        flex: 1,
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        // marginLeft: 5,
        // marginRight: 5,
        paddingLeft: 10,
        paddingRight: 10
        // backgroundColor: '#fff'
    }
});
