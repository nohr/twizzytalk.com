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
    crank:'krank',
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
        } else if (dictionary[word.toLowerCase()]) {
            return dictionary[word.toLowerCase()];
        } else if (word.toLowerCase() === `don't` || word.toLowerCase() === `dont`) {
            return 'dnt';
        } else if (word.toLowerCase() === 'twin') {
            return dictionary[word.toLowerCase()][Math.floor(Math.random() * 3)];
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
            for (let i = 0; i < word.length; i++) {
                if (word[i] === 'e' && word[i] === word[i + 2]) {
                    return word.split(word[i]).join('');
                }
            }
            return word.replaceAll(/((?!.*is)\w+)s/gim, `$1z`)
                .replaceAll(/([b-df-hj-np-tv-z])e/gi, `$1ë`)
                .replaceAll(/([X])/gi, `X`)
                .replaceAll(/([Y])/gi, `Y`);
        };
    }

    // Check for Contractions
    function contract(string) {

        return string.replaceAll(/already know?/gi, 'ard know')
            .replaceAll(/on the|on da/gi, 'onna');
    }

    // Check for sequence
    function sequence(array) {
        if (array[0]) {
            // There is at least a word so we start by adding hashes
            (Math.floor(Math.random() * 2) === 0) ? array.push('#') : array.unshift('#');
        }
        // Iterate through array
        for (let i = 0; i < array.length; i++) {
            if (array[1]) {
                // There is more than 1 word
                if (array[i + 1] && array[i].toLowerCase() === array[i + 1].toLowerCase()) {
                    // Capitalize repeat
                    array[i] = array[i].charAt(0).toUpperCase() + array[i].slice(1)
                    array[i + 1] = array[i + 1].charAt(0).toUpperCase() + array[i + 1].slice(1)
                } else if ((array[0].toLowerCase() !== array[1].toLowerCase())) {
                    // Capitalize first word 
                    array[0] = array[0].charAt(0).toUpperCase() + array[0].slice(1)
                }
                if ((Number.parseInt(array[i]) !== 'NaN') && array[i + 1] && (array[i + 1].toLowerCase() === 'you' || array[i + 1].toLowerCase() === 'u')) {
                    // Make you, U because an integer preceeds it
                    array[i + 1] = 'U'
                }
                if (array[i].toLowerCase() === 'live' && array[i + 1] && array[i + 1].toLowerCase() === 'high') {
                    // Change high to hi because 'live' preceeds it 
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

    // Function to parse initial string
    function decipher(string) {
        let deciphered = string;
        deciphered = contract(deciphered);
        // Put each word in an array then spell each word
        deciphered = deciphered.split(' ')
            .map(word => spell(word));
        //  Check for sequential exceptions
        deciphered = sequence(deciphered);
        setConverted(deciphered.join(' '));
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