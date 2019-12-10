// 时间戳转换为年-月-日-时-分-秒
export function getTime (times) {
  let date = new Date(times)
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() + ' '
  let h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':'
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':'
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() + ' ' : date.getSeconds() + ' '
  let f = times.toString().slice(-3)
  return Y + M + D + h + m + s + f
}
// 时间数组转为yyyymmddhhssss
export function setTime (times) {
  let date = new Date(times)
  let Y = date.getFullYear() + ''
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate() + ''
  let h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + ''
  let m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ''
  let s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() + ''
  return Y + M + D + h + m + s
}
