const path = require('path')
const Util = require('../../../lib/util')

module.exports = {
  installNew () {
    if (!this.options['new']) return

    this.log('Installing dependencies...')

    this.npmInstall(null, { save: true, progress: true, silent: false })
  },

  add () {
    if (this.options['new']) return

    const dest = this.destinationPath()
    const nodeModules = this.destinationPath('node_modules/')
    const indexPath = path.resolve(dest, 'config', 'index.js')

    this.log('Installing dependencies...')

    this.npmInstall(this.options.packArray, { save: true, progress: true, silent: false })
      .then(() => {
        this.options.packArray.forEach(pack => {
          try {
            const archetype = path.resolve(nodeModules, pack, 'archetype', '**')
            this.fs.copy(archetype, dest)
          }
          catch (err) {
            Util.exitWithError(this, err, { pack })
          }
        })

        this.fs.commit(function () {
          Util.updateIndexesFolder(indexPath, path.resolve(dest, 'config'))
        }.bind(this))
      })
  }
}
