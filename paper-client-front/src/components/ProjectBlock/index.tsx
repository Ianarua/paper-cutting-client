import {
    Dimensions,
    Pressable,
    StyleSheet, Text,
    useWindowDimensions,
    View,
} from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import ProjectBlockImg from '@/components/Img';
import MyText from '@/components/MyText';
import { useNavigation } from '@react-navigation/native';
import IProjectBlock from '@/interface/IProjectBlock.ts';

interface IProps {
    addBtn?: (data: IProjectBlock) => void,
    projectBlockData: IProjectBlock
}

const ProjectBlock: FC<IProps> = ({ addBtn, projectBlockData }) => {
    const navigation = useNavigation();
    let [projectHeight, setProjectHeight] = useState(0);
    const window = useWindowDimensions();

    useEffect(() => {
        setProjectHeight(window.width / 1.8);
    }, []);
    return (
        <Pressable
            style={ {
                width: '49%',
                height: projectHeight,
                borderRadius: 18,
                marginBottom: 5,
            } }
            onPress={ () => {
                // @ts-ignore
                navigation.navigate('ProjectDetail', { projectBlockData });
            } }>
            <View style={ styles.projectInner }>
                <ProjectBlockImg imgUrl={ projectBlockData.picUrl }/>
                <View style={ styles.information }>
                    <View>
                        <MyText text={ projectBlockData.goodsName } styles={ { fontWeight: 'bold' } }/>
                    </View>
                    <View style={ { display: 'flex', flexDirection: 'row', alignItems: 'center' } }>
                        <Text style={ { color: '#cd2929', fontSize: 20, marginRight: 5 } }>
                            { `￥${ projectBlockData.promotionPrice }` }
                        </Text>
                        <Text style={ { color: '#e0e0e0', fontSize: 14, textDecorationLine: 'line-through' } }>
                            { `￥${ projectBlockData.price }` }
                        </Text>
                    </View>
                    <View>
                        <MyText
                            text={ `已售 ${ projectBlockData.soldNumber } 笔` }
                            styles={ { color: '#b1b1b1', fontSize: 10 } }
                        />
                    </View>
                    {/*<IsRenderHOC isShow={ typeof addBtn === 'function' }>*/ }
                    {/*    <Pressable*/ }
                    {/*        onPress={ () => addBtn?.(projectBlockData) }*/ }
                    {/*    >*/ }
                    {/*        <Ionicons name="add-circle" style={ styles.addBtn } size={ 20 }/>*/ }
                    {/*    </Pressable>*/ }
                    {/*</IsRenderHOC>*/ }
                </View>
            </View>
        </Pressable>
    );
};
export default ProjectBlock;
const styles = StyleSheet.create({
    projectInner: {
        width: '100%',
        height: '100%',
        borderRadius: 18,
        overflow: 'hidden',
    },
    information: {
        // flex: 1,
        height: '40%',
        position: 'relative',
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 5,
        backgroundColor: '#fcfcfc',
    },
    addBtn: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 20,
        height: 20,
        color: '#f00',
        // borderRadius: 40,
        backgroundColor: '#fff',
    },
});
