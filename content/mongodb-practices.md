---
title: MongoDB Best Practices Guide
description: A comprehensive guide to using MongoDB effectively in your applications
slug: mongodb-practices
date: 12/09/2024
author: DevIrbaz
image: https://media.istockphoto.com/id/1368352775/photo/data-center-in-server-room-with-server-racks.jpg?s=2048x2048&w=is&k=20&c=QwVhyhl6YpNM62FbZsymu48WER3OBet1aoJm-cwJnoM=
read: '8 min read'
---

# MongoDB Best Practices Guide

A comprehensive guide to designing, implementing, and optimizing MongoDB databases for scalable applications.

## Schema Design

### 1. Document Structure

```javascript showLineNumbers
// Good Practice - Embedded Documents
const orderSchema = new Schema({
  orderNumber: String,
  customer: {
    name: String,
    email: String,
    address: {
      street: String,
      city: String,
      country: String
    }
  },
  items: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number,
    price: Number
  }],
  total: Number,
  status: String
});

// Bad Practice - Unnecessary Normalization
const customerAddressSchema = new Schema({
  street: String,
  city: String,
  country: String
});

const customerSchema = new Schema({
  name: String,
  email: String,
  address: { type: Schema.Types.ObjectId, ref: 'Address' }
});
```

### 2. Indexing Strategies

```javascript showLineNumbers
// models/product.model.js
const productSchema = new Schema({
  name: String,
  price: Number,
  category: String,
  tags: [String],
  createdAt: Date
});

// Single field index
productSchema.index({ name: 1 });

// Compound index
productSchema.index({ category: 1, price: -1 });

// Text index
productSchema.index({ name: 'text', description: 'text' });

// Partial index
productSchema.index(
  { price: 1 },
  { partialFilterExpression: { price: { $gt: 100 } } }
);
```

## Data Modeling

### 1. One-to-Many Relationships

```javascript showLineNumbers
// models/blog.model.js
const blogSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  // Embedded comments for better read performance
  comments: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: Date
  }]
});

// Alternative: Reference comments for large datasets
const blogSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' }
});

const commentSchema = new Schema({
  blog: { type: Schema.Types.ObjectId, ref: 'Blog' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  content: String,
  createdAt: Date
});
```

### 2. Many-to-Many Relationships

```javascript showLineNumbers
// models/course.model.js
const courseSchema = new Schema({
  name: String,
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

// Alternative: Separate collection for relationships
const enrollmentSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  enrolledAt: Date,
  grade: Number
});
```

## Query Optimization

### 1. Efficient Queries

```javascript showLineNumbers
// services/product.service.js
class ProductService {
  async findProducts(criteria) {
    // Good - Using proper indexing and projection
    const products = await Product
      .find(criteria)
      .select('name price category')
      .lean()
      .limit(20);

    // Bad - Fetching unnecessary fields and no limit
    const allProducts = await Product.find(criteria);
  }

  async aggregateProducts() {
    return Product.aggregate([
      { $match: { price: { $gt: 100 } } },
      { $group: {
          _id: '$category',
          avgPrice: { $avg: '$price' },
          count: { $sum: 1 }
        }
      },
      { $sort: { avgPrice: -1 } }
    ]);
  }
}
```

### 2. Pagination

```javascript showLineNumbers
// utils/pagination.js
class PaginationHelper {
  static async paginate(model, query, options) {
    const page = parseInt(options.page, 10) || 1;
    const limit = parseInt(options.limit, 10) || 10;
    const skip = (page - 1) * limit;

    const [results, total] = await Promise.all([
      model
        .find(query)
        .sort(options.sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      model.countDocuments(query)
    ]);

    return {
      results,
      pagination: {
        current: page,
        total: Math.ceil(total / limit),
        count: total
      }
    };
  }
}
```

## Performance Optimization

### 1. Indexing Best Practices

