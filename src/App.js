import React from 'react';
import './App.css';


//routing
import { Route } from "react-router-dom";

//components
import Client from './containers/Client';

function App() {
  return (
    <div className="App">
      <Route path={"/"} component={Client} />
    </div>
  );
}

export default App;
