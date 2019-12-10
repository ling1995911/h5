/**
 * Created by jiachenpan on 16/11/18.
 */
/* eslint-disable */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
  if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime (time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 格式化时间
export function getQueryObject (url) {
  url = url == null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 *get getByteLen
 * @param {Sting} val input value
 * @returns {number} output value
 */
export function getByteLen (val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/ig) != null) {
      len += 1
    } else { len += 0.5 }
  }
  return Math.floor(len)
}

export function cleanArray (actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

 export function param (json) {
    if (!json) return ''
    return cleanArray(Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })).join('&')
 }

  export function param2Obj (url) {
    const search = url.split('?')[1]
    if (!search) {
      return {}
    }
    return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
  }

  export function html2Text (val) {
    const div = document.createElement('div')
    div.innerHTML = val
    return div.textContent || div.innerText
  }

export function objectMerge (target, source) {
  /* Merges two  objects,
   giving the last one precedence */

  if (typeof target !== 'object') {
    target = {}
  }
   if (Array.isArray(source)) {
     return source.slice()
   }
  for (const property in source) {
    if (source.hasOwnProperty(property)) {
      const sourceProperty = source[property]
      if (typeof sourceProperty === 'object') {
        target[property] = objectMerge(target[property], sourceProperty)
        continue
      }
      target[property] = sourceProperty
    }
 }
 return target
}

export function scrollTo (element, to, duration) {
  if (duration <= 0) return
  const difference = to - element.scrollTop
  const perTick = difference / duration * 10
  setTimeout(() => {
    console.log(new Date())
    element.scrollTop = element.scrollTop + perTick
    if (element.scrollTop === to) return
    scrollTo(element, to, duration - 10)
  }, 10)
}

export function toggleClass (element, className) {
  if (!element || !className) {
    return
  }
  let classString = element.className
  const nameIndex = classString.indexOf(className)
  if (nameIndex === -1) {
    classString += '' + className
  } else {
    classString = classString.substr(0, nameIndex) + classString.substr(nameIndex + className.length)
  }
  element.className = classString
}

export const pickerOptions = [
  {
    text: '今天',
    onClick (picker) {
      const end = new Date()
      const start = new Date(new Date().toDateString())
      end.setTime(start.getTime())
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一周',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(end.getTime() - 3600 * 1000 * 24 * 7)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近一个月',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
      picker.$emit('pick', [start, end])
    }
  }, {
    text: '最近三个月',
    onClick (picker) {
      const end = new Date(new Date().toDateString())
      const start = new Date()
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
      picker.$emit('pick', [start, end])
    }
  }
]

export function getTime (type) {
  if (type === 'start') {
    return new Date().getTime() - 3600 * 1000 * 24 * 90
  } else {
    return new Date(new Date().toDateString())
  }
}

export function debounce (func, wait, immediate) {
  let timeout, args, context, timestamp, result

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp

    // 上次被包装函数被调用时间间隔last小于设定时间间隔wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }

  return function (...args) {
    context = this
    timestamp = +new Date()
    const callNow = immediate && !timeout
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }

    return result
  }
}

