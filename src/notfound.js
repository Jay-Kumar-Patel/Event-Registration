import React from 'react';
import './notfound.css';

const NotFound = () => {

  return (
    <div className="notfound-container">
      <h1 className="notfound-title">404</h1>
      <h2 className="notfound-message">Oops! Page Not Found</h2>
      <p className="notfound-description">The page you are looking for does not exist.</p>
    </div>
  );
};

export default NotFound;