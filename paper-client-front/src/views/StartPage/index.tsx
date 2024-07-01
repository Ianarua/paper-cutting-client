import { Animated, Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { useEffect, useRef } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import { navigate } from '@/utils/navigation.ts';
import storage from '@/utils/storage.ts';
import { getRecommendGoods } from '@/api/ProjectInfo';
import { useProjectStore } from '@/store';

const StartPage = () => {
    const opacity = useRef(new Animated.Value(0)).current;
    const setIsFirstLogin = useProjectStore(state => state.setIsFirstLogin);
    const setProjectBlockData = useProjectStore(state => state.setProjectBlockData);


    useEffect(() => {
        let token = '';
        storage.load({ key: 'token' }).then(res => {
            token = res;
            if (token) {
                console.log('youtoken');
                getRecommendGoods(1, 6).then(res => {
                    // @ts-ignore
                    setProjectBlockData(res.list);
                });
            }
        });
        const fadeIn = () => {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 4000,
                useNativeDriver: false
            }).start();
        };
        fadeIn();
        setTimeout(() => {
            if (!token) {
                setIsFirstLogin(true);
                navigate('Login');
            } else {
                setIsFirstLogin(false);
                navigate('Main');
                // !(async function () {
                //     const res: any = await getRecommendGoods(1, 6);
                //     setProjectBlockData(res.list);
                // })();
            }
        }, 5000);
    }, []);
    useEffect(() => {

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
        width: Dimensions.get('screen').width,
        height: '100%',
        objectFit: 'contain',
    }
});
