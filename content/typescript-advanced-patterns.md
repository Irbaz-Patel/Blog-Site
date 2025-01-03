---
title: TypeScript Advanced Patterns Guide
description: A comprehensive guide to advanced TypeScript patterns and best practices
slug: typescript-advanced-patterns
date: 12/09/2024
author: DevIrbaz
image: https://images.unsplash.com/photo-1682687981922-7b55dbb30892?q=80&w=2071
read: '10 min read'
---

# TypeScript Advanced Patterns Guide

A deep dive into advanced TypeScript patterns and techniques for building robust applications.

## Generic Types

### 1. Type Constraints

Using type constraints ensures that generic functions and classes can work only with specific types or structures. For instance, the measureLength function demonstrates how to enforce that a type has a length property. This makes the code both flexible and safe, preventing runtime errors while working with unknown types.

```typescript showLineNumbers
// Constraining generic types
interface HasLength {
  length: number;
}

function measureLength<T extends HasLength>(item: T): number {
  return item.length;
}

// Usage
measureLength("hello");     // Works with strings
measureLength([1, 2, 3]);   // Works with arrays
measureLength({ length: 5 }); // Works with objects having length
// measureLength(123);      // Error: Number doesn't have length property
```

### 2. Generic Constraints in Classes

Generic constraints in classes help enforce a structure for type parameters. In the GenericRepository class, the T extends Entity constraint ensures all repository items have an id and createdAt field, making it suitable for database-like operations while remaining type-safe.

```typescript showLineNumbers
interface Repository<T> {
  find(id: string): Promise<T>;
  save(item: T): Promise<T>;
}

interface Entity {
  id: string;
  createdAt: Date;
}

class GenericRepository<T extends Entity> implements Repository<T> {
  constructor(private collection: string) {}

  async find(id: string): Promise<T> {
    // Implementation
    return {} as T;
  }

  async save(item: T): Promise<T> {
    // Implementation
    return item;
  }
}

// Usage
interface User extends Entity {
  name: string;
  email: string;
}

const userRepo = new GenericRepository<User>('users');
```

## Utility Types

### 1. Advanced Type Transformations

Utility types like DeepPartial and DeepRequired allow you to modify the structure of existing types deeply, making them either optional or mandatory. This is useful for working with configurations or scenarios where partial updates are common.

```typescript showLineNumbers
// Deep Partial type
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep Required type
type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// Example usage
interface Config {
  api: {
    endpoint: string;
    timeout: number;
    retries: {
      count: number;
      delay: number;
    };
  };
  cache: {
    enabled: boolean;
    duration: number;
  };
}

// Partial configuration is valid
const partialConfig: DeepPartial<Config> = {
  api: {
    endpoint: 'https://api.example.com',
    retries: {
      count: 3
    }
  }
};
```

### 2. Conditional Types

Conditional types introduce logic into your type definitions. They allow transformations based on conditions, as seen in IsArray and NonNullable. These types enhance flexibility when defining APIs and working with inferred types.

```typescript showLineNumbers
// Type based on condition
type IsArray<T> = T extends any[] ? true : false;

// Exclude null and undefined
type NonNullable<T> = T extends null | undefined ? never : T;

// Extract return type
type ReturnType<T extends (...args: any) => any> = 
  T extends (...args: any) => infer R ? R : any;

// Example usage
type StringArray = IsArray<string[]>;  // true
type StringType = IsArray<string>;     // false

function createUser(name: string, age: number) {
  return { name, age, id: Date.now() };
}

type User = ReturnType<typeof createUser>; // { name: string; age: number; id: number }
```

## Advanced Patterns

### 1. Builder Pattern

The Builder Pattern creates objects step-by-step using a fluent API, ensuring that your object is fully formed before use. The RequestBuilder example shows how you can chain methods to construct HTTP requests in a type-safe and readable manner.

```typescript showLineNumbers
class RequestBuilder {
  private request: {
    url?: string;
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
    headers?: Record<string, string>;
    body?: unknown;
  } = {};

  setUrl(url: string): this {
    this.request.url = url;
    return this;
  }

  setMethod(method: 'GET' | 'POST' | 'PUT' | 'DELETE'): this {
    this.request.method = method;
    return this;
  }

  setHeaders(headers: Record<string, string>): this {
    this.request.headers = headers;
    return this;
  }

  setBody<T>(body: T): this {
    this.request.body = body;
    return this;
  }

  build() {
    if (!this.request.url) {
      throw new Error('URL is required');
    }
    if (!this.request.method) {
      this.request.method = 'GET';
    }
    return { ...this.request };
  }
}

// Usage
const request = new RequestBuilder()
  .setUrl('https://api.example.com/users')
  .setMethod('POST')
  .setHeaders({ 'Content-Type': 'application/json' })
  .setBody({ name: 'John Doe' })
  .build();
```

### 2. Factory Pattern with Type Guards

Factories streamline object creation, while type guards ensure type safety when distinguishing between related classes. In the AnimalFactory example, type guards like isDog and isCat allow you to utilize specific methods confidently.

