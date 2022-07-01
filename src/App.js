import { useState } from 'react';
import './App.css';


function App() {
  const [value, setValue] = useState(null);
  const [converted, setConverted] = useState(null);

  function handleChange(e) {
    setValue(e.target.value);
    console.log(value);
  }

  function convert() {
    // TODO: Convert text using cipher
    setConverted(value);
  }

  return (
    <div className="App">
      <img alt="Twizzy Talk logo" className='logo' src={process.env.PUBLIC_URL + '/images/LOGO.png'} />
      <p>
        Type, then krank it
      </p>
      <div className='inputFields'>
        <textarea
          placeholder={'Type here first...'}
          onChange={(e) => handleChange(e)}
        ></textarea>
        <textarea
          placeholder={'Click to copy...'}
          onClick={() => {
            navigator.clipboard.writeText(converted || 'Type something first!')
          }}
          value={converted}
          readOnly
        ></textarea>
      </div>
      <button
        className='convertButton'
        onClick={() => convert()}>
      </button>
    </div>
  );
}

export default App;
