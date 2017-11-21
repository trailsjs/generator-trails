const path = require('path')
const assert = require('yeoman-assert')
const test = require('yeoman-test')

describe('trails:model', () => {
  describe('Should properly generate model interface', () => {
    before(() => {
      return test
        .run(path.join(__dirname, '../../generators/model'))
        .withArguments(['test'])
        .toPromise()
    })

    it('Should properly create Model class file', () => {
      assert.file([
        'api/models/Test.js'
      ])
    })
    it('should add require to api/models index file', () => {
      assert.fileContent('api/models/index.js', /require\('\.\/Test'\)$/)
    })
    it('should add require to api/resolvers index file', () => {
      assert.fileContent('api/resolvers/index.js', /require\('\.\/TestResolver'\)$/)
    })
    it('Should properly create Resolver class file', () => {
      assert.file([
        'api/resolvers/TestResolver.js'
      ])
    })

    it('Should properly create test files', () => {
      assert.file([
        'test/unit/models/Test.test.js'
      ])

    })
  })
})
