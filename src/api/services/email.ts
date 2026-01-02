import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = 'quotes@tradecalcs.co.uk';
const FROM_NAME = 'TradeCalcs';

interface WholesalerQuoteEmailParams {
  to: string;
  wholesalerName: string;
  projectName: string;
  accountNumber?: string;
  quoteUrl: string;
  materialCount: number;
}

interface QuotePricedNotificationParams {
  to: string;
  electricianName: string;
  wholesalerName: string;
  projectName: string;
  discountPercent: number;
  projectUrl: string;
}

export async function sendWholesalerQuoteEmail(params: WholesalerQuoteEmailParams) {
  const { to, wholesalerName, projectName, accountNumber, quoteUrl, materialCount } = params;

  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [to],
      subject: `Quote Request: ${projectName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Quote Request</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="margin-top: 0;">Hi ${wholesalerName},</p>
            
            <p>You've received a quote request for <strong>${materialCount} items</strong>.</p>
            
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>Project:</strong> ${projectName}</p>
              ${accountNumber ? `<p style="margin: 0;"><strong>Account Number:</strong> ${accountNumber}</p>` : ''}
            </div>
            
            <p>Click the button below to view the materials list and apply your customer's account discount:</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${quoteUrl}" style="background: #7c3aed; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">View Quote Request</a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px;">This link expires in 7 days. No login required.</p>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #6b7280; font-size: 12px; margin-bottom: 0;">
              Sent via <a href="https://tradecalcs.co.uk" style="color: #7c3aed;">TradeCalcs</a> - Professional tools for UK electricians
            </p>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send wholesaler quote email:', error);
      return { success: false, error };
    }

    console.log('Wholesaler quote email sent:', data?.id);
    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}

export async function sendQuotePricedNotification(params: QuotePricedNotificationParams) {
  const { to, electricianName, wholesalerName, projectName, discountPercent, projectUrl } = params;

  try {
    const { data, error } = await resend.emails.send({
      from: `${FROM_NAME} <${FROM_EMAIL}>`,
      to: [to],
      subject: `${wholesalerName} has priced your quote - ${projectName}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Quote Priced! ✓</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <p style="margin-top: 0;">Hi${electricianName ? ` ${electricianName}` : ''},</p>
            
            <p>Great news! <strong>${wholesalerName}</strong> has priced your quote request.</p>
            
            <div style="background: white; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; text-align: center;">
              <p style="margin: 0 0 10px 0; color: #6b7280;">Project</p>
              <p style="margin: 0 0 20px 0; font-size: 18px; font-weight: 600;">${projectName}</p>
              <p style="margin: 0 0 5px 0; color: #6b7280;">Discount Applied</p>
              <p style="margin: 0; font-size: 36px; font-weight: 700; color: #10b981;">${discountPercent}%</p>
            </div>
            
            <p>You can now create a customer quote with the priced materials.</p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${projectUrl}" style="background: #7c3aed; color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block;">View Project</a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <p style="color: #6b7280; font-size: 12px; margin-bottom: 0;">
              Sent via <a href="https://tradecalcs.co.uk" style="color: #7c3aed;">TradeCalcs</a> - Professional tools for UK electricians
            </p>
          </div>
        </body>
        </html>
      `,
    });

    if (error) {
      console.error('Failed to send quote priced notification:', error);
      return { success: false, error };
    }

    console.log('Quote priced notification sent:', data?.id);
    return { success: true, id: data?.id };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}
