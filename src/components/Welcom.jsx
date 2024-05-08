import { UserData } from "../App"
import { useContext, useState } from "react"

import { endedGame } from "./PlayArea"


export default function Welcome() {

    const [userData, setUserData, saveData, loadData] = useContext(UserData)
    const [playerName, setPlayerName] = useState('')

    const click3 = new Audio('../audio/sounds/click3.wav')
    const kick = new Audio('../audio/sounds/k.wav')

    const handleSubmit = (e) => {
        e.preventDefault()
        setUserData({playerName: playerName, currentGame: endedGame, records: []})
        saveData()
        click3.play()
    }


    const handleChange = (e) => {
        setPlayerName(e.target.value)
        kick.play()
    }


    return (
        <div className="backdrop">
            <div className="welcome">
            <h2>Welcome</h2>
            <p>You must be the new "Code Analyst".</p>
            <p>Please type your name in order to start your job.</p>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Your Name Here" onChange={handleChange}/>
                <input type="submit"  value="Submit"/>
            </form>
            </div>
        </div>
    )
}