import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ fullScreen }) => {
  if (fullScreen) {
    return (
      <div className="loading-spinner-overlay">
        <div className="loading-spinner-container">
          <div className="loading-spinner">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 