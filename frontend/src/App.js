
import './App.css';
import React from 'react'

import {Menus, MainApp} from './Components'
function App() {
     return (
    <div className="app">
          <Menus/>
      <div className="app__main">
          <MainApp/>
      </div>
    </div>
  );
}
console.clear()
export default App;
