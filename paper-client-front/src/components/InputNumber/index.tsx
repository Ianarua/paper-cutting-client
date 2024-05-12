import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import MyText from '@/components/MyText';

interface IProps {
    num: number,
    min: number,
    max: number,
    change: (val: number) => void,
}

const InputNumber = (props: IProps) => {
    let { num, min, max, change } = props;
    let [numInner, setNumInner] = useState(num);

    useEffect(() => {
        change(numInner);
    }, [numInner]);

    function changeNum (action: 0 | 1) {    // 0+ 1-
        if (action === 0 && numInner < max) {
            setNumInner(numInner + 1);
        } else if (action === 1 && numInner > min) {
            setNumInner(numInner - 1);
        }
    }

    return (
        <View style={ styles.content }>
            <Pressable
                style={ styles.subtract }
                onPress={ () => changeNum(1) }
                hitSlop={ 15 }
                disabled={ numInner <= min }
            >
                <Text style={ [styles.changeText, numInner <= min && styles.disabledText] }>-</Text>
            </Pressable>
            <View style={ styles.innerNum }>
                <MyText text={ numInner } styles={ { fontSize: 15 } }/>
            </View>
            <Pressable
                style={ styles.add }
                onPress={ () => changeNum(0) }
                hitSlop={ 15 }
                disabled={ numInner >= max }
            >
                <Text style={ [styles.changeText, numInner >= max && styles.disabledText] }>+</Text>
            </Pressable>
        </View>
    );
};
export default InputNumber;

const styles = StyleSheet.create({
    content: {
        width: '80%',
        height: '80%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        borderStyle: 'solid',
        overflow: 'hidden',
    },
    subtract: {
        height: '30%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerNum: {
        width: '100%',
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e6e6e6',
        borderStyle: 'solid',
        zIndex: 999
    },
    add: {
        height: '30%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    changeText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16
    },
    disabledText: {
        color: '#c8c8c8',
    }
});
