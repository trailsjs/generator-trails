const Util = require( '../../../lib/util')
const path = require('path')

module.exports = {
  setup () {
    Util.patchConflicter()
  },

  writeFiles () {
    this.fs.copyTpl(
      this.templatePath('config.js'),
      this.destinationPath(path.join('config/', this.options.configFileName)),
      this.options)
  },

  modifyIndexFiles () {
    return Util.updateIndexFile({
      indexFile: 'config/index.js',
      requiredFiles: [ this.options.configName ],
      gen: this
    })
  }
}
