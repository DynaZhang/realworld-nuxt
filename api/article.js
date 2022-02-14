import request from '../utils/request'

export const getArticals = (data) => {
    return request.get('/articles', data);
}
