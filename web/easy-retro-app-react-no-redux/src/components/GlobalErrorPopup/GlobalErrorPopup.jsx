import React from 'react';
import { useError } from '../../utils/providers/ErrorProvider';
import Popup from '../Popup/Popup';

const GlobalErrorPopup = () => {
  const { hasErrors, hideError } = useError();

  return hasErrors ? (
    <Popup closePopup={hideError}>
      <div className='fx-direction-column-center align-items-center mt-24'>
        <span className='label w-800 fs-16 orange mb-24'>Oops, something went wrong</span>
      </div>
    </Popup>
  ) : null;
};

export default GlobalErrorPopup;
