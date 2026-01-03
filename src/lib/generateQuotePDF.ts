import { jsPDF } from 'jspdf';

interface QuoteData {
  quoteNumber: string;
  createdAt: string;
  validDays: number;
  project: {
    name: string;
    address?: string;
    customerName?: string;
    customerEmail?: string;
    customerPhone?: string;
  };
  contractor?: {
    companyName?: string;
    companyAddress?: string;
    companyPhone?: string;
    companyEmail?: string;
  };
  labourItems: Array<{
    description: string;
    total: number;
  }>;
  materialsTotal: number;
  labourTotal: number;
  subtotal: number;
  markupPercent: number;
  markupAmount: number;
  contingencyPercent: number;
  contingencyAmount: number;
  netTotal: number;
  vatPercent: number;
  vatAmount: number;
  grandTotal: number;
  notes?: string;
  terms?: string;
}

export function generateQuotePDF(quote: QuoteData): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  // Colors
  const purple = [107, 33, 168];
  const darkGray = [50, 50, 50];
  const mediumGray = [100, 100, 100];
  const lightGray = [150, 150, 150];

  // Header - QUOTE title
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(purple[0], purple[1], purple[2]);
  doc.text('QUOTE', margin, y);
  
  // Quote number below title
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text(quote.quoteNumber, margin, y + 10);

  // Company details (right side)
  const companyName = quote.contractor?.companyName || 'Your Company Name';
  const companyAddress = quote.contractor?.companyAddress || '';
  const companyPhone = quote.contractor?.companyPhone || '';
  const companyEmail = quote.contractor?.companyEmail || 'your@email.com';

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(companyName, pageWidth - margin, y, { align: 'right' });
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  
  let companyY = y + 6;
  if (companyAddress) {
    const addressLines = doc.splitTextToSize(companyAddress, 70);
    addressLines.forEach((line: string) => {
      doc.text(line, pageWidth - margin, companyY, { align: 'right' });
      companyY += 4;
    });
  }
  if (companyPhone) {
    doc.text(companyPhone, pageWidth - margin, companyY, { align: 'right' });
    companyY += 4;
  }
  if (companyEmail) {
    doc.text(companyEmail, pageWidth - margin, companyY, { align: 'right' });
  }

  y += 35;

  // Divider line
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 15;

  // Two column layout: Quote details (left) and Customer details (right)
  
  // Left column - Quote details
  doc.setFontSize(10);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('Date:', margin, y);
  doc.text('Valid Until:', margin, y + 7);
  doc.text('Project:', margin, y + 14);
  
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  const createdDate = new Date(quote.createdAt).toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
  const validDate = new Date(Date.now() + quote.validDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long', 
    year: 'numeric'
  });
  doc.text(createdDate, margin + 25, y);
  doc.text(validDate, margin + 25, y + 7);
  doc.text(quote.project.name, margin + 25, y + 14);

  // Right column - Customer details box
  const boxX = pageWidth - margin - 80;
  const boxWidth = 80;
  
  doc.setFillColor(249, 250, 251);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(boxX, y - 5, boxWidth, 45, 3, 3, 'FD');
  
  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(purple[0], purple[1], purple[2]);
  doc.text('QUOTE FOR', boxX + 5, y + 2);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(quote.project.customerName || 'Customer', boxX + 5, y + 10);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  
  let customerY = y + 16;
  if (quote.project.address) {
    const addressLines = doc.splitTextToSize(quote.project.address, boxWidth - 10);
    addressLines.forEach((line: string) => {
      doc.text(line, boxX + 5, customerY);
      customerY += 4;
    });
  }
  if (quote.project.customerPhone) {
    doc.text(quote.project.customerPhone, boxX + 5, customerY);
    customerY += 4;
  }
  if (quote.project.customerEmail) {
    doc.text(quote.project.customerEmail, boxX + 5, customerY);
  }

  y += 55;

  // Table header
  doc.setFillColor(107, 33, 168);
  doc.rect(margin, y, pageWidth - margin * 2, 10, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Description', margin + 5, y + 7);
  doc.text('Amount', pageWidth - margin - 5, y + 7, { align: 'right' });
  
  y += 15;

  // Table rows
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  
  // Materials row
  doc.setFillColor(249, 250, 251);
  doc.rect(margin, y - 5, pageWidth - margin * 2, 10, 'F');
  doc.text('Materials', margin + 5, y + 2);
  doc.text('£' + quote.materialsTotal.toFixed(2), pageWidth - margin - 5, y + 2, { align: 'right' });
  y += 12;

  // Labour items
  let isAlternate = false;
  quote.labourItems.forEach(item => {
    if (isAlternate) {
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, y - 5, pageWidth - margin * 2, 10, 'F');
    }
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(item.description, margin + 5, y + 2);
    doc.text('£' + Number(item.total).toFixed(2), pageWidth - margin - 5, y + 2, { align: 'right' });
    y += 12;
    isAlternate = !isAlternate;
  });

  y += 5;

  // Totals section - right aligned
  const totalsX = pageWidth - margin - 90;
  const valuesX = pageWidth - margin - 5;
  
  // Subtotal
  doc.setDrawColor(220, 220, 220);
  doc.line(totalsX, y, pageWidth - margin, y);
  y += 8;
  
  doc.setFontSize(10);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('Subtotal', totalsX, y);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('£' + quote.subtotal.toFixed(2), valuesX, y, { align: 'right' });
  y += 7;

  if (quote.markupAmount > 0) {
    doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
    doc.text('Professional Services', totalsX, y);
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text('£' + quote.markupAmount.toFixed(2), valuesX, y, { align: 'right' });
    y += 7;
  }

  if (quote.contingencyAmount > 0) {
    doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
    doc.text('Contingency', totalsX, y);
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text('£' + quote.contingencyAmount.toFixed(2), valuesX, y, { align: 'right' });
    y += 7;
  }

  // Net total
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('Net Total', totalsX, y);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('£' + quote.netTotal.toFixed(2), valuesX, y, { align: 'right' });
  y += 7;

  // VAT
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text(`VAT (${quote.vatPercent}%)`, totalsX, y);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text('£' + quote.vatAmount.toFixed(2), valuesX, y, { align: 'right' });
  y += 12;

  // Grand total box
  doc.setFillColor(107, 33, 168);
  doc.roundedRect(totalsX - 5, y - 5, pageWidth - margin - totalsX + 10, 14, 2, 2, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL', totalsX, y + 5);
  doc.text('£' + quote.grandTotal.toFixed(2), valuesX, y + 5, { align: 'right' });

  y += 25;

  // Notes section
  if (quote.notes) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text('Notes', margin, y);
    y += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
    const noteLines = doc.splitTextToSize(quote.notes, pageWidth - margin * 2);
    noteLines.forEach((line: string) => {
      doc.text(line, margin, y);
      y += 5;
    });
    y += 5;
  }

  // Terms section
  if (quote.terms) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text('Terms & Conditions', margin, y);
    y += 6;
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
    const termLines = doc.splitTextToSize(quote.terms, pageWidth - margin * 2);
    termLines.forEach((line: string) => {
      doc.text(line, margin, y);
      y += 4;
    });
  }

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.text('Generated by TradeCalcs.co.uk', pageWidth / 2, 285, { align: 'center' });

  return doc;
}
