import { Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useEffect, useState } from 'react';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import MyText from '@/components/MyText';
import { useNavigation } from '@react-navigation/native';
import DownerModal from '@/components/Modal/DrownModal';
import Camera from '@/views/Camera';
import CenterModal from '@/components/Modal/CenterModal';
import { postImageUnderstand } from '@/api/ImageUnderstanding';
import ImgBase64 from '@/components/ImgBase64';
import LoadingText from '@/components/LoadingText';

interface IProps {
    page: number,   // 0 主页,1 社区
    onNavigator: (page: number) => void,
}

const HomeTop = (props: IProps) => {
    const navigation = useNavigation();
    const onNavigator = props.onNavigator;
    const [curPage, setCurPage] = useState(props.page);
    const [searchValue, setSearchValue] = useState('');
    useEffect(() => {
        setCurPage(props.page);
    }, [props.page]);

    // 控制底部弹窗(相册、相机)
    const [isShowDrown, setIsShowDrown] = useState(false);
    // 控制居中弹窗(结果展示)
    const [isShowCenter, setIsShowCenter] = useState(false);

    // 传回来的resourcePath
    const [understandContent, setUnderstandContent] = useState('');
    // 传回来的图片base64
    const [understandContentImg, setUnderstandContentImg] = useState('');

    // 开始调用AI接口内容理解
    async function understand (resourcePath: string) {
        const res: any = await postImageUnderstand(resourcePath);
        setUnderstandContent(res.content);
    }

    return (
        <View style={ styles.container }>
            {/* 签到,主页,社区 */ }
            <View style={ styles.topBtn }>
                {/*<View style={ styles.btnSign }>*/ }
                {/*    <AntDesignIcon name="calendar"/>*/ }
                {/*    <Pressable*/ }
                {/*        hitSlop={ 10 }*/ }
                {/*        // @ts-ignore*/ }
                {/*        onPress={ () => navigation.navigate('SignUp') }*/ }
                {/*    >*/ }
                {/*        <Text style={ { fontSize: 10, fontWeight: 'bold' } }>签到</Text>*/ }
                {/*    </Pressable>*/ }
                {/*</View>*/ }
                <View style={ styles.btnPage }>
                    <MyText
                        text="主页"
                        styles={ curPage === 0 ? { ...styles.btnPageText, ...styles.btnPageTextActive } : styles.btnPageText }
                        onNavigator={ () => onNavigator(0) }
                    />
                    <MyText
                        text="社区"
                        styles={ curPage === 1 ? { ...styles.btnPageText, ...styles.btnPageTextActive } : styles.btnPageText }
                        onNavigator={ () => onNavigator(1) }
                    />
                </View>
            </View>
            {/* 搜索框,拍照,扫码 */ }
            <View style={ styles.topSearchBar }>
                <View style={ styles.searchBarInner }>
                    <Pressable
                        // @ts-ignore
                        onPress={ () => setIsShowDrown(true) }
                    >
                        <AntDesignIcon
                            name={ 'camerao' }
                            color={ '#84321c' }
                            size={ 20 }
                            style={ { marginRight: 5 } }
                        />
                    </Pressable>
                    <MyText
                        text={ '|' }
                        styles={ { fontWeight: 'bold', color: '#f1ece6' } }
                    />
                    <TextInput
                        style={ styles.searchBarInput }
                        placeholder={ '输入搜索内容' }
                        value={ searchValue }
                        onChangeText={ text => setSearchValue(text) }
                        editable={ false }
                    />
                    <AntDesignIcon
                        name={ 'scan1' }
                        color={ '#84321c' }
                        size={ 20 }
                        style={ { marginLeft: 5 } }
                    />
                </View>
            </View>
            {/* 底部弹窗 */ }
            <DownerModal isShow={ isShowDrown } onClose={ () => setIsShowDrown(false) }>
                <Camera
                    onCloseDrown={ (imgBase64: string) => {
                        setUnderstandContentImg(prevState => imgBase64);
                        setIsShowDrown(false);
                    } }
                    onOpenCenter={ (resourcePath: string) => {
                        // 展示居中弹窗
                        setIsShowCenter(true);
                        // 拿到传回来的path,开始AI接口
                        understand(resourcePath).then();
                    } }
                />
            </DownerModal>
            {/* 居中弹窗 */ }
            <CenterModal isShow={ isShowCenter } onClose={ () => {
                setIsShowCenter(false);
                setUnderstandContent('');
                setUnderstandContentImg('');
            } }>
                <ImgBase64
                    picUrl={ understandContentImg }
                    style={ {
                        width: Dimensions.get('window').width / 1.6,
                        height: Dimensions.get('window').height / 5,
                        borderRadius: 18,
                        marginBottom: 10,
                    } }
                />
                <ScrollView style={ { flex: 1 } }>
                    {
                        understandContent
                            ? <Text>{ understandContent }</Text>
                            : <LoadingText/>
                    }
                </ScrollView>
                <Pressable
                    onPress={ () => {
                        setIsShowCenter(false);
                        setUnderstandContent('');
                        setUnderstandContentImg('');
                    } }
                    style={ {
                        width: '30%',
                        height: '10%',
                        backgroundColor: '#f2c88c',
                        borderRadius: 18,
                        justifyContent: 'center',
                        alignItems: 'center'
                    } }
                >
                    <Text style={ { fontSize: 16, color: '#fff' } }>确定</Text>
                </Pressable>
            </CenterModal>
        </View>
    );
};
export default HomeTop;

const vWidth = Dimensions.get('window').width;
const vHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    container: {
        height: vHeight / 7,
        backgroundColor: '#84321c',
        borderBottomLeftRadius: 45,
        borderBottomRightRadius: 45,
    },
    topBtn: {
        position: 'relative',
        height: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSign: {
        position: 'absolute',
        left: 15,
        width: 50,
        height: 25,
        backgroundColor: '#f2c88c',
        borderRadius: 25,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnPage: {
        width: vWidth / 3,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    btnPageText: {
        color: '#f2c88c',
        fontSize: 15
    },
    btnPageTextActive: {
        fontWeight: 'bold',
        fontSize: 16
    },
    topSearchBar: {
        height: '30%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    searchBarInner: {
        width: '80%',
        paddingLeft: 10,
        paddingRight: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 18,
    },
    searchBarInput: {
        flex: 1,
        padding: 0,
    }
});
