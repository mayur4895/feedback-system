# College Feedback System - Quick Start Guide

## How to Use the System

### For Students

1. **Register/Login**
   - Go to `/register` or `/login`
   - Sign up as a **STUDENT** (select student role during registration)
   - Login with your credentials

2. **Submit Feedback**
   - Click the **"+ Submit New Feedback"** button on your dashboard
   - Fill in the form:
     - **Category**: Choose from Teaching, Curriculum, Facilities, Campus Life, Administration, or Other
     - **Rating**: Rate 1-5 stars
     - **Title**: Brief title for your feedback
     - **Message**: Detailed feedback/suggestion
   - Click **"Submit Feedback"**
   - You'll see a success message

3. **View Your Feedback History**
   - See all your submitted feedback below the form
   - Check the status: **Pending**, **Reviewed**, or **Resolved**
   - View admin responses in your feedback list

### For Admins

1. **Register/Login as Admin**
   - Go to `/register`
   - Sign up with **ADMIN** role
   - Login with admin credentials

2. **Review All Feedback**
   - Admin dashboard shows **all student feedback** from the entire college
   - View statistics:
     - Total Feedback count
     - Pending (not yet reviewed)
     - Reviewed (seen but not resolved)
     - Resolved (action taken)

3. **Manage Feedback**
   - Click any feedback in the list to select it
   - Update the **Status**:
     - Pending → Reviewed → Resolved
   - Add **Admin Notes** (e.g., what action was taken)
   - Click **"Update Feedback"** to save

4. **Filter Feedback**
   - Use the dropdown to filter by status
   - See only Pending, Reviewed, or Resolved feedback

## Key Features

- **Role-Based Access**: Students see only their feedback, Admins see all
- **Feedback Tracking**: Each feedback has a clear lifecycle
- **Categories**: Organized feedback by topic
- **Ratings**: 1-5 star system for quick assessment
- **Admin Notes**: Admins can respond to and track actions on feedback

## Test Scenario

1. Create 2 accounts:
   - User1 (STUDENT)
   - User2 (ADMIN)

2. Login as User1 (Student):
   - Submit 2-3 pieces of feedback with different ratings
   - See them appear in your history

3. Login as User2 (Admin):
   - See all feedback from all students
   - Click on feedback to review
   - Change status to "Reviewed"
   - Add admin notes
   - Update the feedback

4. Login as User1 again:
   - See your feedback status has changed
   - Check if admin notes are visible

This workflow demonstrates the full feedback cycle!
