import { StyleSheet, View, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';

interface IProps {
    children: ReactNode,
    isShow: boolean,
    style?: ViewStyle
}

const IsRenderHoc = (props: IProps) => {
    const { isShow, children, style } = props;
    return isShow ? <View style={ style }>{ children }</View> : null;
};
export default IsRenderHoc;
const styles = StyleSheet.create({});
