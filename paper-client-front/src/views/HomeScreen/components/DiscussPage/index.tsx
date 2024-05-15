import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import { IDiscuss } from '@/interface/IDiscuss.ts';
import DiscussBlock from './components/DiscussBlock/index.tsx';
import { getDiscuss } from '@/api/Discuss';
import { useIsFocused } from '@react-navigation/native';

const CommunityPage = () => {
    const [discussData, seDiscussData] = useState<IDiscuss[]>([]);
    const [pageNum, setPageNum] = useState(0);
    const isFocused = useIsFocused();

    useEffect(() => {
        !(async function () {
            const res: any = await getDiscuss(pageNum, 10);
            seDiscussData(res.list);
        })();
    }, [pageNum, isFocused]);

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
