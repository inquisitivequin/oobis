const assert = require('assert')
const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../../app')

const Driver = mongoose.model('driver')

describe('Drivers Controller', () => {
	it('Post to api/driver creates a new driver', (done) => {
		Driver.count().then(count => {
			request(app)
			.post('api/drivers')
			.send({ email: 'testurtle@testurtle.com'})
			.end(() => {
				Driver.count().then(newCount => {
					assert(count + 1 === newCount);
					done()
				})
			})
		})	
	})

	it('PUT to api/driver/:id', (done) => {
		const driver = new Driver({ email: 'turt@tur.com', driving: false });

		driver.save().then(() => {
			request(app)
				.put(`/api/drivers/${driver._id}`)
				.send({ driving: true })
				.end(() => {
					Driver.findOne({ email: 'turt@tur.com' })
						.then(driver => {
							console.log(driver.driving);
							assert(driver.driving === true)
							done()
						})
				})
		})
	})
})

