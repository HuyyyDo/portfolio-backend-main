// server.js
require('dotenv').config(); // <- ensure env loaded before any other module reads process.env

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
const authRoutes    = require('./src/routes/auth.routes');

const app = express();

// Quick sanity checks & helpful startup logs
if (!process.env.JWT_SECRET) {
  console.warn('⚠️  Warning: JWT_SECRET is not set. Tokens will not verify correctly until this is fixed.');
} else {
  // show a masked preview so you can tell it's loaded but not leak secret
  const s = String(process.env.JWT_SECRET);
  const preview = s.length > 8 ? `${s.slice(0,4)}...${s.slice(-4)}` : s;
  console.log(`JWT secret loaded (preview): ${preview}`);
}

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my Portfolio API (Node, Express, MongoDB, Mongoose)',
    endpoints: [
      '/api/contacts', '/api/projects', '/api/services', '/api/users',
      '/signup', '/signin', '/api/auth'
    ]
  });
});

// API routes
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users',    userRoutes);

// Auth routes: mount under both /api/auth and root-level for compatibility:
// - /api/auth/* (restful API namespace)
// - /signup and /signin (legacy / tests that expect root-level auth endpoints)
app.use('/api/auth', authRoutes);
app.use('/', authRoutes); // keeps /signin and /signup working (useful for tests and older clients)
// Also mount under /auth for clients calling /auth/signin or /auth/signup
app.use('/auth', authRoutes);

// Helper: list registered routes (prints after routes mounted)
function listRoutes(app) {
  console.log('==== Registered routes ====');
  const out = [];
  app._router.stack.forEach((layer) => {
    // router-level stacks
    if (layer.route && layer.route.path) {
      const methods = Object.keys(layer.route.methods).map(m => m.toUpperCase()).join(', ');
      out.push(`${methods} ${layer.route.path}`);
    } else if (layer.name === 'router' && layer.handle && layer.handle.stack) {
      layer.handle.stack.forEach((handler) => {
        if (handler.route && handler.route.path) {
          const methods = Object.keys(handler.route.methods).map(m => m.toUpperCase()).join(', ');
          // if this router was mounted on a path, include that prefix
          const prefix = layer.regexp && layer.regexp.source !== '^\\/?$' ? (layer.regexp.source.replace('\\/?', '').replace('(?=\\/|$)', '').replace('^', '').replace('\\/', '/')) : '';
          out.push(`${methods} ${handler.route.path}`);
        }
      });
    }
  });

  // de-duplicate and print
  Array.from(new Set(out)).forEach(line => console.log(line));
}

listRoutes(app);

// 404 handler
app.use((req, res, next) => next(createError(404, 'Not Found')));

// Error handler
app.use(errorHandler);

// Boot
const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ DB connection failed:', err.message);
    process.exit(1);
  });
