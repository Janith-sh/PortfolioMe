import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import SkillCategory from '@/models/Skill';

// GET all categories (simplified list)
export async function GET() {
  try {
    await connectToDatabase();

    const categories = await SkillCategory.find({}, 'category order')
      .sort({ order: 1, createdAt: 1 });

    return NextResponse.json({
      success: true,
      categories,
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST new category
export async function POST(request) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { category, order = 0 } = body;

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
      items: [],
      order
    });

    const savedCategory = await skillCategory.save();

    return NextResponse.json({
      success: true,
      category: savedCategory,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating category:', error);
    
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