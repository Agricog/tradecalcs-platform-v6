import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { existsSync } from 'fs';
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

  // Explicit handlers for SEO files (must come before static middleware
  // and catch-all to guarantee correct content-type and 200 status)
  app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.sendFile(path.join(distPath, 'robots.txt'));
  });

  app.get('/sitemap.xml', (req, res) => {
    res.type('application/xml');
    res.sendFile(path.join(distPath, 'sitemap.xml'));
  });

  // Serve static assets (JS, CSS, images, manifest, etc).
  // `index: false` disables automatic index.html serving so directory
  // requests fall through to our catch-all, which decides whether to
  // serve a prerendered file or the SPA shell.
  // `redirect: false` stops express.static adding trailing-slash 301s.
  app.use(express.static(distPath, { index: false, redirect: false }));

  // Catch-all route for client-side routing.
  // For each request:
  //   1. If a prerendered HTML exists at <distPath>/<req.path>/index.html,
  //      serve that. This is what makes Google see real <title>, meta
  //      description and JSON-LD on first crawl pass.
  //   2. Otherwise fall back to dist/index.html so React Router can
  //      handle the route client-side (covers anything not in the
  //      prerender route list).
  app.get('*', (req, res) => {
    if (req.path.startsWith('/api')) return;

    // Strip trailing slash for path resolution so /foo and /foo/ both
    // resolve to dist/foo/index.html.
    const cleanPath = req.path.replace(/\/$/, '') || '/';
    const candidate = path.resolve(distPath, '.' + cleanPath, 'index.html');
    const safe = candidate.startsWith(distPath);
    const exists = safe && existsSync(candidate);

    if (exists) {
      return res.sendFile(candidate);
    }

    res.sendFile(path.join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
