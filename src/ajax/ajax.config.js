import axios from 'axios'
import AjaxApi from './ajax.api'
import Store from '../store/store'

const CancelToken = axios.CancelToken
const source = CancelToken.source()
let reqList = []

const service = axios.create({
  baseURL: process.env.VUE_APP_AJAX_BASE_URL,
  timeout: Number(process.env.VUE_APP_AJAX_TIMEOUT),
  retry: Number(process.env.VUE_APP_AJAX_RETRY),
  retryDelay: Number(process.env.VUE_APP_AJAX_RETRYDELAY)
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    config.headers.token = `${Store.state.user.token}`
    config.cancelToken = source.token
    // 阻止重复请求。当上个请求未完成时，相同的请求不会进行
    AjaxApi.stopRepeatRequest(reqList, `${config.baseURL}${config.url}`, source.cancel)
    return config
  },
  err => Promise.reject(err)
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 增加延迟，相同请求不得在短时间内重复发送
    setTimeout(() => {
      AjaxApi.allowRequest(reqList, response.config.url)
    }, 1000)
    return AjaxApi.successHandler(response)
  },
  error => {
    if (axios.isCancel(error)) {
      return Promise.reject(new Error('Ajax Abort: 该请求在axios拦截器中被中断'))
    } else {
      // 增加延迟，相同请求不得在短时间内重复发送
      setTimeout(() => {
        AjaxApi.allowRequest(reqList, error.config.url)
      }, 1000)
    }
    return AjaxApi.errorHandler(error)
  }
)

export default service
