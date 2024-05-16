import request from '@/utils/request.ts';

export default function (pageNum: number, pageSize: number) {
    return request({
        url: '/order',
        method: 'GET',
        params: {
            pageNum,
            pageSize
        }
    })
}
