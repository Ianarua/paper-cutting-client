import { ImageBackground, StyleSheet } from 'react-native';
import React, { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
}

const AddBackgroundHOC = (props: IProps) => {
    return (

        <ImageBackground
            source={ require('@/assets/img/backGround.png') }
            style={ styles.background }
            resizeMode="cover"
            imageStyle={ { opacity: 0.6, backgroundColor: '#e7dbc7' } }
        >
            { props.children }
        </ImageBackground>

    );
};
export default AddBackgroundHOC;
const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
});
