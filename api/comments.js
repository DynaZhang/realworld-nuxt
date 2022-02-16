import { request } from '../plugins/request'

export const getComments = (slug) => {
    return request.request({
        method: 'get',
        url: `/articles/${slug}/comments`
    })
}

export const addComment = (data, slug) => {
    return request.request({
        method: 'post',
        url: `/articles/${slug}/comments`,
        data
    })
}

export const delComment = (slug, id) => {
    return request.request({
        method: 'delete',
        url: `/articles/${slug}/comments/${id}`
    })
}
