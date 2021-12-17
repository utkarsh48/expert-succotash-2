import React from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import "../assets/css/Steps.css";

export default function Steps(props) {

  const {type, delimiter, encoding, hasHeaders, enableStep3, availableFields, selectedFields, focusedField, focusedFrom, readFile, handleCancel, handleDelimiterChange, handleEnableStep3Change, handleEncodingChange, handleFieldDisselect, handleFieldFocus, handleFieldSelect, handleHasHeadersChange, handleNext, handleTypeChange} = props;

  return (
    <div className='steps-container'>
      <div className='steps-heading'>Import Products</div>

      <div className="steps">
        <Step1 readFile={readFile} />
        <Step2 type={type} delimiter={delimiter} encoding={encoding} hasHeaders={hasHeaders} onTypeChange={handleTypeChange} onEncodingChange={handleEncodingChange} onDelimiterChange={handleDelimiterChange} onHasHeadersChange={handleHasHeadersChange} />
        <Step3 enableStep3={enableStep3} onEnableStep3Change={handleEnableStep3Change} availableFields={availableFields} selectedFields={selectedFields} focusedField={focusedField} onFieldFocus={handleFieldFocus} onFieldSelect={handleFieldSelect} onFieldDisselect={handleFieldDisselect} focusedFrom={focusedFrom} />
        <div className='bottom-btns'>
          <div>
            <button onClick={handleNext} className='btn-pri'>Next</button>
            <button onClick={handleCancel} className='btn-war'>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}