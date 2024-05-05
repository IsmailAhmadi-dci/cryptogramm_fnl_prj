import { UserData } from "../../App"
import { useContext, useState } from "react"
import { timeShower } from "../game-components/GameControl"

const dateFormater = (naw) => {
    const now = new Date(naw)
    return `${now.getDate()}/${now.getMonth()}/${now.getFullYear()} - ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}:${now.getSeconds().toString().padStart(2,'0')}`
}

const dateCalc = (start, end) => {
    start = new Date(start)
    end = new Date(end)
    return ((end- start) / 1000)
}

export default function Statistics() {

    const [userData, setUserData, saveData, loadData, openModal, setOpenModal] = useContext(UserData)

    const handleClear = () => {
        setUserData(prev => ({...prev, records : []}))
        setOpenModal(false)
    }

    return (
        <div title="Your Game Statistics table">
            <h2>Statistics</h2>
            <p>Here is your Game Statistics:</p>
            <table className="stat">
                <tr>
                    <th>Player</th> <th>Start</th> <th>End</th> <th>Time</th> <th>Result</th>
                </tr>
                {userData.records.map(item => (
                    <tr>
                        <td>{item.playerName}</td> <td>{dateFormater(item.start)}</td> <td>{dateFormater(item.end)}</td> <td>{timeShower(dateCalc(item.start, item.end))}</td> <td className={item.result === 'resigned' ? 'red' : 'green'}>{item.result}</td>
                    </tr>
                ))}
            </table>
            <p><b>Note:</b> in order to clear your history of playing, press this button &rarr; <button className="close" onClick={handleClear} style={{padding: "0.3rem", fontSize: "0.8rem"}}>Clear History</button> , But you must be sure because there is no undo for it!</p>
        </div>
    )
}