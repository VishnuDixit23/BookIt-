const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const Experience = require('./models/Experience');
const Slot = require('./models/Slot');
const Booking = require('./models/Booking');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

app.get('/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find();
    res.json(experiences);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.get('/experiences/:id', async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id);
    if (!experience) {
      return res.status(404).json({ msg: 'Experience not found' });
    }
    
    const slots = await Slot.find({ experience: req.params.id });
    res.json({ experience, slots });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/bookings', async (req, res) => {
  const { slotId, userName, userEmail } = req.body;

  if (!slotId || !userName || !userEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ message: 'Slot not found' });
    }

    if (slot.booked_count >= slot.capacity) {
      return res.status(400).json({ message: 'This slot is now full. Please try another time.' });
    }

    slot.booked_count += 1;
    await slot.save();

    const newBooking = new Booking({
      slot: slotId,
      user_name: userName,
      user_email: userEmail,
    });
    await newBooking.save();

    res.status(201).json({ message: 'Booking confirmed!', booking: newBooking });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/promo/validate', (req, res) => {
  const { promoCode } = req.body;
  const validCodes = {
    'SAVE10': 10,
    'FLAT100': 100,
  };

  if (validCodes[promoCode]) {
    res.json({ valid: true, discount: validCodes[promoCode] });
  } else {
    res.status(404).json({ valid: false, message: 'Invalid code' });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

