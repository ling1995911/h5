import Cookie from '../utils/cookie'

// 全局常量
const win = window
const loc = win.location

const host = loc.host
const port = loc.port

const APP_ENV = host.split('.')[0] === 'pre' ? 'pre' : (host.split('.')[0] === 'dohko' ? 'dohko' : 'pro')

// 初始变量
let APP_ID = '_t_tiaofangzi'
let APP_HOST = ''
let DEVICE_ID_KEY = ''
let APP_IS_LOCAL = false
let TOKEN = ''
let APP_TOKEN_KEY = 'access_token'
let MOBILE = false

// top level hostname
let topHostMatch = loc.hostname.match(/\.([^.]+\.com)$/)  // 'dohko-t.tiaofangzi.com'
let TOP_LEVEL_HOST = topHostMatch && topHostMatch[1]

let USER_SERVICE = '//pay.tiaofangzi.com'

let SUFFIX = APP_ENV === 'pro' ? '' : APP_ENV

APP_HOST = host

// for host
APP_HOST = TOP_LEVEL_HOST

// for env
if (port) {
  APP_IS_LOCAL = true
}

if (SUFFIX) {
  APP_TOKEN_KEY = SUFFIX === 'pro' ? 'access_token' : 'access_token_' + SUFFIX
}
TOKEN = Cookie.get(APP_TOKEN_KEY)

if (APP_ENV === 'dohko') {
  USER_SERVICE = '//dohko.pay.tiaofangzi.com' // 'http://192.168.4.245:8080'
} else if (APP_ENV === 'pre') {
  USER_SERVICE = '//pre.pay.tiaofangzi.com'
}

function isMobileBrowserRedirect () {
  let sUserAgent = navigator.userAgent.toLowerCase()
  let bIsIpad = sUserAgent.match(/ipad/i) == 'ipad'
  let bIsIphoneOs = sUserAgent.match(/iphone os/i) == 'iphone os'
  let bIsMidp = sUserAgent.match(/midp/i) == 'midp'
  let bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == 'rv:1.2.3.4'
  let bIsUc = sUserAgent.match(/ucweb/i) == 'ucweb'
  let bIsAndroid = sUserAgent.match(/android/i) == 'android'
  let bIsCE = sUserAgent.match(/windows ce/i) == 'windows ce'
  let bIsWM = sUserAgent.match(/windows mobile/i) == 'windows mobile'
  let inWechat = sUserAgent.match(/MicroMessenger/i) == 'micromessenger'
  if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM || inWechat) {
    return true
  } else {
    return false
  }
}
MOBILE = isMobileBrowserRedirect()

export {
  APP_HOST,
  APP_IS_LOCAL,
  APP_ID,
  TOP_LEVEL_HOST,
  APP_ENV,
  DEVICE_ID_KEY,
  TOKEN,
  USER_SERVICE,
  MOBILE,
}
