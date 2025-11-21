
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');

const { connectDB } = require('./src/config/db');
const errorHandler = require('./src/middleware/error');

// Routers
const contactRoutes = require('./src/routes/contact.routes');
const projectRoutes = require('./src/routes/project.routes');
const serviceRoutes = require('./src/routes/service.routes');
const userRoutes    = require('./src/routes/user.routes');

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to my Portfolio API (Node, Express, MongoDB, Mongoose)',
    endpoints: ['/api/contacts', '/api/projects', '/api/services', '/api/users']
  });
});

// API routes
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users',    userRoutes);

// 404 handler
app.use((req, res, next) => next(createError(404, 'Not Found')));

// Error handler
app.use(errorHandler);

// Boot
const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGODB_URI)
  .then(() => app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`)))
  .catch((err) => {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  });
