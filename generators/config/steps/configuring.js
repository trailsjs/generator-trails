module.exports = function () {
  this.options.configFileName = `${this.options.configName}.js`
  this.options.configDesc = this.answers.desc.trim()
}
