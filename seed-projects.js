// seed-projects.js
require('dotenv').config();
const { connectDB } = require('./src/config/db');
const Project = require('./src/models/project.model');

const projects = [
  {
    title: 'Hyperopt AI Training',
    description: 'To train the AI to find the best stocks',
    img: '/assets/hyperopt.png',
    role: 'Full-stack Developer',
    link: '/assets/hyperopt_results_20250722_152314.csv',
    download: true
  },
  {
    title: 'Fraction Calculator (C#)',
    description: 'WinForms app implementing a Fraction class with operator overloading and unit tests.',
    img: '/assets/fraction.png',
    role: 'C# Developer',
    link: '/assets/fractioncalculator.zip',
    download: true
  }
];

async function seedProjects() {
  try {
    await connectDB(process.env.MONGODB_URI);
    console.log('📦 Connected to MongoDB');

    // Insert new projects
    const result = await Project.insertMany(projects);
    console.log(`✅ Added ${result.length} projects successfully!`);
    
    result.forEach(doc => {
      console.log(`   - ${doc.title}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding projects:', error.message);
    process.exit(1);
  }
}

seedProjects();
