(function(){
  var _utils = function() {}

  _utils.createEl = function(el) {
    return document.createElement(el)
  }

  _utils.createTextNode = function(string) {
    return document.createTextNode(string)
  }

  _utils.copy = function(src){
    return src.map(i => i.slice())
  }

  window._utils = _utils
})()
