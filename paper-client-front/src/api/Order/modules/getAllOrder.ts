import request from '@/utils/request.ts';

export default function () {
    return request({
        url: '/order',
        method: 'GET'
    })
}
