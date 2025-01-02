---
title: Next.js 14 Guide
description: Complete guide to building applications with Next.js 14
slug: next-js-14
date: 17/11/2024
author: DevIrbaz
image: https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?q=80&w=2070
read: '10 min read'
---

# Next.js 14 Guide

Explore the latest features and best practices for building modern web applications with Next.js 14.

## Getting Started

### 1. Project Setup

To create a new Next.js 14 project with TypeScript and Tailwind CSS:

```bash
npx create-next-app@latest my-app --typescript --tailwind --app
```

This command initializes a new Next.js application with TypeScript and Tailwind CSS configured.

### 2. App Router Structure

Next.js 14 introduces an improved app router structure for organizing your components and pages.

```typescript showLineNumbers
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

// app/page.tsx
export default function Home() {
  return (
    <main>
      <h1>Welcome to Next.js 14</h1>
    </main>
  );
}
```
Here, `layout.tsx` defines the structure for your entire application, and `page.tsx` serves as the default homepage.

## Server Components

### 1. Async Components

Server components allow fetching data directly on the server. Here's an example:

```typescript showLineNumbers
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts');
  return res.json();
}

export default async function Posts() {
  const posts = await getPosts();
  
  return (
    <div>
      {posts.map(post => (
        <article key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```
This code fetches posts on the server and displays them as a list of articles.

### 2. Server Actions

Server actions simplify handling server-side logic:

```typescript showLineNumbers
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title');
  const content = formData.get('content');
  
  await db.post.create({
    data: {
      title,
      content,
    },
  });
}

// app/new-post/page.tsx
export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" placeholder="Title" />
      <textarea name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  );
}
```
In this example, the form submits data to the server using the `createPost` server action.

## Data Fetching

### 1. Static Data Fetching

For static site generation, you can define dynamic routes:

```typescript showLineNumbers
// app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await getPosts();
  
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}
```
This example pre-generates pages for each post based on their slug.

### 2. Dynamic Data Fetching

To fetch data dynamically based on query parameters:

```typescript showLineNumbers
// app/products/page.tsx
export default async function Products({
  searchParams,
}: {
  searchParams: { q: string }
}) {
  const products = await fetchProducts(searchParams.q);
  
  return (
    <div>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```
Dynamic fetching enables real-time updates based on search parameters.

## Routing and Navigation

### 1. Dynamic Routes

Dynamic routing enables parameterized URLs:

```typescript showLineNumbers
// app/blog/[category]/[slug]/page.tsx
export default function BlogPost({
  params,
}: {
  params: { category: string; slug: string }
}) {
  return (
    <article>
      <h1>Category: {params.category}</h1>
      <h2>Slug: {params.slug}</h2>
    </article>
  );
}
```
This example generates a blog post page based on category and slug.

### 2. Route Handlers

Route handlers allow creating APIs directly in Next.js:

```typescript showLineNumbers
// app/api/posts/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const posts = await db.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const data = await request.json();
  const post = await db.post.create({ data });
  return NextResponse.json(post, { status: 201 });
}
```
This code handles GET and POST requests for posts.

## Optimization

### 1. Image Optimization

Next.js optimizes images out of the box:

```typescript showLineNumbers
import Image from 'next/image';

export default function Gallery() {
  return (
    <div>
      <Image
        src="/hero.jpg"
        alt="Hero image"
        width={1200}
        height={600}
        priority
      />
    </div>
  );
}
```
Images are automatically optimized for performance.

### 2. Metadata

Next.js makes it easy to define metadata for pages:

```typescript showLineNumbers
// app/layout.tsx
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | My App',
    default: 'My App',
  },
  description: 'Next.js 14 application',
  openGraph: {
    title: 'My App',
    description: 'Next.js 14 application',
    images: ['/og-image.jpg'],
  },
};
```
This metadata improves SEO and social sharing.

## State Management

### 1. React Context

Manage application state using React Context:

```typescript showLineNumbers
// app/providers.tsx
'use client'

import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```
This example toggles between light and dark themes.

### 2. Server State

Optimistic updates using server state:

```typescript showLineNumbers
// app/posts/useOptimisticPosts.ts
'use client'

import { experimental_useOptimistic as useOptimistic } from 'react';

export function useOptimisticPosts(posts) {
  const [optimisticPosts, addOptimisticPost] = useOptimistic(
    posts,
    (state, newPost) => [...state, newPost]
  );
  
  return { optimisticPosts, addOptimisticPost };
}
```
This allows for instant UI updates while waiting for the server response.

## Testing

### 1. Unit Testing

Write unit tests for components:

```typescript showLineNumbers
// __tests__/home.test.tsx
import { render, screen } from '@testing-library/react';
import Home from '@/app/page';

describe('Home', () => {
  it('renders welcome message', () => {
    render(<Home />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});
```
This test checks if the welcome message is rendered.

### 2. Integration Testing

Test API integration:

```typescript showLineNumbers
// __tests__/api.test.ts
import { createMocks } from 'node-mocks-http';
import { GET } from '@/app/api/posts/route';

describe('Posts API', () => {
  it('returns posts', async () => {
    const { req } = createMocks({
      method: 'GET',
    });
    
    const res = await GET(req);
    const data = await res.json();
    
    expect(res.status).toBe(200);
    expect(Array.isArray(data)).toBe(true);
  });
});
```
This test verifies the API response.

## Deployment

### 1. Environment Variables

Manage sensitive data using environment variables:

```typescript showLineNumbers
// .env.local
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_API_URL="https://api.example.com"

// app/config.ts
export const config = {
  databaseUrl: process.env.DATABASE_URL,
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
};
```
Environment variables ensure secure and dynamic configuration.

### 2. Build Configuration

Customize Next.js build settings:

```typescript showLineNumbers
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.example.com'],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
```
This configuration enables experimental features and image optimization.

## Conclusion

Next.js 14 brings powerful features for building modern web applications:

1. Server Components
2. Server Actions
3. Improved routing
4. Better optimization
5. Enhanced developer experience

Keep exploring and building amazing applications with Next.js 14! 🚀
