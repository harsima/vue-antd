import i18n from '../lang/i18n'
import Store from '../store/store'
import Router from '../router/router'
import axios from './ajax.config'
import { message } from 'ant-design-vue'

/**
 * 阻止短时间内的重复请求
 * @param {array} reqList - 全部请求列表
 * @param {string} url - 当前请求地址
 * @param {function} cancel - 中断请求函数
 * @description 每个请求发起前先判断当前请求是否存在于RequestList中，
 *              如果存在则取消该次请求，如果不存在则加入RequestList中，
 *              当请求完成后500ms时，清除RequestList中对应的该请求。
 */
const stopRepeatRequest = function (reqList, url, cancel) {
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      cancel()
      return
    }
  }
  reqList.push(url)
}

/**
 * 允许某个请求可以继续进行
 * @param {array} reqList 全部请求列表
 * @param {string} url 请求地址
 */
const allowRequest = function (reqList, url) {
  for (let i = 0; i < reqList.length; i++) {
    if (reqList[i] === url) {
      reqList.splice(i, 1)
      break
    }
  }
}

/**
 * 请求重发
 * @param {Object} response 响应体
 */
const retryRequest = function (response) {
  var config = response.config
  if (!config || !config.retry) return Promise.reject(response)

  config.__retryCount = config.__retryCount || 0

  if (config.__retryCount >= config.retry) {
    return Promise.reject(response)
  }

  config.__retryCount += 1

  var backoff = new Promise(function (resolve) {
    setTimeout(function () {
      resolve()
    }, config.retryDelay || 1)
  })

  return backoff.then(function () {
    return axios(config)
  })
}

/**
 * 请求成功处理
 * @param {Object} response 响应体
 */
const successHandler = function (response) {
  // 正常处理情况
  if (response.data.code === '0000') {
    console.log(response.data)
    return Promise.resolve(response.data)
  }

  // Token过期
  if (response.data.code === '9981' || response.data.code === '9980') {
    message.warning(i18n.t('sysError.authorizonError'))
    Store.dispatch('user/logout').then(res => {
      Router.replace({ name: 'login' })
    })
  }

  // 其他错误
  message.warning(response.data.message)
  return Promise.reject(response.data.message)
}

/**
 * 错误状态处理
 * @param {object} error 响应体
 */
const errorHandler = function (error) {
  // 请求超时
  if (error.code === 'ECONNABORTED') {
    message.error(i18n.t('sysError.requestTimeout'))
    return Promise.reject(error)
  }

  // 正常情况下的处理
  if (error.respone) {
    const statusCode = error.response.status
    message.error(`Error: ${statusCode}`)
    return Promise.reject(error)
  }
  // 其他情况
  message.error(i18n.t('sysError.netError'))
  return Promise.reject(error)
}

export default {
  stopRepeatRequest,
  allowRequest,
  successHandler,
  errorHandler,
  retryRequest
}
