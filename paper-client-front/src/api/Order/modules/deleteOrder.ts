import request from '@/utils/request.ts';

export default function (ids: number[]) {
    return request({
        url: '/order/delete',
        method: 'POST',
        data: {
            ids
        }
    });
}
