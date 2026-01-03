import { jsPDF } from 'jspdf';

interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface InvoiceData {
  invoiceNumber: string;
  status: string;
  createdAt: string;
  dueDate?: string;
  paymentTerms: number;
  
  // Customer
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  customerAddress?: string;
  
  // Project
  projectName: string;
  projectAddress?: string;
  
  // Contractor
  contractor?: {
    companyName?: string;
    companyAddress?: string;
    companyPhone?: string;
    companyEmail?: string;
    vatNumber?: string;
  };
  
  // Amounts
  materialsTotal: number;
  labourTotal: number;
  subtotal: number;
  markupAmount: number;
  contingencyAmount: number;
  netTotal: number;
  vatPercent: number;
  vatAmount: number;
  grandTotal: number;
  
  // Items
  items: InvoiceItem[];
  
  notes?: string;
}

export function generateInvoicePDF(data: InvoiceData): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  // Colors
  const purple = [107, 33, 168];
  const darkGray = [50, 50, 50];
  const mediumGray = [100, 100, 100];
  const lightGray = [150, 150, 150];

  // Header - INVOICE
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(purple[0], purple[1], purple[2]);
  doc.text('INVOICE', margin, y);

  // Status badge
  const statusColors: Record<string, number[]> = {
    draft: [156, 163, 175],
    sent: [59, 130, 246],
    paid: [34, 197, 94],
    overdue: [239, 68, 68],
  };
  const statusColor = statusColors[data.status] || statusColors.draft;
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.roundedRect(margin + 55, y - 8, 25, 10, 2, 2, 'F');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(data.status.toUpperCase(), margin + 57, y - 1);

  // Contractor details (top right)
  if (data.contractor?.companyName) {
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(data.contractor.companyName, pageWidth - margin, 20, { align: 'right' });

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);

    let contractorY = 26;
    if (data.contractor.companyAddress) {
      const addressLines = doc.splitTextToSize(data.contractor.companyAddress, 70);
      addressLines.forEach((line: string) => {
        doc.text(line, pageWidth - margin, contractorY, { align: 'right' });
        contractorY += 4;
      });
    }
    if (data.contractor.companyPhone) {
      doc.text(data.contractor.companyPhone, pageWidth - margin, contractorY, { align: 'right' });
      contractorY += 4;
    }
    if (data.contractor.companyEmail) {
      doc.text(data.contractor.companyEmail, pageWidth - margin, contractorY, { align: 'right' });
      contractorY += 4;
    }
    if (data.contractor.vatNumber) {
      doc.text(`VAT: ${data.contractor.vatNumber}`, pageWidth - margin, contractorY, { align: 'right' });
    }
  }

  y += 15;

  // Invoice details box
  doc.setFillColor(249, 250, 251);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(margin, y, 80, 28, 3, 3, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(purple[0], purple[1], purple[2]);
  doc.text('INVOICE DETAILS', margin + 5, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  doc.text(`Invoice No: ${data.invoiceNumber}`, margin + 5, y + 13);
  doc.text(`Date: ${new Date(data.createdAt).toLocaleDateString('en-GB')}`, margin + 5, y + 19);
  if (data.dueDate) {
    doc.text(`Due Date: ${new Date(data.dueDate).toLocaleDateString('en-GB')}`, margin + 5, y + 25);
  }

  // Customer details box
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(pageWidth - margin - 80, y, 80, 28, 3, 3, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(purple[0], purple[1], purple[2]);
  doc.text('BILL TO', pageWidth - margin - 75, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
  let billY = y + 13;
  if (data.customerName) {
    doc.text(data.customerName, pageWidth - margin - 75, billY);
    billY += 6;
  }
  if (data.customerAddress) {
    const addrLines = doc.splitTextToSize(data.customerAddress, 70);
    addrLines.slice(0, 2).forEach((line: string) => {
      doc.text(line, pageWidth - margin - 75, billY);
      billY += 5;
    });
  }

  y += 38;

  // Project reference
  doc.setFontSize(9);
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text(`Project: ${data.projectName}`, margin, y);
  if (data.projectAddress) {
    y += 5;
    doc.text(`Site: ${data.projectAddress}`, margin, y);
  }

  y += 12;

  // Items table header
  doc.setFillColor(107, 33, 168);
  doc.rect(margin, y, pageWidth - margin * 2, 8, 'F');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('Description', margin + 3, y + 5.5);
  doc.text('Qty', pageWidth - margin - 60, y + 5.5, { align: 'right' });
  doc.text('Unit Price', pageWidth - margin - 35, y + 5.5, { align: 'right' });
  doc.text('Total', pageWidth - margin - 3, y + 5.5, { align: 'right' });

  y += 10;

  // Items
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);

  data.items.forEach((item, index) => {
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    // Alternating row background
    if (index % 2 === 0) {
      doc.setFillColor(249, 250, 251);
      doc.rect(margin, y - 3, pageWidth - margin * 2, 8, 'F');
    }

    const descLines = doc.splitTextToSize(item.description, 90);
    doc.text(descLines[0], margin + 3, y + 2);
    doc.text(String(Number(item.quantity).toFixed(2)), pageWidth - margin - 60, y + 2, { align: 'right' });
    doc.text(`£${Number(item.unitPrice).toFixed(2)}`, pageWidth - margin - 35, y + 2, { align: 'right' });
    doc.text(`£${Number(item.total).toFixed(2)}`, pageWidth - margin - 3, y + 2, { align: 'right' });

    y += 7;
  });

  y += 5;

  // Divider
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);

  y += 8;

  // Totals section (right aligned)
  const totalsX = pageWidth - margin - 70;

  const addTotalLine = (label: string, value: number, bold = false) => {
    if (bold) {
      doc.setFont('helvetica', 'bold');
    } else {
      doc.setFont('helvetica', 'normal');
    }
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(label, totalsX, y);
    doc.text(`£${value.toFixed(2)}`, pageWidth - margin - 3, y, { align: 'right' });
    y += 6;
  };

  if (data.materialsTotal > 0) addTotalLine('Materials:', data.materialsTotal);
  if (data.labourTotal > 0) addTotalLine('Labour:', data.labourTotal);
  if (data.markupAmount > 0) addTotalLine('Markup:', data.markupAmount);
  if (data.contingencyAmount > 0) addTotalLine('Contingency:', data.contingencyAmount);
  
  addTotalLine('Subtotal:', data.netTotal);
  addTotalLine(`VAT (${data.vatPercent}%):`, data.vatAmount);

  y += 2;
  doc.setDrawColor(107, 33, 168);
  doc.setLineWidth(1);
  doc.line(totalsX - 5, y, pageWidth - margin, y);
  y += 6;

  doc.setFontSize(12);
  addTotalLine('TOTAL DUE:', data.grandTotal, true);

  // Notes
  if (data.notes) {
    y += 10;
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
    doc.text('Notes:', margin, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    const noteLines = doc.splitTextToSize(data.notes, pageWidth - margin * 2);
    noteLines.forEach((line: string) => {
      doc.text(line, margin, y);
      y += 5;
    });
  }

  // Payment terms
  y += 10;
  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, y - 3, pageWidth - margin * 2, 18, 3, 3, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52);
  doc.text('PAYMENT TERMS', margin + 5, y + 4);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(`Payment due within ${data.paymentTerms} days of invoice date.`, margin + 5, y + 10);

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.text(`Generated: ${new Date().toLocaleString('en-GB')}`, margin, 285);
  doc.text('TradeCalcs.co.uk', pageWidth / 2, 285, { align: 'center' });

  return doc;
}
