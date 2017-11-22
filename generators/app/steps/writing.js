const path = require('path')
const trailsArchetype = path.dirname(require.resolve('trails/archetype'))
const trailsPackage = require(path.resolve(trailsArchetype, 'package.json'))
const trailsSeries = trailsPackage.dependencies.trails
const Util = require('../../../lib/util')

module.exports = {

  trailpackInstall () {
    const server = this.answers['web-engine']
    const orm = this.answers['orm-engine']

    if (server === 'other' && this.answers['web-engine-other']) {
      this.options.packArray.push('trailpack-router')
      this.options.packArray.push(this.answers['web-engine-other'])
    }
    else if (server) {
      this.options.packArray.push('trailpack-router')
      this.options.packArray.push(`trailpack-${server}`)
    }

    if (orm === 'other' && this.answers['orm-engine-other']) {
      this.options.packArray.push(this.answers['orm-engine-other'])
    }
    else if (orm) {
      this.options.packArray.push(`trailpack-${orm}`)
    }

    if (this.answers['footprints']) {
      this.options.packArray.push('trailpack-footprints')
    }

    const npmTrailpacks = this.options.packArray.map(name => `${name}@${trailsSeries}`)

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
        /*
        .then(() => {
      trailpackNames.forEach(item => {
        const ARCH = path.resolve(PROJECT_PATH, item, 'archetype', '**')
        this.fs.copy(ARCH, dest)
      })
    })
    */
  },

  copyArchetypeFiles() {
    this.fs.copy(path.resolve(trailsArchetype, '**'), this.destinationPath())
    this.fs.copy(path.resolve(trailsArchetype, '**/.*'), this.destinationPath())
    this.fs.copyTpl(
      path.resolve(trailsArchetype, 'config/main.js'),
      this.destinationPath('config/main.js'),
      { trailpacks: Util.getTrailpackRequireArray(this.options.packArray) }
    )
  },

  pkg()  {
    // node:app generator will merge into this
    this.fs.writeJSON(this.destinationPath('package.json'), trailsPackage)
  }
}
