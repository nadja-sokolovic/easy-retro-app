import React from 'react';

function NoData({hasImage, noDataText}) {
  const getClasses = () => {
    return `label ${hasImage ? 'mt-24': ''} w-500 fs-24 orange`;
  }

  return (
    <div className='fx-direction-column-center align-items-center w-100-p h-100-p'>
      { hasImage && <span className='no-data'></span> }
      <span className={ getClasses() }>{ noDataText }</span>
    </div>
  )
}

export default NoData;