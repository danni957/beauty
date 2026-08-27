import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

window.addEventListener('error', (e) => {
  console.error('GLOBAL RUNTIME ERROR:', e.error || e.message);
  const errBox = document.createElement('div');
  errBox.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;background:#fff0f5;color:#b91c1c;padding:30px;font-family:sans-serif;z-index:999999;overflow:auto;';
  errBox.innerHTML = `
    <h1 style="font-size:24px;font-weight:bold;margin-bottom:10px;">⚠️ Runtime Error Detected</h1>
    <pre style="background:white;padding:15px;border:1px solid #f87171;border-radius:8px;font-size:14px;white-space:pre-wrap;">${e.error?.stack || e.message}</pre>
    <button onclick="localStorage.clear();sessionStorage.clear();location.reload();" style="margin-top:20px;padding:10px 20px;background:#b91c1c;color:white;border:none;border-radius:6px;font-weight:bold;cursor:pointer;">Clear All Cache & Reload</button>
  `;
  document.body.appendChild(errBox);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('UNHANDLED PROMISE REJECTION:', e.reason);
});

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
