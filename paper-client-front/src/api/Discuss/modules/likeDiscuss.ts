import request from '@/utils/request.ts';

export default function (discussId: number) {
    return request({
        url: `/discuss/like/${ discussId }`,
        method: 'GET'
    });
}
