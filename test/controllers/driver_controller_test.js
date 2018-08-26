const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {
  it('POST call to api/drivers creates a new driver', done => {
    Driver.count().then(count => {
      request(app)
        .post('/api/drivers')
        .send({ email: 'testable@test.com' })
        .end(() => {
          Driver.count().then(newCount => {
            assert(count + 1 == newCount);
            done();
          });
        });
    });
  });

  it('PUT to api/driver submits edit', done => {
    const driver = new Driver({ email: 'turtu@turut.com', driving: false });
    driver.save().then(() => {
      request(app)
        .put(`/api/drivers/${driver._id}`)
        .send({ driving: true })
        .end(() => {
          Driver.findOne({ email: 'turtu@turut.com' }).then(driver => {
            assert(driver.driving === true);
            done();
          });
        });
    });
  });

  it('DELETE to api/driver removes driver', done => {
    const driver = new Driver({ email: 'tes@tes.com' });
    driver.save().then(() => {
      Driver.findById(driver._id).then(driver => {
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
});
