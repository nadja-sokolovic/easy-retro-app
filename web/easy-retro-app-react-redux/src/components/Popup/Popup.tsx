import React from 'react';
import './Popup.scss';
import { useDispatch } from 'react-redux';
import { setAddNewItemPopupState, setAddNewItemProgressPopupState, setDeleteItemPopupState, setGlobalPopupErrorState, setNewSprintPopupState } from 'store/slices/popupSlice';
import { useError } from 'utils/providers/ErrorProvider';

interface PopupProps {
  popupType: string;
  children: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ popupType, children }) => {
  const dispatch = useDispatch();
  const { hideError } = useError();

  const closePopup = (): void => {
    switch(popupType) {
      case 'new-sprint':
        dispatch(setNewSprintPopupState(false));
        return;
      case 'add-new-item':
        dispatch(setAddNewItemPopupState(false));
        return;
      case 'delete-item':
        dispatch(setDeleteItemPopupState(false));
        return;
      case 'global-error':
        dispatch(setGlobalPopupErrorState(false));
        hideError();
        return;
      case 'add-new-item-progress':
        dispatch(setAddNewItemProgressPopupState(false));
        return;
    }
  }

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