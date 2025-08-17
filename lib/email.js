// lib/email.js - Email utility functions using Nodemailer
import nodemailer from 'nodemailer';

// Create reusable transporter object using Gmail SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not regular password)
    },
  });
};

// Send contact form email
export const sendContactEmail = async ({ name, email, subject, message }) => {
  try {
    const transporter = createTransporter();

    // Email template for contact form
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #334155, #3b82f6);
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .content {
            background: #f8fafc;
            padding: 20px;
            border-radius: 0 0 10px 10px;
            border: 1px solid #e2e8f0;
          }
          .field {
            margin-bottom: 15px;
            padding: 10px;
            background: white;
            border-radius: 5px;
            border-left: 4px solid #3b82f6;
          }
          .field-label {
            font-weight: bold;
            color: #334155;
            margin-bottom: 5px;
          }
          .field-value {
            color: #64748b;
          }
          .message-content {
            background: white;
            padding: 15px;
            border-radius: 5px;
            border: 1px solid #e2e8f0;
            margin-top: 10px;
            white-space: pre-wrap;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            padding: 10px;
            color: #64748b;
            font-size: 12px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🚀 New Contact Form Submission</h1>
          <p>Someone reached out through your portfolio website!</p>
        </div>
        
        <div class="content">
          <div class="field">
            <div class="field-label">👤 Name:</div>
            <div class="field-value">${name}</div>
          </div>
          
          <div class="field">
            <div class="field-label">📧 Email:</div>
            <div class="field-value">
              <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">
                ${email}
              </a>
            </div>
          </div>
          
          <div class="field">
            <div class="field-label">📝 Subject:</div>
            <div class="field-value">${subject}</div>
          </div>
          
          <div class="field">
            <div class="field-label">💬 Message:</div>
            <div class="message-content">${message}</div>
          </div>
        </div>
        
        <div class="footer">
          <p>This email was sent from your portfolio contact form</p>
          <p>Received on ${new Date().toLocaleString()}</p>
        </div>
      </body>
      </html>
    `;

    // Plain text version for email clients that don't support HTML
    const textContent = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from your portfolio contact form
Received on ${new Date().toLocaleString()}
    `;

    // Email options
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.PERSONAL_EMAIL || process.env.GMAIL_USER, // Your personal email
      subject: `Portfolio Contact: ${subject}`,
      text: textContent,
      html: htmlTemplate,
      replyTo: email, // Allow you to reply directly to the sender
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);
    return {
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully'
    };

  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

// Send confirmation email to the user (optional)
export const sendConfirmationEmail = async ({ name, email, subject }) => {
  try {
    const transporter = createTransporter();

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Message</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #334155, #3b82f6);
            color: white;
            padding: 20px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .content {
            background: #f8fafc;
            padding: 20px;
            border-radius: 0 0 10px 10px;
            border: 1px solid #e2e8f0;
          }
          .cta-button {
            display: inline-block;
            background: linear-gradient(135deg, #334155, #3b82f6);
            color: white;
            padding: 12px 24px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 15px;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>✅ Thank You!</h1>
          <p>Your message has been received</p>
        </div>
        
        <div class="content">
          <p>Hi ${name},</p>
          
          <p>Thank you for reaching out through my portfolio! I've received your message regarding "<strong>${subject}</strong>" and I appreciate you taking the time to contact me.</p>
          
          <p>I typically respond to inquiries within 24-48 hours. I'll get back to you as soon as possible via this email address.</p>
          
          <p>In the meantime, feel free to check out my latest projects and updates on my portfolio.</p>
          
          <p>Best regards,<br>
          <strong>Janith S Viduranga</strong></p>
          
          <p>
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}" class="cta-button">
              Visit My Portfolio
            </a>
          </p>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Janith S Viduranga" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: 'Thank you for your message!',
      html: htmlTemplate,
    };

    const info = await transporter.sendMail(mailOptions);
    
    console.log('Confirmation email sent:', info.messageId);
    return {
      success: true,
      messageId: info.messageId
    };

  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw error here as confirmation email is optional
    return {
      success: false,
      error: error.message
    };
  }
};
