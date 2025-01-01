---
title: Node.js Best Practices Guide
description: A comprehensive guide to building scalable applications with Node.js
slug: nodejs
date: 12/09/2024
author: DevIrbaz
image: https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bm9kZSUyMGpzfGVufDB8fDB8fHww
read: '8 min read'
---

# Node.js Best Practices Guide

A comprehensive guide to building scalable and maintainable Node.js applications.

## Project Structure

### 1. Directory Organization

```plaintext
project-root/
├── src/
│   ├── config/        # Configuration files
│   ├── controllers/   # Route controllers
│   ├── middleware/    # Custom middleware
│   ├── models/        # Data models
│   ├── routes/        # Route definitions
│   ├── services/      # Business logic
│   └── utils/         # Utility functions
├── tests/            # Test files
└── server.js         # Application entry point
```

### 2. Module Organization

```javascript showLineNumbers
// services/user.service.js
class UserService {
  constructor(userRepository, emailService) {
    this.userRepository = userRepository;
    this.emailService = emailService;
  }

  async createUser(userData) {
    const user = await this.userRepository.create(userData);
    await this.emailService.sendWelcomeEmail(user.email);
    return user;
  }
}

module.exports = UserService;
```

## Error Handling

### 1. Custom Error Classes

```javascript showLineNumbers
// utils/errors.js
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    this.status = statusCode >= 400 && statusCode < 500 ? 'fail' : 'error';
    
    Error.captureStackTrace(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

module.exports = { AppError, ValidationError };
```

### 2. Global Error Handler

```javascript showLineNumbers
// middleware/errorHandler.js
const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack
    });
  }

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  }

  console.error('ERROR 💥:', err);
  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
};

module.exports = errorHandler;
```

## Async Operations

### 1. Async/Await Best Practices

```javascript showLineNumbers
// controllers/user.controller.js
const catchAsync = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

class UserController {
  getUser = catchAsync(async (req, res) => {
    const user = await this.userService.findById(req.params.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }
    
    res.json({ data: user });
  });
}
```

### 2. Promise Handling

```javascript showLineNumbers
// services/email.service.js
class EmailService {
  async sendBulkEmails(users, template) {
    const emailPromises = users.map(user => 
      this.sendEmail(user.email, template)
        .catch(error => ({
          error,
          user: user.email
        }))
    );

    const results = await Promise.allSettled(emailPromises);
    return this.processResults(results);
  }

  processResults(results) {
    return {
      successful: results.filter(r => r.status === 'fulfilled'),
      failed: results.filter(r => r.status === 'rejected')
    };
  }
}
```

## Security

### 1. Request Validation

```javascript showLineNumbers
// middleware/validate.js
const { validationResult } = require('express-validator');

const validate = validations => {
  return async (req, res, next) => {
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
      status: 'fail',
      errors: errors.array()
    });
  };
};

// Usage in routes
const createUserValidation = [
  body('email').isEmail(),
  body('password').isLength({ min: 8 })
];

router.post('/users', validate(createUserValidation), userController.create);
```

### 2. Security Headers

```javascript showLineNumbers
// middleware/security.js
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const securityMiddleware = app => {
  // Set security HTTP headers
  app.use(helmet());

  // Rate limiting
  const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP'
  });
  app.use('/api', limiter);

  // CORS
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS.split(','),
    credentials: true
  }));
};
```

## Performance

### 1. Caching

```javascript showLineNumbers
// middleware/cache.js
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 600 });

const cacheMiddleware = (duration) => {
  return (req, res, next) => {
    const key = req.originalUrl;
    const cachedResponse = cache.get(key);

    if (cachedResponse) {
      return res.json(cachedResponse);
    }

    res.originalJson = res.json;
    res.json = (body) => {
      cache.set(key, body, duration);
      res.originalJson(body);
    };
    next();
  };
};
```

### 2. Worker Threads

```javascript showLineNumbers
// utils/worker.js
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  module.exports = function parseCSV(file) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, {
        workerData: { file }
      });
      
      worker.on('message', resolve);
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });
  };
} else {
  // Worker thread code
  const { file } = workerData;
  // Process CSV file
  parentPort.postMessage(result);
}
```

## Testing

### 1. Unit Testing

```javascript showLineNumbers
// tests/user.service.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const UserService = require('../services/user.service');

describe('UserService', () => {
  let userService;
  let userRepository;
  let emailService;

  beforeEach(() => {
    userRepository = {
      create: sinon.stub()
    };
    emailService = {
      sendWelcomeEmail: sinon.stub()
    };
    userService = new UserService(userRepository, emailService);
  });

  describe('createUser', () => {
    it('should create user and send welcome email', async () => {
      const userData = { email: 'test@example.com' };
      const user = { ...userData, id: 1 };
      
      userRepository.create.resolves(user);
      emailService.sendWelcomeEmail.resolves();

      const result = await userService.createUser(userData);
      
      expect(result).to.deep.equal(user);
      expect(emailService.sendWelcomeEmail).to.have.been.calledWith(userData.email);
    });
  });
});
```

### 2. Integration Testing

```javascript showLineNumbers
// tests/api.test.js
const request = require('supertest');
const app = require('../app');

describe('API Integration Tests', () => {
  describe('POST /api/users', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('data');
      expect(res.body.data).to.have.property('email', 'test@example.com');
    });
  });
});
```

## Deployment

### 1. Environment Configuration

```javascript showLineNumbers
// config/config.js
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables based on NODE_ENV
dotenv.config({
  path: path.join(__dirname, `../.env.${process.env.NODE_ENV}`)
});

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  email: {
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
};
```

### 2. Logging

```javascript showLineNumbers
// utils/logger.js
const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
```

## Conclusion

Building robust Node.js applications requires:
1. Clear project structure
2. Proper error handling
3. Efficient async operations
4. Strong security measures
5. Performance optimization
6. Comprehensive testing
7. Proper deployment practices

Remember to:
- Keep code modular and maintainable
- Follow security best practices
- Handle errors gracefully
- Use appropriate design patterns
- Monitor and optimize performance
- Write comprehensive tests

Happy coding! 🚀