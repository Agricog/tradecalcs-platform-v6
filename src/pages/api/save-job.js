// Environment variables needed:
// SMARTSUITE_API_KEY
// SMARTSUITE_ACCOUNT_ID
// SMARTSUITE_APP_ID
// SENDGRID_API_KEY
// NEXT_PUBLIC_BASE_URL

const SMARTSUITE_API = 'https://app.smartsuite.com/api/v1';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { 
    calculatorType, 
    mode,
    jobName, 
    userName, 
    email, 
    notes, 
    inputs, 
    results 
  } = req.body;

  // Validation
  if (!jobName || !userName || !email) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Save to SmartSuite
    const smartsuiteResponse = await fetch(
      `${SMARTSUITE_API}/applications/${process.env.SMARTSUITE_APP_ID}/records/`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.SMARTSUITE_API_KEY}`,
          'Account-Id': process.env.SMARTSUITE_ACCOUNT_ID,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          calculator_type: calculatorType,
          job_name: jobName,
          user_name: userName,
          user_email: email,
          notes: notes || '',
          inputs: JSON.stringify(inputs),
          outputs: JSON.stringify(results),
          mode: mode || 'grossToNet',
          total_cost: results.grandTotal || 0,
          date_created: new Date().toISOString()
        })
      }
    );

    if (!smartsuiteResponse.ok) {
      const errorData = await smartsuiteResponse.text();
      console.error('SmartSuite error:', errorData);
      throw new Error('Failed to save to database');
    }

    const savedRecord = await smartsuiteResponse.json();

    // 2. Send email via SendGrid
    await sendEmail({
      to: email,
      subject: `Your CIS calculation is saved ✅`,
      userName,
      jobName,
      results,
      mode
    });

    return res.status(200).json({ 
      success: true,
      message: 'Job saved successfully',
      recordId: savedRecord.id
    });

  } catch (error) {
    console.error('Save job error:', error);
    return res.status(500).json({ 
      error: 'Failed to save job. Please try again.' 
    });
  }
}

async function sendEmail({ to, subject, userName, jobName, results, mode }) {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tradecalcs.co.uk';
  
  // Format results for email
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP'
    }).format(amount || 0);
  };

  let resultsSummary = '';
  if (mode === 'grossToNet') {
    resultsSummary = `
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Gross Labour:</td><td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(results.grossLabour)}</td></tr>
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Materials:</td><td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(results.materials)}</td></tr>
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">CIS Deduction:</td><td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right; color: #e53e3e;">-${formatCurrency(results.cisDeduction)}</td></tr>
      <tr><td style="padding: 8px; border-bottom: 2px solid #333; font-weight: bold;">Total to Pay:</td><td style="padding: 8px; border-bottom: 2px solid #333; text-align: right; font-weight: bold;">${formatCurrency(results.grandTotal)}</td></tr>
      <tr><td style="padding: 8px;">CIS to HMRC:</td><td style="padding: 8px; text-align: right; color: #2563eb;">${formatCurrency(results.hmrcPayment)}</td></tr>
    `;
  } else {
    resultsSummary = `
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Net Labour Required:</td><td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(results.netLabour)}</td></tr>
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Required Gross Labour:</td><td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(results.requiredGrossLabour)}</td></tr>
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee;">Materials:</td><td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">${formatCurrency(results.materials)}</td></tr>
      <tr><td style="padding: 8px; border-bottom: 2px solid #333; font-weight: bold;">Invoice Amount:</td><td style="padding: 8px; border-bottom: 2px solid #333; text-align: right; font-weight: bold;">${formatCurrency(results.invoiceAmount)}</td></tr>
      <tr><td style="padding: 8px;">CIS to HMRC:</td><td style="padding: 8px; text-align: right; color: #2563eb;">${formatCurrency(results.hmrcPayment)}</td></tr>
    `;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 24px;">TradeCalcs</h1>
        <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Your CIS calculation is saved ✅</p>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <h2 style="margin-top: 0; color: #1f2937;">Hi ${userName},</h2>
        
        <p>Your CIS calculation for "<strong>${jobName}</strong>" has been saved successfully!</p>
        
        <h3 style="color: #374151; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">Calculation Summary</h3>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          ${resultsSummary}
        </table>
        
        <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0 0 10px 0; font-weight: 600;">View all your saved jobs:</p>
          <a href="${baseUrl}/my-jobs?email=${encodeURIComponent(to)}" 
             style="display: inline-block; background: #667eea; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500;">
            View My Jobs
          </a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 8px; color: white;">
          <h3 style="margin-top: 0; color: white;">Want unlimited saves + pricing intelligence?</h3>
          <p style="margin: 10px 0;">TradeCalcs Pro gives you:</p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Unlimited saved jobs</li>
            <li>Pattern comparison (see your pricing trends)</li>
            <li>Monthly CIS reports</li>
            <li>Weekly email digests</li>
          </ul>
          <p style="margin: 15px 0 10px 0;"><strong>Only £14/month</strong></p>
          <a href="${baseUrl}/upgrade" 
             style="display: inline-block; background: white; color: #667eea; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin-top: 10px;">
            Upgrade to Pro
          </a>
        </div>
        
        <p style="margin-top: 30px; font-size: 14px; color: #6b7280;">
          Questions? Reply to this email or visit <a href="${baseUrl}" style="color: #667eea;">TradeCalcs.co.uk</a>
        </p>
      </div>
    </body>
    </html>
  `;

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${sendgridApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      personalizations: [{
        to: [{ email: to }],
        subject: subject
      }],
      from: {
        email: 'noreply@tradecalcs.co.uk',
        name: 'TradeCalcs'
      },
      content: [{
        type: 'text/html',
        value: htmlContent
      }]
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error('SendGrid error:', errorText);
    throw new Error('Failed to send email');
  }

  return response;
}
