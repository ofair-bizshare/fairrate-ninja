
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add Assistant font
const assistantFont = document.createElement('link');
assistantFont.rel = 'stylesheet';
assistantFont.href = 'https://fonts.googleapis.com/css2?family=Assistant:wght@200;300;400;500;600;700;800&display=swap';
document.head.appendChild(assistantFont);

// Update document title
document.title = 'ofair דירוג נותני שירות';

createRoot(document.getElementById("root")!).render(<App />);
