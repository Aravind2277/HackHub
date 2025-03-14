# HackHub
Hack Hub is a online website to conduct Hackathons Virtually.
Hack Hub is an online platform for organizing and participating in hackathons. It offers features like team collaboration, project submission, real-time judging, and live leaderboards. Organizers can manage events seamlessly, while participants can showcase their skills, network, and compete for prizes. Ideal for tech communities, universities, and companies.
It have four dashboards. They are login or register page,organiser dashboard,participant dashboard and finally judge dashboard.

# Hackathon Management Platform

A full-stack web application for organizing and managing hackathons, featuring separate interfaces for organizers, participants, and judges.

## 📋 Table of Contents
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Dependencies](#-dependencies)
- [Project Structure](#️-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [Security](#-security)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [License](#-license)
- [Contact](#-contact)

## 🚀 Features

### User Authentication & Authorization
- Secure login and registration system
- Role-based access control (Organizers, Participants, Judges)
- JWT-based authentication
- Password encryption with bcrypt
- Session management with cookies

### Dashboard Interface
- Customized views for different user roles
- Real-time updates using Socket.IO
- Interactive UI components
- Responsive design for mobile devices
- Dark/Light theme support

### Hackathon Management
- Create and manage hackathon events
- Team formation and management
- Project submission system
- Judging and evaluation system
- Real-time scoring updates
- File upload support for project submissions
- Deadline management system
- Email notifications for important updates

### Analytics & Reporting
- Participant statistics
- Team performance metrics
- Event analytics dashboard
- Exportable reports in multiple formats
- Historical data tracking

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript
- EJS (Embedded JavaScript templates)
- Static assets management
- Responsive design
- Bootstrap for UI components
- Socket.IO client for real-time features
- Chart.js for analytics visualization

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Socket.IO for real-time features
- JWT for authentication
- Multer for file uploads
- Nodemailer for email notifications
- Winston for logging
- PM2 for process management

## 📦 Dependencies

### Backend Dependencies
- bcryptjs: ^2.4.3 - Password hashing
- cookie-parser: ^1.4.7 - Cookie handling
- cors: ^2.8.5 - Cross-Origin Resource Sharing
- dotenv: ^16.4.5 - Environment variables
- ejs: ^3.1.10 - Template engine
- express: ^4.21.2 - Web framework
- express-ejs-layouts: ^2.5.1 - Layout support
- jsonwebtoken: ^9.0.0 - JWT authentication
- mongoose: ^8.10.1 - MongoDB ODM
- multer: ^1.4.5-lts.1 - File upload
- socket.io: ^4.8.1 - Real-time communication

### Development Dependencies
- nodemon: ^3.1.9 - Development server
- jest: ^29.0.0 - Testing framework
- supertest: ^6.0.0 - HTTP testing
- eslint: ^8.0.0 - Code linting
- prettier: ^2.0.0 - Code formatting

## 🗂️ Project Structure

```
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   ├── js/
│   │   └── images/
│   ├── pages/
│   │   ├── dashboard/
│   │   ├── hackathons/
│   │   └── profile/
│   ├── views/
│   │   ├── partials/
│   │   └── layouts/
│   └── index.html
│
├── backend/
│   ├── middleware/
│   │   ├── auth/
│   │   └── validation/
│   ├── models/
│   │   ├── User.js
│   │   ├── Hackathon.js
│   │   └── Team.js
│   ├── routes/
│   │   ├── auth/
│   │   ├── api/
│   │   └── views/
│   ├── scripts/
│   ├── uploads/
│   ├── tests/
│   ├── config/
│   ├── server.js
│   └── package.json
```

## 🚀 Getting Started

1. **Prerequisites**
   - Node.js (v14 or higher)
   - MongoDB (v4.4 or higher)
   - npm or yarn package manager

2. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd hackathon-platform
   ```

3. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies (if applicable)
   cd ../frontend
   npm install
   ```

4. **Environment Setup**
   - Create a `.env` file in the backend directory
   - Add the following configurations:
     ```env
     # Server Configuration
     PORT=3000
     NODE_ENV=development

     # Database Configuration
     MONGODB_URI=<your-mongodb-uri>

     # Authentication
     JWT_SECRET=<your-jwt-secret>
     JWT_EXPIRE=24h

     # Email Configuration (optional)
     SMTP_HOST=<smtp-host>
     SMTP_PORT=<smtp-port>
     SMTP_USER=<smtp-user>
     SMTP_PASS=<smtp-password>
     ```

5. **Database Setup**
   ```bash
   # Run database migrations (if applicable)
   npm run migrate
   
   # Seed initial data (if applicable)
   npm run seed
   ```

6. **Start the application**
   ```bash
   # Start backend server
   cd backend
   npm start

   # Start frontend development server (if applicable)
   cd frontend
   npm start
   ```

7. **Access the application**
   - Backend API: `http://localhost:3000`
   - Frontend: `http://localhost:3000` (or configured port)

## 🔐 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

### Hackathon Management
- `GET /api/hackathons` - List all hackathons
- `POST /api/hackathons` - Create new hackathon
- `GET /api/hackathons/:id` - Get hackathon details
- `PUT /api/hackathons/:id` - Update hackathon
- `DELETE /api/hackathons/:id` - Delete hackathon

### User Management
- `GET /api/users` - List all users
- `GET /api/users/:id` - Get user details
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Team Management
- `POST /api/teams` - Create team
- `GET /api/teams/:id` - Get team details
- `PUT /api/teams/:id` - Update team
- `DELETE /api/teams/:id` - Delete team

## 🔒 Security

- JWT-based authentication
- Password hashing using bcrypt
- CORS protection
- Rate limiting
- XSS protection
- CSRF protection
- Secure HTTP headers
- Input validation
- File upload validation

## 🧪 Testing

```bash
# Run all tests
npm test

# Run specific test suite
npm test -- --grep "Auth Tests"

# Generate coverage report
npm run test:coverage
```

## 📦 Deployment

### Production Setup
1. Configure production environment variables
2. Build frontend assets
3. Set up MongoDB production database
4. Configure nginx/apache
5. Set up SSL certificates
6. Configure PM2 process manager

### Docker Deployment
```bash
# Build Docker image
docker build -t hackathon-platform .

# Run Docker container
docker run -p 3000:3000 hackathon-platform
```

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style Guide
- Use ESLint for code linting
- Follow Prettier formatting rules
- Write meaningful commit messages
- Document new features
- Add/update tests as needed

## 📝 License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## 📧 Contact & Support

- **Project Maintainer:** [Your Name]
- **Email:** [your.email@example.com]
- **Project Link:** [GitHub Repository URL]

### Report Issues
- Use GitHub Issues for bug reports and feature requests
- Follow the issue template when creating new issues
- Search existing issues before creating new ones

---
⭐️ Star this repo if you find it helpful!
