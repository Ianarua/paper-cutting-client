import request from '@/utils/request.ts';

export default function () {
    return request({
        url: '/receivingAddress/get',
        method: 'GET'
    })
}
