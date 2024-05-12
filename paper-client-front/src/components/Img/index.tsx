import { Animated, ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Image = Animated.Image;

interface IProps {
    imgUrl: ImageSourcePropType,
}

const ProjectBlockImg = (props: IProps) => {
    const { imgUrl } = props;
    return (
        <View style={ styles.imgView }>
            <Image defaultSource={ require('@/assets/img/logo.png') } source={ imgUrl } style={ styles.img }/>
        </View>
    );
};
export default ProjectBlockImg;
const styles = StyleSheet.create({
    imgView: {
        // width: '100%',
        height: '60%',
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#f1ece6'
    },
    img: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain'
    },
});
