import request from '@/utils/request.ts';

export function postResourceImg (formData: FormData): any {
    return request({
        url: '/resource/add',
        method: 'POST',
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}
