import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import global from './modules/global'
import userInfo from './modules/userInfo'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    userInfo,
    global,
    permission
  },
  getters
})

export default store
