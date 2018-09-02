const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LocationSchema = new Schema({
  coordinates: { type: [Number], index: '2dsphere' },
  type: { type: String, enum: ['Point'] }
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  location: LocationSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
