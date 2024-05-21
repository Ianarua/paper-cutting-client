import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { FC } from 'react';
import { Asset, ImagePickerResponse, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { postResourceImg } from '@/api/ImgResource';

interface IProps {
    onCloseDrown: (imgBase64: string) => void, // 关闭底部选择弹窗
    onOpenCenter: (resourcePath: string) => void, // 打开中间弹窗
}

const Camera: FC<IProps> = (props) => {
    const { onCloseDrown, onOpenCenter } = props;
    // 图片中选择
    const addPhoto = () => {
        launchImageLibrary({
            mediaType: 'photo', // 'photo' or 'video' or 'mixed'
            selectionLimit: 1, // 1为一张，0不限制数量
            includeBase64: true
        }, async res => {
            await handleImagePickerRes(res);
        }).then();
    };

    // 调用摄像头
    const tackPhoto = () => {
        launchCamera({
            mediaType: 'photo',
            cameraType: 'back'
        }, async res => {
            await handleImagePickerRes(res);
        }).then();
    };

    // 上传图片函数
    async function uploadImage (params: { name: string; type: string; uri: string, base64: string }) {
        const formData = new FormData();
        formData.append('file', {
            uri: params.uri,
            type: params.type,
            name: params.name,
        });
        // 请求接口
        const res: any = await postResourceImg(formData);
        // resourcePath        resourceBase64
        // 关闭底部弹窗,传回图片的base64,展示用
        onCloseDrown(params.base64);
        // 打开居中弹窗,传回图片的path,为了调AI分析接口
        onOpenCenter(res.resourcePath);
    }

    // 处理image-picker返回结果函数
    async function handleImagePickerRes (res: ImagePickerResponse) {
        if (!res.didCancel && !res.errorCode) {
            const asset = res.assets![0]; // 获取选择的图片
            const file = {
                uri: asset.uri!,
                type: asset.type!, // 或者使用 'image/jpeg'、'image/png' 等
                name: asset.fileName || asset.uri!.split('/').pop()!,
                base64: asset.base64!
            };
            // 调用上传图片函数
            await uploadImage(file);
        }
    }

    return (
        <View style={ styles.content }>
            <Pressable style={ styles.item } onPress={ () => addPhoto() }>
                <Text style={ styles.itemText }>图库里选择</Text>
            </Pressable>
            <Pressable style={ styles.item } onPress={ () => tackPhoto() }>
                <Text style={ styles.itemText }>摄像头拍摄</Text>
            </Pressable>
        </View>
    );
};

export default Camera;

const styles = StyleSheet.create({
    content: {
        height: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10
    },
    item: {
        width: '100%',
        height: '40%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemText: {
        fontSize: 18,
        color: '#2d91fe'
    }
});
