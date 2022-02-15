import axios from "axios";

export const request = axios.create({
    baseURL: 'https://conduit.productionready.io/api'
});

export default ({ store }) => {
    request.interceptors.request.use((config) => {
        const { userInfo } = store.state.user;
        if (userInfo && userInfo.token) {
            config.headers.Authorization = `Token ${userInfo.token}`;
        }
        return config;
    });

    request.interceptors.response.use((response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            return Promise.reject(response.data);
        }
    }, (error) => {
        return Promise.reject(error);
    })
};
