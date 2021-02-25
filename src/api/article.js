import request from '@/utils/request'

export const getArticle = (params) => {
    return request({
        method: 'get',
        url: '/mp/v1_0/articles',
        params
    })
}

export const getChannels = () => {
    return request({
        url: '/mp/v1_0/channels',
        method: 'get'

    })
}
export const deleteArticle = (articleId) => {
    return request({
        url: `/mp/v1_0/articles/${articleId}`,
        method: 'delete'
    })
}