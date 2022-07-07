import React, { useState } from 'react';
import '../App.css';
import Convert from './convert';

function Input() {
    const [value, setValue] = useState('');
    const [converted, setConverted] = useState('');

    function handleChange(e) {
        setValue(e.target.value);
    }

    var x = window.matchMedia("(max-width: 786px)");
    return (
        <div className='midSection'>
            <p className='directions'>Type, then krank it</p>
            <div className='inputFields'>
                <textarea
                    placeholder={'Type here first...'}
                    onChange={(e) => handleChange(e)}
                ></textarea>
                {x.matches ? <Convert setConverted={setConverted} value={value} /> : null}
                <textarea
                    style={{ cursor: 'pointer' }}
                    placeholder={'Click to copy...'}
                    onClick={(e) => {
                        navigator.clipboard.writeText(converted || 'Type something first!')
                        console.log(e.target.value);
                    }}
                    value={converted}
                    readOnly
                ></textarea>
            </div>
            {x.matches ? null : <Convert setConverted={setConverted} value={value} />}
        </div>
    )
}

export default Input;