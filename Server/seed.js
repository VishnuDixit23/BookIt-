const mongoose = require('mongoose');
require('dotenv').config();

// Import Models
const Experience = require('./models/Experience');
const Slot = require('./models/Slot');
const Booking = require('./models/Booking');

// 8. Corrected Seed Data
const experiencesToSeed = [
  // 1. Kayaking
  {
    name: 'Kayaking in Kabini',
    description: 'Curated small-group experiences. Certified guides. Safety first! Includes gear.',
    location: 'Kabini',
    price: 999,
    rating: 4.8,
    image_url: 'https://images.unsplash.com/photo-1594498801830-10145295c20e?q=80&w=2070&auto.format&fit=crop',
    slots: [
      { date: '2025-11-20', start_time: '07:00 AM', end_time: '09:00 AM', capacity: 10 },
      { date: '2025-11-20', start_time: '09:00 AM', end_time: '11:00 AM', capacity: 10 },
      { date: '2025-11-20', start_time: '11:00 AM', end_time: '01:00 PM', capacity: 0, booked_count: 10 }, // Sold out
      { date: '2025-11-21', start_time: '07:00 AM', end_time: '09:00 AM', capacity: 10 },
      { date: '2025-11-21', start_time: '09:00 AM', end_time: '11:00 AM', capacity: 10 },
      { date: '2025-11-22', start_time: '07:00 AM', end_time: '09:00 AM', capacity: 10 },
    ],
  },
  // 2. Nandi Hills
  {
    name: 'Nandi Hills Sunrise',
    description: 'Curated small-group experiences. Certified guides. Safety first! Includes transport.',
    location: 'Nandi Hills',
    price: 899,
    rating: 4.9,
    image_url: '/nandihills.jpg',
    slots: [
      { date: '2025-11-20', start_time: '04:00 AM', end_time: '08:00 AM', capacity: 15 },
      { date: '2025-11-21', start_time: '04:00 AM', end_time: '08:00 AM', capacity: 15 },
      { date: '2025-11-22', start_time: '04:00 AM', end_time: '08:00 AM', capacity: 15 },
    ],
  },
  // 3. Coffee Trail
  {
    name: 'Coffee Trail',
    description: 'Curated small-group experiences. Certified guides. Safety first! Includes tasting.',
    location: 'Coorg',
    price: 1299,
    rating: 4.7,
    image_url: 'https://images.unsplash.com/photo-1551882232-658d3d65c0b1?q=80&w=1974&auto.format&fit=crop',
    slots: [
      { date: '2025-11-20', start_time: '10:00 AM', end_time: '01:00 PM', capacity: 8 },
      { date: '2025-11-21', start_time: '10:00 AM', end_time: '01:00 PM', capacity: 8 },
    ],
  },
  // 4. Boat Cruise
  {
    name: 'Boat Cruise',
    description: 'Curated small-group experiences. Certified guides. Safety first! Includes snacks.',
    location: 'Goa',
    price: 1999,
    rating: 4.6,
    image_url: '/boat.jpg',
    slots: [
      { date: '2025-11-20', start_time: '04:00 PM', end_time: '06:00 PM', capacity: 20 },
    ],
  },
  // 5. Old City Walk
  {
    name: 'Old City Heritage Walk',
    description: 'Curated small-group experiences. Certified guides. Safety first!',
    location: 'Jaipur',
    price: 600,
    rating: 4.8,
    image_url: '/oldj.jpg',
    slots: [
      { date: '2025-11-20', start_time: '08:00 AM', end_time: '11:00 AM', capacity: 12 },
      { date: '2025-11-21', start_time: '08:00 AM', end_time: '11:00 AM', capacity: 12 },
    ],
  },
  // 6. Scuba Diving
  {
    name: 'Scuba Diving',
    description: 'Curated small-group experiences. Certified guides. Safety first!',
    location: 'Andaman',
    price: 4500,
    rating: 4.9,
    image_url: 'https://images.unsplash.com/photo-1544551763-8ddA2862c763?q=80&w=2070&auto.format&fit=crop',
    slots: [
      { date: '2025-11-20', start_time: '09:00 AM', end_time: '11:00 AM', capacity: 8 },
      { date: '2025-11-21', start_time: '09:00 AM', end_time: '11:00 AM', capacity: 8 },
    ],
  },
  // 7. Tea Plantation
  {
    name: 'Tea Plantation Tour',
    description: 'Curated small-group experiences. Certified guides. Safety first!',
    location: 'Munnar',
    price: 750,
    rating: 4.7,
    image_url: '/tea.jpg',
    slots: [
      { date: '2025-11-20', start_time: '02:00 PM', end_time: '04:00 PM', capacity: 10 },
      { date: '2025-11-21', start_time: '02:00 PM', end_time: '04:00 PM', capacity: 10 },
    ],
  },
  // 8. Bungee Jumping
  {
    name: 'Bungee Jumping',
    description: 'Curated small-group experiences. Certified guides. Safety first!',
    location: 'Rishikesh',
    price: 3500,
    rating: 4.9,
    image_url: '/bungee.jpg',
    slots: [
      { date: '2025-11-20', start_time: '10:00 AM', end_time: '11:00 AM', capacity: 5 },
      { date: '2025-11-20', start_time: '11:00 AM', end_time: '12:00 PM', capacity: 5 },
    ],
  },
];
// --- End of Data ---


const seedDB = async () => {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    console.log('Deleting old data...');
    await Experience.deleteMany({});
    await Slot.deleteMany({});
    await Booking.deleteMany({});

    console.log('Seeding new data...');
    // Seed new experiences and slots
    for (const exp of experiencesToSeed) {
      const newExperience = new Experience({
        name: exp.name,
        description: exp.description,
        location: exp.location,
        price: exp.price,
        rating: exp.rating, // Make sure rating is saved
        image_url: exp.image_url,
      });
      await newExperience.save();
      console.log(`Created experience: ${newExperience.name}`);

      let createdSlots = 0;
      for (const s of exp.slots) {
        const newSlot = new Slot({
          experience: newExperience._id,
          date: new Date(s.date),
          start_time: s.start_time,
          end_time: s.end_time,
          capacity: s.capacity,
          booked_count: s.booked_count || 0,
        });
        await newSlot.save();
        createdSlots++;
      }
      console.log(`  Added ${createdSlots} slots for ${newExperience.name}`);
    }

    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Error seeding database:', err.message);
  } finally {
    console.log('Disconnecting from database...');
    await mongoose.disconnect();
  }
};

seedDB();

