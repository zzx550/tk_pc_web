import axios from 'axios'
import QS from 'qs'
import router from '@/router' // 引入Vue Router实例

// 环境的切换
axios.defaults.baseURL = 'https://tkg-api.zale.mobi/api/'

// 请求超时时   间
axios.defaults.timeout = 10000
// axios.defaults.headers['language'] = 'cn'
// post请求头
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8'

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    // const token = store.state.token
    const token = sessionStorage.getItem('token')
    const lang = sessionStorage.getItem('lang')
      ? sessionStorage.getItem('lang')
      : 'en'
    lang && (config.headers.lang = lang)
    token && (config.headers.token = token)
    return config
  },
  (error) => {
    return Promise.error(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    if (response.status && response.status === 200) {
      if (response.data.code == 401) {
        sessionStorage.removeItem('token')
        router.push('/')
      }
      return Promise.resolve(response)
      // }
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  (error) => {
    if (error.response && error.response.status) {
      return Promise.reject(error.response)
    }
  }
)
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: { ...params },
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, QS.stringify({ ...params }))
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

// 图片上传
export function postForm(url, params) {
  axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
