// 获取登录用户信息
import Request from '../../utils/request'
import Store from '../../store/'
import { USER_SERVICE } from '../../config/app'
export default async (params) => {
  try {
    let data = await Request.postJSON({
      url: '/mor/getUserInfo',
      data: params
    }, USER_SERVICE)
    if (data && data.code === '000') {
      // 如果成功即使没有数据也应该是个空数组
      return Promise.resolve(data)
    } else {
      Store.dispatch('requestFail', data)
      return Promise.resolve(data)
      // throw new Error(data && data.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}
