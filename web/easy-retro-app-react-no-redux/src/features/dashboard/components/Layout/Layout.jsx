import React, { createContext, useEffect, useState } from 'react';
import AppTopBar from '../AppTopBar/AppTopBar';
import Menu from '../Menu/Menu';
import { Outlet } from 'react-router-dom';
import './Layout.scss';
import { FunctionHelpers } from '../../../../utils/helpers/functions.helper';
import NoData from '../../../../components/NoData/NoData';
import { getSprints } from '../../../../services/api.service';
import { useError } from '../../../../utils/providers/ErrorProvider';

// To provide selected sprint into the Outlet (EasyItems, EasyProgress, EasyReport)
export const AppContext = createContext({selectedSprint: 0});

const Layout = () => {
  const [sprints, setSprints] = useState([]);
  const [selectedSprint, setSelectedSprint] = useState(0);
  const { showError } = useError();

  useEffect(() => {
    const fetchSprints = async () => {
      try {
        const data = await getSprints();
        setSprints(FunctionHelpers.formatDataForSelect(data));
      } catch (error) {
        showError();
      }
    };

    fetchSprints();
  }, [showError]);

  const selectSprint = (sprint) => {
    setSelectedSprint(sprint); // keep the info about selected sprint
  }
  
  return (
    <AppContext.Provider value={{selectedSprint}}>
      <div className='layout-container'>
        <AppTopBar sprints={sprints} selectedSprint={selectSprint} />
        { selectedSprint ? 
          // layout with menu and content
          <div className='layout-body'>
          <Menu />
          <div className='w-100-p h-100-p'>
            <Outlet />
          </div>
        </div> :
        // no data screen where user can see instructions to select the sprint
        <NoData hasImage={true} noDataText='Please select sprint or create a new one'/>
        }
      </div>
      {/* {isPopupOpen && (
        <Popup closePopup={() => setIsPopupOpen(false)}>
          <div className='fx-direction-column-center align-items-center mt-24'>
            <span className='label w-800 fs-16 orange mb-24'>Oops, something went wrong</span>
          </div>
        </Popup>
      )} */}
    </AppContext.Provider>

  )
}

export default Layout