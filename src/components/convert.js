import React from 'react';
import '../App.css';
import { dictionary } from './dictionary';

let vowels = [`a`, `e`, `i`, `o`, `u`];
function Convert({ setConverted, value }) {

    function char(word) {
        if (word === 'Geek') {
            return 'Geëk';
        } else if (word.charAt(word.length - 3) === 'i') {
            return word.replace(/ing/g, 'in');
        } else if (word.toLowerCase().indexOf("ie") !== -1) {
            return word.replace(/ie/g, 'ië');
        } else if (word.toLowerCase().indexOf("ee") !== -1) {
            return word.replace(/ee/g, 'ëe');
        } else if (word.toLowerCase().indexOf("ea") !== -1) {
            return word.replace(/ea/g, 'ëa');
        } else if (word.toLowerCase().indexOf("ck") !== -1) {
            return word.replace(/ck/g, 'k');
        } else if (word.toLowerCase().indexOf("'") !== -1) {
            return word.replace(/'/g, '');
        } else if (word.charAt(word.length - 1) === 's') {
            return word.replace(/.$/, 'z');
        } else {
            return word;
        }
    }

    // Function to parse 
    function decipher(string) {
        let deciphered = string;
        // Get each word and put it in an array
        deciphered = deciphered.split(' ');
        // Check each word in entrance
        deciphered = deciphered.map(word =>
            // Special case: twin
            word.toLowerCase() === 'twin' ?
                dictionary[word.toLowerCase()][Math.floor(Math.random() * 3)]
                :// Word isn't 'twin', check if it's in the dictionary 
                dictionary[word.toLowerCase()] ?
                    // The word exists in the dictionary
                    dictionary[word.toLowerCase()]
                    :// The word isnt a special case and needs to go thru grammar checks 
                    char(word)
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