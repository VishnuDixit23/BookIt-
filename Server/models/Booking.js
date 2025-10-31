const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  slot: {
    type: Schema.Types.ObjectId,
    ref: 'Slot',
    required: true,
  },
  user_name: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  promo_code: {
    type: String,
    required: false, 
  },
}, {
  timestamps: true 
});

const Booking = mongoose.model('Booking', BookingSchema);

module.exports = Booking;