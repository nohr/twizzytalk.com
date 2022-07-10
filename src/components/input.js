import React, { useState } from 'react';
import '../App.css';
import Convert from './convert';
import useSound from 'use-sound';

function Input() {
    const [value, setValue] = useState('');
    const [converted, setConverted] = useState('');
    const [copySFX] = useSound(process.env.PUBLIC_URL + `/assets/copy.mp3`)

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
                    onClick={() => {
                        navigator.clipboard.writeText(converted || 'Type something first!')
                        copySFX()
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