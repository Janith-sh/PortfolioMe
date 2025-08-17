import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Contact from '@/models/Contact';
import { sendContactEmail, sendConfirmationEmail } from '@/lib/email';

export async function POST(request) {
  try {
    // Connect to database
    await connectToDatabase();

    // Parse request body
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Create new contact entry
    const contact = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
    });

    // Save to database
    await contact.save();

    // Send email notification to you
    try {
      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      console.log('Contact notification email sent successfully');
    } catch (emailError) {
      console.error('Failed to send contact notification email:', emailError);
      // Continue execution even if email fails
    }

    // Send confirmation email to the user (optional)
    try {
      await sendConfirmationEmail({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
      });
      console.log('Confirmation email sent to user');
    } catch (confirmationError) {
      console.error('Failed to send confirmation email:', confirmationError);
      // Continue execution even if confirmation email fails
    }

    return NextResponse.json(
      { 
        success: true,
        message: 'Contact form submitted successfully and email sent',
        contactId: contact._id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Contact form submission error:', error);

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve all contacts (for admin purposes)
export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const page = parseInt(searchParams.get('page')) || 1;

    // Build query
    let query = {};
    if (status) {
      query.status = status;
    }

    // Execute query with pagination
    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const totalContacts = await Contact.countDocuments(query);

    return NextResponse.json({
      success: true,
      contacts,
      pagination: {
        page,
        limit,
        total: totalContacts,
        pages: Math.ceil(totalContacts / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
