const DriversController = require('../controllers/drivers_controller');

module.exports = app => {
  app.get('/api', DriversController.main);

  app.post('/api/drivers', DriversController.create);
};