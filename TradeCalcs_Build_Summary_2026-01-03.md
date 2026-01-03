# TradeCalcs Build Summary
**Date:** 3rd January 2026  
**Platform:** TradeCalcs.co.uk  
**Stack:** React 18, TypeScript, Prisma, Neon PostgreSQL, Railway, Cloudflare R2

---

## Overview

Today's build completed the quote-to-cash workflow and compliance documentation system. TradeCalcs now supports the full lifecycle from calculation → quote → invoice → payment tracking, with BS 7671 compliance evidence packs for NICEIC/EIC requirements.

---

## Features Built

### 1. Contractor Profile System

**Location:** `/settings`

| Field | Purpose |
|-------|---------|
| Company Name | Appears on all documents |
| Company Address | Multi-line address support |
| Company Phone | Contact details |
| Company Email | Contact details |
| Certification Body | NICEIC, NAPIT, ELECSA, STROMA, Other |
| Certification Number | Registration number |
| VAT Number | Optional VAT registration |

- Auto-creates profile on first access
- Contractor details appear on quotes, invoices, and evidence packs

---

### 2. Quote → Invoice Conversion

**Flow:** Customer Quote → Convert to Invoice → Download PDF → Mark Paid

| Feature | Description |
|---------|-------------|
| Invoice Numbers | Sequential format: `INV-2026-0001` |
| Payment Terms | 7, 14, 30, 60, or 90 days |
| Due Date | Auto-calculated from payment terms |
| Status Tracking | Draft → Sent → Paid |
| Mark Paid | One-click with timestamp |
| Invoice Notes | Custom notes per invoice |

**Invoice PDF includes:**
- Contractor company details (top right)
- Status badge (Draft/Sent/Paid)
- Invoice number and dates
- Bill To customer details
- Project reference
- Line items table (materials + labour)
- Totals breakdown (subtotal, markup, contingency, VAT)
- Payment terms box
- TradeCalcs footer

---

### 3. Compliance Evidence Pack

**Purpose:** BS 7671 design documentation for NICEIC/EIC compliance

| Feature | Description |
|---------|-------------|
| Installation Date | Picker allows past dates for retroactive documentation |
| PDF Generation | Professional evidence pack document |
| Cloud Storage | Stored in Cloudflare R2 |
| Download | Secure signed URLs |

**Evidence Pack PDF includes:**
- Contractor details with certification number
- Project information
- Installation date
- Circuit calculations with design values
- Design basis statement
- Generation timestamp

---

### 4. Quote Preview Updates

- Contractor profile now displays on quote preview page header
- Quote PDF download includes contractor details
- Consistent branding across all documents

---

## Database Schema Additions

### contractor_profiles
```sql
- id (cuid)
- clerkUserId (unique)
- companyName
- companyAddress
- companyPhone
- companyEmail
- certificationNumber
- certificationBody
- vatNumber
- logoUrl
- createdAt
- updatedAt
```

### invoices
```sql
- id (cuid)
- projectId (FK)
- customerQuoteId (FK, optional)
- invoiceNumber (unique)
- status (draft/sent/paid)
- customerName, customerEmail, customerPhone, customerAddress
- materialsTotal, labourTotal, subtotal
- markupAmount, contingencyAmount, netTotal
- vatPercent, vatAmount, grandTotal
- dueDate, paymentTerms, paidAt, paidAmount
- notes, createdAt, sentAt
```

### invoice_items
```sql
- id (cuid)
- invoiceId (FK)
- description
- quantity
- unitPrice
- total
- createdAt
```

---

## API Endpoints Added

### Contractor Profile
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/contractor-profile` | Get or create profile |
| PUT | `/api/contractor-profile` | Update profile |

### Invoices
| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/api/invoices` | List all invoices |
| GET | `/api/invoices/:id` | Get single invoice |
| POST | `/api/invoices/from-quote/:quoteId` | Convert quote to invoice |
| PATCH | `/api/invoices/:id` | Update invoice |
| POST | `/api/invoices/:id/mark-paid` | Mark as paid |
| GET | `/api/invoices/:id/pdf` | Generate PDF |
| DELETE | `/api/invoices/:id` | Delete invoice |

---

## Files Created/Modified

### New Files
```
src/api/routes/contractorProfile.ts
src/api/routes/invoices.ts
src/lib/generateInvoicePDF.ts
src/pages/SettingsPage.tsx
src/components/projects/ConvertToInvoiceModal.tsx
```

### Modified Files
```
prisma/schema.prisma (added 3 models)
src/api/server.ts (registered new routes)
src/pages/ProjectDetailPage.tsx (invoice UI)
src/pages/QuotePreviewPage.tsx (contractor details)
src/lib/generateQuotePDF.ts (contractor support)
src/lib/generateEvidencePackPDF.ts (contractor support)
src/App.tsx (settings route)
```

---

## Complete User Flow

```
1. Create Project
   ↓
2. Add Calculations (Cable Sizing)
   ↓
3. Materials Auto-Extracted
   ↓
4. Send to Wholesaler (Get Pricing)
   ↓
5. Create Customer Quote
   - Add labour items
   - Set markup %
   - Set contingency %
   - Add notes/terms
   ↓
6. Customer Accepts
   ↓
7. Convert to Invoice
   - Set payment terms
   - Add invoice notes
   ↓
8. Download/Send Invoice PDF
   ↓
9. Track Payment → Mark as Paid
   ↓
10. Mark Project Installed
    - Select installation date
    ↓
11. Generate Compliance Evidence Pack
    - BS 7671 design documentation
    - For NICEIC/EIC audits
```

---

## Competitive Advantage

| Feature | TradeCalcs | Generic Quoting Tools |
|---------|------------|----------------------|
| BS 7671 Calculators | ✅ | ❌ |
| Compliance Evidence Packs | ✅ | ❌ |
| NICEIC/EIC Audit Ready | ✅ | ❌ |
| Quote → Invoice | ✅ | ✅ |
| Wholesaler Integration | ✅ | ❌ |
| Electrical Industry Focus | ✅ | ❌ |

**The BS 7671 compliance + quoting combination is the moat. Generic tools can't replicate this without rebuilding from scratch.**

---

## Next Steps (Future)

- [ ] Email invoices via Resend
- [ ] Payment reminders
- [ ] Overdue invoice tracking
- [ ] Wholesaler API integration for live pricing
- [ ] Additional BS 7671 calculators
- [ ] White-label for wholesalers

---

## Technical Notes

- All PDFs generated server-side using jsPDF
- Evidence packs stored in Cloudflare R2 with signed URLs
- Invoice numbers are year-prefixed and sequential
- Contractor profile auto-created on first access
- Installation dates can be set retroactively for existing jobs

---

*Generated: 3rd January 2026*  
*Platform: TradeCalcs.co.uk*
