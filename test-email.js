// test-email.js - Simple test script for email functionality
const testEmailFunctionality = async () => {
  const testData = {
    name: 'Test User',
    email: 'test@example.com',
    subject: 'Test Email from Portfolio',
    message: 'This is a test message to verify email functionality is working correctly.'
  };

  try {
    console.log('🧪 Testing contact form API with email...');
    
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Contact form API test successful!');
      console.log('Response:', result);
      console.log('\n📧 Check your email for:');
      console.log('1. Contact notification email');
      console.log('2. No error messages in server console');
    } else {
      console.error('❌ Contact form API test failed:');
      console.error('Status:', response.status);
      console.error('Error:', result);
    }
    
  } catch (error) {
    console.error('❌ Network error during test:', error.message);
    console.log('\n🔍 Make sure:');
    console.log('1. Development server is running (npm run dev)');
    console.log('2. Server is accessible at http://localhost:3000');
  }
};

// Add some delay to ensure server is ready
setTimeout(testEmailFunctionality, 2000);
