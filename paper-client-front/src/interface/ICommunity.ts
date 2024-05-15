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

export interface IDiscuss {
    /* 讨论id */
    discussId: number;

    /* 讨论内容 */
    discussContent: string;

    /* 喜欢数 */
    favoriteNumber: number;

    /* 评论数 */
    commentNumber: number;

    /* 用户头像 */
    picUrl: string;

    /* 用户名字 */
    name: string;
}

export type IComments = Omit<IDiscuss, 'favoriteNumber' | 'commentNumber'>
