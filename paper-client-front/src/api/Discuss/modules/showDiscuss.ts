import request from '@/utils/request.ts';

export default function (pageNum: number, pageSize: number) {
    return request({
        url: '/discuss/show/discuss',
        method: 'GET',
        params: {
            pageNum,
            pageSize
        }
    });
}
