import { FC, useEffect, useRef } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

const LoadingText: FC = () => {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const fadeInOut = () => {
            Animated.sequence([
                Animated.timing(opacity, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(opacity, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ]).start(() => fadeInOut());
        };

        fadeInOut();
    }, [opacity]);

    return (
        <View style={ styles.container }>
            <Animated.Text style={ [styles.loadingText, { opacity }] }>
                加载中...
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
});

export default LoadingText;
