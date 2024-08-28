import React, { useEffect, useRef, useState } from 'react';
import './Item.scss';
import { addReaction, deleteItem } from '../../services/api.service';
import Popup from '../Popup/Popup';
import Button from '../Button/Button';
import { useDrag } from 'react-dnd';
import { useError } from '../../utils/providers/ErrorProvider';

const Item = ({item, onDeleteItem, isEditable, onUpdateItem}) => {
  const [likes, setLikes] = useState(item.reactions.likeCount);
  const [dislikes, setDislikes] = useState(item.reactions.dislikeCount);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(item.text);
  const inputRef = useRef(null); // to handle click outside of the input field
  const {showError} = useError();

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handleAddReaction = async (itemId, reactionType) => {
    try {
      await addReaction(itemId, reactionType);
      reactionType === 'like' ?
        setLikes((prevValue) => prevValue + 1) :
        setDislikes((prevValue) => prevValue + 1);
    } catch (error) {
      showError();
    }
  };

  const handleDeleteItem = async (itemId) => {
    closePopup();
    try {
      await deleteItem(itemId);
      onDeleteItem(itemId);
    } catch (error) {
      showError();
    }
  };

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item: { id: item.itemId, type: item.type, text: item.text, reactions: item.reactions },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const handleChange = (event) => {
    setUpdatedText(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      setIsEditing(false);
      onUpdateItem({...item, text: updatedText});
    }
  };

  const handleClickOutside = (event) => {
    if (inputRef.current && !inputRef.current.contains(event.target)) {
      setIsEditing(false);
    }
  };

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
            <span className='label w-500 fs-16 orange'>{likes}</span>
          </div>
          <div className='fx-direction-start align-items-center ml-12 cursor-pointer' onClick={() => handleAddReaction(item.itemId, 'dislike')}>
            <span className='dislike'></span>
            <span className='label w-500 fs-16 orange'>{dislikes}</span>
          </div>
        </div>
      </div>
      <span className='delete-icon cursor-pointer' onClick={() => setIsPopupOpen(true)}></span>
      {isPopupOpen && (
        <Popup closePopup={closePopup}>
          <div className='fx-direction-column-center align-items-center mt-24'>
            <span className='label w-800 fs-16 orange mb-24'>Do you want to delete this item?</span>
            <Button btnStyle='primary-btn' btnText='Confirm' onBtnClick={() => handleDeleteItem(item.itemId)} />
          </div>
        </Popup>
      )}
    </div>
  )
}

export default Item;