import { UserData } from "../../App"
import { useContext} from "react"

export const timeShower = (n) => {
    n = Math.floor(n)
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
                }} title={userData.currentGame && userData.currentGame.isRunning ? 'Press to Pause the Game' : 'Press to Play or resume'}>{userData.currentGame && userData.currentGame.isRunning ? 'Pause' : 'Play'}</button>
                <button onClick={() => {
                    !userData.currentGame.isEnded ? gameAction('resign') : gameAction('new')
                }} title={!userData.currentGame.isEnded ? 'If you can not do it, you can resign' : 'Press to start completely new Game'}>{!userData.currentGame.isEnded ? 'Resign' : 'New Game'}</button>
            </div>
            <h2 title="This is the duration of your current Game">{timeShower(userData.currentGame.gameTime).slice(0,timeShower(userData.currentGame.gameTime).length - 2)} <span className={userData.currentGame.isRunning ? 'pulsar' : ''}>{timeShower(userData.currentGame.gameTime).slice(timeShower(userData.currentGame.gameTime).length -2)}</span></h2>
        </div>
    )
}