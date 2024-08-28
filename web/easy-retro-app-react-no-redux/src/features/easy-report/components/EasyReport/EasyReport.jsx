import React, { useContext, useEffect, useState } from 'react';
import './EasyReport.scss';
import { AppContext } from '../../../dashboard/components/Layout/Layout';
import { getReportForTheSprint } from '../../../../services/api.service';
import { useError } from '../../../../utils/providers/ErrorProvider';

const EasyReport = () => {
  const { selectedSprint } = useContext(AppContext);
  const [report, setReport] = useState(null);
  const { showError } = useError();
  
  useEffect(() => {
    const fetchReportForTheSprint = async () => {
      try {
        setReport(await getReportForTheSprint(selectedSprint));
      } catch (error) {
        showError();
      }
    }

    fetchReportForTheSprint();
  }, [selectedSprint, showError]);

  return (
    <div className='w-100-p h-100-p fx-direction-center align-items-center'>
      {report && report.reportId !== 0 ?
        <div className='report-container fx-direction-center align-items-center'>
          <span className='label w-800 fs-16 orange'>{report.text}</span>
        </div> :
        <span className='label w-800 fs-16 orange'>No report for this sprint</span>
      }
    </div>
  )
}

export default EasyReport;