import nodemailer from 'nodemailer';

// SMTP Configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const emailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to the Sacred Circle</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050505; font-family: 'Lora', Georgia, serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #050505; min-height: 100vh;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width: 600px; background: linear-gradient(135deg, #0D0D0D 0%, #050505 100%); border: 1px solid rgba(200, 162, 93, 0.2);">

          <!-- Header -->
          <tr>
            <td align="center" style="padding: 50px 40px 30px 40px;">
              <h1 style="font-family: Georgia, serif; font-size: 28px; letter-spacing: 0.3em; color: #C8A25D; margin: 0; font-weight: normal;">FIRAELI</h1>
            </td>
          </tr>

          <!-- Gold Divider -->
          <tr>
            <td align="center" style="padding: 0 40px;">
              <div style="width: 60px; height: 1px; background-color: #C8A25D;"></div>
            </td>
          </tr>

          <!-- Welcome Label -->
          <tr>
            <td align="center" style="padding: 30px 40px 15px 40px;">
              <p style="font-family: Arial, sans-serif; font-size: 11px; letter-spacing: 0.4em; text-transform: uppercase; color: rgba(200, 162, 93, 0.7); margin: 0;">
                Welcome to the Sacred Circle
              </p>
            </td>
          </tr>

          <!-- Main Title -->
          <tr>
            <td align="center" style="padding: 0 40px;">
              <h1 style="font-family: Georgia, serif; font-size: 42px; letter-spacing: 0.15em; color: #F5F5F0; margin: 0; line-height: 1;">
                Your Flame
              </h1>
            </td>
          </tr>

          <!-- Subtitle -->
          <tr>
            <td align="center" style="padding: 10px 40px 30px 40px;">
              <h2 style="font-family: Georgia, serif; font-size: 32px; letter-spacing: 0.1em; color: #C8A25D; margin: 0; line-height: 1;">
                Awaits
              </h2>
            </td>
          </tr>

          <!-- Gold Divider -->
          <tr>
            <td align="center" style="padding: 0 40px 30px 40px;">
              <div style="width: 60px; height: 1px; background-color: #C8A25D;"></div>
            </td>
          </tr>

          <!-- Main Message -->
          <tr>
            <td style="padding: 0 50px 30px 50px;">
              <p style="font-family: Georgia, serif; font-size: 16px; line-height: 1.85; color: #E8C6B0; margin: 0; text-align: center;">
                You've entered the portal. The sacred space where light meets intention, where ritual becomes revolution.
              </p>
            </td>
          </tr>

          <!-- What's Coming Section -->
          <tr>
            <td style="padding: 0 50px 40px 50px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: rgba(200, 162, 93, 0.05); border-left: 2px solid #C8A25D;">
                <tr>
                  <td style="padding: 25px 30px;">
                    <p style="font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #C8A25D; margin: 0 0 15px 0;">
                      What Awaits You
                    </p>
                    <p style="font-family: Georgia, serif; font-size: 14px; line-height: 2; color: rgba(232, 198, 176, 0.85); margin: 0;">
                      <span style="color: #C8A25D;">&#10043;</span> Early access to limited-edition releases<br>
                      <span style="color: #C8A25D;">&#10043;</span> Exclusive rituals & archetype guides<br>
                      <span style="color: #C8A25D;">&#10043;</span> Sacred Circle member pricing<br>
                      <span style="color: #C8A25D;">&#10043;</span> First look at new collections
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Mantra -->
          <tr>
            <td align="center" style="padding: 0 40px 40px 40px;">
              <p style="font-family: Georgia, serif; font-size: 14px; font-style: italic; color: rgba(232, 198, 176, 0.45); letter-spacing: 0.03em; margin: 0;">
                My pleasure is holy. My light is safe to shine.
              </p>
            </td>
          </tr>

          <!-- Footer Divider -->
          <tr>
            <td style="padding: 0 40px;">
              <div style="width: 100%; height: 1px; background: linear-gradient(to right, transparent, rgba(200, 162, 93, 0.3), transparent);"></div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 30px 40px 40px 40px;">
              <p style="font-family: Arial, sans-serif; font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(200, 162, 93, 0.5); margin: 0 0 15px 0;">
                FIRAELI
              </p>
              <p style="font-family: Georgia, serif; font-size: 12px; color: rgba(232, 198, 176, 0.35); margin: 0;">
                We honor your inbox as sacred space.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    // Send confirmation email to subscriber
    await transporter.sendMail({
      from: `"FIRAELI" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: email,
      subject: 'Welcome to the Sacred Circle',
      text: 'Welcome to FIRAELI\'s Sacred Circle. Your flame awaits.',
      html: emailHtml,
    });

    // Send notification email to Kari
    await transporter.sendMail({
      from: `"FIRAELI" <${process.env.SMTP_FROM || process.env.SMTP_USER}>`,
      to: 'kari@firaeli.com',
      subject: 'New Sacred Circle Subscriber',
      text: `New subscriber: ${email}`,
      html: `
        <div style="font-family: Georgia, serif; padding: 30px; background-color: #050505; color: #F5F5F0;">
          <h2 style="color: #C8A25D; font-weight: normal; letter-spacing: 0.2em;">New Subscriber</h2>
          <p style="color: #E8C6B0; font-size: 16px;">A new soul has joined the Sacred Circle:</p>
          <p style="color: #C8A25D; font-size: 18px; padding: 15px; background: rgba(200, 162, 93, 0.1); border-left: 2px solid #C8A25D;">${email}</p>
          <p style="color: rgba(232, 198, 176, 0.6); font-size: 14px; margin-top: 30px;">— FIRAELI</p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({
      error: error.message,
      code: error.code,
      command: error.command
    });
  }
}
