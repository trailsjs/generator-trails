module.exports = function () {
  this.options.packArray = [ ]

  const server = this.answers['web-engine']
  const orm = this.answers['orm-engine']

  if (this.answers.logger && this.answers.logger !== 'none') {
    this.options.packArray.push(`trailpack-${this.answers.logger}`)
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
