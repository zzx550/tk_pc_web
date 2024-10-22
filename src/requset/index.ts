import Request from "./http";

const request: Request = new Request({
  // 公共前缀
  // G站
  // baseURL: 'https://tkg-api.zale.mobi/api/',
  // 测试K站
  baseURL: "https://tkk-api.zale.mobi/api/",
  // 请求头
  headers: {
    Accept: "application/json",
  },
  timeout: 8000,
});
export default request;
