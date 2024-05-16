import request from '@/utils/request.ts';

export default function (shopId: number, pageNum, pageSize) {
    return request({
        url: `/shop/goods/${ shopId }`,
        method: 'GET',
        params: {
            pageNum,
            pageSize
        }
    });
}
