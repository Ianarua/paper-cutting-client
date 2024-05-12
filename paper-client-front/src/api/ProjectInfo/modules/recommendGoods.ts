import request from '@/utils/request.ts';


export default function (pageNum: number, pageSize: number) {
    return request({
        url: '/goods/recommend',
        method: 'GET',
        params: {
            pageNum,
            pageSize
        }
    });
}
