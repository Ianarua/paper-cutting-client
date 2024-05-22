import { Animated, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { useEffect, useRef } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import { navigate } from '@/utils/navigation.ts';

const StartPage = () => {
    const opacity = useRef(new Animated.Value(0)).current;
    useEffect(() => {
        const fadeIn = () => {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false
            }).start();
        };
        fadeIn();
        setTimeout(() => {
            navigate('Login')
        }, 3000)
    }, []);
    return (
        // <ImageBackground
        //     style={ { flex: 1, justifyContent: 'center', alignItems: 'center' } }
        //     resizeMode="cover"
        //     // imageStyle={ { opacity: 0.6, backgroundColor: '#e7dbc7' } }
        //     source={ require('@/assets/img/startPage.png') }
        // >
        // </ImageBackground>
        <Animated.Image
            source={ require('@/assets/img/startPage.png') }
            style={ [styles.imgAnimate, { opacity }] }
        />
    );
};
export default StartPage;
const styles = StyleSheet.create({
    imgAnimate: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    }
});
