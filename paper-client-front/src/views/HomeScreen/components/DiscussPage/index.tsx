import { Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import { IDiscuss } from '@/interface/IDiscuss.ts';
import DiscussBlock from './components/DiscussBlock/index.tsx';
import { getDiscuss } from '@/api/Discuss';
import { useIsFocused } from '@react-navigation/native';
import MyText from '@/components/MyText';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const CommunityPage = () => {
    const [discussData, seDiscussData] = useState<IDiscuss[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const isFocused = useIsFocused();

    useEffect(() => {
        !(async function () {
            const res: any = await getDiscuss(pageNum, 10);
            seDiscussData(prevState => [...prevState, ...res.list]);
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
            console.log('上传滑动到底部事件', pageNum);
        }
    }

    // const handlePress = async () => {
    //     const response = await Alert.prompt('Email', 'Please enter your email');
    //
    //     console.log(response); // string | undefined
    // };
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
                <View style={ styles.hasInBottom }>
                    {
                        pageNum > 2
                            ? <MyText text="-----  已经到底啦  -----" styles={ { fontSize: 16 } }/>
                            : <MyText text="…… 加载中 ……" styles={ { fontSize: 16 } }/>
                    }
                </View>
            </ScrollView>
            {/*<Pressable*/}
            {/*    style={ styles.btn }*/}
            {/*    // @ts-ignore*/}
            {/*    onPress={ () => navigation.navigate('AddressDetail', {*/}
            {/*        addressDetailParams: {*/}
            {/*            receivingAddressId: 0,*/}
            {/*            buyerId: 0,*/}
            {/*            recipientName: '',*/}
            {/*            recipientPhone: '',*/}
            {/*            recipientAddress: '',*/}
            {/*            recipientRegion: ''*/}
            {/*        },*/}
            {/*        isAdd: true*/}
            {/*    }) }*/}
            {/*>*/}
            {/*    <AntDesignIcon name="pluscircle" color="#84321c" size={ 50 }/>*/}
            {/*</Pressable>*/}
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
    },
    hasInBottom: {
        marginTop: 20,
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        position: 'absolute',
        bottom: 30,
        right: 30,
    }
});
