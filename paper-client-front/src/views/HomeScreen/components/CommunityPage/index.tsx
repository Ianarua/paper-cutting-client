import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import { ICommunityData } from '@/views/HomeScreen/components/CommunityPage/components/interface';
import CommentsBlock from '@/views/HomeScreen/components/CommunityPage/components/CommentsBlock';

const CommunityPage = () => {
    const communityData: ICommunityData[] = [
        {
            bigComments: {
                avatar: require('@/assets/img/logo.png'),
                bigUserName: 'User1',
                bigCommentText: '我想和大家一起探讨一下剪纸传统文化的魅力，这个古老而精美的艺术形式，在当今社会依然有着重要的意义。你们对剪纸有什么了解或者看法呢？'
            },
            favorite: 10,
            smallComments: [
                {
                    smallUserName: '花开富贵',
                    smallCommentText: '剪纸是中国传统文化的瑰宝之一，它不仅是一种艺术，更是一种传承。我小时候就跟着爷爷学过剪纸，每次看到那些精美的剪纸作品，都感叹于传统工艺的精湛。'
                },
                {
                    smallUserName: '上善若水',
                    smallCommentText: '我也很喜欢剪纸，但我觉得现在很多人对于传统文化的了解和重视还不够，希望能有更多的机会去推广和传承这种宝贵的文化遗产。'
                }
            ]
        }
    ];
    return (
        <AddBackgroundHOC>
            <ScrollView style={ { flex: 1 } }>
                <View style={ styles.content }>
                    <View style={ styles.communityInner }>
                        {
                            communityData.map((item, index) => {
                                return (
                                    <CommentsBlock
                                        key={ index }
                                        bigComments={ item.bigComments }
                                        smallComments={ item.smallComments }
                                        favorite={ item.favorite }
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
