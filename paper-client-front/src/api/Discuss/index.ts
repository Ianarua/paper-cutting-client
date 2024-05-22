import showDiscuss from '@/api/Discuss/modules/showDiscuss.ts';
import likeDiscuss from '@/api/Discuss/modules/likeDiscuss.ts';
import publishDiscuss from '@/api/Discuss/modules/publishDiscuss.ts';

/**
 * @description 展示讨论
 * @param pageNum 页码
 * @param pageSize 一页几个
 */
export function getDiscuss (pageNum: number = 1, pageSize: number = 10) {
    return showDiscuss(pageNum, pageSize);
}

/**
 * @description 点赞讨论
 * @param discussId 评论Id
 */
export function getLikeDiscuss (discussId: number) {
    return likeDiscuss(discussId);
}

/**
 * @description 发表讨论
 * @param parentId 评论id 0是发布一级评论 不是0是二级评论
 * @param discussContent 评论内容
 */
export function postPublishDiscuss (parentId: number = 0, discussContent: string) {
    return publishDiscuss(parentId, discussContent);
}
