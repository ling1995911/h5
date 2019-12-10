function WaterMark (option) {
  // componentDidUpdate = (prevProps) => {
  //     if (option.user.empID && !prevProps.user.empID) {
  //         this.imgUrl = this.getImgUrl()
  //         this.id = 'watermark-' + uuid.v4()

  //         this.parent = this.watermark.parentNode
  //         this.initAttribute(this.watermark)
  //         this.parentObserver = this.observeParent()
  //         this.selfObserver = this.observeSelf(this.watermark)
  //     }
  // }
  
  // componentWillUnmount = () => {
  //     this.parentObserver && this.parentObserver.disconnect()
  //     this.selfObserver && this.selfObserver.disconnect()
  // }

  getImgUrl = () => {
    const empID = option.user.empID
    const empName = option.user.empName

    // Options
    const ANGLE = 30 * Math.PI / 180
    const WIDTH = 300
    const HEIGHT = WIDTH * Math.tan(ANGLE)
    const OPACITY = 0.15
    const RATIO = 0.7
    const FONTSIZE = 30

    var canvas = document.createElement('canvas')
    canvas.setAttribute('width', WIDTH)
    canvas.setAttribute('height', HEIGHT)

    var ctx = canvas.getContext('2d')
    // 样式
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.font = `${FONTSIZE}px monospace`
    ctx.fillStyle = `rgba(120, 120, 120, ${OPACITY})`
    ctx.strokeStyle = `rgba(120, 120, 120, ${OPACITY})`
    ctx.lineWidth = 5

    // 旋转
    ctx.translate(WIDTH / 2, HEIGHT / 2)
    ctx.rotate(-ANGLE)
    ctx.translate(-WIDTH / 2, -HEIGHT / 2)

    // * 印章风
    // ctx.beginPath()
    // ctx.arc(WIDTH / 2, HEIGHT / 2, (WIDTH * RATIO) / 2, 0, Math.PI * 2, true)
    // ctx.moveTo((WIDTH * (1 - RATIO)) / 2, HEIGHT / 2)
    // ctx.lineTo((WIDTH * (1 + RATIO)) / 2, HEIGHT / 2)
    // ctx.stroke()
    // ctx.fillText(`${empID}`, WIDTH / 2, HEIGHT / 3)
    // ctx.fillText(`${empName}`, WIDTH / 2, (HEIGHT * 2) / 3)

    // * 纯文字
    ctx.fillText(`${empID} - ${empName}`, WIDTH / 2, HEIGHT / 2)

    if (option.showBorder) {
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.lineTo(WIDTH, 0)
      ctx.lineTo(WIDTH, HEIGHT)
      ctx.lineTo(0, HEIGHT)
      ctx.lineTo(0, 0)
      ctx.stroke()
    }
    return canvas.toDataURL()
  }

  /**
   * 用于监测水印是否被移除，移除的话：
   *      - 断开水印 observer
   *      - 父节点下插入新的水印
   *      - observe 新的水印
   */
  observeParent = () => {
      const options = {
          childList: true,
      }
      const callback = (mutationsList) => {
          for (var mutation of mutationsList) {
              let removed = mutation.removedNodes[0]
              if (removed && removed.dataset.watermarkid === this.id) {
                  this.selfObserver.disconnect()
                  let target = mutation.target
                  this.insertClone(target)
              }
          }
      }

      const observer = new MutationObserver(callback)
      observer.observe(this.parent, options)

      return observer
  }

  /**
   * 监测水印自身，自身属性有任何变化，就初始化 target 的属性，包括：
   *      重设 data-watermarkid（parentObserver 依赖此值）
   *      重设 style
   *
   * 等于是锁定了 target 的部分属性
   */
  observeSelf = (node) => {
      const options = {
          attributes: true,
          attributeOldValue: true,
      }
      const callback = (mutationsList, observer) => {
          for (var mutation of mutationsList) {
              observer.disconnect()
              this.initAttribute(mutation.target)
              observer.observe(node, options)
          }
      }
      const observer = new MutationObserver(callback)
      observer.observe(node, options)

      return observer
  }

  // 重设 target 的属性
  initAttribute = (target) => {
      target.dataset.watermarkid = this.id
      target.setAttribute(
          'style',
          `
              position: fixed!important;
              top: 0!important;
              bottom: 0!important;
              left: 0!important;
              right: 0!important;
              margin: 0!important;
              padding: 0!important;
              transform: none!important;
              width: auto!important;
              height: auto!important;
              scale: 1!important;
              rotate: none!important;
              display: block!important;
              visibility: visible!important;
              opacity: 1!important;
              z-index: 99999999999999!important;
              pointer-events: none;
              background-repeat: repeat!important;
              background-image: url(${this.imgUrl})!important;
              background-size: auto!important;
      `,
      )
  }

  insertClone = (target) => {
      let clonedWaterMark = this.watermark.cloneNode(true)
      this.selfObserver = this.observeSelf(clonedWaterMark)
      target.appendChild(clonedWaterMark)
  }
}

export default WaterMark
