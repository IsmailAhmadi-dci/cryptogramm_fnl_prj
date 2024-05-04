import { UserData } from "../App"
import { useContext, useState } from "react"


export default function Welcome() {

    const [userData, setUserData] = useContext(UserData)
    const [playerName, setPlayerName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        setUserData(prev => ({...prev, playerName: playerName}))
    }


    const handleChange = (e) => {
        setPlayerName(e.target.value)
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