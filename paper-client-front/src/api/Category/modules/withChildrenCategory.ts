import request from '@/utils/request.ts';

export default function () {
    return request({
        url: '/category/category/withChildren',
        method: 'GET'
    });
}
