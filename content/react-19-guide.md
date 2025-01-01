---
title: React 19 Guide
description: Complete guide to the new features and improvements in React 19
slug: react-19-guide
date: 05/12/2024
author: React Team
image: https://images.unsplash.com/photo-1687603921109-46401b201195?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVhY3QlMjBqc3xlbnwwfHwwfHx8MA%3D%3D
read: '15 min read'
---

# React 19 Guide

React 19 introduces powerful new features and improvements for building modern web applications. Let's explore what's new and how to use these features effectively.

## What's New in React 19

### 1. Actions

Actions provide a new way to handle data mutations and state updates with built-in support for:
- Pending states
- Error handling
- Optimistic updates
- Form submissions

```typescript showLineNumbers
// Using Actions with useActionState
function UpdateProfile() {
  const [error, submitAction, isPending] = useActionState(
    async (previousState, formData) => {
      const error = await updateProfile(formData);
      if (error) return error;
      redirect("/profile");
      return null;
    },
    null
  );

  return (
    <form action={submitAction}>
      <input type="text" name="name" />
      <button disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </button>
      {error && <p>{error}</p>}
    </form>
  );
}
```

### 2. New Hooks

#### useActionState
```typescript showLineNumbers
const [error, submitAction, isPending] = useActionState(
  async (previousState, newData) => {
    const error = await updateData(newData);
    return error || null;
  },
  null
);
```

#### useOptimistic
```typescript showLineNumbers
function LikeButton({ count, onLike }) {
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    count,
    (current) => current + 1
  );

  return (
    <button 
      onClick={() => {
        addOptimisticCount();
        onLike();
      }}
    >
      Likes: {optimisticCount}
    </button>
  );
}
```

#### useFormStatus
```typescript showLineNumbers
import { useFormStatus } from 'react-dom';

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Submitting...' : 'Submit'}
    </button>
  );
}
```

### 3. use API

The new `use` API allows reading resources and context within render:

```typescript showLineNumbers
import { use } from 'react';

function Comments({ commentsPromise }) {
  const comments = use(commentsPromise);
  return (
    <div>
      {comments.map(comment => (
        <p key={comment.id}>{comment.text}</p>
      ))}
    </div>
  );
}

function Page({ commentsPromise }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comments commentsPromise={commentsPromise} />
    </Suspense>
  );
}
```

### 4. Document Metadata Support

React 19 adds native support for managing document metadata:

```typescript showLineNumbers
function BlogPost({ post }) {
  return (
    <article>
      <title>{post.title}</title>
      <meta name="description" content={post.excerpt} />
      <link rel="canonical" href={post.url} />
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </article>
  );
}
```

### 5. Stylesheet Management

Enhanced support for stylesheet management with precedence control:

```typescript showLineNumbers
function Component() {
  return (
    <Suspense fallback="Loading...">
      <link rel="stylesheet" href="/base.css" precedence="default" />
      <link rel="stylesheet" href="/theme.css" precedence="high" />
      <div className="themed-content">
        {/* Component content */}
      </div>
    </Suspense>
  );
}
```

## Server Components

### 1. Server Components Basics

```typescript showLineNumbers
// ServerComponent.tsx
async function ServerComponent() {
  const data = await fetchData();
  return <div>{data.content}</div>;
}

// ClientComponent.tsx
'use client'
function ClientComponent({ data }) {
  return <div>{data}</div>;
}
```

### 2. Server Actions

```typescript showLineNumbers
// actions.ts
'use server'

async function updateUser(formData: FormData) {
  const name = formData.get('name');
  await db.user.update({ name });
}

// UserForm.tsx
function UserForm() {
  return (
    <form action={updateUser}>
      <input name="name" />
      <button type="submit">Update</button>
    </form>
  );
}
```

## Improvements in React 19

### 1. ref as a prop

```typescript showLineNumbers
function Input({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />;
}

// Usage
<Input ref={inputRef} placeholder="Enter text" />
```

### 2. Context as Provider

```typescript showLineNumbers
const ThemeContext = createContext('light');

function App({ children }) {
  return (
    <ThemeContext value="dark">
      {children}
    </ThemeContext>
  );
}
```

### 3. Resource Preloading

```typescript showLineNumbers
import { prefetchDNS, preconnect, preload, preinit } from 'react-dom';

function App() {
  preinit('/script.js', { as: 'script' });
  preload('/font.woff', { as: 'font' });
  preload('/styles.css', { as: 'style' });
  
  return <div>App Content</div>;
}
```

## Migration Guide

1. Update React dependencies to version 19
2. Replace `forwardRef` with direct ref props
3. Update Context.Provider usage to use direct Context rendering
4. Review and update ref callback implementations
5. Test thoroughly, especially hydration scenarios

## Breaking Changes

- ref is now available as a prop for function components
- Context can be rendered directly as a provider
- Cleanup functions are supported in ref callbacks
- New behavior for hydration error reporting

## Conclusion

React 19 brings significant improvements to:
1. Data mutations and state management with Actions
2. Resource handling with the use API
3. Document metadata and stylesheet management
4. Developer experience with improved error reporting
5. Component patterns with simplified ref and Context usage

Keep exploring and building amazing applications with React 19! 🚀