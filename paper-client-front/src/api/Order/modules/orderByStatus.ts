import request from '@/utils/request.ts';

export default function (orderStatus: number) {
    return request({
        url: `/order/${orderStatus}`,
        method: 'GET'
    })
}
