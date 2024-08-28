import React from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../../components/Form/Form';
import { FormObject, InputProps } from 'models/form.model';
import { useDispatch } from 'react-redux';
import { setNewSprintPopupState } from 'store/slices/popupSlice';
import { setSelectedSprint } from 'store/slices/sprintSlice';
import { setSelectedItemId } from 'store/slices/menuItemsSlice';

const inputs: Array<InputProps> = [
  {
    inputLabel: 'Sprint:',
    inputType: 'number',
    inputId: 'sprint',
    inputName: 'sprint'
  }
];

const formObject: FormObject = {
  sprint: ''
};

const NewSprintPopupContent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createNewSprint = (formData: FormObject): void => {
    dispatch(setNewSprintPopupState(false)); // to close the popup
    dispatch(setSelectedSprint(Number(formData.sprint)))
    // handle navigation
    navigate('/items');
    dispatch(setSelectedItemId(1)); // to set Easy Items in menu as a selected item when navigating
  };
  
  return (
    <Form initialFormObject={formObject} inputs={inputs} onSubmitForm={(formData: FormObject) => createNewSprint(formData)} />
  )
}

export default NewSprintPopupContent;