const Xray = require('x-ray')
const makeDriver = require('../')
const assert = require('assert')

describe('Driver', function() {
	describe('Arguments', function() {
		it('Should work with no argument', function(done) {
			const x = Xray()
			const driver = makeDriver()
			x.driver(driver)

			testInstance(x, "https://news.ycombinator.com", function(err, res) {
				assert(err === null)
				assert(res === 'Hacker News')
				done()
			})
		})

		it('Should work with an object argument', function(done) {
			const x = Xray()
			const driver = makeDriver({ timeout: 10, config: { host: '127.0.0.1', port: 6379 } })
			x.driver(driver)

			testInstance(x, "https://news.ycombinator.com", function(err, res) {
				assert(err === null)
				assert(res === 'Hacker News')
				done()
			})
		})
	})

	describe('Errors', function() {
		it('Should pass on errors', function(done) {
			const x = Xray()
			const driver = makeDriver()
			x.driver(driver)

			testInstance(x, "http://perdu.com", function(err, res) {
				assert(err === null)
				done()
			})
		})
	})
})

function testInstance(r, url, callback) {
	r(url, 'title')(callback)
}