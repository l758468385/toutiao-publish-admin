/* 用户请求模块 */

import request from '@/utils/request'

export const login = (data) => {
    return request({
        method: 'post',
        url: '/mp/v1_0/authorizations',
        data: data
    })
}

export const getUserInfo = () => {
    return request({
        method: 'get',
        url: '/mp/v1_0/user/profile',
    })
}