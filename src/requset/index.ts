import Request from './http';


const token = sessionStorage.getItem("token");
console.log('token :>> ', token);
const lang = sessionStorage.getItem("lang")
  ? sessionStorage.getItem("lang")
  : "en";

const request: Request = new Request({
    // 公共前缀
    baseURL: 'https://tkg-api.zale.mobi/api/', 
    // 请求头
    headers: {
        'Accept': 'application/json',
        'token': token,
        'lang': lang
    },
    timeout:8000
})
export default request;
