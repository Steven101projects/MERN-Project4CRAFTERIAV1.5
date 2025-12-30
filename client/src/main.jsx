import { StrictMode } from 'react' //Best Practice to help detect future issues
import { createRoot } from 'react-dom/client' //Ables you to spawn a react page in html
import './index.css' //A Global CSS
import { BrowserRouter } from 'react-router-dom' //Ables you to connect to other pages without reloading
import App from './App.jsx' //The Terminal Page
import { AuthProvider } from "./context/AuthContext.jsx"; //Autochecks and updates the auth of the application
import { ToastProvider } from "./context/ToastContext.jsx"; //Fricking pop-up message manager

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  </StrictMode>
);