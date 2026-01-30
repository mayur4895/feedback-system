# College Feedback System - Setup Guide

A smart feedback management system for colleges where students can submit feedback and admins can review and respond.

## Features

- **Student Login/Register**: Students can create accounts and login
- **Admin Login/Register**: Admins can manage and review all feedback
- **Feedback Submission**: Students can submit feedback with categories, ratings, and detailed messages
- **Feedback Management**: Admins can review, update status, and add notes to feedback
- **Dashboard**: Both students and admins have personalized dashboards with statistics
- **Real-time Updates**: Uses MongoDB for persistent data storage

## Prerequisites

- Node.js 18+ 
- MongoDB (local or cloud instance like MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone or download the project**

2. **Install dependencies**
```bash
npm install
```

3. **Setup Environment Variables**
   - Copy `.env.local.example` to `.env.local`
   - Update the values with your MongoDB connection string and a secure JWT secret:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/feedback-system
JWT_SECRET=your-very-secure-random-string
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
   - Navigate to `http://localhost:3000`

## Getting Started

### For Students:
1. Click "Register" on the landing page
2. Select "Student" as your role
3. Fill in your details and create an account
4. Go to your dashboard to submit feedback
5. Track the status of your submissions

### For Admins:
1. Click "Register" on the landing page
2. Select "Admin" as your role
3. Fill in your details and create an account
4. Go to your dashboard to review student feedback
5. Update status and add admin notes

## Database Schema

### Users Collection
- `email`: User email (unique)
- `password`: Hashed password using bcryptjs
- `name`: User full name
- `role`: "student" or "admin"
- `createdAt`: Timestamp

### Feedback Collection
- `studentId`: Reference to User ID
- `studentName`: Student's name
- `studentEmail`: Student's email
- `category`: Category of feedback (teaching, curriculum, facilities, campus-life, administration, other)
- `rating`: 1-5 star rating
- `title`: Brief title
- `message`: Detailed feedback
- `status`: pending, reviewed, or resolved
- `adminNotes`: Admin response/notes
- `createdAt`: Timestamp

## Key Technologies

- **Next.js 16**: React framework with App Router
- **MongoDB**: NoSQL database for data persistence
- **shadcn/ui**: Beautiful UI components
- **Tailwind CSS**: Utility-first CSS framework
- **JWT**: Secure authentication
- **bcryptjs**: Password hashing

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Feedback
- `POST /api/feedback` - Submit feedback (students)
- `GET /api/feedback` - Get feedback (students get their own, admins get all)
- `PATCH /api/feedback/[id]` - Update feedback status and notes (admins only)

## Troubleshooting

**MongoDB Connection Error**
- Verify your MongoDB connection string in `.env.local`
- Check if MongoDB is running (for local) or if your IP is whitelisted (for MongoDB Atlas)

**Authentication Issues**
- Clear cookies and try logging in again
- Ensure JWT_SECRET is set in environment variables

**Port Already in Use**
- Change the port: `npm run dev -- -p 3001`

## Future Enhancements

- Email notifications for feedback updates
- Advanced analytics and reports
- Feedback categories management
- User profile management
- Bulk export feedback data
- Search and filtering improvements
