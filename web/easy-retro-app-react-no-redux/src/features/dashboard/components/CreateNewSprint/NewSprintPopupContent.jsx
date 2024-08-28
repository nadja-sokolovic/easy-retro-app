import React from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../../components/Form/Form';

const inputs = [
  {
    inputLabel: 'Sprint:',
    inputType: 'number',
    inputId: 'sprint',
    inputName: 'sprint'
  }
];

const formObject = {
  sprint: ''
};

const NewSprintPopupContent = ({sprints, closePopup, selectSprint}) => {
  const navigate = useNavigate();

  const createNewSprint = (formData) => {
    closePopup(); // close popup
    selectSprint(formData.sprint); // provide selected sprint to the AppTopBar component
    // handle navigation
    navigate('/items', { state: { selectedItemId: 1 }}); // selectedItemId: 1 to set Easy Items in menu as a selected item when navigating
  };
  
  return (
    <Form formObject={formObject} inputs={inputs} onSubmitForm={(formData) => createNewSprint(formData)} sprints={sprints}/>
  )
}

export default NewSprintPopupContent;