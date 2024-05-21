import request from '@/utils/request.ts';

export default function (shopId: number, pageNum: number, pageSize: number) {
    return request({
        url: `/shop/goods/${ shopId }`,
        method: 'GET',
        params: {
            pageNum,
            pageSize
        }
    });
}
