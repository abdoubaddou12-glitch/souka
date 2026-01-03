
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log("Souqna App is starting...");

const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error("Critical Error: Could not find root element!");
  throw new Error("Could not find root element to mount to");
}

try {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  console.log("Souqna App rendered successfully.");
} catch (error) {
  console.error("Mounting Error:", error);
}
