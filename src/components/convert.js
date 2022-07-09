import React from 'react';
import '../App.css';

// Dictionary: Lowercase key is necessary
const dictionary = {
    and: 'an',
    balenciaga: 'Balencï',
    before: 'B4',
    brotha: 'brudda',
    brother: 'brudda',
    call: 'call',
    ecstasy: 'X ta C',
    flashy: 'flashey',
    for: '4',
    fore: '4',
    four: '4',
    just: 'jus',
    la: 'Ella',
    life: 'lyfë',
    like: 'lyke',
    love: 'luv',
    lying: 'lying',
    million: 'mil',
    mud: 'mudd',
    okay: 'ok',
    one: '1',
    piece: 'peice',
    sleeptalking: 'sleeptalking',
    something: 'sum',
    summers: 'summrs',
    that: 'dat',
    the: 'tha',
    to: '2',
    trendy: 'trëndi',
    tried: 'trië',
    true: 'tru',
    twin: ['twizz', 'twizzzz', 'twizzy'],
    two: '2',
    war: 'WAR'
};

function Convert({ setConverted, value }) {

    // Special spelling cases
    function spell(word) {
        if (word.toLowerCase().indexOf("'") !== -1) {
            return word.replace(/'/g, '');
        }
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
        } else {
            return word;
        };
    }

    function spell2(string) {
        return string.replaceAll(/((?!.*is)\w+)s/gim, `$1z`)
            .replaceAll(/([b-df-hj-np-tv-z])e/gi, `$1ë`);
    }

    // Contractions
    function contract(string) {

        return string.replaceAll(/already know?/gi, 'ard know')
            .replaceAll(/on the|on da/gi, 'onna');
    }

    // Check for sequence
    function sequence(array) {
        // function hashtag(array) {
        //     // TODO: Add hashtags at first or last
        //     return array;
        // }
        for (let i = 0; i < array.length; i++) {
            if (array[0]) {
                // // Add hashtags at first or last
                // array = hashtag(array);
                // // TODO: Capitalize X and Y
                // if (array[i].charAt(0).toUpperCase() === 'X' || array[i].charAt(0).toUpperCase() === 'Y') {
                //     const randIndex = Math.floor(Math.random() * hashGroup.length);
                //     array[i] = word;
                // }
            }
            if (array[1]) {
                // There is more than 1 word
                if (array[i - 1] && array[i].toLowerCase() === array[i - 1].toLowerCase()) {
                    // Capitalize repeat
                    array[i - 1] = array[i - 1].charAt(0).toUpperCase() + array[i - 1].slice(1)
                    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1)
                } else if (array[1] && (array[0].toLowerCase() !== array[1].toLowerCase())) {
                    // Capitalize first word 
                    array[0] = array[0].charAt(0).toUpperCase() + array[0].slice(1)
                }
                if ((Number.parseInt(array[i]) !== 'NaN') && array[i + 1] && (array[i + 1].toLowerCase() === 'you' || array[i + 1].toLowerCase() === 'u')) {
                    // Make you, U
                    array[i + 1] = 'U'
                }
                if (array[i].toLowerCase() === 'live' && array[i + 1] && array[i + 1].toLowerCase() === 'high') {
                    // Change high to hi
                    array[i + 1] = array[i + 1].split(array[i + 1][2])[0]
                }
                if ((array[0] && array[1] && array[2])) {
                    //There are more than 3 words
                    if (array[i].toLowerCase() === 'tru' && array[i + 2] && (array[i + 2].toLowerCase() === 'you' || array[i + 2].toLowerCase() === 'u')) {
                        array[i + 1] = 'to'
                    }
                }
            }
        }
        return array;
    }

    // Function to parse 
    function decipher(string) {
        let deciphered = string;
        deciphered = contract(deciphered);
        // Get each word and put it in an array
        deciphered = deciphered.split(' ');
        // Check each word in entrance
        deciphered = deciphered.map(word =>
            // Special case: don't
            (word.toLowerCase() === `don't` || word.toLowerCase() === `dont`) ?
                'dnt'
                :// Special case: twin
                word.toLowerCase() === 'twin' ?
                    dictionary[word.toLowerCase()][Math.floor(Math.random() * 3)]
                    :// Word isn't 'twin', check if it's in the dictionary 
                    dictionary[word.toLowerCase()] ?
                        // The word exists in the dictionary
                        dictionary[word.toLowerCase()]
                        :// The word isnt a special case and needs to go thru spelling checks 
                        spell(word)
        );
        deciphered = sequence(deciphered);
        deciphered = spell2(deciphered.join(' '));
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