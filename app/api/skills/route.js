import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import SkillCategory from '@/models/Skill';

// GET all skill categories with their skills
export async function GET(request) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const limit = parseInt(searchParams.get('limit')) || 50;
    const page = parseInt(searchParams.get('page')) || 1;

    // Build query
    let query = {};
    if (category) {
      query.category = { $regex: category, $options: 'i' };
    }

    // Execute query with pagination and sorting
    const skillCategories = await SkillCategory.find(query)
      .sort({ order: 1, createdAt: 1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const totalCategories = await SkillCategory.countDocuments(query);

    return NextResponse.json({
      success: true,
      skillCategories,
      pagination: {
        page,
        limit,
        total: totalCategories,
        pages: Math.ceil(totalCategories / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching skill categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST new skill category
export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { category, items = [], order = 0 } = body;

    if (!category) {
      return NextResponse.json(
        { error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Check if category already exists
    const existingCategory = await SkillCategory.findOne({ 
      category: { $regex: `^${category}$`, $options: 'i' }
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category already exists' },
        { status: 409 }
      );
    }

    const skillCategory = new SkillCategory({
      category,
      items,
      order
    });

    const savedCategory = await skillCategory.save();

    return NextResponse.json({
      success: true,
      skillCategory: savedCategory,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating skill category:', error);
    
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}