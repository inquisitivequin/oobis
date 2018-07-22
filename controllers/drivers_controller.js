const Driver = require('../models/driver')

module.exports = {
	hello(req, res) {
		res.send({hey: 'wow'})
	},
	
	create(req, res) {
		const driverPrps = req.body

		Driver.create(driverPrps)
			.then(driver => res.send(driver))
	}
}