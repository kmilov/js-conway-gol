var Cell = (function(){
  function cell(x, y, alive) {
    this.x = x
    this.y = y
    this.alive = alive || false
  }
  cell.prototype.toggle = function () {
    this.alive = !this.alive
    return this
  }

  cell.prototype.click = function () {
    return this.toggle()
  }
  return cell
})()
