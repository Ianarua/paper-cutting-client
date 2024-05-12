import request from '@/utils/request.ts';

export default function (goodsCategoryId: number, pageNum: number, pageSize: number) {
    return request({
        url: `/goods/${ goodsCategoryId }`,
        method: 'GET',
        params: {
            pageNum,
            pageSize
        }
    });
}
