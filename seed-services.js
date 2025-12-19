// seed-services.js
require('dotenv').config();
const { connectDB } = require('./src/config/db');
const Service = require('./src/models/service.model');

const services = [
  { title: 'Web Development', description: 'React, Vite, SPA routing, REST APIs' },
  { title: 'Backend & Databases', description: 'Node, Express, SQL/NoSQL' },
  { title: 'C# / .NET', description: 'WinForms/WPF, OOP, unit testing' },
  { title: 'Hyperopt AI Training', description: 'XGBoost AI training' },
];

async function seedServices() {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Clear existing services
    await Service.deleteMany({});
    console.log('🗑️  Cleared existing services');

    // Insert new services
    const result = await Service.insertMany(services);
    console.log(`✅ Seeded ${result.length} services successfully!`);
    
    result.forEach(doc => {
      console.log(`   - ${doc.title}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding services:', error.message);
    process.exit(1);
  }
}

seedServices();
