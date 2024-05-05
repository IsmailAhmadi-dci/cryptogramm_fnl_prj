import { UserData } from "../App"
import { useContext, useEffect, useReducer, useState } from "react"
import Game from "./game-components/logic"


import Message from "./game-components/Message"
import KeyBoard from "./game-components/KeyBoard"
import GameControl from "./game-components/GameControl"
import Header from "./game-components/Header"
import Pause from "./game-components/Pause"
import NewGameSuggestion from "./game-components/NewGame"

export const endedGame = {
    isEnded: true,
    isRunning: false,
    startDate: false,
    hashMessageObject : ' ',
    mixPattern : false,
    gameKey: false,
    gameTime: 0 ,
    playerKey: ''
}

export default function PlayArea() {

    const [userData, setUserData, saveData, loadData] = useContext(UserData)
    const [playerKey, setPlayerKey] = useState('..........................')
    const [onGoingGame , setOnGoingGame] = useState(userData.currentGame ? userData.currentGame : null)

    const click3 = new Audio('../audio/sounds/click3.wav')

    const gameAction = (action) => {
        const tempGame = userData.currentGame ? structuredClone(userData.currentGame) : null
        switch (action) {
            case 'new' :
                const newGame = new Game()
                const temp = {
                    isEnded: false,
                    isRunning: true,
                    startDate: new Date(),
                    hashMessageObject : newGame.hashedMessageObject,
                    mixPattern : newGame.mixPattern,
                    gameKey: newGame.gameKey,
                    gameTime: 0 ,
                    playerKey: playerKey
                }
                setUserData(prev => ({...prev, currentGame: temp}))
            break;
            case 'resign' :
                const record = {
                    playerName: userData.playerName,
                    start: tempGame.startDate,
                    end: new Date(),
                    result: 'resigned'
                }

                const copyRecords = structuredClone(userData.records) ;
                copyRecords.push(record)

                setUserData(prev => ({...prev, currentGame: endedGame, records : copyRecords}))
            break;
            case 'success' :
                const successRecord = {
                    playerName: userData.playerName,
                    start: tempGame.startDate,
                    end: new Date(),
                    result: 'success'
                }

                const suRecords = structuredClone(userData.records)
                suRecords.push(successRecord)

                setUserData(prev => ({...prev, currentGame: endedGame, records : suRecords}))
            break
            case 'play' :
                setUserData(prev => ({...prev, currentGame: {...prev.currentGame, isRunning: true}}))
            break
            case 'pause' :
                setUserData(prev => ({...prev, currentGame: {...prev.currentGame, isRunning: false}}))
            break
        }
        click3.play()
    }


    useEffect(() => {
        saveData()
    },[])

    useEffect(() => {
        loadData()
    },[])

    useEffect(() => {
        saveData()
    },[userData])

    useEffect(() => {
        if (userData.currentGame.isRunning) {
            const intervalId = setInterval(() => {
                setUserData(prev => ({
                    ...prev,
                    currentGame: {
                        ...prev.currentGame,
                        gameTime: prev.currentGame.gameTime + 1
                    }
                }));
            }, 1000);
    
            return () => clearInterval(intervalId); // Cleanup function to clear the interval when the component unmounts
        }
    }, [userData.currentGame.isRunning]); // Trigger the effect when the isRunning property of currentGame changes
    


    return (
        <>
            <Header userData={userData} />
            <div className="play-area">
                <div className="main">
                    <KeyBoard playerKey={playerKey} setPlayerKey={setPlayerKey}/>
                    <div className="paper-bg paper">
                        <p className="watermark">TOP SECRET</p>
                        <Message  quote={userData.currentGame !== null ? userData.currentGame.hashMessageObject.quote : ' '} author={userData.currentGame !== null ? userData.currentGame.hashMessageObject.author : ' '} playerKey={playerKey} isVisible={!userData.currentGame.isEnded && userData.currentGame.isRunning}/>
                        <Pause isVisible={!userData.currentGame.isEnded && !userData.currentGame.isRunning}/>
                        <NewGameSuggestion isVisible={userData.currentGame.isEnded}/>
                    
                    </div>
                    <GameControl gameAction={gameAction}/>
                </div>
            </div>
        </>
    )
}