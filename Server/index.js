const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const Experience = require('./models/Experience');
const Slot = require('./models/Slot');
const Booking = require('./models/Booking');

const app = express();
const PORT = process.env.PORT || 5000;

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
app.use(cors()); 
app.use(bodyParser.json()); 
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
      return res.status(404).json({ message: 'Experience not found' });
    }
    const slots = await Slot.find({ experience: req.params.id });
    res.json({ experience, slots });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

app.post('/bookings', async (req, res) => {
  const { slotId, userName, userEmail, promoCode } = req.body;
  if (!slotId || !userName || !userEmail) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  try {
    const updatedSlot = await Slot.findOneAndUpdate(
      { _id: slotId, $expr: { $lt: ["$booked_count", "$capacity"] } }, 
      { $inc: { booked_count: 1 } }, 
      { new: true } 
    );
    if (!updatedSlot) {
      return res.status(400).json({ message: 'Slot is full or does not exist.' });
    }
    const newBooking = new Booking({
      slot: slotId,
      user_name: userName,
      user_email: userEmail,
      promo_code: promoCode,
    });
    await newBooking.save();
    res.status(201).json({ message: 'Booking successful!', booking: newBooking });

  } catch (err) {
    console.error(err.message);
    
    res.status(500).send('Server Error');
  }
});

app.post('/promo/validate', (req, res) => {
  const { promoCode } = req.body;

  if (!promoCode) {
    return res.status(400).json({ message: 'Promo code is required' });
  }
  const validCodes = {
    "SAVE10": { type: 'fixed', amount: 10 },
    "FLAT100": { type: 'fixed', amount: 100 },
   
  };
  const codeData = validCodes[promoCode.toUpperCase()];
  if (codeData) {
    res.json({
      message: `Promo code "${promoCode}" applied!`,
      discount: codeData.amount,
      code: promoCode.toUpperCase()
    });
  } else {
    res.status(404).json({ message: 'Invalid promo code' });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
