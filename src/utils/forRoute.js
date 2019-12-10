/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param roles..
 */
// function filterAsyncRouter (asyncRouterMap, oldajaxRouter) {
//   let ajaxRouter = []
//   // oldajaxRouter 是当前用户可访问菜单
//   for (var i = 0; i < oldajaxRouter.length; i++) {
//     if (ajaxRouter.indexOf(oldajaxRouter[i]) === -1) {
//       ajaxRouter.push(oldajaxRouter[i])
//     }
//   }
//   // console.log('ajaxRouter', oldajaxRouter)
//   // ajaxRouter是去重后的当前用户可访问菜单
//   let accessedRouters = []
//   // asyncRouterMap 是整个项目的router列表
//   for (let j = 0, lens = asyncRouterMap.length; j < lens; j++) {
//     for (let i = 0, len = ajaxRouter.length; i < len; i++) {
//       // console.log('ajaxRouter[i]', ajaxRouter[i])
//       if (asyncRouterMap[j].path.indexOf(ajaxRouter[i]) > 0) {
//         accessedRouters.push(asyncRouterMap[j])
//       }
//     }
//   }
//   if (accessedRouters.length > 0) {
//     for (let j = 0, lens = accessedRouters.length; j < lens; j++) {
//       let childrenRouter = []
//       if (accessedRouters[j].children && accessedRouters[j].children.length > 0) {
//         let children = accessedRouters[j].children
//         for (let item of children) {
//           for (let it of ajaxRouter) {
//             // if (item.path.indexOf(it) > -1) {
//             // console.log('item', item.path, it)
//             if (item.path === it) {
//               childrenRouter.push(item)
//               // 去重！！！
//               let obj = {}
//               childrenRouter = childrenRouter.reduce((cur, next) => {
//                 if (!obj[next.id]) {
//                   obj[next.id] = true
//                   cur.push(next)
//                 }
//                 return cur
//               }, [])
//             }
//           }
//         }
//       }
//       accessedRouters[j].children = childrenRouter
//     }
//   }
//   return accessedRouters
// }
// export default filterAsyncRouter

function filterAsyncRouter (asyncRouterMap) {
  let router = []
  if (asyncRouterMap.length > 0) {
    for (let i = 0, lens = asyncRouterMap.length; i < lens; i++) {
      if (asyncRouterMap[i].authority) {
        asyncRouterMap[i].children =
          asyncRouterMap[i].children && asyncRouterMap[i].children.length > 0 && filterChildRouter(asyncRouterMap[i].children)
        router.push(asyncRouterMap[i])
      }
    }
  }
  return router
}

function filterChildRouter (list) {
  return list.filter((item) => {
    if (item.authority) {
      if (item.children && item.children.length > 0) {
        item.children = filterChildRouter(item.children) 
      }
      return item.authority
    }
  })
}
export default filterAsyncRouter

