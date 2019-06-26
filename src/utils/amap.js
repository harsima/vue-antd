/**
 * 载入高德地图
 * @param {Function} callback 回调函数
 */
const loadMap = function (callback) {
  if (window.AMap) {
    callback()
  } else {
    var script = document.createElement('script')
    script.type = 'text/javascript'
    script.async = true
    script.src = `https://webapi.amap.com/maps?v=${process.env.VUE_APP_AMAP_VERSION}&key=${process.env.VUE_APP_AMAP_KEY}&callback=initAmap`
    document.body.appendChild(script)
    window.initAmap = () => {
      callback()
    }
  }
}

/**
 * 高德地图默认配置项
 */
const options = {
  center: [116.397428, 39.90923],
  resizeEnable: true,
  zoom: 10
}

export default {
  loadMap,
  options
}
