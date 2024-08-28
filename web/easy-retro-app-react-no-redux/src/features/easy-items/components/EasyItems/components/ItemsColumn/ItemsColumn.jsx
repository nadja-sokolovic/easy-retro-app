import React, { useState } from 'react';
import './ItemsColumn.scss';
import Button from '../../../../../../components/Button/Button';
import Item from '../../../../../../components/Item/Item';
import Popup from '../../../../../../components/Popup/Popup';
import { useDrop } from 'react-dnd';
import AddNewItem from '../../../../../../components/AddNewItem/AddNewItem';

const ItemsColumn = ({title, items, onDeleteItem, onAddItem, onUpdateItemType}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const closePopup = () => {
    setIsPopupOpen(false);
  }
  
  const getBackgroundClass = () => {
    switch (title) {
      case 'Start':
        return 'green-bg';
      case 'Continue':
        return 'yellow-bg';
      case 'Stop':
        return 'red-bg';
      default:
        return '';
    }
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item, monitor) => {
      // Handle the dropped item
      onUpdateItemType(item['id'], item['type'], title.toLowerCase());
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getColumnTitleClasses = () => {
    return `column-title w-100-p fx-direction-center align-items-center ${getBackgroundClass()}`;
  }

  return (
    <div ref={drop} className={`column-container h-100-p fx-direction-column-start align-items-center ${isOver ? 'highlight' : ''}`}>
      <div className={getColumnTitleClasses()}>
        <span className='label text-uppercase w-500 fs-16 gray'>{title}</span>
      </div>
      <div className='w-100-p items-container p-12'>
        <div className='fx-direction-end align-items-center'>
          <Button btnStyle='primary-btn mb-12' btnText='Add New' onBtnClick={() => setIsPopupOpen(true)} />
        </div>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className='mb-12'>
              <Item item={item} onDeleteItem={(itemId) => onDeleteItem(itemId, title.toLowerCase())} onUpdateItem={() => {}} isEditable={false} />
            </div>
          ))
        ) : (
          <span className='label w-800 fs-16 orange'>No data</span>
        )}
      </div>
      {isPopupOpen && <Popup closePopup={closePopup}>
          <div className='fx-direction-column-center align-items-center mt-24'>
            <AddNewItem closePopup={closePopup} type={title.toLowerCase()} onAddNewItem={(item) => onAddItem(item, title.toLowerCase())}/>
          </div>
      </Popup>}
    </div>
  )
}

export default ItemsColumn;