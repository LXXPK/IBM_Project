# EventSphere : A comprehensive system for organizing events.

## About the Application  

This project is a robust **Authentication System** designed to securely manage user and admin access, with distinct roles and functionalities. It allows users to register for events, view their registrations, and check in using QR codes, while admins can manage events, verify participants, and maintain system integrity.  

## Features  

### User Authentication  
- **Users**  
  - Register and log in to their accounts.  
  - View registered events and associated QR codes.  
- **Admins**  
  - Log in to access the admin dashboard.  
  - Manage events by posting and verifying participant QR codes.  

### Role Separation  
- Implemented **role-based access control** to restrict users from accessing admin features and vice versa.  

### Security  
- **Passwords**: Hashed using **bcrypt** for enhanced security.  
- **Session Handling**: Secured with **JSON Web Tokens (JWT)**.  
- **Middleware**: Verifies and authorizes roles effectively.  

## User Features  
1. **Register for Events**  
   - Users can register for events and receive a unique QR code.  
2. **View Registered Events**  
   - Users can see the list of events they have signed up for.  
3. **Check-in for Events**  
   - Users verify attendance using their QR codes.  

## Admin Features  
1. **Event Management**  
   - Create, edit, and delete events.  
   - View event details, including participants.  
2. **QR Code Verification**  
   - Verify participants' QR codes for event check-ins.  

## Tech Stack  
- **Frontend**: React.js  
- **Backend**: Node.js with Express.js  
- **Authentication**: JSON Web Tokens (JWT)  
- **Database**: MongoDB  
- **Security**: bcrypt for password hashing  
