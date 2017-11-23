module.exports = function () {
  this.options.packArray = [ ]

  const server = this.answers['web-engine']
  const orm = this.answers['orm-engine']

  console.log(this.options)
  console.log(this.answers)

  if (this.options.logger && this.options.logger !== 'none') {
    const loggerTrailpack = `trailpack-${this.options.logger}`
    this.options.packArray.push(loggerTrailpack)
  }

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
}
