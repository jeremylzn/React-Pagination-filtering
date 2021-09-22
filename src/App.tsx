import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import { BasicTable } from './components/BasicTable'; // Import Table component

function App() {

  const [data, setData] = useState([]);

  // useEffect to call the API once mounted and set the data
  useEffect(() => {
    (async () => {
      const result = await axios("PATIENTS.json"); // It's local file in public folder but can be external API
      console.log(result.data)
      setData(result.data);
    })();
  }, []);

  return (
    <div className="App">
      <h2>Patients List</h2>
      <BasicTable patients={data}/>
    </div>
  );
}

export default App;
