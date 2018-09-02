const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('POST call to api/drivers creates a new driver', done => {
    Driver.countDocuments().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'testable@test.com' })
        .end(() => {
          Driver.countDocuments().then(newCount => {
            assert(count + 1 == newCount);
            done();
          });
        });
    });
  });

  it('PUT to api/drivers submits edit', done => {
    const driver = new Driver({ email: 'turtu@turut.com', driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOneAndUpdate({ email: 'turtu@turut.com' }).then(driver => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it('DELETE to api/drivers removes driver', done => {
    const driver = new Driver({ email: 'tes@tes.com' });
    driver.save().then(() => {
      Driver.findOneAndDelete(driver._id).then(driver => {
        assert(driver.email === 'tes@tes.com');
        request(app)
          .delete(`/api/drivers/${driver._id}`)
          .end(() => {
            Driver.findOne({ email: 'tes@tes.com' }).then(driver => {
              assert(driver === null);
              done();
            });
          });
      });
    });
  });

  it('GET to api/drivers returns drivers within cord', done => {
    const driverUno = new Driver({
      email: 'tust@tust.com',
      geometry: { coordinates: [120, 320] }
    });
    const driverDo = new Driver({
      email: 'mug@mug.com',
      geometry: { coordinates: [234, 656] }
    });
    Promise.all([driverUno.save(), driverDo.save()]).then(() => {
      request(app)
        .get('api/drivers?lng=120&lat=320')
        .end((err, response) => {
          console.log(response);
          done();
        });
    });
  });
});
