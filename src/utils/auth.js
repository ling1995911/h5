export const checkAuth = (data, rightCode) => {
  if(data.length > 0) {
    const hasAuth = data.some(item => {
      return item === rightCode
    })
    return hasAuth
  }else{
    return false
  }
}
