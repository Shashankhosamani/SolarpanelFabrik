// src/index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles.css';

// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root
const root = createRoot(container!);

// Render the application
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
