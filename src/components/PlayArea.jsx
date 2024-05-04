import { UserData } from "../App"
import { useContext, useEffect, useState } from "react"


import Message from "./game-components/Message"
import KeyBoard from "./game-components/KeyBoard"

export default function PlayArea() {

    const [userData, setUserData, saveData, loadData] = useContext(UserData)
    const [playerKey, setPlayerKey] = useState('..........................')


    useEffect(() => {
        saveData()
    },[])

    return (
        <div className="play-area">
            <div className="main">
                <KeyBoard playerKey={playerKey} setPlayerKey={setPlayerKey}/>
                <div className="paper-bg paper">
                    <Message  quote='Hello my dear' author='Milo' playerKey={playerKey} isVisible={true}/>
                </div>
            </div>
        </div>
    )
}