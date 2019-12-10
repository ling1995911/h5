const getters = {
  showSidebar: state => state.app.showSidebar,
  sidebar: state => state.app.sidebar,
  visitedViews: state => state.app.visitedViews,
  // token: state => state.user.token,
  // avatar: state => state.user.avatar,
  // name: state => state.user.name,
  // introduction: state => state.user.introduction,
  // status: state => state.user.status,
  // roles: state => state.user.roles,
  // roleIds: state => state.user.roleId,
  // setting: state => state.user.setting,
  userInfo: state => state.userInfo,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
