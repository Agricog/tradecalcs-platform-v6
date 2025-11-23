import { useState } from 'react'
import { X, Download } from 'lucide-react'

interface QuoteGeneratorProps {
  calculationResults: {
    materials: Array<{ item: string; quantity: string; unit: string }>
    summary?: string
  }
  onClose: () => void
}

export default function QuoteGenerator({ calculationResults, onClose }: QuoteGeneratorProps) {
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [labourRate, setLabourRate] = useState('')
  const [estimatedHours, setEstimatedHours] = useState('')
  const [materialMarkup, setMaterialMarkup] = useState('15')
  const [notes, setNotes] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  const generateQuote = () => {
    setShowPreview(true)
  }

  const downloadPDF = () => {
    const quoteHTML = generateQuoteHTML()
    const blob = new Blob([quoteHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Quote-${clientName.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.html`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const calculateTotal = () => {
    const labour = parseFloat(labourRate) * parseFloat(estimatedHours)
    const materialsBase = calculationResults.materials.reduce((sum) => {
      // Simplified - you'd add pricing logic here
      return sum + 100 // Placeholder
    }, 0)
    const materialsWithMarkup = materialsBase * (1 + parseFloat(materialMarkup) / 100)
    const subtotal = labour + materialsWithMarkup
    const vat = subtotal * 0.2
    return {
      labour,
      materials: materialsWithMarkup,
      subtotal,
      vat,
      total: subtotal + vat
    }
  }

  const totals = calculateTotal()

  const generateQuoteHTML = () => {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quote - ${clientName}</title>
    <style>
        body { font-family: Arial, sans-serif; padding: 40px; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; }
        .header { border-bottom: 3px solid #6366f1; padding-bottom: 20px; margin-bottom: 30px; }
        .header h1 { color: #6366f1; margin: 0 0 10px 0; font-size: 32px; }
        .header p { color: #666; margin: 5px 0; }
        .section { margin: 30px 0; }
        .section h2 { color: #6366f1; border-bottom: 2px solid #6366f1; padding-bottom: 10px; margin-bottom: 15px; }
        .client-info { background: #f9fafb; padding: 20px; border-radius: 8px; margin: 20px 0; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th { background: #6366f1; color: white; padding: 12px; text-align: left; }
        td { padding: 12px; border-bottom: 1px solid #e5e7eb; }
        tr:hover { background: #f9fafb; }
        .totals { background: #f9fafb; padding: 20px; border-radius: 8px; margin-top: 30px; }
        .totals-row { display: flex; justify-content: space-between; padding: 8px 0; }
        .total-final { font-size: 24px; font-weight: bold; color: #6366f1; border-top: 2px solid #6366f1; padding-top: 15px; margin-top: 15px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280; font-size: 14px; }
        .terms { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; font-size: 14px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>📋 Professional Quote</h1>
        <p><strong>Date:</strong> ${new Date().toLocaleDateString('en-GB')}</p>
        <p><strong>Valid for:</strong> 30 days</p>
    </div>

    <div class="client-info">
        <h2 style="margin-top: 0; border: none; padding: 0;">Client Details</h2>
        <p><strong>Name:</strong> ${clientName}</p>
        <p><strong>Address:</strong> ${clientAddress}</p>
    </div>

    <div class="section">
        <h2>📦 Materials Required</h2>
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Unit</th>
                </tr>
            </thead>
            <tbody>
                ${calculationResults.materials.map(item => `
                    <tr>
                        <td>${item.item}</td>
                        <td>${item.quantity}</td>
                        <td>${item.unit}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
        ${calculationResults.summary ? `<p><em>${calculationResults.summary}</em></p>` : ''}
    </div>

    <div class="section">
        <h2>⏱️ Labour</h2>
        <p>Estimated Hours: <strong>${estimatedHours} hours</strong></p>
        <p>Rate: <strong>£${parseFloat(labourRate).toFixed(2)}/hour</strong></p>
    </div>

    ${notes ? `
    <div class="section">
        <h2>📝 Additional Notes</h2>
        <p>${notes}</p>
    </div>
    ` : ''}

    <div class="totals">
        <div class="totals-row">
            <span>Labour:</span>
            <span><strong>£${totals.labour.toFixed(2)}</strong></span>
        </div>
        <div class="totals-row">
            <span>Materials (inc. ${materialMarkup}% markup):</span>
            <span><strong>£${totals.materials.toFixed(2)}</strong></span>
        </div>
        <div class="totals-row">
            <span>Subtotal:</span>
            <span><strong>£${totals.subtotal.toFixed(2)}</strong></span>
        </div>
        <div class="totals-row">
            <span>VAT (20%):</span>
            <span><strong>£${totals.vat.toFixed(2)}</strong></span>
        </div>
        <div class="totals-row total-final">
            <span>TOTAL:</span>
            <span>£${totals.total.toFixed(2)}</span>
        </div>
    </div>

    <div class="terms">
        <p><strong>Payment Terms:</strong> 50% deposit required to commence work. Balance due on completion.</p>
        <p><strong>Validity:</strong> This quote is valid for 30 days from the date above.</p>
    </div>

    <div class="footer">
        <p><strong>Generated by TradeCalcs</strong> - Professional Quote Generator</p>
        <p>tradecalcs.co.uk</p>
    </div>
</body>
</html>
    `
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Generate Professional Quote</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {!showPreview ? (
          <div className="p-6">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 mb-6">
              <p className="text-sm text-blue-800">
                <strong>FREE Quote Generator</strong> - Turn your calculation into a professional quote in 2 minutes
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Client Name *</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="John Smith"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Client Address *</label>
                <textarea
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                  placeholder="123 High Street, London, SW1A 1AA"
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Labour Rate (£/hour) *</label>
                  <input
                    type="number"
                    value={labourRate}
                    onChange={(e) => setLabourRate(e.target.value)}
                    placeholder="50"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Hours *</label>
                  <input
                    type="number"
                    step="0.5"
                    value={estimatedHours}
                    onChange={(e) => setEstimatedHours(e.target.value)}
                    placeholder="8"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Material Markup (%)</label>
                <input
                  type="number"
                  value={materialMarkup}
                  onChange={(e) => setMaterialMarkup(e.target.value)}
                  placeholder="15"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">Typical range: 10-20%</p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Additional Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Work includes... Materials to be sourced from..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                />
              </div>

              <button
                onClick={generateQuote}
                disabled={!clientName || !clientAddress || !labourRate || !estimatedHours}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-lg font-bold transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Preview Quote
              </button>
            </div>
          </div>
        ) : (
          <div className="p-6">
            <div className="bg-green-50 border-l-4 border-green-600 p-4 mb-6">
              <p className="text-sm text-green-800">
                <strong>✓ Quote Ready!</strong> Review below and download as PDF
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="text-lg font-bold mb-4">Quote Summary</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Client:</span>
                  <span className="font-semibold">{clientName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Labour ({estimatedHours}h @ £{labourRate}/h):</span>
                  <span className="font-semibold">£{totals.labour.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Materials (+ {materialMarkup}% markup):</span>
                  <span className="font-semibold">£{totals.materials.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT (20%):</span>
                  <span className="font-semibold">£{totals.vat.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-purple-600 pt-2 border-t-2 border-gray-300">
                  <span>TOTAL:</span>
                  <span>£{totals.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={downloadPDF}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white py-3 rounded-lg font-bold transition flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download Quote (HTML)
              </button>

              <button
                onClick={() => setShowPreview(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 rounded-lg font-bold transition"
              >
                Edit Details
              </button>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                <p className="text-sm text-yellow-800 mb-2">
                  <strong>Want branded quotes with your logo?</strong>
                </p>
                <p className="text-xs text-yellow-700 mb-3">
                  Upgrade to TradeCalcs Pro for professional branding, email integration, and quote tracking
                </p>
                <a
                  href="/pro"
                  className="inline-block bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition"
                >
                  Learn More - £99/year
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
