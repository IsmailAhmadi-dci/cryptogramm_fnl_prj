import { UserData } from "../../App"
import { useContext
 } from "react"
export default function GameControl({gameAction}) {

    const [userData, setUserData, saveData, loadData] = useContext(UserData)

    return (
        <div className="game-control">
            <div>
                <button style={{display: !userData.currentGame.isEnded ? 'inline' : 'none'}} onClick={() => {
                    userData.currentGame && userData.currentGame.isRunning ? gameAction('pause') : gameAction('play')
                }}>{userData.currentGame && userData.currentGame.isRunning ? 'Pause' : 'Play'}</button>
                <button onClick={() => {
                    !userData.currentGame.isEnded ? gameAction('resign') : gameAction('new')
                }}>{!userData.currentGame.isEnded ? 'Resign' : 'New Game'}</button>
            </div>
            <h2>{userData.currentGame.gameTime ? userData.currentGame.gameTime : 0}</h2>
        </div>
    )
}