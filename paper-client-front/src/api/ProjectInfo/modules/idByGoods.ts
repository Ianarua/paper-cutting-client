import request from '@/utils/request.ts';

export default function (goodsId: number) {
    return request({
        url: `/goods/getOne/${goodsId}`,
        method: 'GET'
    })
}
