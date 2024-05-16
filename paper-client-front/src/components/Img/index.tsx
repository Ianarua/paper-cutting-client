import { Animated, Dimensions, StyleSheet, View } from 'react-native';
import { FC } from 'react';
import Image = Animated.Image;

interface IProps {
    imgUrl: string,
}


const ProjectBlockImg: FC<IProps> = (props) => {
    const { imgUrl } = props;
    return (
        <View style={ styles.imgView }>
            {
                imgUrl
                    ? <Image
                        source={ { uri: `data:image/png;base64,${ imgUrl }` } }
                        // source={ require('@/assets/img/logo.png') }
                        style={ styles.img }
                    />
                    : <Image
                        source={ require('@/assets/img/logo.png') }
                        // source={ require('@/assets/img/logo.png') }
                        style={ styles.img }
                    />
            }
        </View>
    );
};
export default ProjectBlockImg;
const window = Dimensions.get('window');
const width = window.width / 3;
const height = width * 1.2;
const styles = StyleSheet.create({
    imgView: {
        // width: '100%',
        height: '60%',
        paddingTop: 10,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: '#fff'
        // backgroundColor: '#f1ece6'
    },
    img: {
        width: width,
        height: height,
        objectFit: 'cover'
    },
});
