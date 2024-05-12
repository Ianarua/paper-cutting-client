import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import AddBackgroundHOC from '@/components/HOC/AddBackgroundHOC.tsx';
import TopPage from '@/components/TopPage';
// import Calendar from 'react-native-whc-calendar'
import { KJCalendar } from 'react-native-kj-calendar';

const SignUp = () => {
    return (
        <AddBackgroundHOC>
            <TopPage title="签到"/>
            <View style={ styles.content }>
                <View style={ { marginTop: 50, marginBottom: 20 } }>
                    <KJCalendar
                        showToolBar={ false }
                        onDayPress={ (dayModel) => {
                            console.log('click day:', dayModel);
                        } }
                        onConfirm={ (dayModel) => {
                            console.log('click confirm:', dayModel);
                        } }
                        onCancel={ () => {
                            console.log('click cancel');
                        } }
                    />
                </View>
                <View style={ styles.btnView }>
                    <Pressable style={ styles.btn }>
                        <Text style={ styles.btnText }>签到</Text>
                    </Pressable>
                </View>
            </View>
        </AddBackgroundHOC>
    );
};
export default SignUp;
const styles = StyleSheet.create({
    content: {
        flex: 1,
        // display: 'flex',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        // backgroundColor: '#fff'
    },
    btnView: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btn: {
        width: 70,
        height: 50,
        borderRadius: 18,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#84321c'
    },
    btnText: {
        fontSize: 20,
        color: '#fff',
    }
});
