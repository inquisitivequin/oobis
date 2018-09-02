const Driver = require('../models/driver');

module.exports = {
  main(req, res) {
    res.send({ test: 'hello' });
  },

  index(req, res, next) {
    const { lng, lat } = req.query;
    Driver.find({ 'location.coordinates': [parseFloat(120), parseFloat(320)] })
      .then(drivers => {
        console.log('test');
        res.send(drivers);
      })
      .catch(next);
  },

  create(req, res, next) {
    const driverPrps = req.body;
    Driver.create(driverPrps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;
    Driver.findOneAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then(driver => res.send(driver))
      .catch(next);
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findOneAndDelete({ _id: driverId })
      .then(driver => res.status(204).send(driver))
      .catch(next);
  }
};
