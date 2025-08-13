# Portfolio API Setup

This document describes how to set up and use the backend API for the portfolio application.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)

## Environment Setup

1. Create a `.env.local` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
```

For MongoDB Atlas, use:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
```

## Database Setup

### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. The database will be created automatically when the app runs

### Option 2: MongoDB Atlas
1. Create a MongoDB Atlas account
2. Create a new cluster
3. Get the connection string and update the MONGODB_URI in `.env.local`

## Seeding the Database

To populate the database with sample data:

```bash
npm run seed
```

## API Endpoints

### Contact API
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts (admin)

### Projects API
- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `GET /api/projects/[id]` - Get specific project
- `PUT /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project

## Query Parameters

### Projects
- `status` - Filter by status ('Completed', 'In Progress', 'On Hold')
- `featured` - Filter featured projects (true/false)
- `limit` - Number of results (default: 20)
- `page` - Page number (default: 1)

### Contact
- `status` - Filter by status ('new', 'read', 'replied')
- `limit` - Number of results (default: 50)
- `page` - Page number (default: 1)

## Running the Application

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (`.env.local`)

3. Seed the database (optional):
```bash
npm run seed
```

4. Start the development server:
```bash
npm run dev
```

## Project Structure

```
├── app/
│   ├── api/
│   │   ├── contact/
│   │   │   └── route.js
│   │   └── projects/
│   │       ├── route.js
│   │       └── [id]/
│   │           └── route.js
├── lib/
│   └── mongodb.js
├── models/
│   ├── Contact.js
│   └── Project.js
├── utils/
│   └── api.js
└── scripts/
    └── seedDatabase.js
```

## Features

- **MongoDB Integration** - Full CRUD operations for projects and contact forms
- **Data Validation** - Mongoose schemas with validation
- **Error Handling** - Comprehensive error handling and user feedback
- **API Utilities** - Centralized API calls with error handling
- **Database Seeding** - Easy setup with sample data
- **Environment Configuration** - Secure environment variable management

## Security Notes

- Never commit `.env.local` to version control
- Use strong passwords for MongoDB Atlas
- Consider implementing authentication for admin endpoints
- Validate and sanitize all user inputs
