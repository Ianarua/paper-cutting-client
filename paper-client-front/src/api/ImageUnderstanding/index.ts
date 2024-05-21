import request from '@/utils/request.ts';

/**
 * @description 图片内容理解
 * @param picUrl 后端保存的图片url
 */
export function postImageUnderstand (picUrl: string) {
    return request({
        url: '/imageUnderstanding',
        method: 'POST',
        data: {
            picUrl
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
}
