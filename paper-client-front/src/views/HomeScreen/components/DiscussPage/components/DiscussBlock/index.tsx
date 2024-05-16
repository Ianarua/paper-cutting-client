import { Animated, ColorValue, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MyText from '@/components/MyText';
import { IDiscuss } from '@/interface/IDiscuss.ts';
import Image = Animated.Image;
import ActionShow from '@/components/ActionShow';
import IsRenderHOC from '@/components/HOC/IsRenderHOC.tsx';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { getLikeDiscuss } from '@/api/Discuss';
import useDebounce from '@/utils/useDebounce.ts';

interface IProps {
    discussData: IDiscuss;
}

const DiscussBlock = (props: IProps) => {
    const { discussData } = props;
    const likeColor = '#fc5b79';
    // 是否显示评论
    const [isShowSmallDiscuss, setIsShowSmallDiscuss] = useState(false);

    // 点赞数量,因为要操作数量,所以另外搞一个
    const [favoriteNumber, setFavoriteNumber] = useState(discussData.favoriteNumber);
    // 是否点赞
    const [isLike, setIsLike] = useState(discussData.isLike);

    // 点赞操作函数
    const debouncedLikePressFunc = useDebounce(likePressFunc, 400);

    async function likePressFunc () {
        if (isLike) {
            // 取消
            await getLikeDiscuss(discussData.discussId);
            // 已经点过,取消
            setIsLike(false);
            setFavoriteNumber(prevState => prevState - 1);
        } else {
            // 还没点,现在点
            await getLikeDiscuss(discussData.discussId);
            setIsLike(true);
            setFavoriteNumber(prevState => prevState + 1);
        }
    }

    return (
        <View style={ styles.content }>
            <LinearGradient
                colors={ ['rgba(231,202,185,0.3)', 'rgba(250,191,165,0.73)'] }
                style={ styles.inner }
            >
                <View style={ styles.user }>
                    <Image
                        source={ { uri: `data:image/png;base64,${ discussData.picUrl }` } }
                        style={ { width: 40, height: 40, marginRight: 10, borderRadius: 80 } }
                    />
                    <MyText text={ discussData.name } styles={ { fontWeight: 'bold' } }/>
                </View>
                <View style={ styles.bigCommentsText }><MyText text={ discussData.discussContent }/></View>
                <View style={ styles.actions }>
                    {/* 点赞图标 */ }
                    <Pressable
                        style={ styles.likeBtn }
                        onPress={ debouncedLikePressFunc }
                    >
                        {
                            isLike
                                ? <AntDesignIcon
                                    name={ 'heart' }
                                    color={ likeColor }
                                    style={ { marginRight: 5 } }
                                    size={ 15 }
                                />
                                : <AntDesignIcon
                                    name={ 'hearto' }
                                    style={ { marginRight: 5 } }
                                    size={ 15 }
                                />
                        }
                        <MyText text={ favoriteNumber }/>
                    </Pressable>
                    {/* 评论图标 */ }
                    <Pressable>
                        <ActionShow
                            iconName={ 'message1' }
                            count={ discussData.commentNumber }
                            onPress={ () => setIsShowSmallDiscuss(!isShowSmallDiscuss) }
                        />
                    </Pressable>
                </View>
                <IsRenderHOC isShow={ isShowSmallDiscuss }>
                    <View>
                        { discussData.discussCommentVos?.map((item, index) => {
                            return (
                                <View key={ index } style={ { marginTop: 10, marginBottom: 10 } }>
                                    <View style={ { marginBottom: 5 } }>
                                        <MyText text={ item.name } styles={ { fontWeight: 'bold', fontSize: 16 } }/>
                                    </View>
                                    <View style={ styles.smallCommentsText }>
                                        <MyText text={ item.discussContent } styles={ { fontSize: 14 } }/>
                                    </View>
                                </View>
                            );
                        }) }
                    </View>
                </IsRenderHOC>
            </LinearGradient>
        </View>
    );
};
export default DiscussBlock;
const styles = StyleSheet.create({
    content: {
        width: '100%',
        borderRadius: 15,
        overflow: 'hidden',
        marginTop: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#93714a'
    },
    inner: {
        width: '100%',
        padding: 10,
    },
    user: {
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    bigCommentsText: {},
    actions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    smallComments: {},
    smallCommentsText: {},
    likeBtn: {
        height: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 10
    }
});
