import axios from 'axios'

// 配置项
const axiosOption = {
    baseURL: '/api',
    timeout: 5000,
    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
}

// 创建一个单例
const service = axios.create(axiosOption);

// 添加请求拦截器
service.interceptors.request.use((config) => {
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((response) => {
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

export default service;
