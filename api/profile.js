import { request } from '../plugins/request'

export const followUser = (username) => {
    return request.request({
        method: 'post',
        url: `/profiles/${username}/follow`
    })
}

export const unFollowUser = (username) => {
    return request.request({
        method: 'delete',
        url: `/profiles/${username}/follow`
    })
}
