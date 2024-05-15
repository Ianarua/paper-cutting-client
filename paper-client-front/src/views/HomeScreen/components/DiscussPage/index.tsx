import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import { IDiscussData } from '@/interface/IDiscuss.ts';
import DiscussBlock from './components/DiscussBlock/index.tsx';
import { getDiscuss } from '@/api/Discuss';

const CommunityPage = () => {
    // const   discussData: I  discussData[] = [
    //     {
    //         bigComments: {
    //             avatar: require('@/assets/img/logo.png'),
    //             bigUserName: 'User1',
    //             bigCommentText: '我想和大家一起探讨一下剪纸传统文化的魅力，这个古老而精美的艺术形式，在当今社会依然有着重要的意义。你们对剪纸有什么了解或者看法呢？'
    //         },
    //         favorite: 10,
    //         smallComments: [
    //             {
    //                 smallUserName: '花开富贵',
    //                 smallCommentText: '剪纸是中国传统文化的瑰宝之一，它不仅是一种艺术，更是一种传承。我小时候就跟着爷爷学过剪纸，每次看到那些精美的剪纸作品，都感叹于传统工艺的精湛。'
    //             },
    //             {
    //                 smallUserName: '上善若水',
    //                 smallCommentText: '我也很喜欢剪纸，但我觉得现在很多人对于传统文化的了解和重视还不够，希望能有更多的机会去推广和传承这种宝贵的文化遗产。'
    //             }
    //         ]
    //     }
    // ];
    const [discussData, seDiscussData] = useState<IDiscussData[]>([]);
    const [pageNum, setPageNum] = useState(0);
    useEffect(() => {
        !(async function () {
            const res = await getDiscuss(pageNum, 10);
            seDiscussData(res.list);
        })();
    }, [pageNum]);

    // 监听滑到底
    function _contentViewScroll (e: any) {
        // 滑动距离
        const offsetY = e.nativeEvent.contentOffset.y;
        // scrollView contentSize高度
        const contentSizeHeight = e.nativeEvent.contentSize.height;
        // scrollView高度
        const forgeScrollHeight = e.nativeEvent.layoutMeasurement.height;
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
                    <View style={ styles.communityInner }>
                        {
                            discussData.map((item, index) => {
                                return (
                                    <DiscussBlock
                                        key={ index }
                                        discussData={ item }
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
export default CommunityPage;
const styles = StyleSheet.create({
    content: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    communityInner: {
        width: '90%',
        // backgroundColor: '#fff'
    }
});
