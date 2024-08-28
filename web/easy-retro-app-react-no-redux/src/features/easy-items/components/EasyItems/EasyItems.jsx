import React, { useContext, useEffect, useState } from 'react';
import './EasyItems.scss';
import ItemsColumn from './components/ItemsColumn/ItemsColumn';
import { AppContext } from '../../../dashboard/components/Layout/Layout';
import NoData from '../../../../components/NoData/NoData';
import { FunctionHelpers } from '../../../../utils/helpers/functions.helper';
import { getItemsForTheSprint, updateItemType } from '../../../../services/api.service';
import { useError } from '../../../../utils/providers/ErrorProvider';

const EasyItems = () => {
  const { selectedSprint } = useContext(AppContext); // To get data from the context
  const [items, setItems] = useState({});
  const { showError } = useError();

  useEffect(() => {
    const fetchItemsForTheSprint = async () => {
      try {
        const data = await getItemsForTheSprint(selectedSprint, 1);
        setItems(FunctionHelpers.formatItemsByType(data));
      } catch (error) {
        showError();
      }
    }

    fetchItemsForTheSprint();
  }, [selectedSprint, showError]);

  const handelDeleteItem = (itemId, column) => {
    FunctionHelpers.deleteItemFromTheStateArray(setItems, column, itemId);
  }

  const handleAddItem = (item, column) => {
    FunctionHelpers.addItemToTheStateArray(setItems, column, item);
  }

  const handleUpdateItemType = async (itemId, oldType, newType) => {
    try {
      const updatedItem = await updateItemType(itemId, newType);

      // Delete item from old column
      FunctionHelpers.deleteItemFromTheStateArray(setItems, oldType, itemId);
      
      // Add item into new column
      FunctionHelpers.addItemToTheStateArray(setItems, newType, updatedItem);
      
    } catch (error) {
      showError();
    }
  }
  
  return (
    Object.keys(items).length !== 0 ? 
    <div className='fx-direction-space-between align-items-start w-100-p h-100-p'>
      <ItemsColumn title='Start' items={items['start']} onDeleteItem={handelDeleteItem} onAddItem={handleAddItem} onUpdateItemType={handleUpdateItemType} />
      <ItemsColumn title='Continue' items={items['continue']} onDeleteItem={handelDeleteItem} onAddItem={handleAddItem} onUpdateItemType={handleUpdateItemType} />
      <ItemsColumn title='Stop' items={items['stop']} onDeleteItem={handelDeleteItem} onAddItem={handleAddItem} onUpdateItemType={handleUpdateItemType}/>
    </div> :
    <NoData hasImage={false} noDataText='No data for this sprint' />
  )
}

export default EasyItems;