import { Animated, Easing, LayoutChangeEvent, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MyText from '@/components/MyText';
import { ICommunityData } from '@/views/HomeScreen/components/CommunityPage/components/interface';
import Image = Animated.Image;
import ActionShow from '@/components/ActionShow';
import IsRenderHOC from '@/components/HOC/IsRenderHOC.tsx';

interface IProps extends ICommunityData {
}

const CommentsBlock = (props: IProps) => {
    const { bigComments, favorite, smallComments } = props;
    const [isShowSmallComment, setIsShowSmallComment] = useState(false);


    return (
        <View style={ styles.content }>
            <LinearGradient
                colors={ ['rgba(231,202,185,0.3)', 'rgba(250,191,165,0.73)'] }
                style={ styles.inner }
            >
                <View style={ styles.user }>
                    <Image
                        source={ bigComments.avatar }
                        defaultSource={ require('@/assets/img/logo.png') }
                        style={ { width: 40, height: 40, marginRight: 10 } }
                    />
                    <MyText text={ bigComments.bigUserName } styles={ { fontWeight: 'bold' } }/>
                </View>
                <View style={ styles.bigCommentsText }><MyText text={ bigComments.bigCommentText }/></View>
                <View style={ styles.actions }>
                    {/* 喜欢图标 */ }
                    <ActionShow
                        iconName={ 'hearto' }
                        count={ favorite }
                        style={ { marginRight: 20 } }
                    />
                    {/* 评论图标 */ }
                    <ActionShow
                        iconName={ 'message1' }
                        count={ smallComments?.length || 0 }
                        onPress={ () => setIsShowSmallComment(!isShowSmallComment) }
                    />
                </View>
                <IsRenderHOC isShow={ isShowSmallComment }>
                    <View>
                        { smallComments?.map((item, index) => {
                            return (
                                <View key={ index } style={ { marginTop: 10, marginBottom: 10 } }>
                                    <View style={ { marginBottom: 5 } }>
                                        <MyText text={ item.smallUserName } styles={ { fontWeight: 'bold', fontSize: 16 } }/>
                                    </View>
                                    <View style={ styles.smallCommentsText }>
                                        <MyText text={ item.smallCommentText } styles={ { fontSize: 14 } }/>
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
export default CommentsBlock;
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
    smallCommentsText: {}
});
