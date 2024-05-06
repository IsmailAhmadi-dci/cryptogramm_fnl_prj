import { useEffect, useState } from "react"
import { alphabet } from "./logic"
import { UserData } from "../../App"
import { useContext } from "react"

import Key from "./Key"

export default function KeyBoard({playerKey, setPlayerKey}) {

    const [userData, setUserData, saveData, loadData, openModal, setOpenModal] = useContext(UserData)

    
    const firstRow = 'qwertyuiop'
    const secondRow = 'asdfghjkl'
    const thirdRow = 'zxcvbnm'

    const click1 = new Audio('../audio/sounds/click1.wav')
    const click2 = new Audio('../audio/sounds/click2.wav')
    const erase = new Audio('../audio/sounds/erase.mp3')

    const [focusKey, setFocusKey] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const [letterBelt, setLetterBelt] = useState(alphabet)

    const handleKeyPress = (input) => {
        setFocusKey(input)
        setIsOpen(true)
        click2.play()
    }

    const placeLetter = (input) => {
        let temp = playerKey.split('')
        let belt = letterBelt.split('')

        temp[focusKey] = input;
        setPlayerKey(temp.join(''))

        for (let i = 0 ; i < alphabet.length; i++) {
            if (temp.indexOf(alphabet[i]) === -1) {
                belt[i] = alphabet[i]
            } else {
                belt[i] = '.'
            }
        }
        
        setLetterBelt(belt.join(''))
        setIsOpen(false)

        setUserData(prev => ({...prev, currentGame: {...prev.currentGame, playerKey : temp.join('')}}))

        click1.play()
    }

    const clearLetter = () => {
        let temp = playerKey.split('')
        let belt = letterBelt.split('')

        // belt[focusKey] = alphabet[focusKey];

        temp[focusKey] = '.';
        setPlayerKey(temp.join(''))

        for (let i = 0 ; i < alphabet.length; i++) {
            if (temp.indexOf(alphabet[i]) === -1) {
                belt[i] = alphabet[i]
            } else {
                belt[i] = '.'
            }
        }

        setLetterBelt(belt.join(''))
        setIsOpen(false)

        setUserData(prev => ({...prev, currentGame: {...prev.currentGame, playerKey : temp.join('')}}))
        erase.play()
    }

    useEffect(() => {
        saveData()
    },[userData])


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
                        <button className="close" onClick={() => {setIsOpen(false) ; click2.play()}} title="Closing this dialogue box">Close X</button>
                    </div>
                    <div className="letter-piece-holder">
                        {letterBelt.split('').filter(item => item !== '.').map(item => <button className="letter-piece" onClick={() => placeLetter(`${item}`)}>{item.toUpperCase()}</button>)}
                    </div>
                    <div style={{textAlign: "center"}}>
                        <button className="letter-piece" onClick={clearLetter} title={`Will clear the value for letter "${alphabet[focusKey].toUpperCase()}"`}>Clear</button>
                    </div>
                </div>
            </div>
        </div>
    )
}