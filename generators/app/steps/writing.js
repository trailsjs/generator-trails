const path = require('path')
const trailsArchetype = path.dirname(require.resolve('trails/archetype'))
const trailsPackage = require(path.resolve(trailsArchetype, 'package.json'))
const trailsSeries = trailsPackage.dependencies.trails
const Util = require('../../../lib/util')

module.exports = {

  trailpackInstall () {
    const npmTrailpacks = this.options.packArray.map(name => `${name}@${trailsSeries}`)

    const server = this.answers['web-engine']
    if (server == 'express') {
      if (this.answers['express-version'] == '4') {
        npmTrailpacks.push('express@4')
      }
      else if (this.answers['express-version'] == '5') {
        npmTrailpacks.push('express@5.0.0-alpha.3') //Replace by express@5 when is out of alpha
      }
      else {
        npmTrailpacks.push(`express@${this.answers['express-version-other']}`)
      }
    }

    this.npmInstall(npmTrailpacks, {
      save: true,
      silent: true,
      loglevel: 'error',
      progress: false,
    })
  },

  copyArchetypeFiles() {
    this.fs.copy(path.resolve(trailsArchetype, '**'), this.destinationPath())
    this.fs.copy(path.resolve(trailsArchetype, '**/.*'), this.destinationPath())

    const newMainConfig = Util.updateMainConfigFile({
      configFile: this.fs.read('config/main.js'),
      trailpacks: this.options.packArray
    })
    this.fs.write(this.destinationPath('config/main.js'), newMainConfig)
  },

  pkg()  {
    // node:app generator will merge into this
    this.fs.writeJSON(this.destinationPath('package.json'), trailsPackage)
  }
}
