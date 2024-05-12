import { StyleSheet, Text, View, TextStyle } from 'react-native';
import React from 'react';

interface IProps {
    text: string | number,
    styles?: {
        fontSize?: number,
        fontWeight?: Exclude<TextStyle['fontWeight'], undefined>,
        fontFamily?: string,
        color?: string,
    },
    onNavigator?: () => void,
}

const MyText = (props: IProps) => {
    const styles = StyleSheet.create({
        textStyle: props.styles!
    });
    const onNavigator = props.onNavigator;
    return (
        <View>
            <Text
                style={ styles.textStyle }
                onPress={ () => {
                    onNavigator?.();
                } }>
                { props.text }
            </Text>
        </View>
    );
};
export default MyText;

