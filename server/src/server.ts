import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import serviceRoutes from './routes/serviceRoutes';
import providerRoutes from './routes/providerRoutes';
import bookingRoutes from './routes/bookingRoutes';
import requestRoutes from './routes/requestRoutes';
import adminRoutes from './routes/adminRoutes';
import syncRoutes from './routes/syncRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV === 'production' || origin.endsWith('.vercel.app') || origin.endsWith('.netlify.app')) {
      callback(null, true);
    } else {
      callback(null, true); // Allow all during dev/demo deployment
    }
  },
  credentials: true,
}));
app.use(express.json());

// Root Welcome & Status
app.get('/', (req, res) => {
  res.json({
    platform: 'Sahayog Gig-Worker Cooperative Platform API',
    status: 'online',
    version: '2.0.0',
    documentation: {
      health: '/api/health',
      services: '/api/services',
      providers: '/api/providers',
      stats: '/api/admin/stats',
      sheets: {
        users: '/api/sheets/download/user_accounts.csv',
        revenue: '/api/sheets/download/workers_revenue.csv',
        bookings: '/api/sheets/download/schedule_bookings.csv',
      }
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/providers', providerRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/sheets', syncRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    platform: 'Sahayog Gig-Worker Cooperative Platform',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// Error handling fallback
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`=========================================`);
    console.log(`  🚀 Sahayog API Server running on port ${PORT}`);
    console.log(`  📡 Health: http://localhost:${PORT}/api/health`);
    console.log(`  📊 Sheets: http://localhost:${PORT}/api/sheets/sync`);
    console.log(`=========================================`);
  });
}

export default app;
