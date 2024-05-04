import { useState } from "react"
import { alphabet } from "./logic"

import Key from "./Key"

export default function KeyBoard({playerKey, setPlayerKey}) {
    
    const firstRow = 'qwertyuiop'
    const secondRow = 'asdfghjkl'
    const thirdRow = 'zxcvbnm'

    const [focusKey, setFocusKey] = useState(0)
    const [isOpen, setIsOpen] = useState(true)
    const [letterBelt, setLetterBelt] = useState(alphabet)

    const handleKeyPress = (input) => {
        setFocusKey(input)
        setIsOpen(true)
    }

    const placeLetter = (input) => {
        let temp = playerKey.split('')
        let belt = letterBelt.split('')

        temp[focusKey] = input;
        belt[alphabet.indexOf(input)] = '.';

        setPlayerKey(temp.join(''))
        setLetterBelt(belt.join(''))
        setIsOpen(false)
    }

    const clearLetter = () => {
        let temp = playerKey.split('')
        let belt = letterBelt.split('')

        belt[focusKey] = alphabet[focusKey];
        temp[focusKey] = '.';

        setPlayerKey(temp.join(''))
        setLetterBelt(belt.join(''))
        setIsOpen(false)
    }

    return (
        <div className="keyboard-component">
            <div className="keyboard">
                <div className="key-row">
                    {firstRow.split('').map(item => <Key letter={item} call={handleKeyPress} playerKey={playerKey}/>)}
                </div>
                <div className="key-row">
                    {secondRow.split('').map(item => <Key letter={item} call={handleKeyPress} playerKey={playerKey}/>)}
                </div>
                <div className="key-row">
                    {thirdRow.split('').map(item => <Key letter={item} call={handleKeyPress} playerKey={playerKey}/>)}
                </div>
            </div>
            <div className="back-drop" style={{display: isOpen ? 'flex' : 'none'}}>
                <div className="letter-selector">
                    <div style={{textAlign: "right"}}>
                        <button className="close" onClick={() => setIsOpen(false)}>Close X</button>
                    </div>
                    <div className="letter-piece-holder">
                        {letterBelt.split('').filter(item => item !== '.').map(item => <button className="letter-piece" onClick={() => placeLetter(`${item}`)}>{item.toUpperCase()}</button>)}
                    </div>
                    <div style={{textAlign: "center"}}>
                        <button className="letter-piece" onClick={clearLetter}>Clear</button>
                    </div>
                </div>
            </div>
        </div>
    )
}