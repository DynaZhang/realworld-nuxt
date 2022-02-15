import { request } from '../plugins/request';

export const userLogin = (data) => {
    return request.post('/users/login', data);
}

export const userRegister = (data) => {
    return request.post('/users', data);
}

export const getCurrentUser = () => {
    return request.get('/user');
}
