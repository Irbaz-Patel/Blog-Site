---
title: Express.js Middleware Guide
description: Complete guide to Express.js middleware patterns and best practices
slug: expressjs-middleware-guide
date: 12/10/2024
author: DevIrbaz
image: https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074
read: '9 min read'
---

# Express.js Middleware Guide

Middleware functions are the backbone of Express.js applications. Let's explore how to create and use middleware effectively.

## Understanding Middleware

Middleware is a function that executes during the lifecycle of a request to the server. Middleware functions have access to the `req` (request), `res` (response), and `next` middleware function in the application’s request-response cycle.

### 1. Basic Middleware Structure

```javascript showLineNumbers
function middleware(req, res, next) {
  // Do something with req and res
  next(); // Call next middleware
}

// Using middleware
app.use(middleware);
```

**Explanation**: 
- Middleware processes requests before they reach the route handler.
- The `next()` function passes control to the next middleware in the stack.

### 2. Error Handling Middleware

```javascript showLineNumbers
function errorHandler(err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message
  });
}

// Use at the end of middleware chain
app.use(errorHandler);
```

**Explanation**:
- Error-handling middleware has four arguments: `err`, `req`, `res`, and `next`.
- It's used to catch and handle errors in the application.

## Common Middleware Patterns

### 1. Authentication

```javascript showLineNumbers
const jwt = require('jsonwebtoken');

function authenticate(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Use middleware
app.use('/api', authenticate);
```

**Explanation**:
- Validates the presence and validity of a JSON Web Token (JWT).
- Ensures only authenticated users can access protected routes.

### 2. Request Validation

```javascript showLineNumbers
function validateUser(req, res, next) {
  const { username, email, password } = req.body;
  
  if (!username || !email || !password) {
    return res.status(400).json({
      error: 'Missing required fields'
    });
  }
  
  if (password.length < 8) {
    return res.status(400).json({
      error: 'Password must be at least 8 characters'
    });
  }
  
  next();
}

app.post('/api/users', validateUser, createUser);
```

**Explanation**:
- Ensures incoming requests have the required fields.
- Rejects requests with invalid or missing data.

### 3. Rate Limiting

```javascript showLineNumbers
class RateLimiter {
  constructor() {
    this.requests = new Map();
  }
  
  middleware(limit, window) {
    return (req, res, next) => {
      const ip = req.ip;
      const now = Date.now();
      
      if (!this.requests.has(ip)) {
        this.requests.set(ip, []);
      }
      
      const requests = this.requests.get(ip);
      const windowStart = now - window;
      
      // Remove old requests
      while (requests.length && requests[0] < windowStart) {
        requests.shift();
      }
      
      if (requests.length >= limit) {
        return res.status(429).json({
          error: 'Too many requests'
        });
      }
      
      requests.push(now);
      next();
    };
  }
}

const limiter = new RateLimiter();
app.use('/api', limiter.middleware(100, 60000)); // 100 requests per minute
```

**Explanation**:
- Limits the number of requests from an IP address within a specified time window.
- Helps prevent abuse or overuse of the API.

## Advanced Patterns

### 1. Composable Middleware

```javascript showLineNumbers
function compose(...middlewares) {
  return (req, res, next) => {
    function dispatch(i) {
      const fn = middlewares[i];
      if (!fn) return next();
      
      try {
        fn(req, res, () => dispatch(i + 1));
      } catch (err) {
        next(err);
      }
    }
    
    dispatch(0);
  };
}

// Usage
const validateAndAuthenticate = compose(
  validate,
  authenticate,
  authorize(['admin'])
);

app.post('/api/admin', validateAndAuthenticate, adminController);
```

**Explanation**:
- Combines multiple middleware into a single middleware function.
- Ensures better modularity and reusability.

### 2. Conditional Middleware

```javascript showLineNumbers
function conditionalMiddleware(condition, middleware) {
  return (req, res, next) => {
    if (condition(req)) {
      return middleware(req, res, next);
    }
    next();
  };
}

// Usage
app.use(
  conditionalMiddleware(
    req => req.path.startsWith('/api'),
    authenticate
  )
);
```

**Explanation**:
- Executes middleware conditionally based on the request's attributes.
- Useful for applying middleware selectively.

### 3. Async Middleware

```javascript showLineNumbers
function asyncMiddleware(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next))
      .catch(next);
  };
}

// Usage
app.get('/api/data', asyncMiddleware(async (req, res) => {
  const data = await fetchData();
  res.json(data);
}));
```

**Explanation**:
- Handles asynchronous operations within middleware.
- Prevents unhandled promise rejections by passing errors to the `next` function.

## Best Practices

### 1. Error Handling

```javascript showLineNumbers
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
  }
}

function globalErrorHandler(err, req, res, next) {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  
  if (process.env.NODE_ENV === 'development') {
    res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  } else {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }
}
```

**Explanation**:
- Provides a structured approach to handling errors.
- Differentiates error handling for development and production environments.

## Testing Middleware

### 1. Unit Testing

```javascript showLineNumbers
const request = require('supertest');
const app = require('../app');

describe('Authentication Middleware', () => {
  it('should return 401 if no token provided', async () => {
    const res = await request(app)
      .get('/api/protected')
      .expect(401);
      
    expect(res.body.error).toBe('No token provided');
  });
  
  it('should authenticate valid token', async () => {
    const token = generateToken();
    
    const res = await request(app)
      .get('/api/protected')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
      
    expect(res.body.user).toBeDefined();
  });
});
```

**Explanation**:
- Tests middleware behavior using mock requests.
- Verifies correct responses for both valid and invalid scenarios.

## Conclusion

Middleware is a powerful feature of Express.js, enabling modularity, reusability, and efficient request processing. Mastering middleware patterns and best practices ensures scalable and maintainable applications.
