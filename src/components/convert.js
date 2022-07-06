import React from 'react';
import '../App.css';

function Convert({ setConverted, value }) {

    function decipher() {
        // TODO: Convert text using cipher
        setConverted(value);
    }
    return <>
        <button
            className='mobileConvertButton'
            onClick={() => decipher()}>
        </button>
        <button
            className='convertButton'
            onClick={() => decipher()}>
        </button>
    </>
}


export default Convert