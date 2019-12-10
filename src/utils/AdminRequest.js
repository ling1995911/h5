import Request from './request'
import log from './log'
import cookie from 'js-cookie'
import { APP_TOKEN_KEY, APP_ENV } from 'config/app'

const WRITE_LOG = APP_ENV === 'pro' // 指定环境上传log
const PASS_LOG = true      // 是否忽略log必传

function handle(result) {
  if (result && result.code && result.code === 1) {
    return Promise.resolve(result.result)
  } else {
    if (result.need_login && result.need_login === 1) {
      if (window.confirm('登录状态已过期, 是否重新登录?')) {
        cookie.remove(APP_TOKEN_KEY)
        window.location.reload()
      }
    }
    return Promise.reject(result.message)
  }
}

function handleLog (result) {
  if (result && result.code && +result.code === 1) {
    return true
  } else {
    return false
  }
}

export default {
  async get (params, _event) {
    try {
      if(WRITE_LOG) {
        let result = await log.up(_event)
        if (!handleLog(result) && !PASS_LOG) {
          return Promise.reject('请正确填写log信息！')
        }
      }
      let result = await Request.get(params)
      return handle(result)
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async post (params, _event) {
    try {
      if(WRITE_LOG) {
        let result = await log.up(_event)
        if (!handleLog(result) && !PASS_LOG) {
          return Promise.reject('请正确填写log信息！')
        }
      }
      let result = await Request.post(params)
      return handle(result)
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async put (params, _event) {
    try {
      if(WRITE_LOG) {
        let result = await log.up(_event)
        if (!handleLog(result) && !PASS_LOG) {
          return Promise.reject('请正确填写log信息！')
        }
      }
      let result = await Request.put(params)
      return handle(result)
    } catch (err) {
      return Promise.reject(err)
    }
  },
  async delete (params, _event) {
    try {
      if(WRITE_LOG) {
        let result = await log.up(_event)
        if (!handleLog(result) && !PASS_LOG) {
          return Promise.reject('请正确填写log信息！')
        }
      }
      let result = await Request.delete(params)
      return handle(result)
    } catch (err) {
      return Promise.reject(err)
    }
  }
}