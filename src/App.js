import React, {Component} from "react";

import Steps from "./components/Steps";
import "./App.css";
import DataTable from "./components/DataTable";

class App extends Component{
  
  default= {
    showSteps: true,
    type: "csv",
    encoding: "UTF-8",
    delimiter: ",",
    hasHeaders: true,
    enableStep3: true,
    availableFields: [],
    selectedFields: [],
    focusedField: "",
    focusedFrom: "",
    content: {}
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
      let content = {};

      if(/\.csv$/.test(file.name)){
        data = data.split("\n");
        for (let i = 0; i < data.length; i++) {
          const row = data[i].split(this.state.delimiter).map(h=>h.trim().replaceAll('"', ""));
          let temp = {};
          
          if(this.state.hasHeaders){
            if(i===0){
              headers = row;
              continue;
            }
            
            for (let i = 0; i < row.length; i++) {
              temp[headers[i]] = row[i];
            }
          }
          else {
            temp = {...row};
            if(i===0){
              headers = Object.keys(row);
              continue;
            }
          }
          content[i] = temp;
        }
        fileType = "csv";

      }
      else if (/\.json$/.test(file.name)){
        data = JSON.parse(data);
        if(data.products && Object.keys(data.products)){
          headers = Object.keys(Object.values(data.products)[0]);
          content = data.products;
        }
        fileType = "json";
      }


      if(!this.state.enableStep3){
        this.setState({content: content, availableFields: headers, selectedFields: headers, type: fileType});
        return;
      }

      this.setState({content: content, availableFields: headers, type: fileType});
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
  
    this.setState({enableStep3: s3, selectedFields: [...this.state.availableFields]});
  }

  handleFieldFocus = (e, from)=>{
    if(!this.state.enableStep3) return;

    if (e.currentTarget === e.target) return;

    const field = e.target.innerText;
    this.setState({focusedField: field, focusedFrom: from});
  }

  handleFieldSelect = (e)=>{
    if(!this.state.enableStep3) return;

    if(this.state.focusedFrom === "available"){
      if (new Set(this.state.selectedFields).has(this.state.focusedField)){
        return;
      }
      this.setState({selectedFields: [...this.state.selectedFields, this.state.focusedField]});
    }
  }

  handleFieldDisselect = (e)=>{
    if(!this.state.enableStep3) return;

    if(this.state.focusedFrom === "selected"){
      if (!new Set(this.state.selectedFields).has(this.state.focusedField)){
        return;
      }
      this.setState({selectedFields: this.state.selectedFields.filter(field=>field !== this.state.focusedField)});
    }
  }

  handleCancel = (e)=>{
    this.setState({...this.default});
  }

  handleNext = (e)=>{
    if(this.state.selectedFields.length===0) {
      alert("Select Fields");
      return;
    }

    this.setState({showSteps: false});
  }

  
  render(){
    const {type, delimiter, encoding, hasHeaders, enableStep3, availableFields, selectedFields, focusedField, focusedFrom, content, showSteps} = this.state;


    return (
      <main>
        {showSteps && <Steps type={type} delimiter={delimiter} encoding={encoding} hasHeaders={hasHeaders} enableStep3={enableStep3} availableFields={availableFields} selectedFields={selectedFields} focusedField={focusedField} focusedFrom={focusedFrom} readFile={this.readFile} handleCancel={this.handleCancel} handleDelimiterChange={this.handleDelimiterChange} handleEnableStep3Change={this.handleEnableStep3Change} handleEncodingChange={this.handleEncodingChange} handleFieldDisselect={this.handleFieldDisselect} handleFieldFocus={this.handleFieldFocus} handleFieldSelect={this.handleFieldSelect} handleHasHeadersChange={this.handleHasHeadersChange} handleNext={this.handleNext} handleTypeChange={this.handleTypeChange} />}
        
        {!showSteps && 
          <DataTable headers={selectedFields} data={content} />}
      </main>
    );
  }
}

export default App;
