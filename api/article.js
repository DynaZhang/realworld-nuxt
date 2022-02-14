import request from '../utils/request'

export const getArticles = (params) => {
    return request.request({
        method: 'get',
        url: '/articles',
        params
    });
}

export const getFeedArticles = (params) => {
    return request.get({
        method: 'get',
        url: '/articles/feed',
        params
    });
}
