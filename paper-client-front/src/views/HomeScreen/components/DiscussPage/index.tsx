import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import { IDiscuss, IDiscussPublish } from '@/interface/IDiscuss.ts';
import DiscussBlock from './components/DiscussBlock/index.tsx';
import { getDiscuss, postPublishDiscuss } from '@/api/Discuss';
import { useIsFocused } from '@react-navigation/native';
import MyText from '@/components/MyText';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import CenterModal from '@/components/Modal/CenterModal';
import Form, { IFormField } from '@/components/Form';

const CommunityPage = () => {
    const [discussData, setDiscussData] = useState<IDiscuss[]>([]);
    let [pageNum, setPageNum] = useState(1);
    const [total, setTotal] = useState(Infinity);
    const isFocused = useIsFocused();

    useEffect(() => {
        !(async function () {
            const res: any = await getDiscuss(pageNum, 10);
            setDiscussData(prevState => [...prevState, ...res.list]);
            setTotal(res.totalPage);
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
        if (offsetY + forgeScrollHeight >= contentSizeHeight && pageNum < total) {
            setPageNum(prevState => prevState + 1);
        }
    }

    // 控制发起话题内容弹窗
    const [isShow, setIsShow] = useState(false);
    let [isPass, setIsPass] = useState(false);
    // 发起话题内容表单
    const formConfig: IFormField[] = [
        {
            name: 'discussContent',
            label: '内容',
            required: true
        }
    ];
    // 发起话题data
    const [discussPublishData, setDiscussPublishData] = useState<IDiscussPublish>({
        parentId: 0,
        discussContent: ''
    });

    function changeInput (field: string, value: string) {
        setDiscussPublishData(prevState => ({
            ...discussPublishData,
            [field]: value
        }));
    }

    // 发布按钮
    async function publishBtn () {
        if (isPass) {
            await postPublishDiscuss(discussPublishData.parentId, discussPublishData.discussContent);
            setIsShow(false);
            // 清除内容
            setDiscussPublishData(prevState => ({
                ...discussPublishData,
                discussContent: ''
            }));
            // 重新请求接口
            const res: any = await getDiscuss(pageNum, 10);
            setDiscussData(prevState => res.list);
            setTotal(res.totalPage);
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
                <View style={ styles.hasInBottom }>
                    {
                        pageNum > total - 1
                            ? <MyText text="-----  已经到底啦  -----" styles={ { fontSize: 16 } }/>
                            : <MyText text="…… 加载中 ……" styles={ { fontSize: 16 } }/>
                    }
                </View>
            </ScrollView>
            <Pressable
                style={ styles.btn }
                // @ts-ignore
                onPress={ () => setIsShow(true) }
            >
                <AntDesignIcon name="pluscircle" color="#84321c" size={ 50 }/>
            </Pressable>

            {/* 发起话题居中弹窗 */ }
            <CenterModal
                isShow={ isShow }
                onClose={ () => setIsShow(false) }
                style={ { height: 250, justifyContent: 'space-between' } }
            >
                <Text style={ { height: '30%' } }>发布话题</Text>
                <View style={ { flex: 1, width: '100%', justifyContent: 'flex-start' } }>
                    <Form
                        formConfig={ formConfig }
                        formData={ discussPublishData }
                        isEditable={ true }
                        onInputChange={ changeInput }
                        verifiedPassedFunc={ (isPass) => setIsPass(isPass) }
                    />
                </View>
                <View style={ styles.publishBtn }>
                    <Pressable
                        style={ [styles.publishBtnItem, { backgroundColor: '#ff7502b3' }] }
                        onPress={ () => publishBtn() }
                    >
                        <Text style={ { color: '#fff' } }>发布</Text>
                    </Pressable>
                    <Pressable
                        style={ [styles.publishBtnItem, { backgroundColor: '#b99e91' }] }
                        onPress={ () => setIsShow(false) }
                    >
                        <Text style={ { color: '#fff' } }>取消</Text>
                    </Pressable>
                </View>
            </CenterModal>
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
    },
    publishBtn: {
        width: '100%',
        height: '20%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    publishBtnItem: {
        width: '35%',
        height: '80%',
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#f5f5f5',
        borderStyle: 'solid'
        // backgroundColor: '#000'
    }
});
