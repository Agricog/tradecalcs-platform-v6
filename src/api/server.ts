import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';

// Import routes
import projectRoutes from './routes/projects';
import calculationRoutes from './routes/calculations';
import materialRoutes from './routes/materials';
import wholesalerQuoteRoutes from './routes/wholesalerQuotes';
import customerQuoteRoutes from './routes/customerQuotes';
import contractorProfileRoutes from './routes/contractorProfile';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://clerk.com", "https://*.clerk.accounts.dev"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://clerk.com", "https://*.clerk.accounts.dev", "https://*.neon.tech"],
      frameSrc: ["'self'", "https://clerk.com", "https://*.clerk.accounts.dev"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://tradecalcs.co.uk', 'https://www.tradecalcs.co.uk']
    : ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}));

// Parse JSON bodies
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/projects', projectRoutes);
app.use('/api/calculations', calculationRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/wholesaler-quotes', wholesalerQuoteRoutes);
app.use('/api/customer-quotes', customerQuoteRoutes);
app.use('/api/contractor-profile', contractorProfileRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../dist');
  app.use(express.static(distPath));
  
  // Handle client-side routing - serve index.html for all non-API routes
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
