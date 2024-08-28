import React from 'react';
import './ItemsColumn.scss';
import Button from '../../../../../../components/Button/Button';
import Item from '../../../../../../components/Item/Item';
import Popup from '../../../../../../components/Popup/Popup';
import { useDrop } from 'react-dnd';
import AddNewItem from '../../../../../../components/AddNewItem/AddNewItem';
import { ItemModel } from 'models/item.model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setAddNewItemPopupState } from 'store/slices/popupSlice';
import { setItemType } from 'store/slices/itemsSlice';

interface ItemsColumnProps {
  title: string;
  items: Array<ItemModel> | undefined;
  onUpdateItemType: (param1: number, param2: string, param3: string) => {};
}

const ItemsColumn: React.FC<ItemsColumnProps> = ({title, items, onUpdateItemType}) => {
  const dispatch = useDispatch();
  const isPopupOpen = useSelector((state: RootState) => state.popup.addNewItemPopupState);
  const itemType = useSelector((state: RootState) => state.items.itemType);
  
  const getBackgroundClass = (): string => {
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
    drop: (item: ItemModel, monitor) => {
      // Handle the dropped item
      onUpdateItemType(item.itemId, item.type, title.toLowerCase());
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const getColumnTitleClasses = (): string => {
    return `column-title w-100-p fx-direction-center align-items-center ${getBackgroundClass()}`;
  }

  const handleAddItem = () => {
    dispatch(setAddNewItemPopupState(true));
    dispatch(setItemType(title.toLowerCase()));
  }

  return (
    <div ref={drop} className={`column-container h-100-p fx-direction-column-start align-items-center ${isOver ? 'highlight' : ''}`}>
      <div className={getColumnTitleClasses()}>
        <span className='label text-uppercase w-500 fs-16 gray'>{title}</span>
      </div>
      <div className='w-100-p items-container p-12'>
        <div className='fx-direction-end align-items-center'>
          <Button btnStyle='primary-btn mb-12' btnText='Add New' onBtnClick={handleAddItem} />
        </div>
        {items && items.length > 0 ? (
          items.map((item, index) => (
            <div key={index} className='mb-12'>
              <Item isProgress={false} item={item} type={title} isEditable={false} />
            </div>
          ))
        ) : (
          <span className='label w-800 fs-16 orange'>No data</span>
        )}
      </div>
      {isPopupOpen && <Popup popupType='add-new-item'>
        <div className='fx-direction-column-center align-items-center mt-24'>
          <AddNewItem isProgress={false} type={itemType} />
        </div>
      </Popup>}
    </div>
  )
}

export default ItemsColumn;