```javascript showLineNumbers
// models/transaction.model.js
const transactionSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  type: String,
  status: String,
  createdAt: Date
});

// Compound index for common queries
transactionSchema.index({ userId: 1, createdAt: -1 });

// Partial index for active transactions
transactionSchema.index(
  { status: 1 },
  { partialFilterExpression: { status: 'active' } }
);

// Expire data automatically
transactionSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60 } // 30 days
);
```

### 2. Caching Strategy

```javascript showLineNumbers
// services/cache.service.js
const mongoose = require('mongoose');
const redis = require('redis');
const util = require('util');

class CacheService {
  constructor() {
    this.client = redis.createClient({
      url: process.env.REDIS_URL
    });
    this.client.hget = util.promisify(this.client.hget);
  }

  async get(key) {
    const cached = await this.client.hget(this.hashKey, key);
    return cached ? JSON.parse(cached) : null;
  }

  async set(key, data, expires = 3600) {
    this.client.hset(this.hashKey, key, JSON.stringify(data));
    this.client.expire(this.hashKey, expires);
  }

  async clear(hashKey) {
    this.client.del(JSON.stringify(hashKey));
  }
}
```

## Data Integrity

### 1. Validation

```javascript showLineNumbers
// models/product.model.js
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [3, 'Name must be at least 3 characters'],
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: true,
    min: [0, 'Price cannot be negative'],
    validate: {
      validator: Number.isFinite,
      message: '{VALUE} is not a valid price'
    }
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: ['electronics', 'clothing', 'food'],
      message: '{VALUE} is not a supported category'
    }
  }
});
```

### 2. Transactions

```javascript showLineNumbers
// services/order.service.js
class OrderService {
  async createOrder(orderData) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Create order
      const order = await Order.create([orderData], { session });

      // Update inventory
      await Promise.all(
        orderData.items.map(item =>
          Product.updateOne(
            { _id: item.product },
            { $inc: { stock: -item.quantity } },
            { session }
          )
        )
      );

      await session.commitTransaction();
      return order[0];
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}
```

## Backup and Recovery

### 1. Backup Strategy

```javascript showLineNumbers
// scripts/backup.js
const { exec } = require('child_process');
const path = require('path');

class DatabaseBackup {
  constructor() {
    this.backupPath = path.join(__dirname, '../backups');
    this.filename = `backup-${new Date().toISOString()}.gz`;
  }

  async createBackup() {
    const command = `mongodump --uri="${process.env.MONGODB_URI}" --gzip --archive=${path.join(this.backupPath, this.filename)}`;
    
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) reject(error);
        else resolve(this.filename);
      });
    });
  }

  async restore(filename) {
    const command = `mongorestore --uri="${process.env.MONGODB_URI}" --gzip --archive=${path.join(this.backupPath, filename)}`;
    
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) reject(error);
        else resolve(true);
      });
    });
  }
}
```

## Monitoring

### 1. Performance Monitoring

```javascript showLineNumbers
// utils/monitor.js
const mongoose = require('mongoose');

class DatabaseMonitor {
  static async getStats() {
    const stats = await mongoose.connection.db.stats();
    return {
      collections: stats.collections,
      objects: stats.objects,
      avgObjSize: stats.avgObjSize,
      dataSize: stats.dataSize,
      storageSize: stats.storageSize,
      indexes: stats.indexes,
      indexSize: stats.indexSize
    };
  }

  static async getCollectionStats(collectionName) {
    return mongoose.connection.db
      .collection(collectionName)
      .stats();
  }

  static getSlowQueries() {
    return mongoose.connection.db
      .admin()
      .command({ profile: -1 });
  }
}
```

## Conclusion

Building efficient MongoDB applications requires:
1. Proper schema design
2. Effective indexing strategies
3. Optimized queries
4. Data integrity measures
5. Regular backups
6. Performance monitoring

Remember to:
- Design schemas for your access patterns
- Use appropriate indexes
- Implement proper validation
- Handle transactions carefully
- Monitor performance regularly
- Maintain regular backups

Happy coding! 🚀