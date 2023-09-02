import './App.css';
import * as xlsx from 'xlsx';
import { useState } from 'react';
import Table from './component/customeTable';


function App() {
  const [partData, setPartData]=useState([]);
  const initialState = {
    pageSize: 10,
    pageIndex: 0
  };

  
  const handleConvertExcelToJson=(e)=>{
    e.preventDefault();
    if (e.target.files) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            const workbook = xlsx.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const json = xlsx.utils.sheet_to_json(worksheet);
            console.log(json);
            setPartData([...json]);
        };
        reader.readAsArrayBuffer(e.target.files[0])
    }
  }
  const columns = [
    {
      Header: "Child Part Number",
      accessor: "Child Part Description"
    },
    {
      Header: "Child Part Description",
      accessor: "Child Part Number"
    },
    {
      Header: "item reference number",
      accessor: "item reference number"
    },
    {
      Header: "quantity production",
      accessor: "quantity production"
    }
  ];
  return (
    <div className="App">
      <form>
      <div>
        <label htmlFor='selectFile'>Select File</label>
        <input type='file' id='selectFile' name='selectFile' onChange={handleConvertExcelToJson} />
      </div>
      </form>
      {partData && partData.length > 0 &&
      <div>
        <Table data={partData} columns={columns} initialState={initialState}/>
        
      </div>
      }
    </div>
  );
}

export default App;
