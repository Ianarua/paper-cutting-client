import request from '@/utils/request.ts';

export default function (receivingAddressId: number, recipientName: string, recipientPhone: number, recipientRegion: string, recipientAddress: string) {
    return request({
        url: '/receivingAddress/create',
        method: 'POST',
        data: {
            arguments
        }
    });
}
