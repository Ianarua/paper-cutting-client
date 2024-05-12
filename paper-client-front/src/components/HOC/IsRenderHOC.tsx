import { StyleSheet, View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';

interface IProps {
    children: ReactNode,
    isShow: boolean,
    styles?: ViewStyle
}

const IsRenderHoc = (props: IProps) => {
    const { isShow, children, styles } = props;
    return isShow ? <View style={ styles }>{ children }</View> : null;
};
export default IsRenderHoc;
const styles = StyleSheet.create({});
