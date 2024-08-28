import React from 'react';
import Form from '../Form/Form';
import { FormObject, InputProps } from 'models/form.model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useError } from 'utils/providers/ErrorProvider';
import { createItem } from 'services/api.service';
import { setAddNewItemPopupState, setAddNewItemProgressPopupState } from 'store/slices/popupSlice';
import { addItemToState } from 'store/slices/itemsSlice';

interface AddNewItemProps {
  type: string;
  isProgress: boolean;
}

const inputs: Array<InputProps> = [
  {
    inputLabel: 'Item text:',
    inputType: 'text',
    inputId: 'text',
    inputName: 'text'
  }
];

const formObject: FormObject = {
  text: ''
};

const AddNewItem: React.FC<AddNewItemProps> = ({type, isProgress}) => {
  const dispatch = useDispatch();
  const selectedSprint = useSelector((state: RootState) => state.sprints.selectedSprint);
  const { showError } = useError();

  const handleAddItem = async (itemText: string): Promise<void> => {
    try {
      const item = await createItem({
        type,
        text: itemText,
        sprint: selectedSprint
      });
      if(isProgress) {
        dispatch(addItemToState({key: 'easyProgressItems', type: type.toLowerCase(), item, sprint: selectedSprint }));
        dispatch(setAddNewItemProgressPopupState(false));
      } else {
        dispatch(addItemToState({key: 'easyItems', type: type.toLowerCase(), item, sprint: selectedSprint }));
        dispatch(setAddNewItemPopupState(false));
      }
    } catch(error) {
      showError();
    }
  }
  
  return (
    <Form initialFormObject={formObject} inputs={inputs} onSubmitForm={(formData: FormObject) => handleAddItem(formData.text)}/>
  )
}

export default AddNewItem;