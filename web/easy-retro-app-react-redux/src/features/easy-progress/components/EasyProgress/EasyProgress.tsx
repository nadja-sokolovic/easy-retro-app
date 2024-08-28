import React, { useEffect, useRef } from 'react';
import Select from '../../../../components/Select/Select';
import Button from '../../../../components/Button/Button';
import { getItemsForTheSprint } from '../../../../services/api.service';
import { FunctionHelpers } from '../../../../utils/helpers/functions.helper';
import Item from '../../../../components/Item/Item';
import './EasyProgress.scss';
import Popup from '../../../../components/Popup/Popup';
import AddNewItem from '../../../../components/AddNewItem/AddNewItem';
import { useError } from '../../../../utils/providers/ErrorProvider';
import { SelectData } from 'models/helper.model';
import { ItemModel, ItemType } from 'models/item.model';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setAddNewItemProgressPopupState } from 'store/slices/popupSlice';
import { setEasyProgressItemsForSprint, setItemType } from 'store/slices/itemsSlice';
import { setSelectedValue } from 'store/slices/selectSlice';

const EasyProgress = () => {
  const dispatch = useDispatch();
  const selectedSprint = useSelector((state: RootState) => state.sprints.selectedSprint);
  const isPopupOpen = useSelector((state: RootState) => state.popup.addNewItemProgressPopupState);
  const easyProgressItems = useSelector((state: RootState) => state.items.easyProgressItems);
  const selectedType = useSelector((state: RootState) => state.items.itemType);
  const { showError } = useError();

  const fetchInProgress = useRef<Record<number, boolean>>({});

  const categories: Array<SelectData> = [
    { id: 1, value: 'best-story', text: 'Best story'} as SelectData,
    { id: 2, value: 'most-annoying-story', text: 'Most annoying story'} as SelectData,
    { id: 3, value: 'most-technically-complex-story', text: 'Most technically complex story'} as SelectData,
    { id: 4, value: 'most-exciting-story', text: 'Most exciting story'} as SelectData
  ];

  useEffect(() => {
    const hasItemsFetched = (): boolean => {
      return easyProgressItems.find(item => item.sprint === selectedSprint) !== undefined;
    }

    const fetchItemsForTheSprint = async (): Promise<void> => {
      try {
        if(!fetchInProgress.current[selectedSprint] && !hasItemsFetched()) {
          fetchInProgress.current[selectedSprint] = true;  // Mark fetch as in-progress for this sprint
          const data = await getItemsForTheSprint(selectedSprint, 2);
          const itemsBySprint = FunctionHelpers.organizeItemsBySprint(data);
          if(itemsBySprint)
            dispatch(setEasyProgressItemsForSprint(itemsBySprint));
        }
      } catch (error) {
        showError();
      } finally {
        fetchInProgress.current[selectedSprint] = false; // Reset fetch progress for this sprint
      }
    }
    dispatch(setSelectedValue({id: 'category-select', value: selectedType ? selectedType : 'Select category'}));
    fetchItemsForTheSprint();
  }, [selectedSprint, dispatch, showError, selectedType, easyProgressItems]);


  const handleSelectCategory = (selectedCategory: string): void => {
    dispatch(setItemType(selectedCategory));
  }

  const findItemsForSprint = (type: ItemType): Array<ItemModel> => {
    return easyProgressItems.find(item => item.sprint === selectedSprint)?.items[type] ?? [];
  }

  const getType = (): ItemType => {
    const key = FunctionHelpers.toCamelCase(selectedType) as keyof typeof ItemType;
    return ItemType[key];
  }

  return (
    <div className='w-100-p h-100-p'>
      <div className='fx-direction-start p-12'>
        <Select id='category-select' items={categories} label='Select category' selectItem={(selectedCategory: string | number) => handleSelectCategory(selectedCategory as string)} hasBackground={true} />
          {selectedType && <div className='ml-12'>
            <Button btnStyle='primary-btn' btnText='Create New Item' onBtnClick={() => dispatch(setAddNewItemProgressPopupState(true))} />
          </div>}
      </div>
      <div className='fx-direction-center p-12'>
        {selectedType ?
          easyProgressItems && findItemsForSprint(getType()) && findItemsForSprint(getType()).length ? (
          <div className='grid-container w-100-p'>
            {findItemsForSprint(getType()) && findItemsForSprint(getType()).map((item: ItemModel, index: number) => (
              <Item isProgress={true} key={index} item={item} type={selectedType} isEditable={true} />
            ))}
          </div>
        ) : (
          <span className='label w-800 fs-16 orange'>No data for this category</span>
        ) : <span className='label w-800 fs-16 orange'>Select a category, please</span>}
      </div>
      {isPopupOpen && <Popup popupType='add-new-item-progress'>
          <div className='fx-direction-column-center align-items-center mt-24'>
            <AddNewItem isProgress={true} type={selectedType.toLowerCase()} />
          </div>
      </Popup>}
    </div>
  )
}

export default EasyProgress;