import { UserData } from "../App"
import { useContext, useEffect } from "react"

export default function PlayArea() {

    const [userData, setUserData, saveData, loadData] = useContext(UserData)


    useEffect(() => {
        saveData()
    },[])

    return (
        <>
            <h1>{JSON.stringify(userData)}</h1>
        </>
    )
}