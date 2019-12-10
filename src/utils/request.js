import axios from 'axios'
// import Qs from 'qs'
import Cookie from './cookie'
function handleError (err, params) {
  return Promise.reject(err)
}

export default {
  checkParams (params) {
    if (!params.url) {
      throw new Error('无效的请求地址')
    }
  },
  init (url) {
    axios.defaults.baseURL = url
    axios.defaults.timeout = 15000
    axios.defaults.withCredentials = true
    // axios.defaults.headers['Access-Control-Allow-Headers'] = 'Origin, Content-Type, Cookie, Accept, x-requested-with'
    // axios.defaults.headers['x-requested-with'] = 'XMLHttpRequest'
    // axios.defaults.headers['Cookie'] = `access_token=${Cookie.get('access_token')}`
    // axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  },
  // http response 响应拦截器
  interceptors () {
    axios.interceptors.response.use(response => {
      let redirectUrl = ''
      let res = response.data
      switch (res.code) {
        case '0011111100000001':
        case '0011111100000002':
        case '0011111100000000':
        case '0011111100000007':
          redirectUrl = res.data.redirectUrl ? `${res.data.redirectUrl.split('?')[0]}?redirectURL=${window.location.origin}` : ''
          window.location.replace(redirectUrl)
          break
      }
      return response
    }, error => {
      // console.log(error)
      // if (error.response) {
      //   console.log(error)
      //   switch (error.response.status) {
      //     // 返回401，清除token信息并跳转到登录页面
      //     case 401:
      //     localStorage.removeItem('token');
      //     router.replace({
      //       path: '/login'
      //       //登录成功后跳入浏览的当前页面
      //       // query: {redirect: router.currentRoute.fullPath}
      //     })
      //   }
      //   // 返回接口返回的错误信息
      //   return Promise.reject(error.response.data);
      // }
      if(error.message.includes('timeout')){   // 判断请求异常信息中是否含有超时timeout字符串
        console.log('错误回调', error)
        return Promise.reject(error);          // reject这个错误信息
      }
      return Promise.reject(error);
    })
  },
  async get (params, baseURL = '') {
    this.checkParams(params)
    this.init(baseURL)
    this.interceptors()
    let url = params.url
    // 此处处理 params.data 拼接数据到 url 上
    if (params.data) {
      let str = ''
      for (let i in params.data) {
        str += `${i}=${params.data[i]}&`
      }
      url += '?' + str.substring(0, str.length - 1)
    }
    try {
      let res = await axios({
        method: 'get',
        url: url
      })
      return Promise.resolve(res.data ? res.data : {})
    } catch (err) {
      return handleError(err, params)
    }
  },
  async post (params, baseURL = '') {
    this.checkParams(params)
    this.init(baseURL)
    this.interceptors()
    try {
      let res = await axios({
        method: 'post',
        url: params.url,
        data: params.data,
        // 很坑啊 与Java的post参数始终不对
        transformRequest: [function (data) {
          // Do whatever you want to transform the data
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      })
      return Promise.resolve(res.data ? res.data : {})
    } catch (err) {
      return handleError(err, params)
    }
  },
  async put (params, baseURL = '') {
    this.checkParams(params)
    this.init(baseURL)
    this.interceptors()
    if (token) {
      axios.defaults.headers.common['access-token'] = token
    }
    try {
      let res = await axios({
        method: 'put',
        url: params.url,
        data: params.data
      })
      return Promise.resolve(res.data ? res.data : {})
    } catch (err) {
      return handleError(err, params)
    }
  },
  async patch (params, baseURL = '') {
    this.checkParams(params)
    this.init(baseURL)
    this.interceptors()
    try {
      let res = await axios({
        method: 'patch',
        url: params.url,
        data: params.data
      })
      return Promise.resolve(res.data ? res.data : {})
    } catch (err) {
      return handleError(err, params)
    }
  },
  async delete (params, baseURL = '') {
    this.checkParams(params)
    this.init(baseURL)
    this.interceptors()
    try {
      let res = await axios({
        method: 'delete',
        url: params.url,
        data: params.data
      })
      return Promise.resolve(res.data ? res.data : {})
    } catch (err) {
      return handleError(err, params)
    }
  },


  /* 需要传请求域名 POST JSON */
  async postJSON (params, baseURL = '') {
    this.checkParams(params)
    this.init(baseURL)
    this.interceptors()
    try {
      let res = await axios({
        method: 'post',
        url: params.url,
        data: params.data
      })
      return Promise.resolve(res.data ? res.data : {})
    } catch (err) {
      return handleError(err, params)
    }
  },
  /* 需要传请求域名 Form Data 格式的数据 POST 需要设置responseType 多用于导出接口返回的二进制流文件 */
  async postResponseType (params, baseURL = '') {
    this.checkParams(params)
    this.init(baseURL)
    this.interceptors()
    try {
      let res = await axios({
        method: 'post',
        url: params.url,
        data: params.data,
        responseType: 'arraybuffer',
        transformRequest: [function (data) {
          let ret = ''
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
          return ret
        }],
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      })
      return Promise.resolve(res.data ? res.data : {})
    } catch (err) {
      return handleError(err, params)
    }
  },
  /* 上传文件 需要传请求域名 POST multipart/form-data 上传文件 */
  async needBaseURLPostMultipart (params, baseURL = '') {
    this.checkParams(params)
    this.init(baseURL)
    this.interceptors()
    try {
      let res = await axios({
        method: 'post',
        url: params.url,
        data: params.data,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      return Promise.resolve(res.data ? res.data : {})
    } catch (err) {
      return handleError(err, params)
    }
  }
}
