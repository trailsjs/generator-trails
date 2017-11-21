const Util = require( '../../../lib/util')

module.exports = function () {
  this.options.modelName = Util.capitalizeFirstLetter(this.options['modelName'])
  this.options.modelFileName = `${this.options.modelName}.js`
  this.options.modelTestFileName = `${this.options.modelName}.test.js`
  this.options.modelDesc = this.answers.desc.trim()

  this.options.resolverRoot = Util.capitalizeFirstLetter(this.options['modelName'])
  this.options.resolverName = `${this.options.resolverRoot}Resolver`
  this.options.resolverFileName = `${this.options.resolverName}.js`
}
