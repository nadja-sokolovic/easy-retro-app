import React, { useEffect } from 'react';
import './AppTopBar.scss';
import Button from '../../../../components/Button/Button';
import Select from '../../../../components/Select/Select';
import Popup from '../../../../components/Popup/Popup';
import NewSprintPopupContent from '../CreateNewSprint/NewSprintPopupContent';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setNewSprintPopupState } from 'store/slices/popupSlice';
import { setSelectedSprint } from 'store/slices/sprintSlice';
import { setSelectedValue } from 'store/slices/selectSlice';
import { setSelectedItemId } from 'store/slices/menuItemsSlice';

const AppTopBar = () => {
  const dispatch = useDispatch();
  const isNewSprintPopupOpened = useSelector((state: RootState) => state.popup.newSprintPopupState);
  const sprints = useSelector((state: RootState) => state.sprints.sprints);
  const selectedSprint = useSelector((state: RootState) => state.sprints.selectedSprint);
  const selectedMenuItemId = useSelector((state: RootState) => state.menuItems.selectedItemId);

  useEffect(() => {
    dispatch(setSelectedValue({id: 'top-bar-select', value: selectedSprint ? selectedSprint : 'Select sprint'}));
  }, [selectedSprint, dispatch]);


  const changePopupState = (isOpened: boolean): void => {
    dispatch(setNewSprintPopupState(isOpened));
  }

  const selectSprint = (sprint: number | string): void => {
    dispatch(setSelectedSprint(Number(sprint)));
    dispatch(setSelectedItemId(selectedMenuItemId ? selectedMenuItemId : 1));
  }

  return (
    <div className='top-bar-container fx-direction-space-between align-items-center background-orange'>
      <span className='label white w-800 fs-20'>Easy Retro</span>
      <div className='fx-direction-center align-items-center'>
        <Button btnStyle='primary-btn' btnText='New Sprint' onBtnClick={() => changePopupState(true)} />
        <Select id='top-bar-select' items={sprints} label='Select sprint' selectItem={(sprint) => selectSprint(sprint)} hasBackground={false} />
      </div>
      {isNewSprintPopupOpened && (
        <Popup popupType='new-sprint'>
          <NewSprintPopupContent />
        </Popup>
      )}
    </div>
  );
}

export default AppTopBar;
