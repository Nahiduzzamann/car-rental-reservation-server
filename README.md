# Car Rental Reservation System
## Live URL
[Live Application](https://car-rental-reservation-server.vercel.app/)
## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup and Installation](#setup-and-installation)
- [API Documentation](#api-documentation)
- [Usage](#usage)
- [Error Handling](#error-handling)
- [Authentication & Authorization](#authentication--authorization)

## Introduction

The Car Rental Reservation System is a robust application designed to facilitate the booking and management of rental cars. This system allows users to book cars, manage bookings, and handle car returns seamlessly. It also includes features for authentication and authorization to ensure secure access to the application.

## Features

- User Registration and Authentication
- Car Booking with Availability Check
- Booking Management
- Car Return with Cost Calculation
- Admin and User Roles
- Detailed Error Handling and Validation
- Transaction Management for Consistent Data
- Input Validation with Zod

## Technologies Used

**Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose

**Authentication:**

- JWT (JSON Web Tokens)

**Validation:**

- Zod

**Error Handling:**

- Custom Error Classes
- Global Error Middleware

**Others:**

- TypeScript
- Mongoose Transactions

## Setup and Installation

### Prerequisites

- Node.js (>=14.x)
- MongoDB (>=4.x)

### Installation Steps

Clone the repository:

```sh
git clone https://github.com/Nahiduzzamann/car-rental-reservation-server.git
cd car-rental-reservation

```

### Install dependencies

```sh
npm install

```

### API Documentation

API documentation is available and includes details on all available endpoints, request/response formats, and error messages. Refer to the docs directory for detailed documentation.

### Example Endpoints

- User Registration: POST /api/auth/signup (POST)
- User Login: POST /api/auth/signin(POST)
- Create a Car (Only accessible to the Admin)
  Route: /api/cars(POST)
- Get All Cars
  Route: /api/cars(GET)
- Get A Car
  Route: /api/cars/:id(GET)
- Update A Car (Only Accessible to the Admin)
  Route: /api/cars/:id(PUT)
- Delete A Car (Only Accessible to the Admin)
  Route: /api/cars/:id(DELETE) [SOFT DELETE]
- Get All Bookings (Accessible to the Admin)
  Route: /api/bookings(GET)
- Book a Car (Only Accessible to the User)
  Route: /api/bookings(POST)
- Get User's Bookings (Only Accessible To the User)
  Route: /api/bookings/my-bookings(GET)
- Return The Car (Only Accessible To Admin)
  Route: /api/cars/return(PUT)

### Usage

### Booking a Car

Register and login to get an authentication token.
Use the token to authenticate API requests.
Book a car by providing car ID, booking date, and start time.
Return a car by providing the booking ID and end time.

### Example Request for Booking

```sh
{
  "carId": "60d0fe4f5311236168a109ca",
  "date": "2024-06-20",
  "startTime": "10:00"
}
```

### Error Handling

- 400 Bad Request: Validation errors, missing parameters, etc.
- 401 Unauthorized: Authentication failures, invalid tokens.
- 404 Not Found: Resource not found.
- 500 Internal Server Error: General server errors.

### Sample Error Response

```sh
{
  "success": false,
  "message": "Validation Error",
  "errorMessages": [
    {
      "path": "email",
      "message": "Email is required"
    }
  ],
  "stack": "..."
}
```

### Authentication & Authorization

- Users can only access their own data and perform actions like booking and returning cars.
- Admins have elevated privileges to manage all cars and bookings.
