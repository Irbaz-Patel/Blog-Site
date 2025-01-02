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

Actions in React 19 simplify handling data mutations and managing UI states like pending actions or errors. With the useActionState hook, you can manage actions like form submissions, track loading states, and handle errors in a structured way.

Example Breakdown:
- submitAction: A function triggered on form submission to perform an async operation.
- isPending: A boolean indicating whether the action is still in progress.
- error: Captures any errors that occur during the operation.

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

This hook enables managing the state of actions, such as async updates. It keeps track of errors and pending states, making it ideal for operations like form handling.

Code Example Explanation:
- Handles formData submission.
- Waits for the updateData async function.
- Updates state dynamically based on the result.

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

This hook provides an elegant way to handle optimistic updates by predicting state changes even before the server responds.

Code Example Explanation:
- Updates the UI (like button counts) optimistically without waiting for server confirmation.
- Ensures the server update (via onLike()) aligns with the optimistic state.

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

A hook to check the status of a form, particularly its pending state. This simplifies form button states (like disabling during submission).

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

React 19 introduces the use API for managing asynchronous operations within render functions. It simplifies resource loading when combined with Suspense.

Code Example Explanation:
- The Comments component waits for the commentsPromise to resolve.
- Suspense handles loading states gracefully while data is fetched asynchronously.

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

Managing metadata like titles, descriptions, and canonical links is now native to React. This removes the need for third-party libraries like react-helmet.

Code Example Explanation:
- Dynamically updates the document title and meta tags within a component.
- Improves SEO by embedding metadata directly into components.

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

React 19 enhances stylesheet management by introducing precedence. You can control which stylesheets take priority, ensuring predictable and conflict-free styling.

Code Example Explanation:
- precedence="default" ensures base styles load first.
- precedence="high" overrides base styles selectively.

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

Server components allow rendering on the server, reducing the workload on the client side.

Basics
Server-rendered components can fetch and display data, while client components handle dynamic interactions.

Server Actions
Server actions streamline server-side logic, like database updates, directly within React components.

Code Example Explanation:
- The updateUser function updates the database with formData.
- The <form> uses action={updateUser} to handle submissions seamlessly.

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

Ref as a Prop
React now allows you to pass ref directly as a prop, eliminating the need for forwardRef.

```typescript showLineNumbers
function Input({ placeholder, ref }) {
  return <input placeholder={placeholder} ref={ref} />;
}

// Usage
<Input ref={inputRef} placeholder="Enter text" />
```

### 2. Context as Provider

Context can now be rendered directly as a provider, simplifying its implementation.

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

React introduces new APIs (preinit, preload) for preloading resources like scripts, fonts, and styles. This ensures faster rendering and better performance.

Code Example Explanation:
- preinit and preload prefetch critical resources before rendering begins.

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