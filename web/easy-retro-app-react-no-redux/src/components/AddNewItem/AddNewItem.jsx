import React, { useContext } from 'react';
import { AppContext } from '../../features/dashboard/components/Layout/Layout';
import { createItem } from '../../services/api.service';
import Form from '../Form/Form';
import { useError } from '../../utils/providers/ErrorProvider';

const inputs = [
  {
    inputLabel: 'Item text:',
    inputType: 'text',
    inputId: 'text',
    inputName: 'text'
  }
];

const formObject = {
  text: ''
};

const AddNewItem = ({closePopup, type, onAddNewItem}) => {
  const { selectedSprint } = useContext(AppContext);
  const {showError} = useError();

  const createNewItem = async (formData) => {
    closePopup(); // close popup
    try {
      const newItem = await createItem({
        type,
        text: formData.text,
        sprint: selectedSprint
      });
      onAddNewItem(newItem);
    } catch(error) {
      showError();
    }
  }
  
  return (
    <Form formObject={formObject} inputs={inputs} onSubmitForm={(formData) => createNewItem(formData)} sprints={[]}/>
  )
}

export default AddNewItem;