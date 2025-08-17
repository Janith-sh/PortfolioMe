# Email Setup Guide for Portfolio Contact Form

## Overview
Your portfolio now supports sending emails through the contact form using Nodemailer and Gmail SMTP. When someone submits the contact form:

1. **Form data is saved to MongoDB database**
2. **Email notification is sent to your personal Gmail**
3. **Confirmation email is sent to the user** (optional)

## Gmail Setup Required

### Step 1: Enable 2-Factor Authentication
1. Go to your Google Account settings: https://myaccount.google.com/
2. Navigate to **Security** → **2-Step Verification**
3. Enable 2-Factor Authentication if not already enabled

### Step 2: Generate Gmail App Password
1. In Google Account settings, go to **Security**
2. Under "2-Step Verification", click **App passwords**
3. Select **Mail** as the app and **Other** as the device
4. Enter "Portfolio Contact Form" as the device name
5. Click **Generate** - you'll get a 16-character password
6. **Copy this password** - you'll need it for the `.env.local` file

### Step 3: Update Environment Variables
Update your `.env.local` file with your actual email credentials:

```bash
# Replace with your actual Gmail address
GMAIL_USER=your-actual-gmail@gmail.com

# Replace with the 16-character app password from Step 2
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop

# Replace with your personal email (where you want to receive contact forms)
PERSONAL_EMAIL=your-personal-email@gmail.com
```

## Email Templates

### 1. Contact Notification Email (Sent to You)
- **Subject:** Portfolio Contact: [User's Subject]
- **Contains:** Sender's name, email, subject, and message
- **Reply-To:** Set to sender's email for easy replies
- **Styling:** Professional HTML template with your branding

### 2. Confirmation Email (Sent to User)
- **Subject:** Thank you for your message!
- **Contains:** Acknowledgment and expected response time
- **Professional appearance** with link back to your portfolio

## Testing the Setup

### 1. Start your development server:
```bash
npm run dev
```

### 2. Navigate to the contact page:
http://localhost:3000/contact

### 3. Fill out and submit the form

### 4. Check your email for:
- Contact notification in your personal email
- No error messages in the terminal

## Troubleshooting

### Common Issues:

1. **"Invalid login" error:**
   - Make sure you're using the App Password, not your regular Gmail password
   - Verify 2-Factor Authentication is enabled

2. **"Connection timeout" error:**
   - Check your internet connection
   - Gmail SMTP might be blocked by your ISP/firewall

3. **Emails not being received:**
   - Check your spam/junk folder
   - Verify PERSONAL_EMAIL is correct in .env.local

### Error Handling:
- If email sending fails, the form submission still saves to database
- Users still see success message even if email fails
- Check server console for email error details

## Security Notes

1. **Never commit `.env.local` to git** - it contains sensitive credentials
2. **App Passwords are safer** than regular passwords for applications
3. **Email failures won't break** the contact form functionality
4. **Rate limiting** may be needed for production to prevent spam

## Production Deployment

For production deployment (Vercel, Netlify, etc.):

1. Add the same environment variables to your hosting platform
2. Update `NEXTAUTH_URL` to your production domain
3. Consider using a professional email service like SendGrid for higher reliability
4. Implement rate limiting and spam protection

## Files Modified/Created:

1. `/lib/email.js` - Email utility functions
2. `/app/api/contact/route.js` - Updated to send emails
3. `/.env.local` - Added email configuration
4. `/.env.local.example` - Updated with email variables

## Features Included:

✅ Professional HTML email templates  
✅ Automatic user confirmation emails  
✅ Reply-to functionality for easy responses  
✅ Error handling and fallback  
✅ Database storage + email notification  
✅ Mobile-responsive email templates  

Your contact form is now fully functional with email notifications!
