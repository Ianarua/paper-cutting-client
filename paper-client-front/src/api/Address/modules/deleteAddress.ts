import request from '@/utils/request.ts';

export default function (receivingAddressId: number) {
    return request({
        url: `/receivingAddress/delete/${ receivingAddressId }`,
        method: 'GET'
    });
}
