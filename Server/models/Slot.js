const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SlotSchema = new Schema({
  experience: {
    type: Schema.Types.ObjectId,
    ref: 'Experience', 
    required: true,
  },
  date: {
    type: Date, 
    required: true,
  },
  start_time: {
    type: String,
    required: true,
  },
  end_time: {
    type: String,
    required: true,
  },
  capacity: {
    type: Number,
    required: true,
    default: 10, 
  },
  booked_count: {
    type: Number,
    required: true,
    default: 0,
  },
}, {
  timestamps: true
});
const Slot = mongoose.model('Slot', SlotSchema);
module.exports = Slot;