export function deepClone (source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone')
  }
  const targetObj = source.constructor === Array ? [] : {}
  for (const keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepClone(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

/* 时间处理 */
export function dateFormat (date, format) {
  date = new Date(date);
  var o = {
      'M+' : date.getMonth() + 1, //month
      'd+' : date.getDate(), //day
      'H+' : date.getHours(), //hour
      'm+' : date.getMinutes(), //minute
      's+' : date.getSeconds(), //second
      'q+' : Math.floor((date.getMonth() + 3) / 3), //quarter
      'S' : date.getMilliseconds() //millisecond
  };
  if (/(y+)/.test(format))
      format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  for (var k in o)
      if (new RegExp('(' + k + ')').test(format))
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
  return format;
}

/* 时间处理 */
export function javaDateFormat (date) {
  if (!date) {
    return ''
  }
  date = new Date(date);
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  return `${date.getFullYear()}${month}${day}${hour}${minute}${second}`
}
/* 时间处理split */
export function javaDateFormatSplit (date) {
  if (!date) {
    return ''
  }
  date = new Date(date);
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`
}

/* 日期处理 年月日 */
export function grpcDateFormat (date) {
  if (!date) {
    return ''
  }
  date = new Date(date);
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  // let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  // let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  // let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  return `${date.getFullYear()}${month}${day}`
}

/* 时间处理2 1546939193000 ===> 2019-01-08 17:19:53*/ 
export function javaDateFormat2 (date) {
  if (!date) {
    return ''
  }
  date = new Date(date);
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`
}

/* 日期处理2 */
export function grpcDateFormatTwo (date) {
  if (!date) {
    return ''
  }
  date = new Date(date);
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  // let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  // let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  // let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  return `${date.getFullYear()}-${month}-${day}`
}

/* 日期处理2 */
export function grpcDateFormatThree (date) {
  if (!date) {
    return ''
  }
  date = new Date(date);
  let day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
  let hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours()
  let minute = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()
  let second = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds()
  let month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1)
  return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`
}

// 20180829105739 ====> 2018-08-29-10:57:39
export function changeTime (date) {
  return `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)} ${date.slice(8,10)}:${date.slice(10,12)}:${date.slice(12,14)}`
}

// 20180829 ====> 2018-08-29
export function changeResponseDate (date = '') {
  return `${date.slice(0,4)}-${date.slice(4,6)}-${date.slice(6,8)}`
}

// 'Thu May 12 2017 08:00:00 GMT+0800 (中国标准时间)' =>> yyyy-MM-dd hh:mm:ss
export function timeType (date) {
  var date = new Date(date)
  return `${date.getFullYear()}-${date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}-${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()} ${date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:${date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}`
}

// 判断数据小数位数最多为两位小数例如（0.01）
export function changeFloat (num) {
  let str = num + ''
  let point = str.indexOf('.')
  let len = str.length
  if ((len - point) > 3) {
    return true
  }
  return false
}


// js小数计算精度处理提高精度 乘法 例如 x * 100
export function floatMul (arg1, arg2 = 100) {
  let m = 0, s1 = arg1.toString(), s2 = arg2.toString()
  if (arg1.toString().indexOf('.') > -1) {
    m += s1.split('.')[1].length
    // m += s2.split(".")[1].length
    return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
  } else {
    return arg1 * arg2
  }
}

// js小数计算精度处理提高精度 除法 例如 x / 100
export function floatDivision (arg1) {
  let t1 = 0, t2 = 0, r1, r2 = 100
  if (arg1.toString().indexOf('.') > -1) {
    t1 = arg1.toString().split('.')[1].length
    // t2 = arg2.toString().split('.')[1].length
    r1 = Number(arg1.toString().replace('.', ''))
    // r2 = Number(arg2.toString().replace('.', ''))
    return (r1 / r2) * Math.pow(10, t2 - t1)
  } else {
    return arg1 / 100
  }
}

export function accAdd(arg1, arg2){
  let r1 = 0, r2 = 0, m
  if (arg1.toString().indexOf('.') > -1) {
    r1=arg1.toString().split(".")[1].length
  }
  if (arg2.toString().indexOf('.') > -1) {
    r2 = arg2.toString().split('.')[1].length
  }
  m = Math.pow(10, Math.max(r1, r2))
  return (arg1 * m + arg2 * m) / m
}

// 判断字符串长度(中文占两个长度)
export function StringLength (str) {
  let len = 0
  for (let i = 0, l = str.length; i < l; i++) {
    if (str.charCodeAt(i) > 127 || str.charCodeAt(i) === 94) {
      len += 2
     } else {
      len ++
     }
   }
  return len
 }

// 特殊字符和空格判断 如果有返回true
export function CheckString (str) {
  let reg = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
  let regSpace = /\s/g
  return reg.test(str) || regSpace.test(str)
}

// 支持符号：#（） 、/  -  ""  (必须是半角)
export function CheckStringCode (str) {
  let reg = new RegExp("[`~!@$^&*=|{}':;',\\[\\].<>?~！（）@￥……&*|{}【】‘；：”“'。，？]")
  let regSpace = /\s/g
  return reg.test(str) || regSpace.test(str)
}

// 判断是不是纯数字 如果是返回true
export function CheckNumber (str) {
  return !isNaN(str) && str.indexOf('.') < 0
}

// 判断是不是全角符号
export function CheckFullCharacters (str = '') {
  for (let s of str.split('')) {
    let num = s.charCodeAt();
    if (num === 12288 || (num >= 65281 && num <=65374)) {
      return true
    }
  }
  return false
}

// 手机号码正则表达式验证
export function CheckPhone(phone){ 
  return (/^1[3|4|5|6|7|8|9]\d{9}$/.test(phone))
}

// 邮箱正则表达式验证
export function CheckEmail(email){
  return (/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(email))
}

// 金额格式化成 1,222.00
export function FormattingOfAmount (str) {
  let s = str
  s = (+s).toLocaleString()
  if (s.indexOf('.') > -1) {
    let ary = s.split('.')
    let len = ary[1].length
    if (len === 1) {
      s += '0'
    } else if (len > 2) {
      s.length = s.length - len - 2
    }
  } else {
    s += '.00'
  }
  return s
}

// 验证金额输入
export function CheckAmount (str) {
  let reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
  return reg.test(str)
}

// js判断用户输入的是否为一个数字串，或者是用逗号隔开的数字串 例如123,456
export function RegCommaSeparatedNumber (str) {
  let reg = /^(\d+[,])*(\d+)$/
  return reg.test(str)
}
