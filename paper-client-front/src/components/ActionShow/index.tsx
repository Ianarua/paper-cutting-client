import { ColorValue, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import React, { useEffect, useState } from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MyText from '@/components/MyText';
import IActionShow from '@/interface/IAction.ts';

interface IPros extends IActionShow {
    onPress?: (...args: any[]) => any;
}

const ActionShow = (props: IPros) => {
    let { iconName, iconColor, count, style, onPress } = props;
    return (
        <Pressable
            style={ { ...styles.content, ...(style as ViewStyle) } }
            onPress={ onPress }
        >
            <AntDesignIcon
                name={ iconName }
                color={ iconColor }
                style={ { marginRight: 5 } }
                size={ 15 }
            />
            <MyText text={ count }/>
        </Pressable>
    );
};
export default ActionShow;
const styles = StyleSheet.create({
    content: {
        height: 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    }
});
