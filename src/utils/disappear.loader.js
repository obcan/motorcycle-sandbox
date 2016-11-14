// Everything -> Nothing  Webpack loader

module.exports = function disappearLoader (source) {
  this.cacheable && this.cacheable()
  this.value = ''
  return ''
}

module.exports.raw = false
