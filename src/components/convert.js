import React from 'react';
import '../App.css';
import { dictionary } from './dictionary';

let vowels = [`a`, `e`, `i`, `o`, `u`];
function Convert({ setConverted, value }) {

    // Function to parse 

    function decipher(string) {
        // TODO: Convert text using Dictionary
        let deciphered = string;
        // get each word and put it in an array
        deciphered = deciphered.split(' ');
        // Check each word
        deciphered = deciphered.map(word =>
            // Special case: twin
            word.toLowerCase() === 'twin' ?
                dictionary[word.toLowerCase()][Math.floor(Math.random() * dictionary[word.toLowerCase()].length)]
                :// Word isn't twin 
                dictionary[word.toLowerCase()] ?
                    // The word exists in the dictionary
                    dictionary[word.toLowerCase()]
                    :// The word isnt a special case and needs to go thru grammar checks 
                    word.toLowerCase()
        ).join(' ');
        setConverted(deciphered);
    }
    return <>
        <button
            className='mobileConvertButton'
            onClick={() => decipher(value)}>
        </button>
        <button
            className='convertButton'
            onClick={() => decipher(value)}>
        </button>
    </>
}


export default Convert