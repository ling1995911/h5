import axios from 'axios'

axios.interceptors.response.use(
  response => {
    if (response && response.data && response.data.message && response.data.message === '请登录') {
      window.sessionStorage.removeItem('roleId')
      window.sessionStorage.removeItem('routeName')
      window.sessionStorage.removeItem('accessRoute')
      window.location.href = '/'
    }
    return response
  }
)
export default axios
