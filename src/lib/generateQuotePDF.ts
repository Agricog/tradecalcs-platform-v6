import jsPDF from 'jspdf';

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

  // Helper functions
  const addText = (text: string, x: number, yPos: number, options?: any) => {
    doc.text(text, x, yPos, options);
  };

  const drawLine = (yPos: number) => {
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, yPos, pageWidth - margin, yPos);
  };

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(107, 33, 168); // Purple
  addText('QUOTE', margin, y);
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  addText(quote.quoteNumber, margin, y + 8);

  // Company placeholder (right side)
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 50);
  addText('Your Company Name', pageWidth - margin, y, { align: 'right' });
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(100, 100, 100);
  addText('your@email.com', pageWidth - margin, y + 6, { align: 'right' });
  addText('07700 900000', pageWidth - margin, y + 11, { align: 'right' });

  y += 30;
  drawLine(y);
  y += 15;

  // Quote details
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  addText('Date:', margin, y);
  addText('Valid Until:', margin, y + 6);
  
  doc.setTextColor(50, 50, 50);
  const createdDate = new Date(quote.createdAt).toLocaleDateString('en-GB');
  const validDate = new Date(Date.now() + quote.validDays * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB');
  addText(createdDate, margin + 25, y);
  addText(validDate, margin + 25, y + 6);

  // Customer details (right side)
  doc.setTextColor(100, 100, 100);
  addText('Quote For:', pageWidth - margin - 60, y);
  doc.setTextColor(50, 50, 50);
  doc.setFont('helvetica', 'bold');
  addText(quote.project.customerName || 'Customer', pageWidth - margin, y, { align: 'right' });
  doc.setFont('helvetica', 'normal');
  
  let customerY = y + 6;
  if (quote.project.address) {
    const addressLines = doc.splitTextToSize(quote.project.address, 60);
    addressLines.forEach((line: string) => {
      addText(line, pageWidth - margin, customerY, { align: 'right' });
      customerY += 5;
    });
  }
  if (quote.project.customerEmail) {
    addText(quote.project.customerEmail, pageWidth - margin, customerY, { align: 'right' });
    customerY += 5;
  }
  if (quote.project.customerPhone) {
    addText(quote.project.customerPhone, pageWidth - margin, customerY, { align: 'right' });
  }

  y += 25;
  
  // Project name
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(50, 50, 50);
  addText('Project: ' + quote.project.name, margin, y);
  
  y += 15;
  drawLine(y);
  y += 10;

  // Table header
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, y - 5, pageWidth - margin * 2, 10, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(80, 80, 80);
  addText('Description', margin + 5, y);
  addText('Amount', pageWidth - margin - 5, y, { align: 'right' });
  
  y += 12;

  // Materials line
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(50, 50, 50);
  addText('Materials', margin + 5, y);
  addText('£' + quote.materialsTotal.toFixed(2), pageWidth - margin - 5, y, { align: 'right' });
  y += 8;

  // Labour items
  quote.labourItems.forEach(item => {
    addText(item.description, margin + 5, y);
    addText('£' + Number(item.total).toFixed(2), pageWidth - margin - 5, y, { align: 'right' });
    y += 8;
  });

  y += 5;
  drawLine(y);
  y += 10;

  // Totals section
  const totalsX = pageWidth - margin - 80;
  
  doc.setTextColor(100, 100, 100);
  addText('Subtotal', totalsX, y);
  doc.setTextColor(50, 50, 50);
  addText('£' + quote.subtotal.toFixed(2), pageWidth - margin - 5, y, { align: 'right' });
  y += 7;

  if (quote.markupAmount > 0) {
    doc.setTextColor(100, 100, 100);
    addText('Professional Services', totalsX, y);
    doc.setTextColor(50, 50, 50);
    addText('£' + quote.markupAmount.toFixed(2), pageWidth - margin - 5, y, { align: 'right' });
    y += 7;
  }

  if (quote.contingencyAmount > 0) {
    doc.setTextColor(100, 100, 100);
    addText('Contingency', totalsX, y);
    doc.setTextColor(50, 50, 50);
    addText('£' + quote.contingencyAmount.toFixed(2), pageWidth - margin - 5, y, { align: 'right' });
    y += 7;
  }

  doc.setTextColor(100, 100, 100);
  addText('Net Total', totalsX, y);
  doc.setTextColor(50, 50, 50);
  addText('£' + quote.netTotal.toFixed(2), pageWidth - margin - 5, y, { align: 'right' });
  y += 7;

  doc.setTextColor(100, 100, 100);
  addText(`VAT (${quote.vatPercent}%)`, totalsX, y);
  doc.setTextColor(50, 50, 50);
  addText('£' + quote.vatAmount.toFixed(2), pageWidth - margin - 5, y, { align: 'right' });
  y += 10;

  // Grand total
  doc.setFillColor(107, 33, 168);
  doc.rect(totalsX - 10, y - 5, pageWidth - totalsX - margin + 15, 12, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  addText('TOTAL', totalsX, y + 3);
  addText('£' + quote.grandTotal.toFixed(2), pageWidth - margin - 5, y + 3, { align: 'right' });

  y += 25;

  // Notes
  if (quote.notes) {
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(80, 80, 80);
    addText('Notes', margin, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    const noteLines = doc.splitTextToSize(quote.notes, pageWidth - margin * 2);
    noteLines.forEach((line: string) => {
      addText(line, margin, y);
      y += 5;
    });
    y += 5;
  }

  // Terms
  if (quote.terms) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(80, 80, 80);
    addText('Terms & Conditions', margin, y);
    y += 6;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 100, 100);
    const termLines = doc.splitTextToSize(quote.terms, pageWidth - margin * 2);
    termLines.forEach((line: string) => {
      addText(line, margin, y);
      y += 5;
    });
  }

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  addText('Generated by TradeCalcs.co.uk', pageWidth / 2, 285, { align: 'center' });

  return doc;
}
