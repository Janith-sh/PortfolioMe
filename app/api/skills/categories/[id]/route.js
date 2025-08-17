import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import SkillCategory from '@/models/Skill';

// GET specific category
export async function GET(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    const category = await SkillCategory.findById(id);

    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      category,
    });

  } catch (error) {
    console.error('Error fetching category:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT - Update category (add/remove skills, update category name)
export async function PUT(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;
    const body = await request.json();
    const { category, items, order, action, skill } = body;

    const existingCategory = await SkillCategory.findById(id);

    if (!existingCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    // Handle different actions
    if (action === 'add-skill' && skill) {
      // Add a new skill to the category
      if (!skill.name) {
        return NextResponse.json(
          { error: 'Skill name is required' },
          { status: 400 }
        );
      }

      // Check if skill already exists in this category
      const skillExists = existingCategory.items.some(
        item => item.name.toLowerCase() === skill.name.toLowerCase()
      );

      if (skillExists) {
        return NextResponse.json(
          { error: 'Skill already exists in this category' },
          { status: 409 }
        );
      }

      existingCategory.items.push({
        name: skill.name,
        color: skill.color || 'bg-blue-500'
      });

    } else if (action === 'remove-skill' && skill) {
      // Remove a skill from the category
      existingCategory.items = existingCategory.items.filter(
        item => item.name !== skill.name
      );

    } else {
      // Update entire category
      if (category) existingCategory.category = category;
      if (items) existingCategory.items = items;
      if (order !== undefined) existingCategory.order = order;
    }

    const updatedCategory = await existingCategory.save();

    return NextResponse.json({
      success: true,
      category: updatedCategory,
    });

  } catch (error) {
    console.error('Error updating category:', error);
    
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

// DELETE category
export async function DELETE(request, { params }) {
  try {
    await connectToDatabase();

    const { id } = params;

    const deletedCategory = await SkillCategory.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Category deleted successfully',
    });

  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
