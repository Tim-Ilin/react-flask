import React from 'react';
import './DownloadButton.scss'

export const DownloadButton = (props) => {
  const activeButton = props.url ? 'download-button active' : 'download-button'
  return (
    <>
      <a className={activeButton} href={props.url}>DOWNLOAD</a>
    </>
  );
};

export default DownloadButton