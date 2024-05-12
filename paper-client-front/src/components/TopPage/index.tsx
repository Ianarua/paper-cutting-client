import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

interface IProps {
    title: string,
    iconColor?: string
}

const TopPage = (props: IProps) => {
    const navigation = useNavigation();
    const { title, iconColor = '#fff' } = props;
    return (
        <View style={ styles.content }>
            <Pressable style={ styles.iconView } onPress={ () => navigation.goBack() }>
                <AntDesignIcon name="left" color={ iconColor } size={ 25 }/>
            </Pressable>
        </View>
    );
};
export default TopPage;
const styles = StyleSheet.create({
    content: {
        width: Dimensions.get('window').width,
        height: 50,
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: '#000'
    },
    iconView: {
        width: 35,
        height: 35,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        backgroundColor: '#3434344d'
    }
});
