import { ClerkProvider } from '@clerk/clerk-react';

// Get publishable key from environment
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  console.warn('Missing VITE_CLERK_PUBLISHABLE_KEY - auth will not work');
}

export { ClerkProvider, PUBLISHABLE_KEY };
```

---

**Important:** Clerk needs the frontend key with a `VITE_` prefix so Vite exposes it to the browser.

Go to Railway → Variables and add one more:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
