import { useState } from 'react';
import { TruckIcon, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function STGOCalculator() {
  const [tractorWeight, setTractorWeight] = useState('');
  const [trailerWeight, setTrailerWeight] = useState('');
  const [loadWeight, setLoadWeight] = useState('');
  const [vehicleLength, setVehicleLength] = useState('');
  const [vehicleWidth, setVehicleWidth] = useState('');
  const [axleCount, setAxleCount] = useState('');
  const [loadType, setLoadType] = useState('');
  const [movementDate, setMovementDate] = useState('');
  const [results, setResults] = useState<any>(null);

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

    setResults({
      isCompliant,
      category,
      totalWeight,
      tractor,
      trailer,
      load,
      length,
      width,
      requiredNoticeDays,
      daysUntilMovement,
      maxSpeed,
      issues,
      requirements
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Link to="/" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-6 font-medium">
          ← Back to All Calculators
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            HaulCheck - STGO Compliance Calculator
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Avoid £750K fines with instant STGO compliance checks before movement
          </p>
        </div>

        <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-500 rounded-lg p-4 mb-8 flex gap-3">
          <AlertTriangle className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-200 mb-1">For Guidance Only</h3>
            <p className="text-sm text-red-800 dark:text-red-300">
              This calculator provides preliminary checks. Always verify with DVSA guidance. Non-compliance can result in fines up to £759,000 and operator license revocation.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <form onSubmit={calculateCompliance} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tractor Weight (kg)
              </label>
              <input
                type="number"
                value={tractorWeight}
                onChange={(e) => setTractorWeight(e.target.value)}
                placeholder="e.g., 8000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Unladen weight of tractor unit only</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trailer Weight (kg)
              </label>
              <input
                type="number"
                value={trailerWeight}
                onChange={(e) => setTrailerWeight(e.target.value)}
                placeholder="e.g., 10000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Unladen weight of trailer only</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Load Weight (kg)
              </label>
              <input
                type="number"
                value={loadWeight}
                onChange={(e) => setLoadWeight(e.target.value)}
                placeholder="e.g., 32000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Weight of cargo/equipment being transported</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vehicle Length (m) - Optional
              </label>
              <input
                type="number"
                step="0.1"
                value={vehicleLength}
                onChange={(e) => setVehicleLength(e.target.value)}
                placeholder="e.g., 16.5"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Total length of tractor + trailer + load</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Vehicle Width (m) - Optional
              </label>
              <input
                type="number"
                step="0.1"
                value={vehicleWidth}
                onChange={(e) => setVehicleWidth(e.target.value)}
                placeholder="e.g., 2.55"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Maximum width including load</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Number of Axles
              </label>
              <select
                value={axleCount}
                onChange={(e) => setAxleCount(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Load Type
              </label>
              <select
                value={loadType}
                onChange={(e) => setLoadType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="">Select type</option>
                <option value="indivisible">Indivisible (cannot be split)</option>
                <option value="divisible">Divisible (can be split)</option>
              </select>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Divisible loads over standard weights must be split</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Planned Movement Date
              </label>
              <input
                type="date"
                value={movementDate}
                onChange={(e) => setMovementDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Required for notice period calculation</p>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition flex items-center justify-center gap-2"
            >
              <TruckIcon className="w-5 h-5" />
              Check Compliance
            </button>
          </form>
        </div>

        {results && (
          <div className="space-y-6">
            <div className={`rounded-lg p-6 border-2 ${
              results.isCompliant 
                ? 'bg-green-50 dark:bg-green-900/20 border-green-500' 
                : 'bg-red-50 dark:bg-red-900/20 border-red-500'
            }`}>
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  results.isCompliant ? 'bg-green-500' : 'bg-red-500'
                }`}>
                  {results.isCompliant ? (
                    <CheckCircle className="w-7 h-7 text-white" />
                  ) : (
                    <XCircle className="w-7 h-7 text-white" />
                  )}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {results.isCompliant ? 'Potentially Compliant' : 'Non-Compliant'}
                  </div>
                  <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                    {results.category}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Tractor</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{results.tractor.toLocaleString()} kg</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Trailer</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{results.trailer.toLocaleString()} kg</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Load</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{results.load.toLocaleString()} kg</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                  <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase">Total GVW</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white">{results.totalWeight.toLocaleString()} kg</div>
                </div>
              </div>

              {results.issues.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-red-900 dark:text-red-200 mb-3">⚠️ Compliance Issues</h4>
                  <div className="space-y-2">
                    {results.issues.map((issue: string, index: number) => (
                      <div key={index} className="flex gap-3 bg-white dark:bg-gray-800 rounded-lg p-3 border border-red-200 dark:border-red-800">
                        <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{issue}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {results.requirements.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-3">📋 Requirements</h4>
                  <div className="space-y-2">
                    {results.requirements.map((req: string, index: number) => (
                      <div key={index} className="flex gap-3 bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {!results.isCompliant && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">⚠️ Action Required</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Your planned movement does not comply with STGO regulations. Operating non-compliant can result in:
                </p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 ml-6 list-disc">
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

        <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Understanding STGO Regulations</h2>
          
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Special Types General Order (STGO) regulations allow vehicles carrying abnormal indivisible loads to operate on UK roads under specific conditions.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-8">STGO Categories</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-6 list-disc">
            <li><strong>Category 1:</strong> Up to 50,000kg - Requires 2 working days' notice</li>
            <li><strong>Category 2:</strong> 50,001-80,000kg - Requires 5 working days' notice, 30mph max</li>
            <li><strong>Category 3:</strong> 80,001-150,000kg - Requires 5 working days' notice, 12mph max, extensive planning</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-8">Common Violations</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-6 list-disc">
            <li>Overloading beyond declared category limits</li>
            <li>Missing STGO plates/markings</li>
            <li>Insufficient notice period</li>
            <li>Transporting divisible loads that should be split</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-8">Penalties</h3>
          <ul className="space-y-2 text-gray-600 dark:text-gray-400 ml-6 list-disc">
            <li>Fixed penalties: £50-300 per violation</li>
            <li>Court fines: £10,000-40,000 typical</li>
            <li>Record penalty: £759,000 (July 2025)</li>
            <li>Traffic Commissioner investigations: 93% result in enforcement</li>
            <li>Operator license revocation or suspension</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
