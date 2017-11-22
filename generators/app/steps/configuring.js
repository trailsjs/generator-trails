module.exports = function () {
  this.options.packArray = [ ]

  if (this.options.logger && this.options.logger !== 'none') {
    const loggerTrailpack = `trailpack-${this.options.logger}`
    this.options.packArray.push(loggerTrailpack)
  }

}
