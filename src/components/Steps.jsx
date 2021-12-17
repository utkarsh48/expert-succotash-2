import React, { Component } from 'react';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import "../assets/css/Steps.css";

export default class Steps extends Component {

  default= {
    type: "csv",
    encoding: "UTF-8",
    delimiter: ",",
    hasHeaders: true,
    enableStep3: true,
    availableFields: [],
    selectedFields: [],
    focusedField: "",
    focusedFrom: "",
  }
  state = {...this.default}

  readFile = (e)=>{
    const input = e.currentTarget;
    const file = input.files[0];


    if(!file) {
      alert("File not found");
      return;
    }

    const reader = new FileReader();    
    reader.readAsText(file, this.state.encoding);

    reader.onload = (e)=>{
      let data = reader.result;
      
      let headers = [];
      let fileType = "";

      if(/\.csv$/.test(file.name) && this.state.hasHeaders){
        headers = data.split("\n")[0].split(this.state.delimiter);
        fileType = "csv";
      }
      else if (/\.json$/.test(file.name)){
        data = JSON.parse(data);
        if(data.products && Object.keys(data.products)){
          headers = Object.keys(Object.values(data.products)[0]);
        }
        fileType = "json";
      }


      this.setState({availableFields: headers, type: fileType});
    }

  }

  handleTypeChange = (e)=>{
    const type = e.currentTarget.value;
    this.setState({type: type});
  }

  handleEncodingChange = (e)=>{
    const enc = e.currentTarget.value;
    this.setState({encoding: enc});
  }

  handleDelimiterChange = (e)=>{
    const deli = e.currentTarget.value;
    this.setState({delimiter: deli});
  }

  handleHasHeadersChange = (e)=>{
    const hasH = e.currentTarget.checked;
    this.setState({hasHeaders: hasH});
  }

  handleEnableStep3Change = (e)=>{
    const s3 = e.currentTarget.checked;
    this.setState({enableStep3: s3});
  }

  handleFieldFocus = (e, from)=>{
    if (e.currentTarget === e.target) return;

    const field = e.target.innerText;
    this.setState({focusedField: field, focusedFrom: from});
  }

  handleFieldSelect = (e)=>{
    if(this.state.focusedFrom === "available"){
      this.setState({selectedFields: [...this.state.selectedFields, this.state.focusedField]});
    }
  }

  handleFieldDisselect = (e)=>{
    if(this.state.focusedFrom === "selected"){
      this.setState({selectedFields: this.state.selectedFields.filter(field=>field !== this.state.focusedField)});
    }
  }

  handleCancel = (e)=>{
    this.setState({...this.default});
  }

  handleNext = (e)=>{
    
  }



  render(){
    const {type, delimiter, encoding, hasHeaders, enableStep3, availableFields, selectedFields, focusedField, focusedFrom} = this.state;

    return (
      <div className="steps-container">
        <Step1 readFile={this.readFile} />
        <Step2 type={type} delimiter={delimiter} encoding={encoding} hasHeaders={hasHeaders} onTypeChange={this.handleTypeChange} onEncodingChange={this.handleEncodingChange} onDelimiterChange={this.handleDelimiterChange} onHasHeadersChange={this.handleHasHeadersChange} />
        <Step3 enableStep3={enableStep3} onEnableStep3Change={this.handleEnableStep3Change} availableFields={availableFields} selectedFields={selectedFields} focusedField={focusedField} onFieldFocus={this.handleFieldFocus} onFieldSelect={this.handleFieldSelect} onFieldDisselect={this.handleFieldDisselect} focusedFrom={focusedFrom} />
        <div className='bottom-btns'>
          <div>
            <button onNext={this.handleNext} className='btn-pri'>Next</button>
            <button onClick={this.handleCancel} className='btn-war'>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}