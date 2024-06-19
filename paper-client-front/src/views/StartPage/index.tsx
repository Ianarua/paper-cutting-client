import { Animated, Dimensions, Image, ImageBackground, StyleSheet, View } from 'react-native';
import { useEffect, useRef } from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import { navigate } from '@/utils/navigation.ts';
import storage from '@/utils/storage.ts';
import { getRecommendGoods } from '@/api/ProjectInfo';
import { useProjectStore } from '@/store';

const StartPage = () => {
    const opacity = useRef(new Animated.Value(0)).current;
    const projectBlockData = useProjectStore(state => state.projectBlockData);
    const setProjectBlockData = useProjectStore(state => state.setProjectBlockData);

    useEffect(() => {
        let token = '';
        storage.load({ key: 'token' }).then(res => {
            token = res;
        });
        const fadeIn = () => {
            Animated.timing(opacity, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: false
            }).start();
        };
        fadeIn();
        setTimeout(() => {
            if (!token) {
                navigate('Login');
            } else {
                navigate('Main');
            }
        }, 3000);
        return () => {
            console.log('卸载了');
        };
    }, []);
    useEffect(() => {
        !(async function () {
            const res: any = await getRecommendGoods(1, 6);
            setProjectBlockData(res.list);
        })();
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
        width: Dimensions.get('window').width,
        height: '100%',
        objectFit: 'contain',
    }
});
