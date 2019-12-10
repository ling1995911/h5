export default function MP (key) {
  const JS1 = new Promise(function (resolve, reject) {
    window.onload = function () {
      resolve(window.AMap)
    }
    let script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = 'https://webapi.amap.com/maps?v=1.4.6&key=' + key + '&callback=onload'
    script.onerror = reject
    document.head.appendChild(script)
  })
  const JS2 = new Promise(function (resolve, reject) {
    let script2 = document.createElement('script')
    script2.type = 'text/javascript'
    script2.src = 'https://webapi.amap.com/ui/1.0/main-async.js'
    script2.onerror = reject
    script2.onload = function () {
      resolve('success')
    }
    document.head.appendChild(script2)
  })
  return Promise.all([JS1, JS2]).then(function (result) {
    // console.log('result----------->', result)
    return result[0]
  }).catch(e => {
    console.log(e)
  })
}
