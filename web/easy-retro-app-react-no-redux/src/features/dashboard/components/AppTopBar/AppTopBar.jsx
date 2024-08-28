import React, { useState } from 'react';
import './AppTopBar.scss';
import Button from '../../../../components/Button/Button';
import Select from '../../../../components/Select/Select';
import Popup from '../../../../components/Popup/Popup';
import NewSprintPopupContent from '../CreateNewSprint/NewSprintPopupContent';

export default function AppTopBar({sprints, selectedSprint}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const selectSprint = (sprint) => {
    selectedSprint(sprint); // provide selected sprint to the layout
  }

  return (
    <div className='top-bar-container fx-direction-space-between align-items-center background-orange'>
      <span className='label white w-800 fs-20'>Easy Retro</span>
      <div className='fx-direction-center align-items-center'>
        <Button btnStyle='primary-btn' btnText='New Sprint' onBtnClick={() => setIsPopupOpen(true)} />
        <Select items={sprints} label='Select sprint' selectItem={selectSprint} hasBackground={false} />
      </div>
      {isPopupOpen && (
        <Popup closePopup={closePopup}>
          <NewSprintPopupContent sprints={sprints} closePopup={closePopup} selectSprint={selectSprint}/>
        </Popup>
      )}
    </div>
  );
}
