import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
import { IOrderBlock } from '@/interface/IOrderBlock.ts';
import OrderItem from '@/views/Order/components/OrderItem';
import { getAllOrder } from '@/api/Order';
import { useIsFocused } from '@react-navigation/native';
import MyText from '@/components/MyText';

const Order = () => {
    const isFocused = useIsFocused();
    const [orderData, setOrderData] = useState<IOrderBlock[]>([]);
    const [pageNum, setPageNum] = useState(1);
    const [total, setTotal] = useState(Infinity);
    useEffect(() => {
        !(async function () {
            const res: any = await getAllOrder(pageNum, 5);
            setTotal(res.totalPage);
            setOrderData(prevState => [...prevState, ...res.list]);
        })();
    }, [isFocused, pageNum]);

    function _contentViewScroll (e: any) {
        const offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        const contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        const forgeScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + forgeScrollHeight >= contentSizeHeight - 50) {
            console.log('daodile');
            setPageNum(prevState => prevState + 1);
        }
    }

    return (
        <AddBackgroundHOC>
            <TopPage title="我的订单"/>
            <ScrollView
                style={ { flex: 1 } }
                onMomentumScrollEnd={ _contentViewScroll }
            >
                <View style={ styles.content }>
                    {
                        orderData.map((item, index) => {
                            return (
                                <OrderItem
                                    key={ index }
                                    orderItemData={ item }
                                />
                            );
                        })
                    }
                </View>
                <View style={ styles.hasInBottom }>
                    {
                        pageNum > total
                            ? <MyText text="-----  已经到底啦  -----" styles={ { fontSize: 16 } }/>
                            : <MyText text="…… 加载中 ……" styles={ { fontSize: 16 } }/>
                    }
                </View>
            </ScrollView>
        </AddBackgroundHOC>
    );
};
export default Order;
const styles = StyleSheet.create({
    content: {
        // flex: 1,
        padding: 5,
        alignItems: 'center'
    },
    hasInBottom: {
        marginTop: 20,
        marginBottom: 30,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
