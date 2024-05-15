import request from '@/utils/request.ts';

export default function (parentId: number, discussContent: string) {
    return request({
        url: '/discuss/publish',
        method: 'POST',
        data: {
            parentId,
            discussContent
        }
    });
}
