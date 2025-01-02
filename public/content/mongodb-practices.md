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

MongoDB supports flexible document structures. Embedding data is preferred for small datasets, while normalization helps with large and repetitive data.

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

- **Explanation**: The embedded approach reduces the number of queries, while unnecessary normalization adds complexity and requires joins. Always consider the size and access patterns of your data when choosing between embedding and referencing.

### 2. Indexing Strategies

Indexes improve query performance by reducing the number of scanned documents. Use different types of indexes based on access patterns.

```javascript showLineNumbers
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

- **Explanation**:
  - Single field index optimizes queries on individual fields.
  - Compound indexes are suitable for multi-field queries.
  - Text indexes enhance full-text search capabilities.
  - Partial indexes focus on specific subsets of documents, improving efficiency.

## Data Modeling

### 1. One-to-Many Relationships

Choose embedded documents for small datasets and references for large datasets.

```javascript showLineNumbers
// Embedded comments for better read performance
const blogSchema = new Schema({
  title: String,
  content: String,
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  comments: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: String,
    createdAt: Date
  }]
});

// Reference comments for large datasets
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

- **Explanation**: Embedded comments enhance read performance for small datasets, while references keep datasets manageable for large collections. Evaluate the frequency and type of operations when designing relationships.

### 2. Many-to-Many Relationships

```javascript showLineNumbers
// Embed students in courses
const courseSchema = new Schema({
  name: String,
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

// Use a separate collection for relationships
const enrollmentSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course' },
  student: { type: Schema.Types.ObjectId, ref: 'Student' },
  enrolledAt: Date,
  grade: Number
});
```

- **Explanation**: Embedded data works for simpler use cases, while a separate collection offers scalability and flexibility, particularly for datasets with frequent changes or large numbers of relationships.

## Query Optimization

### 1. Efficient Queries

```javascript showLineNumbers
class ProductService {
  async findProducts(criteria) {
    // Proper indexing and projection
    const products = await Product
      .find(criteria)
      .select('name price category')
      .lean()
      .limit(20);
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

- **Explanation**:
  - Projections fetch only required fields, reducing memory usage.
  - Aggregations group and summarize data effectively for analytics or reports.

### 2. Pagination

```javascript showLineNumbers
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

- **Explanation**: Implementing pagination avoids fetching all records, ensuring better performance and usability. This approach is ideal for large datasets in user-facing applications.

## Performance Optimization

### 1. Indexing Best Practices

```javascript showLineNumbers
transactionSchema.index({ userId: 1, createdAt: -1 });
transactionSchema.index(
  { status: 1 },
  { partialFilterExpression: { status: 'active' } }
);
transactionSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 30 * 24 * 60 * 60 }
);
```

- **Explanation**:
  - Compound indexes optimize common queries.
  - Partial indexes save storage space.
  - TTL indexes automatically delete outdated documents, ensuring storage efficiency.

### 2. Caching Strategy

```javascript showLineNumbers
class CacheService {
  async get(key) {
    const cached = await this.client.hget(this.hashKey, key);
    return cached ? JSON.parse(cached) : null;
  }

  async set(key, data, expires = 3600) {
    this.client.hset(this.hashKey, key, JSON.stringify(data));
    this.client.expire(this.hashKey, expires);
  }
}
```

- **Explanation**: Caching reduces database load and improves performance by reusing frequently accessed data. This is especially beneficial for read-heavy applications.

## Conclusion

Building efficient MongoDB applications requires:
1. Proper schema design
2. Effective indexing strategies
3. Optimized queries
4. Data integrity measures
5. Regular backups
6. Performance monitoring

Happy coding! 🚀
