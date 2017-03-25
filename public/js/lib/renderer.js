let htmlRender = (function() {
  let defaults = {
    mount: null,
    w: 3,
    h: 3,
    cellClickHandler: (()=>{}),
    cellDrawHandler: (()=>{}),
    cellClass: 'inactive',
    cellActiveClass: 'active',
    context: null
  }

  let render = function(options){
    if(!options.hasOwnProperty("mount")) {
      throw new Error("HTML Renderer needs a mount point.")
    }

    this.config = Object.assign({}, defaults, options)
    this.table = _utils.createEl("table")
    this.bindEvents()
  }

  render.prototype.bindEvents = function () {

    var clickHandlerFactory = function(ctx) {
      return function(event) {
        let target = event.target;
        if(target.tagName === "TD") {
          ctx.config.cellClickHandler.apply(ctx.config.context, [target.getAttribute("x"), target.getAttribute("y")])
          ctx.toggleClass(target)
        }
      }
    }

    this.table.addEventListener('click', clickHandlerFactory(this))
  };

  render.prototype.toggleClass = function (el) {
    if(el.className === this.config.cellClass) {
      el.className = [this.config.cellClass, this.config.cellActiveClass].join(" ")
    }
    else {
      el.className = this.config.cellClass
    }
  };

  render.prototype.setConfig = function (options) {
    this.config = Object.assign({}, this.config, options)
  };

  // Not good for perfomance :( but a quick implementation
  render.prototype.clear = function () {
    this.table.innerHTML = ""
  };

  /**
  * Renders a 2d array in a html table
  * every cell can be active/inactive and add class will be added
  * depending of the cellDrawHandler.
  * also, every cell has an event attached to it
  */
  render.prototype.print = function (matrix) {
    this.clear()

    let width = this.calcWidth()
    let height = width;

    matrix.forEach( (row, yIndex) => {
      let tr = _utils.createEl('tr')
      row.forEach( (col, xIndex) => {

        let td = _utils.createEl('td')

        if (this.config.cellDrawHandler(col)) {
          td.className = [this.config.cellClass, this.config.cellActiveClass].join(" ")
        }
        else {
          td.className = this.config.cellClass
        }

        td.setAttribute("x", xIndex);
        td.setAttribute("y", yIndex);
        td.style.width = width+"px"
        td.style.height = height+"px"
        tr.appendChild(td)

      })
      this.table.appendChild(tr)
    })
    this.config.mount.appendChild(this.table)
    return this.table
  };

  render.prototype.calcWidth = function () {
    let boardWidth = this.config.mount.offsetWidth
    return parseInt(boardWidth)/parseInt(this.config.w);
  };

  return render
})()
