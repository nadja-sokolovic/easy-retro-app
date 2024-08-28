import React, { useEffect } from 'react';
import AppTopBar from '../AppTopBar/AppTopBar';
import Menu from '../Menu/Menu';
import { Outlet } from 'react-router-dom';
import './Layout.scss';
import { FunctionHelpers } from '../../../../utils/helpers/functions.helper';
import NoData from '../../../../components/NoData/NoData';
import { getSprints } from '../../../../services/api.service';
import { useError } from '../../../../utils/providers/ErrorProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { setSprints } from 'store/slices/sprintSlice';

const Layout = () => {
  const dispatch = useDispatch();
  const selectedSprint = useSelector((state: RootState) => state.sprints.selectedSprint);
  const { showError } = useError();

  useEffect(() => {
    const fetchSprints = async (): Promise<void> => {
      try {
        const data = await getSprints();
        dispatch(setSprints(FunctionHelpers.formatDataForSelect(data)));
      } catch (error) {
        showError();
      }
    };

    fetchSprints();
  }, [dispatch, showError]);
  
  return (
    <div className='layout-container'>
      <AppTopBar />
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
  )
}

export default Layout