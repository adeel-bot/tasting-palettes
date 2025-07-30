import React from 'react';
import './theme_btn2.css';

const Switch = ({ isDarkTheme, onClick }) => {
  return (
    <div className="switch-wrapper">
      <div className="checkbox-wrapper-25">
        <input
          type="checkbox"
          checked={isDarkTheme}
          onChange={onClick}
        />
      </div>
    </div>
  );
};

export default Switch;