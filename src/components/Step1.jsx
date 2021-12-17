import React from 'react';
import "../assets/css/Step.css";


export default function Step1(props){
  const {readFile} = props;

  return (
    <div className='step-1 step-container step-shadow'>
      <div className='step-no'>Step 1:</div>
      <div className='step-content'>
        <div className='step-content-heading'>Select File</div>
        <div>
          <input accept=".json, .csv" type="file" onInput={e=>readFile(e)} className='block step-input' />
        </div>
        <div className='block'>Supported File Type(s): .CSV, .JSON</div>
      </div>
    </div>
  );
}