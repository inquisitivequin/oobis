const mongoose = require('mongoose');

before(done => {
  mongoose.connect(
    'mongodb://localhost:27017/oobis_test',
    { useNewUrlParser: true }
  );
  mongoose.connection.once('open', () => done()).on('error', error => {
    console.warn('Warning', error);
  });
});

beforeEach(done => {
  const { drivers } = mongoose.connection.collections;
  drivers
    .drop()
    .then(() => drivers.createIndexes({ 'geometry.coordinates': '2dsphere' }))
    .then(() => done())
    .catch(() => done());
});
