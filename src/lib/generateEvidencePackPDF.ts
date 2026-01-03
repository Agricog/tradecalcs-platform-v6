import { jsPDF } from 'jspdf';

interface Calculation {
  circuitName: string;
  calcType: string;
  inputs: Record<string, unknown>;
  outputs: Record<string, unknown>;
  cableType?: string;
  cableSize?: string;
  lengthMetres?: number;
  createdAt: string;
}

interface EvidencePackData {
  project: {
    name: string;
    address?: string;
    customerName?: string;
    installationDate: string;
  };
  contractor?: {
    name: string;
    address?: string;
    phone?: string;
    email?: string;
    certificationNumber?: string;
  };
  calculations: Calculation[];
  generatedAt: string;
}

export function generateEvidencePackPDF(data: EvidencePackData): jsPDF {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  // Colors
  const purple = [107, 33, 168];
  const darkGray = [50, 50, 50];
  const mediumGray = [100, 100, 100];
  const lightGray = [150, 150, 150];

  // Header
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(purple[0], purple[1], purple[2]);
  doc.text('COMPLIANCE EVIDENCE PACK', margin, y);

  y += 10;
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
  doc.text('BS 7671:2018+A2:2022 Design Record', margin, y);

  y += 15;

  // Divider
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);

  y += 15;

  // Project details box
  doc.setFillColor(249, 250, 251);
  doc.setDrawColor(229, 231, 235);
  doc.roundedRect(margin, y - 5, pageWidth - margin * 2, 40, 3, 3, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(purple[0], purple[1], purple[2]);
  doc.text('PROJECT DETAILS', margin + 5, y + 2);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);

  y += 10;
  doc.text(`Project: ${data.project.name}`, margin + 5, y);
  y += 6;
  if (data.project.address) {
    doc.text(`Address: ${data.project.address}`, margin + 5, y);
    y += 6;
  }
  if (data.project.customerName) {
    doc.text(`Customer: ${data.project.customerName}`, margin + 5, y);
    y += 6;
  }
  doc.text(`Installation Date: ${new Date(data.project.installationDate).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })}`, margin + 5, y);

  y += 25;

  // Calculations section header
  doc.setFillColor(107, 33, 168);
  doc.rect(margin, y, pageWidth - margin * 2, 10, 'F');

  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('CIRCUIT DESIGN CALCULATIONS', margin + 5, y + 7);

  y += 15;

  // Each calculation
  data.calculations.forEach((calc, index) => {
    // Check if we need a new page
    if (y > 250) {
      doc.addPage();
      y = 20;
    }

    // Circuit header
    doc.setFillColor(249, 250, 251);
    doc.rect(margin, y - 3, pageWidth - margin * 2, 8, 'F');
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
    doc.text(`${index + 1}. ${calc.circuitName}`, margin + 3, y + 2);
    
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(mediumGray[0], mediumGray[1], mediumGray[2]);
    doc.text(`Type: ${formatCalcType(calc.calcType)}`, pageWidth - margin - 3, y + 2, { align: 'right' });

    y += 12;

    // Cable details if available
    if (calc.cableType || calc.cableSize) {
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);
      doc.setFontSize(9);
      
      if (calc.cableType) {
        doc.text(`Cable Type: ${calc.cableType}`, margin + 5, y);
        y += 5;
      }
      if (calc.cableSize) {
        doc.text(`Cable Size: ${calc.cableSize}`, margin + 5, y);
        y += 5;
      }
      if (calc.lengthMetres) {
        doc.text(`Length: ${calc.lengthMetres}m`, margin + 5, y);
        y += 5;
      }
    }

    // Key outputs
    const outputs = calc.outputs as Record<string, unknown>;
    if (outputs) {
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(purple[0], purple[1], purple[2]);
      doc.text('Design Values:', margin + 5, y);
      y += 5;

      doc.setFont('helvetica', 'normal');
      doc.setTextColor(darkGray[0], darkGray[1], darkGray[2]);

      // Common BS 7671 outputs
      if (outputs.voltDrop !== undefined) {
        doc.text(`Voltage Drop: ${outputs.voltDrop}V (${outputs.voltDropPercent || ''}%)`, margin + 10, y);
        y += 5;
      }
      if (outputs.zsTotal !== undefined) {
        doc.text(`Zs (Total): ${outputs.zsTotal}Ω`, margin + 10, y);
        y += 5;
      }
      if (outputs.zsMax !== undefined) {
        doc.text(`Zs (Max Permitted): ${outputs.zsMax}Ω`, margin + 10, y);
        y += 5;
      }
      if (outputs.currentCarryingCapacity !== undefined) {
        doc.text(`Current Carrying Capacity (Iz): ${outputs.currentCarryingCapacity}A`, margin + 10, y);
        y += 5;
      }
      if (outputs.designCurrent !== undefined) {
        doc.text(`Design Current (Ib): ${outputs.designCurrent}A`, margin + 10, y);
        y += 5;
      }
      if (outputs.protectiveDevice !== undefined) {
        doc.text(`Protective Device: ${outputs.protectiveDevice}`, margin + 10, y);
        y += 5;
      }
    }

    y += 8;
  });

  // Design basis statement
  y += 10;
  if (y > 250) {
    doc.addPage();
    y = 20;
  }

  doc.setDrawColor(220, 220, 220);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  doc.setFillColor(240, 253, 244);
  doc.setDrawColor(187, 247, 208);
  doc.roundedRect(margin, y - 3, pageWidth - margin * 2, 25, 3, 3, 'FD');

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(22, 101, 52);
  doc.text('DESIGN BASIS', margin + 5, y + 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text('All calculations performed in accordance with BS 7671:2018+A2:2022', margin + 5, y + 10);
  doc.text('Requirements for Electrical Installations (IET Wiring Regulations 18th Edition)', margin + 5, y + 15);

  y += 30;

  // Footer
  doc.setFontSize(8);
  doc.setTextColor(lightGray[0], lightGray[1], lightGray[2]);
  doc.text(`Generated: ${new Date(data.generatedAt).toLocaleString('en-GB')}`, margin, 280);
  doc.text('TradeCalcs.co.uk - Compliance Evidence Pack', pageWidth / 2, 285, { align: 'center' });

  return doc;
}

function formatCalcType(calcType: string): string {
  const types: Record<string, string> = {
    'cable_sizing': 'Cable Sizing',
    'voltage_drop': 'Voltage Drop',
    'fault_current': 'Fault Current',
    'earth_fault_loop': 'Earth Fault Loop',
    'adiabatic': 'Adiabatic Equation',
    'max_demand': 'Maximum Demand',
    'brick_calc': 'Brick Calculator',
  };
  return types[calcType] || calcType;
}
