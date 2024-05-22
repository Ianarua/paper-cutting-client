export interface IDiscuss {
    /* 讨论id */
    discussId: number;

    /* 讨论内容 */
    discussContent: string;

    /* 喜欢数 */
    favoriteNumber: number;

    /* 是否点过赞 */
    isLike: boolean;

    /* 评论数 */
    commentNumber: number;

    /* 用户头像 */
    picUrl: string;

    /* 用户名字 */
    name: string;

    /* 子评论 */
    discussCommentVos: IDiscussCommentVos[];
}

export type IDiscussCommentVos = Omit<IDiscuss, 'favoriteNumber' | 'commentNumber' | 'discussCommentVos'>

export interface IDiscussPublish {
    /* 父id,发起话题为0 */
    parentId: number,

    /* 话题内容 */
    discussContent: string,

    [key: string]: string | number
}
