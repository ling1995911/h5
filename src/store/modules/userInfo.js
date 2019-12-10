// /* eslint-disable */
import GetUserInfo from '@/api/userInfo/getUserInfo'
import QueryUserRightInfo from '@/api/userInfo/queryUserRightInfo'
import LogOff from '@/api/userInfo/logOff'
import { map, flatten } from 'lodash'
// import Token from '@/api/login/token.js'

// import { getToken, setToken, removeToken } from '@/utils/auth'
// import cookie from '../../utils/cookie'
const localStorage = window.localStorage

// 按钮权限
const getrightCode = (authdata) => {
  if (!authdata) {
    return
  }
  let rightCodes = []
  map(authdata, item => {
    rightCodes.push(map(item.rightList, 'rightCode'))
  })
  return flatten(rightCodes)
}
// 模块权限
const getModuleRightCode = (authData) =>{
  if(!authData) {
    return
  }
  let pageRights = []
  map(authData, item => {
    pageRights.push(item.moduleKey)
  })
  return pageRights
}

const userInfo = {
  state: {
    userInfo: {},
    userRightInfo: {},
    loginOut: {},
    newAuthArr: [],
    moduleRights: [],
  },

  mutations: {
    USER_INFO: (state, data) => {
      state.userInfo = Object.assign({}, data)
    },
    USER_RIGHT_INFO: (state, data) => {
      state.userRightInfo = Object.assign({}, data)
    },
    LOGIN_OUT: (state, data) => {
      state.loginOut = Object.assign({}, data)
    },
    NEW_AUTH_ARR: (state, data) => {
      state.newAuthArr = [].concat(data)
    },
    MODULE_RIGHTS: (state, data) => {
      state.moduleRights = [].concat(data)
    },
  },

  actions: {
    async getUserInfoAction ({commit}, params) {
      try {
        let data = await GetUserInfo(params)
        commit('USER_INFO', data)
        if (data.code === '000') {
          const userdata = data.data
          localStorage.setItem('appID', data.appid)
          if (localStorage.getItem('empID') !== userdata.empID) {
            localStorage.setItem('userName', userdata.empName)
            localStorage.setItem('empID', userdata.empID)
            localStorage.setItem('orgType',userdata.orgType)
            localStorage.setItem('cpyOrgName',userdata.cpyOrgName)
            localStorage.setItem('cpyOrgID',userdata.cpyOrgID)
            localStorage.setItem('teamOrgName',userdata.teamOrgName)
            localStorage.setItem('teamOrgID',userdata.teamOrgID)
            localStorage.setItem('deptOrgName',userdata.deptOrgName)
            localStorage.setItem('deptOrgID',userdata.deptOrgID)
            localStorage.setItem('imaccount', userdata.neteaseImAccid)
            localStorage.setItem('imtoken', userdata.neteaseImToken)
          }
        }
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async getUserRightInfoAction ({commit}, params) {
      try {
        let data = await QueryUserRightInfo(params)
        if (data.code === '000') {
          let rArray = data.data
          // 权限数据转换
          const newAuthArr = getrightCode(rArray)
          const moduleRights = getModuleRightCode(rArray)
          localStorage.setItem('t_auth', JSON.stringify(newAuthArr))
          localStorage.setItem('pageauth', JSON.stringify(moduleRights))
          commit('NEW_AUTH_ARR', newAuthArr)
          commit('MODULE_RIGHTS', moduleRights)
          
        } else {
          commit('NEW_AUTH_ARR', [])
          commit('MODULE_RIGHTS', [])
        }
        commit('USER_RIGHT_INFO', data)
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async loginOutAction ({commit}, params) {
      try {
        localStorage.removeItem('empID')
        localStorage.removeItem('misauth')
        localStorage.removeItem('pageauth')
        localStorage.removeItem('userName')
        localStorage.removeItem('orgType')
        localStorage.removeItem('cpyOrgName')
        localStorage.removeItem('cpyOrgID')
        localStorage.removeItem('imaccount')
        localStorage.removeItem('imtoken')
        let data = await LogOff(params)
        commit('LOGIN_OUT', data)
        return Promise.resolve(data)
      } catch (err) {
        return Promise.reject(err)
      }
    },
  }
}

export default userInfo
