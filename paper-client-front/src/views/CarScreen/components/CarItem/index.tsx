import { Dimensions, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ICarItem } from '@/interface/ICarPage.ts';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import MyText from '@/components/MyText';
import InputNumber from '@/components/InputNumber';
import { postDeleteCar } from '@/api/Car';
import useDebounce from '@/utils/useDebounce.ts';
import ImgBase64 from '@/components/ImgBase64';
import IProjectBlock from '@/interface/IProjectBlock.ts';

interface IProps extends ICarItem {
    changeCheckedFunc: (status: boolean) => void,
    isCheckedPar: boolean,
    changeNumsFunc: (nums: number, projectInfo: (Omit<IProjectBlock, 'shopName' | 'shopId'> & { cartId: number })) => any
}

const CarItem = (props: IProps) => {
    const { shopInfo, projectInfo, changeCheckedFunc, isCheckedPar, changeNumsFunc } = props;
    const [isChecked, setIsChecked] = useState(isCheckedPar);

    // 修改数量函数
    // const debouncedChangeNumsFunc = useDebounce(changeNumsFunc, 300);

    function changeNumsInnerFunc (val: number) {
        // debouncedChangeNumsFunc(val);
        changeNumsFunc(val, projectInfo);
    }

    useEffect(() => {
        setIsChecked(isCheckedPar);
    }, [isCheckedPar]);

    // 删除购物车该商品
    async function deleteCar () {
        await postDeleteCar(projectInfo.goodsId);
    }

    return (
        <View style={ styles.content }>
            <View style={ styles.header }>
                {/*<Image source={ { uri: shopInfo.picUrl } } style={ { width: 17, objectFit: 'contain' } }/>*/ }
                <View style={ styles.headerLeft }>
                    <Image source={ require('@/assets/img/carPage/store.png') } style={ { width: 17, objectFit: 'contain', marginRight: 5 } }/>
                    {/*<Text style={ { marginRight: 15 } }>{ shopInfo?.shopName }</Text>*/}
                    <Text style={ { marginRight: 15 } }>纸韵艺坊</Text>
                    <Image source={ require('@/assets/img/carPage/greater.png') } style={ { width: 10, objectFit: 'contain' } }/>
                </View>
                <Pressable
                    style={ styles.headerRight }
                    onPress={ deleteCar }
                >
                    <Text style={ { color: '#fff' } }>删除</Text>
                </Pressable>
            </View>
            <View style={ styles.inner }>
                <View style={ styles.innerLeft }>
                    <BouncyCheckbox
                        disableText
                        size={ 24 }
                        isChecked={ isChecked }
                        onPress={ (status) => {
                            setIsChecked(status);
                            changeCheckedFunc(status);
                        } }
                    />
                    <View style={ styles.innerLeftImgView }>
                        <Image
                            source={ { uri: `data:image/png;base64,${ projectInfo.picUrl }` } }
                            style={ { width: '70%', height: '100%', objectFit: 'contain' } }
                        />
                    </View>
                    <View style={ styles.innerLeftInfo }>
                        <MyText text={ projectInfo.goodsName } styles={ { fontSize: 15, fontWeight: 'bold' } }/>
                        <MyText text={ `￥ ${ projectInfo.promotionPrice } / 件` } styles={ { color: '#f44545', fontSize: 14, fontWeight: 'bold' } }/>
                    </View>
                </View>
                <View style={ styles.innerRight }>
                    <InputNumber num={ 1 } min={ 1 } max={ 10 } change={ changeNumsInnerFunc }/>
                </View>
            </View>
        </View>
    );
};
export default CarItem;

const styles = StyleSheet.create({
    content: {
        marginTop: 10,
        width: '95%',
        borderRadius: 25,
        overflow: 'hidden',
        backgroundColor: '#fff',
        paddingLeft: 20,
        paddingRight: 20
    },
    header: {
        height: 40,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#000',
        borderStyle: 'solid'
    },
    headerLeft: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
        marginRight: 10
    },
    headerRight: {
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#e7775b',
        borderRadius: 15
    },
    inner: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: Dimensions.get('window').height * 0.15,
    },
    innerLeft: {
        width: '50%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    innerLeftImgView: {
        width: '50%',
        height: '70%',
        // backgroundColor: '#f1f1f1',
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerLeftInfo: {
        height: '50%',
        display: 'flex',
        justifyContent: 'space-between',
    },
    innerRight: {
        width: '12%',
        height: '90%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconImageStyle: {
        width: 20,
        height: 20,
    },
    deleteBtn: {},
});
