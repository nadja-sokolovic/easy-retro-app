import React from 'react';
import './Popup.scss';

const Popup = ({ children, closePopup }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button fs-20 w-800 orange" onClick={closePopup}>X</button>
        {children}
      </div>
    </div>
  )
}

export default Popup;