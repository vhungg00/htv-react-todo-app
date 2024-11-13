class ChartCircle {
  /**
   * @param {HTMLCanvasElement} t - HTML DOM.
   */
  constructor(t) {
    ;(this.canvas = t),
      (this._clt = '#667278'),
      (this._num = 0),
      (this._bd = 20),
      (this._fs = 20),
      (this._ind = -1),
      (this._pre_ind = -1),
      (this._dur = 1000),
      (this._dr = 2.7),
      (this._sc = window.devicePixelRatio),
      (this._sl_i = -1),
      (this._cb = () => null),
      (this._hv = () => null),
      this.canvas && this.#t()
  }
  #t() {
    this.canvas.addEventListener('mousemove', t => {
      if (!this.radius) return
      const i = t.clientX - this.canvas.getBoundingClientRect().left,
        s = t.clientY - this.canvas.getBoundingClientRect().top,
        a = Math.atan2(s - this.radius, i - this.radius),
        e = Math.sqrt((i - this.radius) ** 2 + (s - this.radius) ** 2)
      if (e > this.radius - 2 || e < this.radius / this._dr)
        return void (
          this._ind > -1 &&
          ((this._pre_ind = this._ind),
          (this._ind = -1),
          this.#bb(this._dur, process => {
            this.#i(process)
          }),
          this._hv && this._hv(undefined))
        )
      let h = 0
      const r = -Math.PI / 2,
        d = this.data.findIndex((t, i) => {
          const s = h / this.total,
            e = (t.data + h) / this.total
          h += t.data
          let d = r + 2 * Math.PI * s,
            l = r + 2 * Math.PI * e
          return (
            d > Math.PI && (d = -(Math.PI - (d - Math.PI))),
            d <= Math.PI && l > Math.PI && (d = -(2 * Math.PI - d)),
            l > Math.PI && a < 0 && (l = -(Math.PI - (l - Math.PI))),
            a >= d && a <= l
          )
        })
      this._sl_i > -1 && (this._sl_i = -1)
      d !== this._ind &&
        ((this._pre_ind = this._ind),
        (this._ind = d),
        this.#bb(this._dur, process => {
          this.#i(process)
        }),
        this._hv && this._hv(this.data[this._ind], this._ind))
    }),
      this.canvas.addEventListener('mouseleave', () => {
        this._ind > -1 &&
          (((this._pre_ind = this._ind), (this._ind = -1)),
          this._sl_i < 0 && this._hv && this._hv(undefined),
          this.#bb(this._dur, process => {
            this.#i(process)
          }))
      }),
      document.addEventListener('mousedown', () => {
        const t = this._sl_i !== this._ind
        ;(this._sl_i = this._ind),
          this._sl_i > -1 && this._cb?.(this.data[this._sl_i], this._sl_i)
        t && this.#i()
      })
  }
  #s() {
    let t = '#'
    for (let i = 0; i < 6; i++) {
      t += '0123456789ABCDEF'[Math.floor(16 * Math.random())]
    }
    return t
  }
  /**
   * @param {(data?: object, index?: number) => void} t
   */
  click(t) {
    this._cb = t
  }
  /**
   * @param {(data?: object, index?: number) => void} cb
   */
  hover(cb) {
    this._hv = cb
  }
  /**
   * @param {number} t - Circle Radius
   */
  setRadius(t) {
    ;(this.radius = t), (this.size = { width: 2 * t, height: 2 * t })
  }
  /**
   * @param {number} t - Circle Radius
   */
  setScale(t) {
    this._sc = t
  }
  /**
   * @param {string} title - Title in the middle of the circle
   */
  setTitle(t) {
    this.title = t
  }
  /**
   * @param {number} t
   */
  setNumber(t) {
    this._num = t
  }
  /**
   * @param {Array<object>} datas
   * @param {string} datas.label
   * @param {number} datas.data
   * @param {string} datas.backgroundColor
   * @param {string} datas.backgroundColorDisabled
   * @param {onClick} datas.onClick
   * function onClick(data) {}
   */
  setData(t) {
    if (Array.isArray(t))
      (this.data = t),
        (this.total = this.data.reduce((t, i) => {
          const { data: s } = i
          return (s && 'number' == typeof s) || (s = 0), t + s
        }, 0))
    else {
      const t = [
        {
          label: 'Label 1',
          data: 10,
          backgroundColor: 'blue',
          backgroundColorDisabled: '#83A0B4',
          wAdd: 0,
          hAdd: 0,
        },
        {
          label: 'Label 2',
          data: 20,
          backgroundColor: 'red',
          backgroundColorDisabled: '#93ADBF',
        },
      ]
      console.warn('Data must be of array type'),
        console.warn(JSON.stringify(t, null, 2)),
        (this.data = []),
        (this.total = 0)
    }
  }
  #i(process = 1) {
    if (!this.canvas) return
    this.size || (this.size = this.canvas.getBoundingClientRect()),
      (this.canvas.width = this.size.width * this._sc),
      (this.canvas.height = this.size.height * this._sc),
      this.radius || (this.radius = (this.size.height - 20) / 2)
    const radius = this.radius * this._sc
    const t = this.canvas.getContext('2d')
    if (!t) return
    t.clearRect(0, 0, this.canvas.width, this.canvas.height)
    let i = 0
    t.save(),
      t.moveTo(radius, radius),
      (t.lineWidth = 0),
      (t.strokeStyle = 'transparent'),
      (t.shadowBlur = 10),
      (t.shadowColor = 'rgba(0, 0, 0, 1)'),
      (t.shadowOffsetX = 0),
      (t.shadowOffsetY = 0),
      t.arc(radius, radius, radius - this._bd * this._sc - 2, 0, 2 * Math.PI),
      t.fill(),
      t.restore()
    for (let s = 0; s < this.data.length; s++) {
      const a = this.data[s],
        e = i / this.total,
        h = (a.data + i) / this.total
      i += a.data
      let r = a.backgroundColor || this.#s(),
        d = this._ind
      let _sb = r
      if (this._pre_ind > -1 && this._pre_ind !== s) {
        _sb = a.backgroundColorDisabled || '#C1CFD9'
      }
      this._sl_i > -1 && (d = this._sl_i),
        d > -1 && s !== d && (r = a.backgroundColorDisabled || '#C1CFD9'),
        (r = this.#ee(_sb, r, process))
      this.#a(t, e, h, r)
    }
    t.save(),
      t.beginPath(),
      (t.fillStyle = 'white'),
      t.moveTo(radius, radius),
      t.arc(radius, radius, radius / this._dr, 0, 2 * Math.PI),
      t.closePath(),
      t.fill(),
      t.restore(),
      t.save(),
      (t.font = `600 ${20 * this._sc}px 'Noto Sans JP', sans-serif`),
      (t.fillStyle = '#667278'),
      (t.textAlign = 'center'),
      t.fillText(this.title, radius, radius - 25 * this._sc),
      t.restore(),
      t.save(),
      (t.font = `500 ${60 * this._sc}px 'Varela Round', sans-serif`),
      (t.fillStyle = '#E98300'),
      (t.textAlign = 'center')
    const s = t.measureText(this._num).width
    t.fillText(
      this._num,
      radius - 18 * this._sc,
      radius + (this._num == 100 ? 40 : 44) * this._sc,
    ),
      t.restore(),
      t.save(),
      (t.font = `500 ${32 * this._sc}px 'Noto Sans JP', sans-serif`),
      (t.fillStyle = '#E98300'),
      (t.textAlign = 'center'),
      t.fillText(
        '歳',
        radius + s - (this._num == 100 ? 53 : 33) * this._sc,
        radius + 35 * this._sc,
      ),
      t.restore()
    if (this._num == 100) {
      ;(t.font = `500 ${24 * this._sc}px 'Noto Sans JP', sans-serif`),
        (t.fillStyle = '#E98300'),
        (t.textAlign = 'center'),
        t.fillText('以上', radius - 0 * this._sc, radius + 73 * this._sc),
        t.restore(),
        t.save()
    }
    for (let s = 0; s < this.data.length; s++) {
      const a = this.data[s],
        e = i / this.total,
        h = (a.data + i) / this.total
      ;(i += a.data), this.#e(t, a, e, h)
    }
  }
  #a(t, i, s, a) {
    const radius = this.radius * this._sc
    const e = -Math.PI / 2 + 2 * Math.PI * i,
      h = -Math.PI / 2 + 2 * Math.PI * s
    t.save(),
      (t.fillStyle = a),
      t.beginPath(),
      (t.globalAlpha = 0.3),
      t.moveTo(radius, radius),
      t.arc(radius, radius, radius, e, h),
      t.closePath(),
      t.fill(),
      t.beginPath(),
      (t.globalAlpha = 1),
      t.moveTo(radius, radius),
      t.arc(radius, radius, radius - this._bd * this._sc, e, h),
      t.closePath(),
      t.fill()
  }
  #e(t, i, s, a) {
    let ii = i.label
    const radius = this.radius * this._sc
    const e = (-Math.PI / 2 + 2 * Math.PI * s + (-Math.PI / 2 + 2 * Math.PI * a)) / 2,
      h = radius / this._dr - this._bd * this._sc - 15,
      r = radius + ((radius + h) / 2) * Math.cos(e) + (i.wAdd || 0) * this._sc
    let d = radius + ((radius + h) / 2) * Math.sin(e) + (i.hAdd || 0) * this._sc
    ;(d += (ii.split('\n').length * (this._fs * this._sc) + ii.split('\n').length) / 2),
      t.save(),
      (t.font = `500 ${this._fs * this._sc}px 'Noto Sans JP', sans-serif`),
      (t.fillStyle = 'white'),
      (t.textAlign = 'center')
    const l = ii.split('\n')
    for (let i = 0; i < l.length; i++) {
      if (l[l.length - 1 - i].includes('悪性新生物')) {
        let e = l[l.length - 1 - i].split('悪性新生物')
        t.textAlign = 'end'
        t.letterSpacing = '-2px'

        for (let l = 0; l < e.length; l++) {
          let n = e[l]
          t.fillText(n, r + (l > 0 ? 65 : -18) * this._sc, d - 32 * this._sc * i),
            l < e.length - 1 &&
              (t.save(),
              (t.font = `500 ${14 * this._sc}px 'Noto Sans JP', sans-serif`),
              t.fillText('悪性新生物', r + 46 * this._sc, d - 32 * this._sc * i),
              t.restore())
        }
      } else t.fillText(l[l.length - 1 - i], r, d - 32 * this._sc * i)
    }

    t.restore()
  }
  /**
   * Remove Selected Data
   */
  removeSelected() {
    this._sl_i = -1
    this._ind = -1
    this.#i()
  }

  /**
   * Draw Chart
   */
  draw() {
    Array.isArray(this.data) && this.#i()
  }

  #hh(N) {
    return 1 + --N * N * N * N * N
  }
  #bb(q, J) {
    window.cancelAnimationFrame(window._rqA)
    let O = null,
      X = t => {
        O || (O = t)
        let e = t - O,
          i = this.#hh(Math.min(e / q, 1))
        J?.(1 * i), e < q && (window._rqA = window.requestAnimationFrame(X))
      }
    window.requestAnimationFrame(X)
  }
  #ee(Y, j, G) {
    if (Y.startsWith('#'))
      (K = parseInt(Y.substr(1, 2), 16)),
        (Q = parseInt(Y.substr(3, 2), 16)),
        (U = parseInt(Y.substr(5, 2), 16)),
        (V = 1)
    else if (Y.startsWith('rgba')) {
      var K,
        Q,
        U,
        V,
        Z,
        tt,
        te,
        ti,
        ts = Y.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/)
      ;(K = parseInt(ts[1], 10)),
        (Q = parseInt(ts[2], 10)),
        (U = parseInt(ts[3], 10)),
        (V = parseFloat(ts[4]))
    }
    if (j.startsWith('#'))
      (Z = parseInt(j.substr(1, 2), 16)),
        (tt = parseInt(j.substr(3, 2), 16)),
        (te = parseInt(j.substr(5, 2), 16)),
        (ti = 1)
    else if (j.startsWith('rgba')) {
      var tr = j.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/)
      ;(Z = parseInt(tr[1], 10)),
        (tt = parseInt(tr[2], 10)),
        (te = parseInt(tr[3], 10)),
        (ti = parseFloat(tr[4]))
    }
    var ta = Math.round((1 - G) * K + G * Z),
      th = Math.round((1 - G) * Q + G * tt),
      td = Math.round((1 - G) * U + G * te),
      tl = (1 - G) * V + G * ti
    return Y.startsWith('#')
      ? this.#ii(ta, th, td)
      : Y.startsWith('rgba')
      ? 'rgba(' + ta + ',' + th + ',' + td + ',' + tl + ')'
      : void 0
  }
  #ii(tn, to, tu) {
    let tc = function (t) {
      var e = t.toString(16)
      return 1 === e.length ? '0' + e : e
    }
    return '#' + tc(tn) + tc(to) + tc(tu)
  }
}
window && (window.ChartCircle = ChartCircle)
