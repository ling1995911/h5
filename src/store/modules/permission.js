import { constantRouterMap, asyncRouterMap } from '@/router/index'
import ForRouter from '../../utils/forRoute'
import router from '../../router/index'

const permission = {
  state: {
    routers: constantRouterMap,
    routeName: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.routers = [].concat(constantRouterMap, routers)
    },
  },
  actions: {
    GenerateRoutes: ({ commit }, data) => {
      return new Promise(resolve => {
        let usableRouters = []
        usableRouters = ForRouter(asyncRouterMap(data.moduleRights, data.newAuthArr))
        commit('SET_ROUTERS', usableRouters)
        router.addRoutes(usableRouters)
        resolve()
      })
    }
  }
}

export default permission
