import React, { useContext, useEffect, useState } from 'react';
import Select from '../../../../components/Select/Select';
import Button from '../../../../components/Button/Button';
import { AppContext } from '../../../dashboard/components/Layout/Layout';
import { getItemsForTheSprint, updateItem } from '../../../../services/api.service';
import { FunctionHelpers } from '../../../../utils/helpers/functions.helper';
import Item from '../../../../components/Item/Item';
import './EasyProgress.scss';
import Popup from '../../../../components/Popup/Popup';
import AddNewItem from '../../../../components/AddNewItem/AddNewItem';
import { useError } from '../../../../utils/providers/ErrorProvider';

const EasyProgress = () => {
  const { selectedSprint } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [items, setItems] = useState({});
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { showError } = useError();

  const categories = [
    { id: 1, value: 'best-story', text: 'Best story'},
    { id: 2, value: 'most-annoying-story', text: 'Most annoying story'},
    { id: 3, value: 'most-technically-complex-story', text: 'Most technically complex story'},
    { id: 4, value: 'most-exciting-story', text: 'Most exciting story'}
  ];

  useEffect(() => {
    const fetchItemsForTheSprint = async () => {
      try {
        const data = await getItemsForTheSprint(selectedSprint, 2);
        setItems(FunctionHelpers.formatItemsByType(data));
      } catch (error) {
        showError();
      }
    }

    fetchItemsForTheSprint();
  }, [selectedSprint, showError]);

  const closePopup = () => {
    setIsPopupOpen(false);
  }

  const handleSelectCategory = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  }

  const handleAddNewItem = (item) => {
    FunctionHelpers.addItemToTheStateArray(setItems, selectedCategory, item);
  }

  const handleDeleteItem = (itemId) => {
    FunctionHelpers.deleteItemFromTheStateArray(setItems, selectedCategory, itemId);
  }

  const handleUpdateItem = async(updatedItem) => {
    try {
      const newItem = await updateItem(updatedItem);
      FunctionHelpers.updateItemInTheStateArray(setItems, selectedCategory, newItem);
      
    } catch (error) {
      showError();
    }
  }

  return (
    <div className='w-100-p h-100-p'>
      <div className='fx-direction-start p-12'>
        <Select items={categories} label='Select category' selectItem={(selectedCategory) => handleSelectCategory(selectedCategory)} hasBackground={true} />
          {selectedCategory && <div className='ml-12'>
            <Button btnStyle='primary-btn' btnText='Create New Item' onBtnClick={() => setIsPopupOpen(true)} />
          </div>}
      </div>
      <div className='fx-direction-center p-12'>
        {selectedCategory ?
          items && items[selectedCategory] && items[selectedCategory].length > 0 ? (
          <div className='grid-container w-100-p'>
            {items[selectedCategory].map((item, index) => (
              <Item key={index} item={item} onDeleteItem={(itemId) => handleDeleteItem(itemId)} onUpdateItem={(updatedItem) => handleUpdateItem(updatedItem)} isEditable={true} />
            ))}
          </div>
        ) : (
          <span className='label w-800 fs-16 orange'>No data for this category</span>
        ) : <span className='label w-800 fs-16 orange'>Select a category, please</span>}
      </div>
      {isPopupOpen && <Popup closePopup={closePopup}>
          <div className='fx-direction-column-center align-items-center mt-24'>
            <AddNewItem closePopup={closePopup} type={selectedCategory} onAddNewItem={(item) => handleAddNewItem(item)}/>
          </div>
      </Popup>}
    </div>
  )
}

export default EasyProgress;