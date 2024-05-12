import request from '@/utils/request.ts';

export default function (ids: number[]) {
    return request({
        url: '/goods/settle',
        method: 'GET',
        params: {
            ids
        }
    });
}
