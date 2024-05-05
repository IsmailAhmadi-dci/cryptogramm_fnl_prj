// Main Packages: ************************************************
import { UserData } from "../App"
import { useContext, useEffect, useReducer, useState } from "react"
import Game from "./game-components/logic"

// Components: **************************************************
import Message from "./game-components/Message"
import KeyBoard from "./game-components/KeyBoard"
import GameControl from "./game-components/GameControl"
import Header from "./game-components/Header"
import Pause from "./game-components/Pause"
import NewGameSuggestion from "./game-components/NewGame"
import Footer from "./game-components/Footer"


// Modal contents : ***************************************
import Help from "./modal-contents/Help"
import AboutMe from "./modal-contents/AboutMe"
import Statistics from "./modal-contents/Statistics"
import ChangeName from "./modal-contents/ChangeName"

// template for a default or an ended Game: **************
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

    const [userData, setUserData, saveData, loadData, openModal, setOpenModal] = useContext(UserData)
    const [playerKey, setPlayerKey] = useState('..........................')
    const [openMenu, setOpenMenu] = useState(false)

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

    const [page, setPage] = useState(null)
    
    const handleModal = (content) => {
        switch (content) {
            case 'help':
                setPage(Help)
                break
            case 'aboutme':
                setPage(AboutMe)
                break
            case 'statistics':
                setPage(Statistics)
                break
            case 'changename':
                setPage(ChangeName)
                break
            default:
                break
        }
        setOpenModal(true)
        setOpenMenu(false)
    }

    return (
        <>
            <Header userData={userData} handleModal={handleModal} openMenu={openMenu} setOpenMenu={setOpenMenu}/>
            <div className="play-area" title="This paper is your today's assignment">
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
                <div className="back-drop" style={{display: openModal ? 'flex' : 'none'}}>
                    <div className="modal-content">
                        <div style={{textAlign: "right"}}>
                            <button className="close" onClick={() => setOpenModal(false)} title="to close this content and returning back">Close</button>
                        </div>
                        <div>
                            {page}
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}