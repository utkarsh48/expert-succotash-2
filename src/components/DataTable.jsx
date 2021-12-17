import React from "react";

export default function DataTable(props){
  const {data, headers} = props;

  return (
    <table>
      {headers && headers.length && 
        <thead>
          <tr>
            {headers.map(header=><th>{header}</th>)}
          </tr>
        </thead>
      }
      <tbody>
        {data && data.length && 
          <tr>
            {data.map(d=>{
              return headers.map(h=>{
                return (<td>d[h]</td>);
              });
            })}
          </tr>
        }
      </tbody>
    </table>
  )
}