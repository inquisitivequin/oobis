const assert = require('assert')
const request = require('supertest')
const app = require('../app')

describe('Express app', () => {
	it('handles GET to /api', (done) => {
		request(app)
			.get('/api')
			.end((err, res) => {
				assert(res.body.wow === 'Hey fool!')
				done()
			})
	})
})