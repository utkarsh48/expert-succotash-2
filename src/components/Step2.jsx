import React from 'react';
import "../assets/css/Step.css";


export default function Step2(props){
  const {hasHeaders, type, encoding, delimiter, onHasHeadersChange, onTypeChange, onEncodingChange, onDelimiterChange} = props;

  return (
    <div className='step-2 step-container step-shadow'>
      <div className='step-no'>Step 2:</div>
      <div className='step-content'>
        <div className='step-content-heading'>Specify Format</div>
        <div className='step-series'>
          <div>
            <label className='block'>File Type</label>
          </div>
          <div>
            <select name="f-type" onChange={e=>onTypeChange(e)} value={type}>
              <option value="csv">CSV</option>
              <option value="json">JSON</option>
            </select>
          </div>
        </div>
        <div className='step-series'>
          <div>
            <label className='block'>Character Encoding</label>
          </div>
          <div>
            <select name="encoding" onChange={e=>onEncodingChange(e)} value={encoding}>
              <option value="UTF-8">UTF-8</option>
              <option value="UTF-16">UTF-16</option>
              <option value="UTF-32">UTF-32</option>
            </select>
          </div>
        </div>
        <div className='step-series'>
          <div>
            <label className='block'>Delimiter</label>
          </div>
          <div>
            <select value={delimiter} onChange={e=>onDelimiterChange(e)} name="delimiter">
              <option value=",">comma</option>
              <option value=";">semi-colon</option>
            </select>
          </div>
        </div>
        <div className='step-series'>
          <div>
            <label className='block'>Has Header</label>
          </div>
          <div>
            <input disabled={type==="json"} name="has-header" checked={hasHeaders} onChange={e=>onHasHeadersChange(e)} type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  );
}