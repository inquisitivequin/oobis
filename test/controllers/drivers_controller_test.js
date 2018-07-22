const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')

const Driver = mongoose.model('driver')

describe('Drivers Controller', () => {
	it("Post to api/driver creates a new driver", done => {
		Driver.count().then(count => {
			request(app)
			.post('api/drivers')
			.send({ email: 'testurtle@testurtle.com'})
			.end(() => {
				Driver.count().then(newCount => {
					assert(count + 1 === newCount)
				})
				done()
			})
		})	
	})
})