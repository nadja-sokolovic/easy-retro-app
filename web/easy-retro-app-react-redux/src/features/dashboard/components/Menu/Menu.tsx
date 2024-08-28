import React from 'react';
import './Menu.scss';
import { useNavigate } from 'react-router-dom';
import { MenuItem } from 'models/helper.model';
import { RootState } from 'store/store';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedItemId } from 'store/slices/menuItemsSlice';

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedItemId = useSelector((state: RootState) => state.menuItems.selectedItemId);

  const menuItems: Array<MenuItem> = [
    { id: 1, value: 'Easy Items', path: '/items'} as MenuItem,
    { id: 2, value: 'Easy Progress', path: '/progress'} as MenuItem,
    { id: 3, value: 'Easy Report', path: '/report'} as MenuItem
  ];

  const handleItemClick = (item: MenuItem): void => {
    navigate(item.path);
    dispatch(setSelectedItemId(item.id));
  }

  const itemClasses = (itemId: number): string => {
    return `menu-item ${itemId === selectedItemId ? 'background-light-orange-3' : 'background-white'} w-100-p fx-direction-center align-items-center label w-800 fs-16 orange mb-12`;
  }

  return (
    <div className='menu-container'>
      <div className='menu-item-container fx-direction-column-center align-items-center'>
        {menuItems.map(item => (
          <div 
            key={item.id}
            className={itemClasses(item.id)} 
            onClick={() => handleItemClick(item)}>
            {item.value}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Menu;