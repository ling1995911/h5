// 递归路由每项的可操作功能
// function filterAsyncRouterMenu (asyncRouterMap) {
//   console.log('forMenu里的', asyncRouterMap)
//   let treeMenu = []
//   for (let i = 0; i < asyncRouterMap.length; i++) {
//     if (asyncRouterMap[i].name) {
//       treeMenu.push({'name': asyncRouterMap[i].name, 'id': asyncRouterMap[i].id})
//       // if (asyncRouterMap[i].children && asyncRouterMap[i].children.length) {
//       //   treeMenu[i].children = filterAsyncRouterMenu(asyncRouterMap[i].children)
//       //   for (let j = 0; j < asyncRouterMap[i].children.length; j++) {
//       //     if (asyncRouterMap[i].children[j].operate) {
//       //       treeMenu[i].children[j].children = filterAsyncRouterMenu(asyncRouterMap[i].children[j].operate)
//       //     }
//       //   }
//       // }
//     }
//   }
//   return treeMenu
// }
function filterAsyncRouterMenu (asyncRouterMap) {
  let treeMenu = []
  for (let i = 0; i < asyncRouterMap.length; i++) {
    if (asyncRouterMap[i].name) {
      treeMenu.push({'name': asyncRouterMap[i].name, 'id': asyncRouterMap[i].path, 'children': []})
    }
  }
  for (let i = 0; i < asyncRouterMap.length; i++) {
    if (asyncRouterMap[i].children && asyncRouterMap[i].children[0]) {
      for (let j = 0; j < asyncRouterMap[i].children.length; j++) {
        treeMenu[i].children.push({'name': asyncRouterMap[i].children[j].name, 'path': asyncRouterMap[i].children[j].id, 'children': []})
      }
    }
  }
  for (let i = 0; i < asyncRouterMap.length; i++) {
    if (asyncRouterMap[i].children && asyncRouterMap[i].children[0]) {
      for (let j = 0; j < asyncRouterMap[i].children.length; j++) {
        if (asyncRouterMap[i].children[j].operate && asyncRouterMap[i].children[j].operate[0]) {
          for (let l = 0; l < asyncRouterMap[i].children[j].operate.length; l++) {
            treeMenu[i].children[j].children.push({'name': asyncRouterMap[i].children[j].operate[l].name, 'id': asyncRouterMap[i].children[j].operate[l].path})
          }
        }
      }
    }
  }
  return treeMenu
}
// function dealData (datas) {
//   function dealDataInner (data) {
//     if (data.children !== undefined) {
//       return {
//         'id': data.id,
//         'label': data.name,
//         'children': dealData(data.children)
//       }
//     } else if (data.operate !== undefined) {
//       return {
//         'id': data.id,
//         'label': data.name,
//         'children': dealData(data.operate)
//       }
//     } else {
//       return {
//         'id': data.id,
//         'label': data.name
//       }
//     }
//   }
//   var newData = []
//   for (var i in datas) {
//     if (datas[i].id !== undefined) {
//       newData.push(dealDataInner(datas[i]))
//     }
//   }
//   console.log(newData)
//   return newData
// }
export default filterAsyncRouterMenu
