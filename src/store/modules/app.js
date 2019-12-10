// import Cookies from 'js-cookie'
const app = {
  state: {
    sidebar: {
      opened: 0
    },
    visitedViews: [],
    showSidebar: true
  },
  mutations: {
    TOGGLE_SIDEBAR: state => {
      // if (state.sidebar.opened) {
      //   Cookies.set('sidebarStatus', 1, 'hualala.com', 30)
      // } else {
      //   Cookies.set('sidebarStatus', 0, 'hualala.com', 30)
      // }
      state.sidebar.opened = !state.sidebar.opened
    },
    SHOW_SIDEBAR: (state, bol) => {
      state.showSidebar = bol
    },
    ADD_VISITED_VIEWS: (state, view) => {
      if (state.visitedViews.some(v => v.path === view.path)) return
      state.visitedViews.push({ name: view.name, path: view.path })
    },
    DEL_VISITED_VIEWS: (state, view) => {
      let index
      for (const [i, v] of state.visitedViews.entries()) {
        if (v.path === view.path) {
          index = i
          break
        }
      }
      state.visitedViews.splice(index, 1)
    }
  },
  actions: {
    ToggleSideBar ({ commit }) {
      commit('TOGGLE_SIDEBAR')
    },
    ShowSidebarAction ({ commit }, bol) {
      commit('SHOW_SIDEBAR', bol)
    },
    addVisitedViews ({ commit }, view) {
      commit('ADD_VISITED_VIEWS', view)
    },
    delVisitedViews ({ commit, state }, view) {
      return new Promise((resolve) => {
        commit('DEL_VISITED_VIEWS', view)
        resolve([...state.visitedViews])
      })
    }
  }
}

export default app
