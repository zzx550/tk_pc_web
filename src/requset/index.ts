import Request from './http';
const request: Request = new Request({
    // 公共前缀
    baseURL: 'https://tkg-api.zale.mobi/api/', 
    // 请求头
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'token': ''
    },
    timeout:8000
})
export default request;
