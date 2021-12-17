import React from 'react';
import "../assets/css/Step.css";


export default function Step3(props){
  const {enableStep3, onEnableStep3Change, availableFields, selectedFields, focusedField, onFieldSelect, onFieldDisselect, onFieldFocus} = props;

  return (
    <div className='step-3 step-container step-shadow'>
      <div className='step-no'>
        <input type="checkbox" checked={enableStep3} onChange={onEnableStep3Change} /> Step 3:
      </div>
      <div className='step-content'>
        <div className='step-content-heading'>Display Handling</div>
        <div className='field-selector-container'>
          <div>Select the fields to be displayed</div>
          <div className='field-selector'>
            <div className='fields-container'>
              <span className="block fields-container-heading">Available Fields</span>
              <div className="fields" onClick={e=>onFieldFocus(e, "available")}>
                {availableFields && availableFields.map(field=><div className={`field ${focusedField ? "field-focused" : ""}`}>{field}</div>)}
              </div>
            </div>
            <div className='field-selector-button-container'>
              <button className="block field-selector-button" onClick={onFieldSelect}>&raquo;</button>
              <button className="block field-selector-button" onClick={onFieldDisselect}>&laquo;</button>
            </div>
            <div className='fields-container'>
              <span className="block fields-container-heading">Fields to be Displayed</span>
              <div className="fields" onClick={e=>onFieldFocus(e, "selected")}>
                {selectedFields && selectedFields.map(field=><div className={`field ${focusedField ? "field-focused" : ""}`}>{field}</div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}