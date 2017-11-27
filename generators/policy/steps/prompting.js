module.exports = function () {
  return this.prompt([
    {
      type: 'input',
      name: 'desc',
      message: 'Policy Description',
      default: 'TODO document this Policy'
    }
  ]).then(answers => {
    this.answers = Object.assign(this.answers || {}, answers)
  })
}
