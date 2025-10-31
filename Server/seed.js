const mongoose = require('mongoose');
require('dotenv').config();


const Experience = require('./models/Experience');
const Slot = require('./models/Slot');
const Booking = require('./models/Booking');


const experiencesToSeed = [
  
  {
    name: 'Kayaking',
    description: 'Curated small-group experiences. Certified guides. Safety first! Includes helmet and life jacket.',
    location: 'Kabini',
    price: 999,
    image_url: 'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?q=80&w=2070&auto=format&fit=crop',
    slots: [
      { date: '2025-11-20', start_time: '07:00 AM', end_time: '09:00 AM', capacity: 10 },
      { date: '2025-11-20', start_time: '09:00 AM', end_time: '11:00 AM', capacity: 10 },
      { date: '2025-11-20', start_time: '11:00 AM', end_time: '01:00 PM', capacity: 5, booked_count: 5 }, // Sold out
      { date: '2025-11-21', start_time: '07:00 AM', end_time: '09:00 AM', capacity: 10 },
      { date: '2025-11-21', start_time: '09:00 AM', end_time: '11:00 AM', capacity: 10 },
      { date: '2025-11-22', start_time: '09:00 AM', end_time: '11:00 AM', capacity: 10 },
    ]
  },

  {
    name: 'Nandi Hills Sunrise',
    description: 'Curated small-group experiences. Certified guides. Safety first!',
    location: 'Bangalore',
    price: 899,
    image_url: '/nandihills.jpg', 
    slots: [
      { date: '2025-11-20', start_time: '05:00 AM', end_time: '07:00 AM', capacity: 15 },
      { date: '2025-11-21', start_time: '05:00 AM', end_time: '07:00 AM', capacity: 15 },
      { date: '2025-11-22', start_time: '05:00 AM', end_time: '07:00 AM', capacity: 15 },
    ]
  },
  
  {
    name: 'Coffee Trail',
    description: 'Curated small-group experiences. Certified guides. Safety first!',
    location: 'Chikmagalur',
    price: 1299,
    image_url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop',
    slots: [
      { date: '2025-11-20', start_time: '10:00 AM', end_time: '12:00 PM', capacity: 8 },
      { date: '2025-11-21', start_time: '10:00 AM', end_time: '12:00 PM', capacity: 8 },
    ]
  },
  
  {
    name: 'Boat Cruise',
    description: 'Curated small-group experiences. Certified guides. Safety first!',
    location: 'Goa',
    price: 1999,
    image_url: '/boat.jpg', 
    slots: [
      { date: '2025-11-20', start_time: '04:00 PM', end_time: '06:00 PM', capacity: 20 },
    ]
  },
  
  {
    name: 'Bungee Jumping',
    description: 'Curated small-group experiences. Certified guides. Safety first!',
    location: 'Rishikesh',
    price: 3500,
    image_url: '/bungee.jpg', 
    slots: [
      { date: '2025-11-20', start_time: '10:00 AM', end_time: '11:00 AM', capacity: 5 },
      { date: '2025-11-20', start_time: '11:00 AM', end_time: '12:00 PM', capacity: 5 },
      { date: '2025-11-21', start_time: '10:00 AM', end_time: '11:00 AM', capacity: 5 },
    ]
  },
 
  {
    name: 'Old City Heritage Walk',
    description: 'Curated small-group experiences. Certified guides. Safety first!',
    location: 'Jaipur',
    price: 600,
    image_url: '/old.jpg',
    slots: [
      { date: '2025-11-20', start_time: '08:00 AM', end_time: '10:00 AM', capacity: 12 },
      { date: '2025-11-21', start_time: '08:00 AM', end_time: '10:00 AM', capacity: 12 },
    ]
  },
  
  {
    name: 'Scuba Diving',
    description: 'Curated small-group experiences. Certified guides. Safety first!',
    location: 'Andaman',
    price: 4500,
    image_url: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop',
    slots: [
      { date: '2025-11-20', start_time: '09:00 AM', end_time: '11:00 AM', capacity: 8 },
      { date: '2025-11-21', start_time: '09:00 AM', end_time: '11:00 AM', capacity: 8 },
    ]
  },
  
  {
    name: 'Tea Plantation Tour',
    description: 'Curated small-group experiences. Certified guides. Safety first!',
    location: 'Munnar',
    price: 750,
    image_url: '/tea.jpg', 
    slots: [
      { date: '2025-11-20', start_time: '02:00 PM', end_time: '04:00 PM', capacity: 10 },
      { date: '2025-11-21', start_time: '02:00 PM', end_time: '04:00 PM', capacity: 10 },
    ]
  }
];

const seedDB = async () => {
  if (!process.env.MONGO_URI) {
    console.error('MONGO_URI is not defined in .env file');
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    console.log('Deleting old data...');
    await Experience.deleteMany({});
    await Slot.deleteMany({});
    await Booking.deleteMany({});

    // Seed new data
    console.log('Seeding new data...');

    for (const exp of experiencesToSeed) {
    
      const newExperience = new Experience({
        name: exp.name,
        description: exp.description,
        location: exp.location,
        price: exp.price,
        image_url: exp.image_url,
      });
      await newExperience.save();

     
      let slotCount = 0;
      for (const slotData of exp.slots) {
        const newSlot = new Slot({
          experience: newExperience._id, 
          date: new Date(slotData.date),
          start_time: slotData.start_time,
          end_time: slotData.end_time,
          capacity: slotData.capacity,
          booked_count: slotData.booked_count || 0,
        });
        await newSlot.save();
        slotCount++;
      }
      console.log(`Created experience: ${newExperience.name}`);
      console.log(`  Added ${slotCount} slots for ${newExperience.name}`);
    }

    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    
    await mongoose.disconnect();
    console.log('Disconnecting from database...');
  }
};


seedDB();

