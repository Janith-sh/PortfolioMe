import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Project from '@/models/Project';

// GET all projects
export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit')) || 20;
    const page = parseInt(searchParams.get('page')) || 1;

    // Build query
    let query = {};
    if (status) {
      query.status = status;
    }
    if (featured !== null && featured !== undefined) {
      query.featured = featured === 'true';
    }

    // Execute query with pagination
    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const totalProjects = await Project.countDocuments(query);

    return NextResponse.json({
      success: true,
      projects,
      pagination: {
        page,
        limit,
        total: totalProjects,
        pages: Math.ceil(totalProjects / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST new project
export async function POST(request) {
  try {
    await connectToDatabase();

    const { title, description, link, technologies, image, status, featured } = await request.json();

    // Validate required fields
    if (!title || !description || !link) {
      return NextResponse.json(
        { error: 'Title, description, and link are required' },
        { status: 400 }
      );
    }

    // Create new project
    const project = new Project({
      title: title.trim(),
      description: description.trim(),
      link: link.trim(),
      technologies: technologies || [],
      image: image || '/project-placeholder.jpg',
      status: status || 'In Progress',
      featured: featured || false,
    });

    await project.save();

    return NextResponse.json(
      { 
        success: true,
        message: 'Project created successfully',
        project 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Project creation error:', error);

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
