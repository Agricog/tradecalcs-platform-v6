import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { existsSync, readdirSync } from 'fs';
import { fileURLToPath } from 'url';

// Import routes
import projectRoutes from './routes/projects';
import calculationRoutes from './routes/calculations';
import materialRoutes from './routes/materials';
import wholesalerQuoteRoutes from './routes/wholesalerQuotes';
import customerQuoteRoutes from './routes/customerQuotes';
import contractorProfileRoutes from './routes/contractorProfile';
import invoiceRoutes from './routes/invoices';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://clerk.com", "https://*.clerk.accounts.dev", "https://www.googletagmanager.com", "https://www.google-analytics.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://clerk.com", "https://*.clerk.accounts.dev", "https://*.neon.tech", "https://clerk-telemetry.com", "https://www.google-analytics.com", "https://region1.google-analytics.com"],
      frameSrc: ["'self'", "https://clerk.com", "https://*.clerk.accounts.dev", "https://app.smartsuite.com"],
      workerSrc: ["'self'", "blob:"],
    },
  },
}));

// Permissions-Policy header
app.use((req, res, next) => {
  res.setHeader(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()'
  );
  next();
});

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
app.use('/api/invoices', invoiceRoutes);

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const distPath = path.join(__dirname, '../../dist');

  // ─── DEBUG: log dist state on startup ─────────────────────────────────
  console.log(`[debug] __dirname = ${__dirname}`);
  console.log(`[debug] distPath = ${distPath}`);
  console.log(`[debug] dist exists: ${existsSync(distPath)}`);
  const calcDir = path.join(distPath, 'calculators');
  console.log(`[debug] dist/calculators exists: ${existsSync(calcDir)}`);
  if (existsSync(calcDir)) {
    console.log(`[debug] dist/calculators contains:`, readdirSync(calcDir).slice(0, 10));
    const cableDir = path.join(calcDir, 'cable-sizing');
    if (existsSync(cableDir)) {
      console.log(`[debug] dist/calculators/cable-sizing contains:`, readdirSync(cableDir).slice(0, 10));
    }
  }
  const sampleFile = path.join(distPath, 'calculators', 'cable-sizing', 'cooker-circuit-cable-sizing', 'index.html');
  console.log(`[debug] sample prerendered file exists: ${existsSync(sampleFile)}`);
  console.log(`[debug] sample path: ${sampleFile}`);
  // ──────────────────────────────────────────────────────────────────────

  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.join(distPath, 'robots.txt'));
  });

  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.sendFile(path.join(distPath, 'sitemap.xml'));
  });

  app.use(express.static(distPath, { index: false, redirect: false }));

  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return;

    // Strip trailing slash for path resolution
    const cleanPath = req.path.replace(/\/$/, '') || '/';
    const candidate = path.resolve(distPath, '.' + cleanPath, 'index.html');
    const safe = candidate.startsWith(distPath);
    const exists = safe && existsSync(candidate);

    console.log(`[req] path="${req.path}" candidate="${candidate}" safe=${safe} exists=${exists}`);

    if (exists) {
      return res.sendFile(candidate);
    }

    console.log(`[req] FALLBACK to dist/index.html for ${req.path}`);
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
