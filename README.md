# IpTruck - Truck Logistics Platform API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white" alt="NestJS" />
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
  <img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
</p>

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Database Schema](#database-schema)
- [API Documentation](#api-documentation)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Database Operations](#database-operations)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

## 🚚 Overview

IpTruck is a comprehensive truck logistics platform API built with NestJS and TypeScript. It connects shippers (companies needing logistics services) with carriers (truck owners/companies) through a sophisticated bidding system. The platform handles everything from user registration and authentication to booking management, bidding, document verification, and digital bill of lading generation.

## ✨ Features

### 🔐 Authentication & User Management
- JWT-based authentication with access and refresh tokens
- Role-based access control (Shipper, Carrier, Admin)
- Password reset and email verification
- User location tracking for better service matching

### 📦 Booking System
- Create detailed truck booking requests
- Advanced filtering and search capabilities
- Real-time booking status updates
- Booking expiration and management
- Recurring bookings support

### 💰 Bidding Engine
- Real-time bidding on truck bookings
- Competitive bidding with time limits
- Bid acceptance, rejection, and counter-offers
- Bid tracking and analytics
- Automated bid expiration

### 🚛 Carrier Management
- Comprehensive carrier profiles
- Fleet management and truck registration
- Driver information and licensing
- Carrier verification and rating system
- Insurance and compliance tracking

### 🏢 Shipper Management
- Company profile management
- Booking history and analytics
- Preferred carrier relationships
- Volume-based pricing tiers

### 📄 Document Management
- Digital document upload and verification
- Bill of lading generation
- Insurance certificate management
- Driver license verification
- Document expiration tracking

### 👨‍💼 Admin Panel
- User management and verification
- Document approval workflows
- System analytics and reporting
- Audit logging for all admin actions

### 📧 Communication
- Email notifications for bookings and bids
- Welcome emails for new users
- Password reset emails
- Booking confirmation emails

## 🛠 Technology Stack

### Backend
- **Framework**: NestJS (Node.js)
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT with Passport
- **Validation**: Class Validator & Class Transformer
- **Documentation**: Swagger/OpenAPI
- **Email**: Nodemailer with Gmail integration
- **Password Hashing**: bcryptjs

### Development Tools
- **Linting**: ESLint with Prettier
- **Testing**: Jest
- **Build**: SWC (Speedy Web Compiler)
- **Type Checking**: TypeScript

## 🏗 Architecture

The application follows NestJS modular architecture with the following key modules:

```
├── auth/          # Authentication and authorization
├── admin/         # Admin panel and user management
├── booking/       # Booking creation and management
├── bidding/       # Bidding system and bid management
├── carrier/       # Carrier profiles and fleet management
├── shipper/       # Shipper profiles and company management
├── documents/     # Document upload and verification
├── email/         # Email service and templates
├── prisma/        # Database service and connection
└── shared/        # Common utilities and constants
```

## 🗃 Database Schema

### Core Entities
- **User**: Base user authentication and profile
- **Shipper**: Company profiles for service requesters
- **Carrier**: Company profiles for service providers
- **Truck**: Vehicle information and specifications
- **Booking**: Job postings and requirements
- **Bid**: Proposals from carriers
- **Document**: File management and verification
- **AdminUser**: Admin roles and permissions
- **BillOfLading**: Digital shipping documents
- **AuditLog**: System activity tracking

### Key Relationships
- Users can be Shippers, Carriers, or Admins
- Shippers create Bookings
- Carriers submit Bids on Bookings
- Carriers own multiple Trucks
- Documents can be attached to Bookings, Bids, or Carriers
- Bill of Lading is generated for accepted bookings

## 📚 API Documentation

### Authentication Endpoints
- `POST /auth/local/signup` - User registration
- `POST /auth/local/login` - User login
- `GET /auth/logout` - User logout
- `POST /auth/password/forgot` - Password reset request
- `POST /auth/password/reset` - Password reset confirmation
- `GET /auth/refresh-token` - Token refresh

### Booking Endpoints
- `POST /bookings` - Create new booking
- `GET /bookings` - List bookings with filters
- `GET /bookings/:id` - Get booking details
- `PUT /bookings/:id/status` - Update booking status
- `DELETE /bookings/:id` - Cancel booking
- `GET /bookings/search` - Search available bookings

### Bidding Endpoints
- `POST /bidding` - Submit new bid
- `GET /bidding` - List bids with filters
- `GET /bidding/my-bids` - Get user's bids
- `PATCH /bidding/:id` - Update bid
- `PATCH /bidding/:id/accept` - Accept bid
- `PATCH /bidding/:id/reject` - Reject bid

### Carrier Endpoints
- `POST /carrier` - Create carrier profile
- `GET /carrier/profile` - Get carrier profile
- `PUT /carrier/:id` - Update carrier profile
- `POST /carrier/truck` - Add truck to fleet
- `GET /carrier/trucks` - List carrier's trucks

### Document Endpoints
- `POST /documents` - Upload document
- `GET /documents` - List documents
- `GET /documents/:id` - Get document details
- `PATCH /documents/:id/verify` - Verify document
- `DELETE /documents/:id` - Delete document

## 🚀 Installation

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd IpTruck
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   Edit the `.env` file with your configuration values.

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma migrate dev
   
   # Optional: Seed the database
   npx prisma db seed
   ```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/iptruck_db"

# JWT Configuration
JWT_AT_SECRET="your-access-token-secret-here"
JWT_RT_SECRET="your-refresh-token-secret-here"
TOKEN_EXPIRATION="15m"
REFRESH_TOKEN_EXPIRATION="7d"

# Email Configuration
USER_GMAIL="your-email@gmail.com"
GMAIL_PASSWORD="your-app-password"
SMTP_HOST="smtp.gmail.com"
SMTP_PORT=587

# App Configuration
BASE_URL="http://localhost:3000"
PORT=3000
NODE_ENV="development"

# Security Configuration
BCRYPT_SALT_ROUNDS=12
SESSION_SECRET="your-session-secret-here"

# File Upload Configuration
MAX_FILE_SIZE="10mb"
UPLOAD_PATH="./uploads"

# Rate Limiting
RATE_LIMIT_WINDOW="15m"
RATE_LIMIT_MAX=100

# Swagger Configuration
SWAGGER_ENABLED=true
SWAGGER_PATH="/api/docs"
```

### Database Setup

1. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE iptruck_db;
   CREATE USER iptruck_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE iptruck_db TO iptruck_user;
   ```

2. **Run migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
# Start in development mode with hot reload
npm run start:dev

# Start in debug mode
npm run start:debug
```

### Production Mode
```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

### API Documentation
Once the application is running, visit:
- Swagger UI: `http://localhost:3000/api/docs`
- Health Check: `http://localhost:3000/`

## 🧪 Testing

### Unit Tests
```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov
```

### End-to-End Tests
```bash
# Run e2e tests
npm run test:e2e
```

### Test Debug Mode
```bash
# Debug tests
npm run test:debug
```

## 🗄 Database Operations

### Prisma Commands
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Deploy migrations to production
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Open Prisma Studio
npx prisma studio

# Seed database
npx prisma db seed
```

### Database Migrations
```bash
# Create new migration
npx prisma migrate dev --name migration_name

# Apply pending migrations
npx prisma migrate dev

# Check migration status
npx prisma migrate status
```

## 📁 Project Structure

```
src/
├── admin/                    # Admin module
│   ├── admin.controller.ts
│   ├── admin.service.ts
│   ├── admin.module.ts
│   └── dto/
├── auth/                     # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.service.ts
│   ├── dto/
│   ├── guards/
│   └── strategies/
├── booking/                  # Booking module
│   ├── booking.controller.ts
│   ├── booking.service.ts
│   ├── booking.module.ts
│   └── dto/
├── bidding/                  # Bidding module
│   ├── bidding.controller.ts
│   ├── bidding.service.ts
│   ├── bidding.module.ts
│   └── dto/
├── carrier/                  # Carrier module
│   ├── carrier.controller.ts
│   ├── carrier.service.ts
│   ├── carrier.module.ts
│   └── dto/
├── documents/                # Document module
│   ├── documents.controller.ts
│   ├── documents.service.ts
│   ├── documents.module.ts
│   ├── dto/
│   └── entities/
├── email/                    # Email module
│   ├── email.service.ts
│   ├── email.module.ts
│   └── templates/
├── prisma/                   # Database module
│   ├── prisma.service.ts
│   └── prisma.module.ts
├── shared/                   # Shared utilities
│   ├── constants/
│   ├── database-error-filter.ts
│   └── helper.service.ts
├── shipper/                  # Shipper module
│   ├── shipper.controller.ts
│   ├── shipper.service.ts
│   ├── shipper.module.ts
│   └── dto/
├── types/                    # Type definitions
│   └── express.d.ts
├── app.controller.ts
├── app.service.ts
├── app.module.ts
└── main.ts
```

## 📊 Key Features Breakdown

### 1. Multi-User System
- **Shippers**: Companies that need transportation services
- **Carriers**: Companies that provide transportation services
- **Admins**: Platform administrators with special privileges

### 2. Booking Workflow
1. Shipper creates a booking with cargo details and requirements
2. Booking becomes available to carriers
3. Carriers submit bids with pricing and truck details
4. Shipper reviews and accepts/rejects bids
5. Accepted booking moves to "In Progress" status
6. Digital bill of lading is generated
7. Booking is completed with delivery confirmation

### 3. Document Management
- Upload and verify insurance certificates
- Driver license verification
- Cargo photos and delivery confirmations
- Digital bill of lading generation
- Document expiration tracking

### 4. Security Features
- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Request rate limiting
- Input validation and sanitization
- Audit logging for admin actions

### 5. Business Logic
- Automated bid expiration
- Booking status management
- Carrier rating and verification
- Email notifications
- Location-based matching

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow NestJS conventions and patterns
- Use class-validator for input validation
- Implement proper error handling
- Write unit tests for services
- Use Prisma for database operations

### API Design
- RESTful endpoint design
- Consistent response formats
- Proper HTTP status codes
- Comprehensive error messages
- Swagger documentation

### Database Best Practices
- Use database indexes for performance
- Implement proper relationships
- Use transactions for data consistency
- Regular database backups
- Monitor query performance

## 📈 Performance Considerations

- Database indexing for frequently queried fields
- Pagination for large result sets
- Caching strategies for frequently accessed data
- File upload optimization
- Database connection pooling
- Request rate limiting

## 🔒 Security Measures

- JWT token-based authentication
- Password hashing with salt
- Input validation and sanitization
- Role-based access control
- CORS configuration
- Environment variable protection
- Audit logging

## 🚀 Deployment

### Production Checklist
- [ ] Set up production database
- [ ] Configure environment variables
- [ ] Set up SSL certificates
- [ ] Configure reverse proxy (nginx)
- [ ] Set up monitoring and logging
- [ ] Configure backup strategies
- [ ] Set up CI/CD pipeline

### Docker Deployment
```bash
# Build Docker image
docker build -t iptruck-api .

# Run with Docker Compose
docker-compose up -d
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Write tests for new features
5. Ensure all tests pass
6. Submit a pull request

### Development Setup
```bash
# Install dependencies
npm install

# Set up pre-commit hooks
npm run prepare

# Run linting
npm run lint

# Format code
npm run format
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Contact the development team
- Check the documentation

## 🔄 Changelog

### Version 0.0.1
- Initial release
- Basic authentication system
- Booking and bidding functionality
- Document management
- Admin panel features
- Email notification system

---

**Built with ❤️ using NestJS and TypeScript**
