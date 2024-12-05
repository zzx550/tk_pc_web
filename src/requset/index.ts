import Request from "./http";

const request: Request = new Request({
  // 公共前缀
  // G站
  baseURL: 'https://tkg.toiotko.com/api/',
  // 请求头
  headers: {
    Accept: "application/json",
  },
  timeout: 10000,
});
export default request;
