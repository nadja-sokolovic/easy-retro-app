import React, { useEffect, useRef } from 'react';
import './EasyReport.scss';
import { getReportForTheSprint } from '../../../../services/api.service';
import { useError } from '../../../../utils/providers/ErrorProvider';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { ReportModel, ReportsBySprint } from 'models/report.model';
import { setReportForSprint } from 'store/slices/itemsSlice';

const EasyReport = () => {
  const dispatch = useDispatch();
  const selectedSprint = useSelector((state: RootState) => state.sprints.selectedSprint);
  const reports = useSelector((state: RootState) => state.items.reports);
  const { showError } = useError();

  const fetchInProgress = useRef<Record<number, boolean>>({});
  
  useEffect(() => {
    const hasReportFetched = (): boolean => {
      return reports.find(report => report.sprint === selectedSprint) !== undefined;
    }

    const fetchReportForTheSprint = async (): Promise<void> => {
      try {
        if(!fetchInProgress.current[selectedSprint] && !hasReportFetched()) {
          fetchInProgress.current[selectedSprint] = true;  // Mark fetch as in-progress for this sprint
          const sprintReport = await getReportForTheSprint(selectedSprint);
          dispatch(setReportForSprint({sprint: selectedSprint, report: sprintReport} as ReportsBySprint));
        }
      } catch (error) {
        showError();
      } finally {
        fetchInProgress.current[selectedSprint] = false; // Reset fetch progress for this sprint
      }
    }

    fetchReportForTheSprint();
  }, [dispatch, selectedSprint, showError, reports]);

  const findReportForSprint = (): ReportModel | null => {
    return reports.find(report => report.sprint === selectedSprint)?.report ?? null
  }

  return (
    <div className='w-100-p h-100-p fx-direction-center align-items-center'>
      {findReportForSprint() && findReportForSprint()?.reportId !== 0 ?
        <div className='report-container fx-direction-center align-items-center'>
          <span className='label w-800 fs-16 orange'>{findReportForSprint()?.text}</span>
        </div> :
        <span className='label w-800 fs-16 orange'>No report for this sprint</span>
      }
    </div>
  )
}

export default EasyReport;