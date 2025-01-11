import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import './index.css';
import Footer from './components/Footer/Footer';
import AuthProvider from './context/authContext';
import Chatbot from './components/Chatbot/Chatbot';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <App />
        <Footer/>
        <Chatbot/>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