```typescript showLineNumbers
interface Animal {
  type: string;
  makeSound(): string;
}

class Dog implements Animal {
  type = 'dog';
  makeSound() {
    return 'Woof!';
  }
  fetch() {
    return 'Fetching the ball';
  }
}

class Cat implements Animal {
  type = 'cat';
  makeSound() {
    return 'Meow!';
  }
  climb() {
    return 'Climbing the tree';
  }
}

// Type guard functions
function isDog(animal: Animal): animal is Dog {
  return animal.type === 'dog';
}

function isCat(animal: Animal): animal is Cat {
  return animal.type === 'cat';
}

// Factory
class AnimalFactory {
  static createAnimal(type: 'dog' | 'cat'): Animal {
    switch (type) {
      case 'dog':
        return new Dog();
      case 'cat':
        return new Cat();
      default:
        throw new Error('Invalid animal type');
    }
  }
}

// Usage with type guards
const animal = AnimalFactory.createAnimal('dog');
if (isDog(animal)) {
  console.log(animal.fetch()); // TypeScript knows this is a Dog
}
```

## Decorators

### 1. Method Decorators

Decorators are powerful tools for enhancing functionality. The timing decorator adds performance tracking to methods, demonstrating how decorators can augment class behaviors dynamically and in a reusable way.

```typescript showLineNumbers
// Timing decorator
function timing() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      const start = performance.now();
      const result = await originalMethod.apply(this, args);
      const end = performance.now();
      console.log(`${propertyKey} took ${end - start}ms`);
      return result;
    };

    return descriptor;
  };
}

// Usage
class UserService {
  @timing()
  async fetchUsers() {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return ['user1', 'user2'];
  }
}
```

### 2. Property Decorators

The required property decorator enforces validation at the property level. This is helpful for ensuring that critical fields are never left undefined or null, making your application more robust.

```typescript showLineNumbers
// Validation decorator
function required(target: any, propertyKey: string) {
  let value: any;
  
  const getter = function() {
    return value;
  };
  
  const setter = function(newVal: any) {
    if (newVal === undefined || newVal === null) {
      throw new Error(`${propertyKey} is required`);
    }
    value = newVal;
  };
  
  Object.defineProperty(target, propertyKey, {
    get: getter,
    set: setter,
    enumerable: true,
    configurable: true,
  });
}

// Usage
class User {
  @required
  name!: string;

  constructor(name: string) {
    this.name = name;
  }
}
```

## Advanced Type Inference

### 1. Mapped Types

Mapped types transform existing types into new forms, such as making them readonly, nullable, or converting methods to asynchronous. This simplifies working with deeply nested objects and ensures type safety when modifying data structures.

```typescript showLineNumbers
// Make all properties optional and nullable
type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};

// Make all properties readonly
type Immutable<T> = {
  readonly [P in keyof T]: T[P];
};

// Convert all methods to async
type AsyncMethods<T> = {
  [P in keyof T]: T[P] extends (...args: infer A) => infer R
    ? (...args: A) => Promise<R>
    : T[P];
};

// Example usage
interface User {
  id: number;
  name: string;
  updateProfile(data: Partial<User>): void;
}

type NullableUser = Nullable<User>;
type ImmutableUser = Immutable<User>;
type AsyncUser = AsyncMethods<User>;
```

### 2. Template Literal Types

Combining string literals and template types enables flexible and precise definitions. In the ApiRoute example, you can validate and enforce correct API method and endpoint combinations, reducing the likelihood of incorrect routes.

```typescript showLineNumbers
// HTTP methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// API endpoints
type ApiEndpoint = '/users' | '/posts' | '/comments';

// Combine them
type ApiRoute = `${HttpMethod} ${ApiEndpoint}`;

// Validation
function validateRoute(route: ApiRoute) {
  // Implementation
}

// Usage
validateRoute('GET /users');     // Valid
validateRoute('POST /posts');    // Valid
// validateRoute('PATCH /users'); // Error: Not a valid HttpMethod
```

## Error Handling

### 1. Result Type Pattern

This pattern introduces a unified way to handle success and failure scenarios, avoiding exceptions and providing a clear structure. The ResultHandler class simplifies this process, ensuring developers can handle results consistently and safely.

```typescript showLineNumbers
interface Success<T> {
  success: true;
  data: T;
}

interface Failure {
  success: false;
  error: Error;
}

type Result<T> = Success<T> | Failure;

class ResultHandler {
  static success<T>(data: T): Success<T> {
    return { success: true, data };
  }

  static failure(error: Error): Failure {
    return { success: false, error };
  }
}

// Usage
async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const user = await db.users.findById(id);
    return ResultHandler.success(user);
  } catch (error) {
    return ResultHandler.failure(error as Error);
  }
}

// Type-safe error handling
const result = await fetchUser('123');
if (result.success) {
  console.log(result.data.name); // TypeScript knows this is User
} else {
  console.error(result.error.message);
}
```

### 2. Custom Error Types

Custom error classes allow you to define specific error types for different scenarios. For example, ValidationError and NotFoundError improve debugging and error handling by providing contextual information.

```typescript showLineNumbers
class ApplicationError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number
  ) {
    super(message);
    this.name = 'ApplicationError';
  }
}

class ValidationError extends ApplicationError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends ApplicationError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

// Error handler type
type ErrorHandler = {
  [K in ApplicationError['name']]: (error: ApplicationError) => void;
};

// Usage
const errorHandler: ErrorHandler = {
  ValidationError: (error) => {
    // Handle validation errors
  },
  NotFoundError: (error) => {
    // Handle not found errors
  },
  ApplicationError: (error) => {
    // Handle generic application errors
  }
};
```

## Conclusion

Advanced TypeScript patterns enable:
1. Type-safe code
2. Better error handling
3. Reusable components
4. Maintainable architecture
5. Enhanced developer experience

Remember to:
- Use generics appropriately
- Leverage utility types
- Implement design patterns
- Handle errors gracefully
- Write maintainable code
- Document complex types

Happy coding! 🚀