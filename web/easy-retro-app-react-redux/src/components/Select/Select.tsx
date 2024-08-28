import React, { useEffect } from 'react';
import './Select.scss';
import { SelectData } from 'models/helper.model';
import { useDispatch, useSelector } from 'react-redux';
import { changeSelectState, initializeSelect, setSelectedValue } from 'store/slices/selectSlice';
import { RootState } from 'store/store';

interface SelectProps {
  id: string;
  label: string | number;
  items: Array<SelectData>;
  selectItem: (param: string | number) => void;
  hasBackground: boolean;
}

const Select: React.FC<SelectProps> = ({id, label, items, selectItem, hasBackground}) => {
  const dispatch = useDispatch();
  const selectedValue = useSelector((state: RootState) => state.select.selects[id]?.selectedValue);
  const isOpenedSelect = useSelector((state: RootState) => state.select.selects[id]?.isOpened);

  useEffect(() => {
    // Initialize select data
    dispatch(initializeSelect({id, label, items}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectItem = (value: string | number) : void => {
    dispatch(setSelectedValue({id, value}));
    updateSelectState(false);
    selectItem(value);
  }

  const selectContainerClasses = (): string => {
    return `select-container fx-direction-space-between align-items-center ${hasBackground ? 'background-orange' : ''}`;
  }

  const updateSelectState = (isOpened: boolean): void => {
    dispatch(changeSelectState({id, isOpened}));
  }

  return (
    <div className='select-wrapper'>
      <div className={selectContainerClasses()} onClick={() => updateSelectState(!isOpenedSelect)}>
        <span className='label-container label w-500 fs-16 white'>{selectedValue}</span>
        <div className='arrow-container fx-direction-center align-items-center'>
          <span className={isOpenedSelect ? 'arrow-up' : 'arrow-down'}></span>
        </div>
      </div>
      { isOpenedSelect && <div className='select-values-container fx-direction-column-start align-items-start'>
        <div>
          {items.map((item) => (
            <div key={item.id} className='select-value label w-500 fs-16 orange' onClick={ () => handleSelectItem(item.value) }>{item.text ? item.text : item.value}</div>
          ))}
        </div>
      </div> }
    </div>
  )
}

export default Select;
