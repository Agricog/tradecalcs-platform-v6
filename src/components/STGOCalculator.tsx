import { useState } from 'react';
import { TruckIcon, AlertTriangle, CheckCircle, XCircle, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CalculationData {
  isCompliant: boolean;
  category: string;
  totalWeight: number;
  tractorWeight: number;
  trailerWeight: number;
  loadWeight: number;
  vehicleLength: number;
  vehicleWidth: number;
  maxSpeed: string;
  issues: string[];
  requirements: string[];
  requiredNoticeDays: number;
  daysUntilMovement: number;
}

export default function STGOCalculator() {
  const [tractorWeight, setTractorWeight] = useState('');
  const [trailerWeight, setTrailerWeight] = useState('');
  const [loadWeight, setLoadWeight] = useState('');
  const [vehicleLength, setVehicleLength] = useState('');
  const [vehicleWidth, setVehicleWidth] = useState('');
  const [axleCount, setAxleCount] = useState('');
  const [loadType, setLoadType] = useState('');
  const [movementDate, setMovementDate] = useState('');
  const [results, setResults] = useState<CalculationData | null>(null);

  const calculateCompliance = (e: React.FormEvent) => {
    e.preventDefault();

    const tractor = parseFloat(tractorWeight);
    const trailer = parseFloat(trailerWeight);
    const load = parseFloat(loadWeight);
    const length = parseFloat(vehicleLength) || 0;
    const width = parseFloat(vehicleWidth) || 0;
    const totalWeight = tractor + trailer + load;
    
    const today = new Date();
    const moveDate = new Date(movementDate);
    const daysUntilMovement = Math.ceil((moveDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    const standardLimit = 44000;
    let category = 'Standard';
    let requiredNoticeDays = 0;
    let maxSpeed = '60 mph (motorway), 50 mph (dual carriageway)';
    let isCompliant = true;
    let issues: string[] = [];
    let requirements: string[] = [];

    if (totalWeight > standardLimit) {
      if (loadType === 'divisible') {
        isCompliant = false;
        issues.push('Divisible loads exceeding 44,000kg must be split across multiple vehicles');
        category = 'Non-compliant';
      } else {
        if (totalWeight <= 50000) {
          category = 'Category 1';
          requiredNoticeDays = 2;
          maxSpeed = '40 mph (all roads)';
          requirements.push('2 working days\' notice to National Highways via ESDAL');
          requirements.push('STGO Category 1 plate displayed on vehicle front');
        } else if (totalWeight <= 80000) {
          category = 'Category 2';
          requiredNoticeDays = 5;
          maxSpeed = '30 mph (all roads)';
          requirements.push('5 working days\' notice to National Highways via ESDAL');
          requirements.push('STGO Category 2 plate displayed on vehicle front');
          requirements.push('Special speed limit: 30 mph maximum');
        } else if (totalWeight <= 150000) {
          category = 'Category 3';
          requiredNoticeDays = 5;
          maxSpeed = '12 mph (all roads)';
          requirements.push('5 working days\' notice to National Highways via ESDAL');
          requirements.push('STGO Category 3 plate displayed on vehicle front');
          requirements.push('Special speed limit: 12 mph maximum');
          requirements.push('Extensive route planning and police notifications required');
        } else {
          isCompliant = false;
          issues.push('Load exceeds maximum STGO limit of 150,000kg');
          category = 'Exceeds STGO Limits';
        }

        if (requiredNoticeDays > 0 && daysUntilMovement < requiredNoticeDays) {
          isCompliant = false;
          issues.push(`Insufficient notice: ${requiredNoticeDays} working days required, only ${daysUntilMovement} days until movement`);
        }
      }
    }

    const weightPerAxle = totalWeight / parseInt(axleCount);
    const maxAxleWeight = 12500;
    
    if (weightPerAxle > maxAxleWeight && axleCount !== '7+') {
      isCompliant = false;
      issues.push(`Average axle weight (${Math.round(weightPerAxle)}kg) may exceed limits`);
    }

    if (length > 30) {
      requirements.push(`Length exceeds 30m (${length}m) - additional notification required`);
    }
    if (width > 6.1) {
      isCompliant = false;
      issues.push(`Width exceeds 6.1m (${width}m) - police escort required`);
    }

    if (category.includes('Category')) {
      requirements.push('Load must be properly secured per DfT guidance');
      requirements.push('Driver must hold valid HGV license');
      
      if (totalWeight > 80000) {
        requirements.push('⚠️ Bridge assessments required - contact National Highways');
      }
    }

    const calculationData: CalculationData = {
      isCompliant,
      category,
      totalWeight,
      tractorWeight: tractor,
      trailerWeight: trailer,
      loadWeight: load,
      vehicleLength: length,
      vehicleWidth: width,
      requiredNoticeDays,
      daysUntilMovement,
      maxSpeed,
      issues,
      requirements
    };

    setResults(calculationData);
  };

  const downloadPDF = () => {
    if (!results) return;

    const { totalWeight, tractorWeight, trailerWeight, loadWeight, category, isCompliant, requirements, issues, vehicleLength, vehicleWidth, maxSpeed } = results;

    const pdfContent = `
      <html>
      <head>
        <title>STGO Compliance Report - HaulCheck</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #f97316; padding-bottom: 20px; }
          .header h1 { color: #f97316; margin: 0; font-size: 28px; }
          .header p { color: #666; margin: 5px 0; }
          .status { background: ${isCompliant ? '#d1fae5' : '#fee2e2'}; padding: 20px; border-radius: 8px; border-left: 4px solid ${isCompliant ? '#22c55e' : '#ef4444'}; margin: 20px 0; }
          .status h2 { margin: 0 0 10px 0; color: ${isCompliant ? '#16a34a' : '#dc2626'}; }
          .details { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin: 20px 0; }
          .detail-box { background: #f9fafb; padding: 15px; border-radius: 6px; border: 1px solid #e5e7eb; }
          .detail-box strong { display: block; color: #6b7280; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
          .detail-box span { font-size: 20px; font-weight: bold; color: #111827; }
          .section { margin: 30px 0; }
          .section h3 { color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px; }
          ul { list-style: none; padding: 0; }
          li { padding: 8px 0; padding-left: 25px; position: relative; }
          li:before { content: "${isCompliant ? '✓' : '✗'}"; position: absolute; left: 0; color: ${isCompliant ? '#22c55e' : '#ef4444'}; font-weight: bold; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚛 HaulCheck STGO Compliance Report</h1>
          <p>Generated: ${new Date().toLocaleDateString('en-GB')} at ${new Date().toLocaleTimeString('en-GB')}</p>
          <p style="font-weight: bold;">For guidance only - verify with DVSA before movement</p>
        </div>

        <div class="status">
          <h2>${isCompliant ? '✅ Potentially Compliant' : '❌ Non-Compliant'}</h2>
          <p style="font-size: 18px; font-weight: bold; margin: 5px 0;">STGO ${category}</p>
        </div>

        <div class="section">
          <h3>Weight Breakdown</h3>
          <div class="details">
            <div class="detail-box">
              <strong>Tractor Weight</strong>
              <span>${tractorWeight.toLocaleString()} kg</span>
            </div>
            <div class="detail-box">
              <strong>Trailer Weight</strong>
              <span>${trailerWeight.toLocaleString()} kg</span>
            </div>
            <div class="detail-box">
              <strong>Load Weight</strong>
              <span>${loadWeight.toLocaleString()} kg</span>
            </div>
            <div class="detail-box">
              <strong>Total GVW</strong>
              <span>${totalWeight.toLocaleString()} kg</span>
            </div>
            ${vehicleLength > 0 ? `<div class="detail-box"><strong>Length</strong><span>${vehicleLength.toFixed(1)} m</span></div>` : ''}
            ${vehicleWidth > 0 ? `<div class="detail-box"><strong>Width</strong><span>${vehicleWidth.toFixed(2)} m</span></div>` : ''}
            <div class="detail-box">
              <strong>Max Speed</strong>
              <span style="font-size: 14px;">${maxSpeed}</span>
            </div>
          </div>
        </div>

        ${issues.length > 0 ? `
        <div class="section">
          <h3>⚠️ Compliance Issues</h3>
          <ul>
            ${issues.map(issue => `<li>${issue}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        ${requirements.length > 0 ? `
        <div class="section">
          <h3>📋 Requirements</h3>
          <ul>
            ${requirements.map(req => `<li>${req}</li>`).join('')}
          </ul>
        </div>
        ` : ''}

        <div class="section">
          <h3>⚠️ Important Notice</h3>
          <p>This report is for guidance purposes only. Always verify compliance with official DVSA guidance before movement. Non-compliance can result in fines up to £759,000 and operator license revocation.</p>
          <p style="margin-top: 15px;"><strong>Submit ESDAL notification:</strong> esdal.nationalhighways.co.uk</p>
        </div>

        <div class="footer">
          <p><strong>Generated by HaulCheck</strong> - Free STGO Compliance Calculator</p>
          <p>tradecalcs.co.uk/calculators/stgo-calculator</p>
        </div>
      </body>
      </html>
    `;

    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `HaulCheck-STGO-Report-${new Date().toISOString().split('T')[0]}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-orange-600 hover:text-orange-700 mb-6 font-medium">
          ← Back to All Calculators
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            HaulCheck - STGO Compliance Calculator
          </h1>
          <p className="text-lg text-gray-600">
            Avoid £750K fines with instant STGO compliance checks before movement
          </p>
        </div>

        <div className="bg-red-50 border-2 border-red-500 rounded-lg p-4 mb-8 flex gap-3">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">For Guidance Only</h3>
            <p className="text-sm text-red-800">
              This calculator provides preliminary checks. Always verify with DVSA guidance. Non-compliance can result in fines up to £759,000 and operator license revocation.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={calculateCompliance} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tractor Weight (kg)
              </label>
              <input
                type="number"
                value={tractorWeight}
                onChange={(e) => setTractorWeight(e.target.value)}
                placeholder="e.g., 8000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Unladen weight of tractor unit only</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trailer Weight (kg)
              </label>
              <input
                type="number"
                value={trailerWeight}
                onChange={(e) => setTrailerWeight(e.target.value)}
                placeholder="e.g., 10000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Unladen weight of trailer only</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Load Weight (kg)
              </label>
              <input
                type="number"
                value={loadWeight}
                onChange={(e) => setLoadWeight(e.target.value)}
                placeholder="e.g., 32000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Weight of cargo/equipment being transported</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Length (m) - Optional
              </label>
              <input
                type="number"
                step="0.1"
                value={vehicleLength}
                onChange={(e) => setVehicleLength(e.target.value)}
                placeholder="e.g., 16.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">Total length of tractor + trailer + load</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Width (m) - Optional
              </label>
              <input
                type="number"
                step="0.1"
                value={vehicleWidth}
                onChange={(e) => setVehicleWidth(e.target.value)}
                placeholder="e.g., 2.55"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <p className="text-sm text-gray-500 mt-1">Maximum width including load</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Axles
              </label>
              <select
                value={axleCount}
                onChange={(e) => setAxleCount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="">Select axles</option>
                <option value="3">3 axles</option>
                <option value="4">4 axles</option>
                <option value="5">5 axles</option>
                <option value="6">6 axles</option>
                <option value="7+">7+ axles</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Load Type
              </label>
              <select
                value={loadType}
                onChange={(e) => setLoadType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              >
                <option value="">Select type</option>
                <option value="indivisible">Indivisible (cannot be split)</option>
                <option value="divisible">Divisible (can be split)</option>
              </select>
              <p className="text-sm text-gray-500 mt-1">Divisible loads over standard weights must be split</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Planned Movement Date
              </label>
              <input
                type="date"
                value={movementDate}
                onChange={(e) => setMovementDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                required
              />
              <p className="text-sm text-gray-500 mt-1">Required for notice period calculation</p>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-semibold py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              <TruckIcon className="w-5 h-5" />
              Check STGO Compliance
            </button>
          </form>
        </div>

        {results && (
          <div className="space-y-6">
            <div className={`rounded-lg p-6 border-2 shadow-xl ${
              results.isCompliant 
                ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-500' 
                : 'bg-gradient-to-br from-red-50 to-red-100 border-red-500'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                  results.isCompliant 
                    ? 'bg-gradient-to-br from-green-500 to-green-600' 
                    : 'bg-gradient-to-br from-red-500 to-red-600'
                }`}>
                  {results.isCompliant ? (
                    <CheckCircle className="w-7 h-7 text-white" />
                  ) : (
                    <XCircle className="w-7 h-7 text-white" />
                  )}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {results.isCompliant ? 'Potentially Compliant' : 'Non-Compliant'}
                  </div>
                  <div className="text-lg font-semibold text-gray-700">
                    {results.category}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm">
                  <div className="text-xs font-semibold text-gray-500 uppercase">Tractor</div>
                  <div className="text-lg font-bold text-gray-900">{results.tractorWeight.toLocaleString()} kg</div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm">
                  <div className="text-xs font-semibold text-gray-500 uppercase">Trailer</div>
                  <div className="text-lg font-bold text-gray-900">{results.trailerWeight.toLocaleString()} kg</div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm">
                  <div className="text-xs font-semibold text-gray-500 uppercase">Load</div>
                  <div className="text-lg font-bold text-gray-900">{results.loadWeight.toLocaleString()} kg</div>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 rounded-lg p-3 border border-gray-200 shadow-sm">
                  <div className="text-xs font-semibold text-gray-500 uppercase">Total GVW</div>
                  <div className="text-lg font-bold text-gray-900">{results.totalWeight.toLocaleString()} kg</div>
                </div>
              </div>

              {results.issues.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-red-900 mb-3">⚠️ Compliance Issues</h4>
                  <div className="space-y-2">
                    {results.issues.map((issue: string, index: number) => (
                      <div key={index} className="flex gap-3 bg-white rounded-lg p-3 border border-red-200 shadow-sm">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.requirements.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">📋 Requirements</h4>
                  <div className="space-y-2">
                    {results.requirements.map((req: string, index: number) => (
                      <div key={index} className="flex gap-3 bg-white rounded-lg p-3 border border-gray-200 shadow-sm">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.isCompliant && (
                <div className="mt-6 p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                  <p className="text-sm font-semibold mb-2 text-green-900">📄 Download Compliance Report</p>
                  <p className="text-xs text-gray-700 mb-3">Save this calculation for your records and Traffic Commissioner audit trails.</p>
                  <button
                    onClick={downloadPDF}
                    className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition shadow-md hover:shadow-lg flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF Report
                  </button>
                </div>
              )}
            </div>

            {!results.isCompliant && (
              <div className="bg-white rounded-lg p-6 border-l-4 border-red-500 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">⚠️ Action Required</h3>
                <p className="text-gray-600 mb-4">
                  Your planned movement does not comply with STGO regulations. Operating non-compliant can result in:
                </p>
                <ul className="space-y-2 text-sm text-gray-600 ml-6 list-disc">
                  <li>Vehicle prohibition (immediate roadside detention)</li>
                  <li>Fixed penalty notices (£50-300 per violation)</li>
                  <li>Court prosecution (£10,000-759,000 fines)</li>
                  <li>Traffic Commissioner investigation</li>
                  <li>Operator license suspension or revocation</li>
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-12 pt-12 border-t border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding STGO Regulations</h2>
          
          <p className="text-gray-600 mb-6">
            Special Types General Order (STGO) regulations allow vehicles carrying abnormal indivisible loads to operate on UK roads under specific conditions. Understanding compliance requirements is critical to avoid severe penalties.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">STGO Categories</h3>
          <ul className="space-y-2 text-gray-600 ml-6 list-disc">
            <li><strong>Category 1:</strong> Up to 50,000kg GVW - Requires 2 working days' notice to authorities</li>
            <li><strong>Category 2:</strong> 50,001kg to 80,000kg GVW - Requires 5 working days' notice, stricter speed limits</li>
            <li><strong>Category 3:</strong> 80,001kg to 150,000kg GVW - Requires 5 working days' notice, extensive planning, multiple permits</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Notice Period Requirements</h3>
          <p className="text-gray-600 mb-4">
            Notice periods are calculated in working days (excludes Sundays and bank holidays). Notices must be submitted to National Highways via the ESDAL system. Insufficient notice periods are a common violation resulting in prohibitions.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Common Violations</h3>
          <ul className="space-y-2 text-gray-600 ml-6 list-disc">
            <li>Overloading beyond declared category limits (most frequent)</li>
            <li>Missing STGO plates/markings (removes legal protection)</li>
            <li>Insufficient notice period to authorities</li>
            <li>Transporting divisible loads that should be split</li>
            <li>False movement declarations with incorrect weights</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Penalties for Non-Compliance</h3>
          <p className="text-gray-600 mb-2">Recent enforcement has intensified dramatically:</p>
          <ul className="space-y-2 text-gray-600 ml-6 list-disc">
            <li>Fixed penalties: £50-300 per violation</li>
            <li>Court prosecutions: £10,000-40,000 typical fines</li>
            <li>Record penalty: £759,000 (July 2025)</li>
            <li>Traffic Commissioner investigations: 93% result in enforcement action</li>
            <li>Operator license revocation or suspension</li>
            <li>Transport manager disqualification (up to 3 years)</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">Best Practices</h3>
          <ul className="space-y-2 text-gray-600 ml-6 list-disc">
            <li>Always verify weights at certified weighbridges before movement</li>
            <li>Calculate compliance margins - don't operate at maximum limits</li>
            <li>Submit ESDAL notifications with correct lead time</li>
            <li>Ensure proper STGO plates are displayed on vehicle front</li>
            <li>Document all compliance checks for audit trails</li>
            <li>Train transport managers on STGO requirements</li>
            <li>Never "take a chance" - penalties far exceed delay costs</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-8">When to Seek Professional Advice</h3>
          <p className="text-gray-600 mb-2">Consult with transport compliance specialists or solicitors for:</p>
          <ul className="space-y-2 text-gray-600 ml-6 list-disc">
            <li>Complex multi-axle configurations</li>
            <li>Loads exceeding Category 2 limits</li>
            <li>International movements</li>
            <li>Bridge and structure strike risks</li>
            <li>Traffic Commissioner investigations</li>
            <li>Operator license applications or variations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

