import React, { useEffect, useRef } from 'react';
import './EasyItems.scss';
import ItemsColumn from './components/ItemsColumn/ItemsColumn';
import NoData from '../../../../components/NoData/NoData';
import { FunctionHelpers } from '../../../../utils/helpers/functions.helper';
import { getItemsForTheSprint, updateItemType } from '../../../../services/api.service';
import { useError } from '../../../../utils/providers/ErrorProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { addItemToState, deleteItemFromState, setEasyItemsForSprint } from 'store/slices/itemsSlice';
import { ItemModel, ItemType } from 'models/item.model';

const EasyItems = () => {
  const dispatch = useDispatch();
  const selectedSprint = useSelector((state: RootState) => state.sprints.selectedSprint);
  const easyItems = useSelector((state: RootState) => state.items.easyItems);
  const { showError } = useError();

  const fetchInProgress = useRef<Record<number, boolean>>({});

  useEffect(() => {
    const hasItemsFetched = (): boolean => {
      return easyItems.find(item => item.sprint === selectedSprint) !== undefined;
    }

    const fetchItemsForTheSprint = async (): Promise<void> => {
      try {
        if(!fetchInProgress.current[selectedSprint] && !hasItemsFetched()) {
          fetchInProgress.current[selectedSprint] = true;  // Mark fetch as in-progress for this sprint
          const data = await getItemsForTheSprint(selectedSprint, 1);
          const itemsBySprint = FunctionHelpers.organizeItemsBySprint(data);
          if(itemsBySprint)
            dispatch(setEasyItemsForSprint(itemsBySprint));
        }
      } catch (error) {
        showError();
      } finally {
        fetchInProgress.current[selectedSprint] = false; // Reset fetch progress for this sprint
      }
    }

    fetchItemsForTheSprint();
  }, [selectedSprint, showError, dispatch, easyItems]);


  const handleUpdateItemType = async (itemId: number, oldType: string, newType: string): Promise<void> => {
    try {
      const updatedItem = await updateItemType(itemId, newType);

      // Delete item from old column
      dispatch(deleteItemFromState({key: 'easyItems', type: oldType, itemId: itemId, sprint: selectedSprint}));
      
      // Add item into new column
      dispatch(addItemToState({key: 'easyItems', type: newType, item: updatedItem, sprint: selectedSprint}));
      
    } catch (error) {
      showError();
    }
  }

  const findItemsForSprint = (type: ItemType): Array<ItemModel> | undefined => {
    return easyItems.find(item => item.sprint === selectedSprint)?.items[type];
  }
  
  return (
    Object.keys(easyItems).length !== 0 ? 
    <div className='fx-direction-space-between align-items-start w-100-p h-100-p'>
      <ItemsColumn title='Start' items={findItemsForSprint(ItemType.start)} onUpdateItemType={handleUpdateItemType} />
      <ItemsColumn title='Continue' items={findItemsForSprint(ItemType.continue)} onUpdateItemType={handleUpdateItemType} />
      <ItemsColumn title='Stop' items={findItemsForSprint(ItemType.stop)} onUpdateItemType={handleUpdateItemType}/>
    </div> :
    <NoData hasImage={false} noDataText='No data for this sprint' />
  )
}

export default EasyItems;