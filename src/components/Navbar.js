import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


function Navbar({ isAuthenticated, onSignOut }) {
  return (
    <nav className="navbar">
    
      <h1>GitHub Project Management Dashboard</h1>
      <div>
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <button onClick={onSignOut}>Sign Out</button>
        ) : (
          <Link to="/signin">Sign In</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
