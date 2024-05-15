import FastImage from 'react-native-fast-image';
import { FC } from 'react';
import { ImageStyle, StyleProp } from 'react-native';

interface IProps {
    picUrl: string,
    style: StyleProp<ImageStyle>
}

const ImgBase64: FC<IProps> = (props) => {
    const { picUrl, style } = props;
    const projectInfo = {
        picUrl: `data:image/png;${ picUrl }` // base64 图片数据
    };
    console.log(projectInfo.picUrl.slice(0, 100));

    return (
        <FastImage
            source={ {
                uri: projectInfo.picUrl,
                priority: FastImage.priority.high,
            } }
            // style={ style }
        />
    );
};

export default ImgBase64;
