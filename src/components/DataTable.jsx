import React from "react";

export default function DataTable(props){
  const {data, headers} = props;
  console.log(data);

  return (
    <table>
      {headers && headers.length > 0 && 
        <thead>
          <tr>
            {headers.map(header=><th key={header}>{header}</th>)}
          </tr>
        </thead>
      }
      <tbody>
        {data && Object.keys(data).length > 0 && 
          Object.entries(data).map(([k, d])=>{
            return <tr key={k}>{headers.map(h=>{
              return (<td key={h}>{d[h]}</td>);
            })}</tr>
          })}
      </tbody>
    </table>
  )
}