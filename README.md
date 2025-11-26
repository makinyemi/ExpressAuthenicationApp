# Secure Metrics API

This is application provides a clean and secure Express.js API that includes user authentication and protection mechanisms built using modern best practices.

It is designed as a foundational service for distributed systems or microservices that require user identity, token-based access, rate-limited endpoints, for metrics aggregation.

## Features

### 1. User Authentication Endpoints

POST /auth/signup – Register a new user

POST /auth/login – Authenticate user & return tokens

POST /auth/logout – Invalidate refresh token

POST /auth/refresh – Issue a new access token using a valid refresh token

### 2. JWT Authentication (Access & Refresh Tokens)

Short-lived access tokens for authorization

Long-lived refresh tokens with rotation

Secure cookie or HTTP-only token storage (implementation dependent)

Middleware to protect private routes using Authorization: Bearer <token>

### 3. Password Hashing with bcrypt

User passwords are salted & hashed using bcrypt before storage

No plain text passwords are ever saved

Secure password comparison on login using bcrypt.compare()

### 4. Schema Validation with express-validator

All incoming user data is validated using express-validator

Examples:

Email format validation

Password complexity rules

Required fields check

Automatic error responses for invalid requests

### 5. Manual IP-Based Rate Limiting

Protects API endpoints from brute-force or abusive requests

Tracks request count by IP address

Enforces a maximum number of requests within a time window

Returns a 429 “Too Many Requests” response when exceeded

Implemented without external libraries

## Tech Stack

Node.js + Express.js — Web framework

bcrypt — Secure password hashing

jsonwebtoken (JWT) — Access & refresh token handling

express-validator — Input validation

Custom Rate Limiter — IP-based throttling

In-memory database — User storage
