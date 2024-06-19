import axios, { AxiosInstance } from 'axios';
import storage from '@/utils/storage.ts';
import { navigate } from '@/utils/navigation.ts';
import { Toast } from '@pingtou/rn-vant';

export interface IResponse {
    code: number,
    data: any,
    message: string
}

const request: AxiosInstance = axios.create({
    baseURL: 'http://43.143.208.148:8082',
    // baseURL: 'http://43.143.28.148:8082',
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 15000
});

request.interceptors.request.use(
    async (config) => {
        if (config.url !== '/buyer/login' && config.url !== '/buyer/register') {
            const token = await storage.load({ key: 'token' });
            if (token) {
                config.headers.Authorization = `Bearer ${ token }`;
            }
        }
        if (config.url === '/imageUnderstanding') {
            config.timeout = 30000;
        }
        // if (config.url === '/resource/add') {
        //     config.timeout = 10000;
        // }
        return config;
    },
    (error: any) => {
        // 处理请求发送失败的情况
        Toast.clear();
        Toast.fail('请求发送失败');
        return Promise.reject(error);
    }
);

request.interceptors.response.use(
    async (response) => {
        // 请求成功，关闭loading提示
        Toast.clear();
        // 对响应数据进行处理，这里可以根据后端约定的数据结构来处理
        const responseData: IResponse = response.data;
        const code: number = responseData.code || 200;
        if (code === 200) {
            // 处理成功的情况
            return responseData.data;
        } else {
            // 处理其他状态码的情况
            if (responseData.code === 401) {
                console.error(responseData.message);
                await storage.remove({ key: 'token' });
                // 跳转到登录页面
                navigate('Login');
            }
            console.error(responseData.message);
            Toast.fail(responseData.message);
            return Promise.reject(responseData.message);
        }
    },
    (error) => {
        // 请求失败，关闭loading提示
        Toast.clear();
        // 对响应错误进行处理
        if (error.response) {
            // 服务器返回了错误状态码
            const status = error.response.status;
            switch (status) {
                case 400:
                    console.error('400');
                    return Promise.reject('请求参数错误');
                case 401:
                    console.error('401');
                    return Promise.reject('未授权，请登录');
                case 403:
                    console.error('403');
                    return Promise.reject('拒绝访问');
                case 404:
                    console.error('404');
                    return Promise.reject('请求资源不存在');
                case 500:
                    console.error('500');
                    return Promise.reject('服务器内部错误');
                default:
                    return Promise.reject(error.response.data.msg || '服务器错误');
            }
        } else if (error.request) {
            // 请求发送了，但是没有收到响应
            Toast.fail('网络错误，请检查网络连接');
            return Promise.reject('网络错误，请检查网络连接');
        } else {
            // 请求未能发送
            // Toast.fail('请求未能发送，请稍后重试');
            return Promise.reject('请稍后重试');
        }
    }
);

export default request;
