import { FC, useEffect, useState } from 'react';
import { Image, ImageStyle, StyleProp } from 'react-native';
import IsRenderHOC from '@/components/HOC/IsRenderHOC.tsx';

interface IProps {
    picUrl: string,
    style: StyleProp<ImageStyle>
}

const ImgBase64: FC<IProps> = (props) => {
    const { picUrl, style } = props;
    const styles = style;
    const [base64Url, setBase64Url] = useState('');
    useEffect(() => {
        setBase64Url(`data:image/png;base64,${ picUrl }`);
        // return () => {
        //     setBase64Url('');
        // }
    }, []);
    return (
        <IsRenderHOC isShow={ base64Url !== '' }>
            <Image
                source={ {
                    uri: base64Url,
                } }
                style={ { ...styles as any, objectFit: 'contain' } }
            />
        </IsRenderHOC>
    );
};

export default ImgBase64;
