import React, { useRef, useState } from 'react';
import '../App.css';
import Convert from './convert';

export const x = window.matchMedia("(max-width: 786px)");

function Input() {
    const [value, setValue] = useState('');
    const [converted, setConverted] = useState('');
    const input = useRef(null);

    function handleChange(e) {
        setValue(e.target.value);
    }
    return (
        <div className='midSection'>
            <p className='directions'>Type, then krank it</p>
            <div className='inputFields'>
                <textarea
                    placeholder={x.matches ? 'Type here...' : 'Type here first...'}
                    onChange={(e) => handleChange(e)}
                    value={value}
                    ref={input}
                ></textarea>
                {x.matches ? null : <textarea
                    placeholder={'Select to copy...'}
                    onSelect={() => {
                        navigator.clipboard.writeText(converted || 'Type something first!')
                    }}
                    value={converted}
                    readOnly
                ></textarea>}
            </div>
            <Convert setConverted={setConverted} converted={converted} setValue={setValue} value={value} input={input} />
        </div>
    )
}

export default Input;