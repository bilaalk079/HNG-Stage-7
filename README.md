# Mini Auth & API Key System

A **mini authentication and API key system** built with **NestJS** and **Drizzle ORM** for service-to-service communication.  
Supports **JWT-based user login** and **API key-based service authentication**.

---

## Features

- **User Authentication**
  - Sign up (`/auth/signup`)
  - Login (`/auth/login`) via JWT
- **API Key Management**
  - Generate API keys (`/keys/create`)
  - List all keys (`GET /keys`)
  - Expiration and revocation support
- **Middleware**
  - Detects Bearer token for user access
  - Detects API keys for service access
  - Protect routes based on access type

---

## Tech Stack

- [NestJS](https://nestjs.com/) - Node.js framework  
- [Drizzle ORM](https://orm.drizzle.team/) - Type-safe database ORM  
- [JWT](https://jwt.io/) - JSON Web Tokens for authentication  
- Database: PostgreSQL / MySQL / SQLite (configurable)  

---

## Installation

```bash
# Clone repository
git clone <https://github.com/bilaalk079/HNG-Stage-7>
cd <HNG-Stage-7>

# Install dependencies
npm install

# Run Drizzle migrations
npx drizzle-kit migrate:dev

# Start the server
npm run start:dev
```

## Environment Variables

Create a `.env` file in the project root:

```bash
DATABASE_URL=<your-database-url>
JWT_SECRET=<your-jwt-secret>
API_KEY_EXPIRATION=<optional-api-key-expiration-in-seconds>
PORT=3000
```

# API Routes Overview

## Authentication Routes

### **POST /auth/signup**
Create a new user account.

### **POST /auth/login**
Authenticate a user and return a JWT token.


## API Key Routes

### **POST /keys/create**
Create a new API key for a user or service.

### **GET /keys**
Retrieve all API keys associated with the authenticated user.

### **PUT /keys/revoke**
Revoke an existing API key. {pass id in body}


## Protected Routes (API Key or JWT Required)

### **GET /protected**
Access a service route using an API key or JWT Auth.


