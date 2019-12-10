// 开票服务商配置
import Request from '../../utils/request'
import Store from '../../store/'
import { ORDER_PREFIX } from '../../config/app'
export default async (params) => {
  try {
    let data = await Request.needBaseURLPost({
      url: '/order/queryOrderInfo.htm',
      data: params
    }, ORDER_PREFIX)
    if (data && data.code === '000') {
      // 如果成功即使没有数据也应该是个空数组
      return Promise.resolve(data)
    } else {
      Store.dispatch('requestFail', data)
      throw new Error(data && data.message)
    }
  } catch (err) {
    return Promise.reject(err)
  }
}