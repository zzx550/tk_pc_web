import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import router from "@/router"; // 引入Vue Router实例
import QS from "qs";

class Request {
  private instance: AxiosInstance | undefined;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    //请求拦截器
    this.instance.interceptors.request.use(
      (config) => {
        return config;
      },
      (error) => {
        console.log(error, "error");
      }
    );

    // 响应拦截
    this.instance.interceptors.response.use(
      (res) => {
        if (res.data.code == 401) {
          sessionStorage.removeItem("token");
          router.push("/login");
        }
        return res.data;
      },
      (err) => {
        return err;
      }
    );
  }
  request<T>(config: AxiosRequestConfig<T>): Promise<T> {
    return new Promise<T>((reslove, reject) => {
      this.instance
        ?.request<any, T>(config)
        .then((res) => {
          reslove(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
  // 封装get请求
  get(url: string, data: any) {
    axios.defaults.headers.post["Content-Type"] =
    "application/json";
    return new Promise((resolve, reject) => {
      this.instance
        ?.get(url, {
          params: { ...data },
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error.data);
        });
    });
  }
  // 封装post请求
  post(url: string, data: any) {
    axios.defaults.headers.post["Content-Type"] =
      "application/x-www-form-urlencoded;charset=UTF-8";
    return new Promise((reslove, reject) => {
      this.instance
        ?.post(url, QS.stringify({ ...data }))
        .then((res) => {
          reslove(res);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  }
  // 图片上传
  postForm(url: string, params: any) {
    axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
    return new Promise((resolve, reject) => {
      axios
        .post(url, params)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  }
}
export default Request;
