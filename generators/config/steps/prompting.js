module.exports = function () {
  return this.prompt([
    {
      type: 'input',
      name: 'desc',
      message: 'Config Description',
      default: 'TODO document this Configuration File'
    }
  ]).then(answers => {
    this.answers = Object.assign(this.answers || {}, answers)
  })
}
