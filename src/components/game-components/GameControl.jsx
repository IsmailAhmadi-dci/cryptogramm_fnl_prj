import { UserData } from "../../App"
import { useContext} from "react"

export const timeShower = (n) => {
    const days = (n - (n % 86400)) / 86400;
    n = n % 86400;
    const hours = (n - (n % 3600)) / 3600;
    n = n % 3600;
    const minuts = (n - (n % 60)) / 60;
    n = n % 60;
    const seconds = n;

    let str = '';

    if (days > 0) {
        str = days.toString().padStart(2, '0') + ':' + hours.toString().padStart(2, '0') + ':' + minuts.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    } else {
        str = hours.toString().padStart(2, '0') + ':' + minuts.toString().padStart(2, '0') + ':' + seconds.toString().padStart(2, '0');
    }

    return str;
}
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
            <h2>{timeShower(userData.currentGame.gameTime)}</h2>
        </div>
    )
}