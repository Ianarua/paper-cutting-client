import request from '@/utils/request.ts';

export default function (shopId: number) {
    return request({
        url: `/shop/${ shopId }`,
        method: 'GET'
    });
}
