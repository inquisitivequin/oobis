const Driver = require('../models/driver')

module.exports = {
	hello(req, res) {
		res.send({hey: 'wow'})
	},
	
	create(req, res, next) {
		const driverPrps = req.body

		Driver.create(driverPrps)
			.then(driver => res.send(driver))
			.catch(next);
	},

	edit(req, res, next) {
		const driverId = req.params.id
		const driverPrps = req.body

		Driver.findByIdAndUpdate({ _id: driverId }, dirverPrps)
			.then(() => Driver.findById({ _id: driverId }))
			.then(driver => res.send(driver))
			.catch(next)
	}
}