import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import { useLocation } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from '../../context/authContext';

const Navbar = () => {
  const location = useLocation();
  const [background,setBackground] = useState('var(--primary)');
  const {user} = useAuth();

  return (
    <nav className='navbar' aria-label="Main Navigation" style={{backgroundColor: `${user ? 'var(--primary)' : 'transparent'}`}}>
      <div className="logo">
        <Link to="/">WellWithin</Link>
      </div>
      <div className="links">
        <Link to="/appointments">Appointments</Link>
        <Link to="/medical-history">History</Link>
        <Link to="/SkinDisease">Detect Skin Disease</Link>
        {
          !user &&
          <div className="auth">
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Login</Link>
          </div>
        }
      </div>
    </nav>
  );
};

export default Navbar;
