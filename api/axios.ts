import axios from 'axios'
import { Toast } from 'vant'

// axios.defaults.baseURL = (window as any).g.baseURL
axios.defaults.baseURL = 'http://hzhsdev.seetatech.com:8088/'

interface ApiConfig {
  'Content-Type': string;
}

export default (method: string, url: string, data: object, config?: ApiConfig) => {
  method = method.toLowerCase()
  // 根据method实现对应请求方式
  switch (method) {
    case 'get':
      return axios.get(url, { params: data })
    case 'post':
      if (config && config['Content-Type'] === 'multipart/form-data') {
        return axios({
          method: 'post',
          url,
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          data
        })
      } else {
        return axios.post(url, data)
      }
    default:
      console.log('请求方式不明确，切换默认get请求')
      return axios.get(url)
  }
}

// 请求拦截器
axios.interceptors.request.use((config) => {
  if (config.headers['Content-Type'] === 'multipart/form-data') {
    const fm = new FormData()
    if (config.data) {
      for (const key in config.data) {
        // 参数存在时，FormData传递该参数
        if (config.data[key]) {
          fm.append(key, config.data[key] || '')
        }
      }
    }
    config.data = fm
    return config
  }
  return config
}, (error) => {
  Toast.fail(error)
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use((res) => {
  if (res.data.res !== 0) {
    Toast.fail(res.data.message || 'api请求出错')
  }
  return res
}, (error) => {
  Toast.fail(error)
  return Promise.reject(error)
})
