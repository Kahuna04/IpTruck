# IpTruck API Documentation

## Overview

This document provides comprehensive API documentation for the IpTruck platform, designed to help product designers understand system capabilities, user flows, and integration points.

## Base URL

- **Development**: `http://localhost:3000/api`
- **Swagger UI**: `http://localhost:3000/api/docs`

## Authentication

The API uses JWT-based authentication with Bearer tokens.

```
Authorization: Bearer <jwt-token>
```

## User Roles

- **Shipper**: Users who need to transport goods
- **Carrier**: Users who provide transportation services
- **Admin**: System administrators

## Main API Modules

### 1. Authentication (`/auth`)

**Purpose**: User registration, login, password management

**Key Endpoints**:
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/forgot-password` - Password reset request
- `POST /auth/reset-password` - Password reset confirmation
- `POST /auth/change-password` - Change password (authenticated)

**Email Triggers**:
- Welcome email on registration
- Password reset email on forgot password
- Password change confirmation email

### 2. Bidding (`/bidding`)

**Purpose**: Manage bids on bookings

**Key Endpoints**:
- `POST /bidding` - Create a new bid
- `GET /bidding` - List all bids (with filters)
- `GET /bidding/:id` - Get specific bid details
- `PUT /bidding/:id` - Update bid details
- `DELETE /bidding/:id` - Delete a bid
- `PATCH /bidding/:id/accept` - Accept a bid
- `PATCH /bidding/:id/reject` - Reject a bid

**Email Triggers**:
- Bid notification to booking owner
- Bid acceptance/rejection notifications
- Bid update notifications

### 3. Booking (`/booking`)

**Purpose**: Manage transportation bookings

**Key Endpoints**:
- `POST /booking` - Create a new booking
- `GET /booking` - List all bookings (with search/filters)
- `GET /booking/:id` - Get specific booking details
- `PUT /booking/:id` - Update booking details
- `DELETE /booking/:id` - Cancel booking
- `GET /booking/:id/bids` - Get bids for a booking
- `POST /booking/:id/bids/:bidId/respond` - Respond to a bid
- `GET /booking/stats` - Get booking statistics

**Email Triggers**:
- Booking creation notifications to potential carriers
- Booking cancellation notifications
- Booking status update notifications

### 4. Admin (`/admin`)

**Purpose**: Administrative functions

**Key Endpoints**:
- `GET /admin/users` - List all users
- `GET /admin/users/:id` - Get user details
- `PATCH /admin/users/:id/verify` - Verify user account
- `PATCH /admin/users/:id/suspend` - Suspend user account
- `GET /admin/dashboard/stats` - Get dashboard statistics
- `GET /admin/bids` - List all bids
- `PATCH /admin/bids/:id/status` - Update bid status

**Email Triggers**:
- Account verification notifications
- Account suspension notifications
- Administrative action notifications

### 5. Carrier (`/carrier`)

**Purpose**: Carrier-specific operations

**Key Endpoints**:
- `GET /carrier/profile` - Get carrier profile
- `PUT /carrier/profile` - Update carrier profile
- `GET /carrier/stats` - Get carrier statistics
- `GET /carrier/fleet` - Get fleet information
- `POST /carrier/fleet` - Add vehicle to fleet
- `PUT /carrier/fleet/:id` - Update fleet vehicle
- `DELETE /carrier/fleet/:id` - Remove vehicle from fleet

**Email Triggers**:
- Profile update confirmations
- Fleet management notifications

### 6. Shipper (`/shipper`)

**Purpose**: Shipper-specific operations

**Key Endpoints**:
- `GET /shipper/profile` - Get shipper profile
- `PUT /shipper/profile` - Update shipper profile
- `GET /shipper/stats` - Get shipper statistics
- `GET /shipper/bookings` - Get shipper's bookings
- `GET /shipper/bids` - Get bids on shipper's bookings

**Email Triggers**:
- Profile update confirmations
- Booking-related notifications

## Email Notification System

### Email Types

1. **Welcome Email** - Sent on user registration
2. **Password Reset** - Sent when user requests password reset
3. **Booking Notifications** - Sent when bookings are created/updated
4. **Bid Notifications** - Sent when bids are created/updated/accepted/rejected
5. **Account Verification** - Sent when admin verifies user account
6. **Status Updates** - Sent when booking or bid status changes

### Email Templates

All emails are likely templated and include:
- User-specific information
- Action links (for password reset, verification, etc.)
- Booking/bid details
- Platform branding

## User Flows

### 1. User Registration & Onboarding

```
User Registration → Welcome Email → Profile Setup → Document Verification → Account Verification Email
```

### 2. Booking Creation Flow

```
Shipper Creates Booking → Booking Notification to Carriers → Carriers Submit Bids → Bid Notifications to Shipper → Shipper Accepts/Rejects Bids → Acceptance/Rejection Notifications
```

### 3. Bid Management Flow

```
Carrier Views Bookings → Carrier Submits Bid → Bid Notification to Shipper → Shipper Responds → Response Notification to Carrier
```

## Data Structures

### User
- id, email, name, role, verified status
- Profile information (carrier/shipper specific)
- Authentication tokens

### Booking
- id, title, description, pickup/delivery locations
- Price, weight, dimensions
- Status (open, in_progress, completed, cancelled)
- Timestamps

### Bid
- id, booking_id, carrier_id, price
- Status (pending, accepted, rejected)
- Timestamps

## API Response Formats

All endpoints return standardized responses:

```json
{
  "data": {...},
  "message": "Success message",
  "status": "success"
}
```

Error responses:
```json
{
  "error": "Error message",
  "status": "error",
  "statusCode": 400
}
```

## Integration Notes for Product Designer

1. **Email Templates**: All email notifications should be designed with consistent branding
2. **Real-time Updates**: Consider WebSocket integration for real-time bid/booking updates
3. **Mobile Responsiveness**: Email templates should be mobile-friendly
4. **Notification Preferences**: Users should be able to control email notification settings
5. **Status Indicators**: UI should clearly show booking/bid statuses with appropriate visual cues

## Testing the API

1. Start the application: `npm run start:dev`
2. Access Swagger UI: `http://localhost:3000/api/docs`
3. Use the interactive documentation to test endpoints
4. Register test users with different roles
5. Create test bookings and bids to trigger email flows

## Next Steps

1. Review the Swagger documentation at `/api/docs`
2. Test key user flows using Postman or the Swagger UI
3. Identify any missing email templates or notification types
4. Design UI mockups based on the API capabilities
5. Plan notification settings and user preferences UI
