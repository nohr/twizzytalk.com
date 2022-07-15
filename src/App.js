import React, { Suspense } from 'react';
import './App.css';
import Caption from './components/caption';
import Input from './components/input';


function App() {

  return (
    <Suspense fallback={<p>loading</p>}>
      <div className="App">
        <img alt="Twizzy Talk logo" className='logo' src={process.env.PUBLIC_URL + '/images/LOGO.png'} />
        <Input />
        <Caption />
      </div>
    </Suspense>
  );
}

export default App;
