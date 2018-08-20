const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

describe('Drivers controller', () => {
  it('POST call to api/drivers creates a new driver', done => {
    request(app)
      .post('/api/drivers')
      .send({ email: 'testable@test.com' })
      .end(() => {
        done();
      });
  });
});
