let app = (function(){
  var instance = null

  function myApp() {
    this.running = false
    this.iterations = 0
    this.startBtn = document.getElementById('_jq-start-btn')
    this.stopBtn = document.getElementById('_jq-stop-btn')
    this.resetBtn = document.getElementById('_jq-reset-btn')
    this.generationsLabel = document.getElementById('_jq-generations-label')
    this.mountPoint = document.getElementById('_jq-board')
  }

  myApp.prototype.iterator = function(context) {
    return function() {
      context.running = true
      context.iterations += 1
      context.game.nextStep().render()
      context.drawIterations()
    }
  }

  myApp.prototype.start = function() {
    let _self  = this
    this.iterations = 0
    this.timer = setInterval(this.iterator(this), 200)
  }

  myApp.prototype.stop = function () {
    if(this.running) {
      this.running = false
      this.game.stop()
      clearInterval(this.timer)
    }
  }

  myApp.prototype.reset = function () {
    this.stop()
    this.game._start();
  };

  myApp.prototype.bindEvents = function() {
    this.startBtn.addEventListener('click', this.start.bind(this))
    this.stopBtn.addEventListener('click', this.stop.bind(this))
    this.resetBtn.addEventListener('click', this.reset.bind(this))
  }

  myApp.prototype.drawIterations = function() {
    this.generationsLabel.innerHTML = this.iterations
  }

  myApp.prototype.init = function(width, height) {
    this.bindEvents()

    this.renderEngine = new htmlRender({
      mount: this.mountPoint,
      w: width,
      h: height
    })

    this.game = new Game(this.renderEngine, width, height)
  }

  return function() {
    if(instance === null) {
      instance = new myApp()
    }
    return instance
  }
})()
