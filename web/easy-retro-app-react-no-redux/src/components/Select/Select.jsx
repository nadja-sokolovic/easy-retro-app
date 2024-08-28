import React, { useState } from 'react';
import './Select.scss';

const Select = ({label, items, selectItem, hasBackground}) => {
  const [selectedValue, setSelectedValue] = useState(label);
  const [isOpenedSelect, setOpenedSelect] = useState(false);

  const handleSelectItem = (itemValue) => {
    setSelectedValue(itemValue);
    setOpenedSelect(prevValue => !prevValue);
    selectItem(itemValue);
  }

  const selectContainerClasses = () => {
    return `select-container fx-direction-space-between align-items-center ${hasBackground ? 'background-orange' : ''}`;
  }

  return (
    <div className='select-wrapper'>
      <div className={selectContainerClasses()} onClick={() => setOpenedSelect(prevValue => !prevValue)}>
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

export default Select