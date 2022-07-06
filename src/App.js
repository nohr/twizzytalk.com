import React from 'react';
import './App.css';
import Caption from './components/caption';
import Input from './components/input';


function App() {

  return (
    <div className="App">
      <img alt="Twizzy Talk logo" className='logo' src={process.env.PUBLIC_URL + '/images/LOGO.png'} />
      <Input />
      <Caption />
    </div>
  );
}

export default App;
