import React, { useEffect, useRef, useState } from 'react';
import './Item.scss';
import { addReaction, deleteItem, updateItem } from '../../services/api.service';
import Popup from '../Popup/Popup';
import Button from '../Button/Button';
import { useDrag } from 'react-dnd';
import { useError } from '../../utils/providers/ErrorProvider';
import { ItemModel } from 'models/item.model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setDeleteItemPopupState } from 'store/slices/popupSlice';
import { addReactionToItem, deleteItemFromState, setItem, setItemType, updateItemText } from 'store/slices/itemsSlice';

interface ItemProps {
  isProgress: boolean;
  item: ItemModel;
  isEditable: boolean;
  type: string;
}

const Item: React.FC<ItemProps> = ({isProgress, item, isEditable, type}) => {
  const dispatch = useDispatch();
  const selectedSprint = useSelector((state: RootState) => state.sprints.selectedSprint);
  const isDeleteItemPopupOpen = useSelector((state: RootState) => state.popup.deleteItemPopupState);
  const itemType = useSelector((state: RootState) => state.items.itemType);
  const selectedItem = useSelector((state: RootState) => state.items.item);
  const [isEditing, setIsEditing] = useState(false);
  

  const [updatedText, setUpdatedText] = useState(item.text);
  const inputRef = useRef<HTMLInputElement>(null); // to handle click outside of the input field
  const {showError} = useError();

  useEffect(() => {
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isEditing]);

  const handleAddReaction = async (itemId: number, typeOfReaction: string): Promise<void> => {
    try {
      await addReaction(itemId, typeOfReaction);
      const key = isProgress ? 'easyProgressItems' : 'easyItems';
      const reactionType = typeOfReaction === 'like' ? 'likeCount' : 'dislikeCount';
      dispatch(addReactionToItem({key, type: type.toLowerCase(), itemId, reactionType, sprint: selectedSprint}));
    } catch (error) {
      showError();
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { itemId: item.itemId, type: item.type, text: item.text, reactions: item.reactions, sprint: selectedSprint },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUpdatedText(event.target.value);
  };

  const handleKeyDown = async (event: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (event.key === 'Enter') {
      try {
        setIsEditing(false);
        const newItem = await updateItem({...item, text: updatedText});
        dispatch(updateItemText({type, newItem, sprint: selectedSprint}));
        
      } catch (error) {
        showError();
      }
    }
  };

  const handleClickOutside = (event: MouseEvent): void => {
    if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
      setIsEditing(false);
    }
  };

  const handleDeleteItem = async (): Promise<void> => {
    try {
      if(selectedItem) {
        await deleteItem(selectedItem.itemId);
        dispatch(setDeleteItemPopupState(false));
        const key = isProgress ? 'easyProgressItems' : 'easyItems';
        dispatch(deleteItemFromState({key, type: itemType, itemId: selectedItem.itemId, sprint: selectedSprint}));
      }
    } catch (error) {
      showError();
    }
  };

  const handleOpenPopup = () => {
    dispatch(setDeleteItemPopupState(true));
    dispatch(setItem(item));
    dispatch(setItemType(type.toLowerCase()));
  }

  return (
    <div
      ref={drag}
      className='item-container fx-direction-space-between align-items-start p-12'
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onDoubleClick={() => setIsEditing(true)}
    >
      <div className='fx-direction-column-start'>
        {isEditable && isEditing ? 
          <input
            ref={inputRef}
            type="text"
            value={updatedText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className='w-500 fs-16 gray mb-12'
          /> : 
          <span className='label w-500 fs-16 gray mb-12' title={isEditable ? 'Double tap to edit' : ''}>{item.text}</span>
        }
        <div className='fx-direction-start align-items-center'>
          <div className='fx-direction-start align-items-center cursor-pointer' onClick={() => handleAddReaction(item.itemId, 'like')}>
            <span className='like'></span>
            <span className='label w-500 fs-16 orange'>{item.reactions.likeCount}</span>
          </div>
          <div className='fx-direction-start align-items-center ml-12 cursor-pointer' onClick={() => handleAddReaction(item.itemId, 'dislike')}>
            <span className='dislike'></span>
            <span className='label w-500 fs-16 orange'>{item.reactions.dislikeCount}</span>
          </div>
        </div>
      </div>
      <span className='delete-icon cursor-pointer' onClick={handleOpenPopup}></span>
      {isDeleteItemPopupOpen && (
        <Popup popupType='delete-item'>
          <div className='fx-direction-column-center align-items-center mt-24'>
            <span className='label w-800 fs-16 orange mb-24'>Do you want to delete this item?</span>
            <Button btnStyle='primary-btn' btnText='Confirm' onBtnClick={handleDeleteItem} />
          </div>
        </Popup>
      )}
    </div>
  )
}

export default Item;