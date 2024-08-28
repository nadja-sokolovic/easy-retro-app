import React, { useState } from 'react';
import './Menu.scss';
import { useLocation, useNavigate } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedItemId, setSelectedItemId] = useState(location.state ? location.state.selectedItemId : 0);

  const handleItemClick = (item) => {
    navigate(item.path);
    setSelectedItemId(item.id);
  }

  const itemClasses = (itemId) => {
    return `menu-item ${itemId === selectedItemId ? 'background-light-orange-3' : 'background-white'} w-100-p fx-direction-center align-items-center label w-800 fs-16 orange mb-12`;
  }
  
  const menuItems = [
    { id: 1, value: 'Easy Items', path: '/items'},
    { id: 2, value: 'Easy Progress', path: '/progress'},
    { id: 3, value: 'Easy Report', path: '/report'}
  ];

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