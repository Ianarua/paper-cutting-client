import request from '@/utils/request.ts';

/**
 * @description 用户登录
 * @param {string} buyerAccount 账号
 * @param {string} buyerPassword 密码
 */
export function login (buyerAccount: string, buyerPassword: string) {
    return request({
        url: '/buyer/login',
        method: 'POST',
        data: {
            buyerAccount,
            buyerPassword
        }
    });
}


/**
 * @description 用户登出
 */
export function logout () {
    return request({
        url: '/buyer/logout',
        method: 'PUT'
    });
}


/**
 *  @description 用户注册
 *  @param {string} buyerAccount 账号
 *  @param {string} buyerPassword 密码
 */
export function register (buyerAccount: string, buyerPassword: string) {
    return request({
        url: '/buyer/register',
        method: 'POST',
        data: {
            buyerAccount,
            buyerPassword
        }
    });
}
