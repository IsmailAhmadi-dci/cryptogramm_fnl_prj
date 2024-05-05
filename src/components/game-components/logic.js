import quotes from './data.js';

export const alphabet = 'abcdefghijklmnopqrstuvwxyz';

// functions : *****************************************************

function scramblepattern() {
    let charArray = alphabet.split('');

    for (let i = charArray.length ; i > 0 ; i--) {
        const j = Math.floor(Math.random() * charArray.length);

        [charArray[i], charArray[j]] = [charArray[j], charArray[i]]
    }

    return charArray.join('');
}

function encodeText(text, pattern) {
    const newStr = text.toLowerCase();
    let encoded = ''

    for (let i = 0; i < newStr.length ; i++) {
        const charIndex = alphabet.indexOf(newStr[i]);
        if (charIndex !== -1) {
            encoded += pattern[charIndex] ;
        } else {
            encoded += newStr[i];
        }
    }

    return encoded
}

function compareKeyGenerator(text, pattern) {
    let result = '';

    for (let i = 0 ; i < pattern.length; i++) {
        const charIndex = text.indexOf(pattern[i]);

        if (charIndex !== -1) {
            result += pattern[i];
        } else {
            result += '.';
        }
    }

    return result;
}


class Game {
    constructor () {
        this.mixPattern = scramblepattern() ;
        this.originalMessageObject = quotes[Math.floor(Math.random() * quotes.length)];
        this.hashedMessageObject = {
            id: this.originalMessageObject.id,
            quote: encodeText(this.originalMessageObject.quote, this.mixPattern),
            author: encodeText(this.originalMessageObject.author, this.mixPattern)
        };
        this.gameKey = compareKeyGenerator(this.hashedMessageObject.quote + this.hashedMessageObject.author, this.mixPattern)
    }
}


export default Game;