// 查询出金明细列表
import Request from '../../utils/request'
import Store from '../../store/'
import { SETTLE_UNIT_PREFIX } from '../../config/app'
export default async (params) => {
  try {
    let data = await Request.needBaseURLGet({
      url: '/api/mor/td/settle/queryDetailList.svc',
      data: params
    }, SETTLE_UNIT_PREFIX)
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
