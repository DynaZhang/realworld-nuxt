import { request } from '../plugins/request'

export const getArticles = (params) => {
    return request.request({
        method: 'get',
        url: '/articles',
        params
    });
}

export const getFeedArticles = (params) => {
    return request.request({
        method: 'get',
        url: '/articles/feed',
        params
    });
}

export const getArticleTags = () => {
    return request.request({
        method: 'get',
        url: '/tags'
    })
}

export const setArticleFavorite = (slug) => {
    return request.request({
        method: 'post',
        url: `/articles/${slug}/favorite`
    })
}

export const setArticleUnFavorite = (slug) => {
    return request.request({
        method: 'delete',
        url: `/articles/${slug}/favorite`
    })
}
