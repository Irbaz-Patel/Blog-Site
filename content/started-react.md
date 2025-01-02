---
title: Getting Started with React
description: A beginner's guide to React development
slug: started-react
date: 01/09/2024
author: DevIrbaz
image: https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070
read: '6 min read'
---

# Getting Started with React

Learn the fundamentals of React development and build modern user interfaces.

## Core Concepts

### 1. Components

React uses components to build reusable UI elements. There are two main types:

- Function Components: Simple, stateless components written as JavaScript functions.
- Class Components: Older syntax for components that can handle state and lifecycle methods.

Example: The Welcome component demonstrates both function and class implementations to greet a user by their name.

```jsx showLineNumbers
// Function Component
function Welcome({ name }) {
  return <h1>Hello, {name}!</h1>;
}

// Class Component
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}!</h1>;
  }
}
```

### 2. Props

Props (short for properties) are used to pass data from parent to child components. They are read-only and cannot be modified by the child.

In the UserCard example:
- Props like user are passed to the UserCard component.
- The component renders user-specific details like avatar, name, and bio.


```jsx showLineNumbers
function UserCard({ user }) {
  return (
    <div className="card">
      <img src={user.avatar} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.bio}</p>
    </div>
  );
}

// Usage
<UserCard user={{
  name: 'John Doe',
  avatar: '/john.jpg',
  bio: 'Software Developer'
}} />
```

### 3. State

State is a built-in object in React that allows components to track and react to changes. The useState hook is used to manage state in functional components.

In the Counter example:
- useState(0) initializes a counter state with 0.
- The setCount function updates the state when the "Increment" button is clicked.

```jsx showLineNumbers
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## Hooks

### 1. useState

The useState hook is essential for managing dynamic data within a component. It returns a state variable and an updater function.

In the Form example:
- State manages the form's input values.
- The handleChange function updates the state dynamically as the user types.

```jsx showLineNumbers
function Form() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  return (
    <form>
      <input
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      {/* Other inputs */}
    </form>
  );
}
```

### 2. useEffect

The useEffect hook performs side effects in functional components, like fetching data or subscribing to events.

In UserProfile:
- useEffect fetches user data when the userId prop changes.
- The loading and user states are updated based on the API call.

```jsx showLineNumbers
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await fetch(\`/api/users/\${userId}\`);
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchUser();
  }, [userId]);
  
  if (loading) return <div>Loading...</div>;
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
```

### 3. Custom Hooks

Custom hooks like useLocalStorage allow you to extract and reuse logic. They simplify state management for specific features.

In the useLocalStorage example:
- Data is saved and retrieved from the browser's localStorage.
- The theme state persists across page reloads.

```jsx showLineNumbers
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

// Usage
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <div className={theme}>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}
```

## Event Handling

### 1. Basic Events

React simplifies event handling with JSX.

In the Button example:
- The onClick event triggers the handleClick function, which logs a message to the console.

```jsx showLineNumbers
function Button() {
  const handleClick = (e) => {
    e.preventDefault();
    console.log('Button clicked!');
  };
  
  return (
    <button 
      onClick={handleClick}
      className="btn"
    >
      Click me
    </button>
  );
}
```

### 2. Form Events

The onSubmit event prevents the default behavior and sends form data to an API endpoint for authentication.

```jsx showLineNumbers
function LoginForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button type="submit">Login</button>
    </form>
  );
}
```

## Component Patterns

### 1. Composition

Composition allows you to build components with nested structures. 

In the Card example:
- The children prop dynamically inserts content inside the card.

```jsx showLineNumbers
function Card({ title, children }) {
  return (
    <div className="card">
      <div className="card-header">
        <h2>{title}</h2>
      </div>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
}

function App() {
  return (
    <Card title="Welcome">
      <p>This is a card component</p>
      <button>Click me</button>
    </Card>
  );
}
```

### 2. Render Props

Render props allow components to share logic by passing a function as a prop.

In MouseTracker:
- The render prop receives the mouse's coordinates and displays them dynamically.

```jsx showLineNumbers
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    function handleMouseMove(event) {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      });
    }
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  return render(position);
}

// Usage
<MouseTracker
  render={({ x, y }) => (
    <div>
      Mouse position: ({x}, {y})
    </div>
  )}
/>
```

## Performance Optimization

### 1. Memoization

React's useMemo and useCallback hooks optimize performance by memoizing expensive calculations and functions.

In ExpensiveComponent:
- useMemo caches the sorted data to avoid recalculating it on every render.
- useCallback ensures the handleSelect function doesn't recreate unnecessarily.

```jsx showLineNumbers
import { useMemo, useCallback } from 'react';

function ExpensiveComponent({ data, onItemSelect }) {
  const sortedData = useMemo(() => {
    return [...data].sort((a, b) => b.value - a.value);
  }, [data]);
  
  const handleSelect = useCallback((item) => {
    console.log('Item selected:', item);
    onItemSelect(item);
  }, [onItemSelect]);
  
  return (
    <ul>
      {sortedData.map(item => (
        <li key={item.id} onClick={() => handleSelect(item)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
}
```

### 2. Code Splitting

Code splitting improves performance by loading components only when needed.

In the App example:
- The lazy function dynamically imports HeavyComponent.
- The Suspense component shows a fallback UI while loading.


```jsx showLineNumbers
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
```

## Testing

### 1. Component Testing

Tools like @testing-library/react enable you to test React components by simulating user interactions.

In the Counter test:
- A button click is simulated to verify the counter's functionality.

```jsx showLineNumbers
import { render, screen, fireEvent } from '@testing-library/react';
import Counter from './Counter';

describe('Counter', () => {
  it('increments count when button is clicked', () => {
    render(<Counter />);
    
    const button = screen.getByText('Increment');
    fireEvent.click(button);
    
    expect(screen.getByText('Count: 1')).toBeInTheDocument();
  });
});
```

### 2. Hook Testing

Tools like @testing-library/react-hooks let you test custom hooks in isolation.

In the useCounter test:
- The act function updates the state, and assertions verify the counter's value.


```jsx showLineNumbers
import { renderHook, act } from '@testing-library/react-hooks';
import useCounter from './useCounter';

describe('useCounter', () => {
  it('should increment counter', () => {
    const { result } = renderHook(() => useCounter());
    
    act(() => {
      result.current.increment();
    });
    
    expect(result.current.count).toBe(1);
  });
});
```

## Conclusion

React fundamentals include:
1. Components and Props
2. State and Lifecycle
3. Hooks
4. Event Handling
5. Performance Optimization

Keep practicing and building projects to master React! ⚛️