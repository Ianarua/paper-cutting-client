import { ImageSourcePropType } from 'react-native';

export interface ISmallComments {
    smallUserName: string,
    smallCommentText: string
}

export interface IBigComments {
    avatar: ImageSourcePropType,
    bigUserName: string,
    bigCommentText: string
}

export interface ICommunityData {
    bigComments: IBigComments,
    favorite: number,
    smallComments?: ISmallComments[]
}
