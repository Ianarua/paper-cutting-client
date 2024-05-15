import request from '@/utils/request.ts';

export default function (receivingAddressId: number, recipientName: string, recipientPhone: string, recipientRegion: string, recipientAddress: string) {
    return request({
        url: '/receivingAddress/update',
        method: 'POST',
        data: {
            receivingAddressId,
            recipientName,
            recipientPhone,
            recipientRegion,
            recipientAddress
        }
    });
}
