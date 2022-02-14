import axios from "axios";

const request = axios.create({
    baseURL: 'https://api.realworld.io/api'
})

request.interceptors.response.use((response) => {
    if (response.status === 200) {
        return response.data
    } else {
        return Promise.reject(response.data);
    }
}, (error) => {
    return Promise.reject(error);
})

export default request;
