let Game = (function(){

  let game = function(renderEngine, width, height) {
    this.renderEngine = renderEngine
    this.width = width
    this.height = height
    this.matrix = []

    this.running = false

    this.clickCellHandler.bind(this)

    this.renderEngine.setConfig({
      cellClass: 'cell',
      cellActiveClass: 'cell--active',
      cellClickHandler: this.clickCellHandler,
      cellDrawHandler: this.renderCellHandler,
      context: this,
    })

    this._start()
  }

  game.prototype._start = function () {
    for (var i = 0; i < this.width; i++) {
      for (var j = 0; j < this.height; j++) {
        this.matrix[i] = this.matrix[i] || []
        this.matrix[i][j] = new Cell(j, i)
      }
    }
    this.render();
  }

  game.prototype.clickCellHandler = function (x, y) {
    this.matrix[y][x].click()
  }

  game.prototype.renderCellHandler = function (cell) {
    if(cell.alive) {
      return true
    }
    return false
  }

  game.prototype.setRenderEngine = function (engine) {
    this.renderEngine = engine
  }

  game.prototype.render = function () {
    this.renderEngine.print(this.matrix)
  }

  // Find the alive neighbors that sourround a cell
  game.prototype.neighbors = function (cell) {
    var posX = cell.x,
        posY = cell.y,
        count = 0

    for (var y = posY - 1; y <= posY + 1; y++) {
      for (var x = posX - 1;x <= posX + 1; x++) {
        // Do not count the current cell
        if(y === posY && x === posX) {
          continue
        }

        // Handle bounduaries
        if(typeof this.matrix[y] === "undefined") {
          continue
        }

        if(typeof this.matrix[y][x] === "undefined") {
          continue
        }

        if(this.matrix[y][x].alive){
          count += 1
        }
      }
    }
    return count
  }

  // caculate the matrix next state
  game.prototype.nextStep = function () {
    this.running = true
    let temp = _utils.copy(this.matrix)

    for (var y = 0; y < this.width; y++) {
      for (var x = 0; x < this.height; x++) {
        cell = temp[y][x]
        let neighbors = this.neighbors(cell)

        // Rules for the GOL
        switch (true) {
          case neighbors > 3 && cell.alive:
            nAlive = false
            break
          case neighbors < 2 && cell.alive:
            nAlive = false
            break
          case neighbors === 3 && !cell.alive:
            nAlive = true
            break
          default:
            nAlive = cell.alive
        }
        // Not good but quick
        temp[y][x] = new Cell(x, y, nAlive)
      }
    }
    this.matrix = _utils.copy(temp)
    return this
  }

  game.prototype.stop = function () {
    this.running = false
  }

  return game
})()
